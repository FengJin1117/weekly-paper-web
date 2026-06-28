const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const markdownDir = path.join(root, "markdowns");
const dataDir = path.join(root, "data");
const outputPath = path.join(dataDir, "papers.json");
const readStatusPath = path.join(dataDir, "read-status.json");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
}

function cleanMarkdown(value) {
  return (value || "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return cleanMarkdown(value)
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function getField(block, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^-\\s*(?:\\*\\*)?${escaped}\\s*(?:：|:)\\s*(?:\\*\\*)?\\s*(.+)$`, "im");
  const match = block.match(pattern);
  return match ? cleanMarkdown(match[1]) : "";
}

function getLink(block) {
  const raw = getField(block, "链接");
  const markdownLink = block.match(/链接\s*(?:：|:)\s*\[[^\]]+\]\((https?:\/\/[^)]+)\)/i);
  const plainLink = block.match(/链接\s*(?:：|:)\s*(https?:\/\/\S+)/i);
  return markdownLink?.[1] || plainLink?.[1] || raw;
}

function parseRecommendation(block) {
  const priorityLine = block.match(/推荐优先级\s*(?:：|:)\s*(?:\*\*)?([^*\n|]+)/i);
  const readingLine = block.match(/建议(?:阅读级别)?\s*(?:：|:)\s*(?:\*\*)?([^*\n|（(]+)/i);

  return {
    link: getLink(block),
    keywords: getField(block, "关键词"),
    priority: priorityLine ? cleanMarkdown(priorityLine[1]) : "",
    readingLevel: readingLine ? cleanMarkdown(readingLine[1]) : "",
    yearVenue: getField(block, "年份 / 会议") || getField(block, "年份/会议"),
    reason: getField(block, "推荐理由"),
  };
}

function parseMarkdown(fileName) {
  const filePath = path.join(markdownDir, fileName);
  const content = readUtf8(filePath);
  const dateMatch = content.match(/(\d{4}-\d{2}-\d{2})/) || fileName.match(/(\d{4}-\d{2}-\d{2})/);
  if (!dateMatch) {
    throw new Error(`Cannot find date in ${fileName}`);
  }

  const date = dateMatch[1];
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const weekKeywordsMatch = content.match(/^>\s*关键词\s*(?:：|:)\s*(.+)$/m);
  const directionMatch =
    content.match(/^>\s*(?:研究方向|本周方向)\s*(?:：|:)\s*(.+)$/m) ||
    content.match(/^(?:本周重点|本周方向)[^\n]+$/m);

  const headingPattern = /^##\s+(?:Top\s+)?(\d+)\.\s+(.+)$/gm;
  const headings = [];
  let heading;
  while ((heading = headingPattern.exec(content)) !== null) {
    headings.push({
      top: Number(heading[1]),
      title: cleanMarkdown(heading[2]),
      start: heading.index,
      bodyStart: headingPattern.lastIndex,
    });
  }

  const papers = headings.map((item, index) => {
    const next = headings[index + 1];
    const block = content.slice(item.bodyStart, next ? next.start : content.length);
    const fields = parseRecommendation(block);
    const idBase = fields.link || `${date}-${item.top}-${item.title}`;
    return {
      id: `${date}-${String(item.top).padStart(2, "0")}-${slugify(idBase || item.title)}`,
      top: item.top,
      title: item.title,
      ...fields,
    };
  });

  const keywordSource = weekKeywordsMatch ? weekKeywordsMatch[1] : papers.map((paper) => paper.keywords).join(", ");
  const keywordSet = new Set();
  cleanMarkdown(keywordSource)
    .split(/[,/，、|]+/)
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .slice(0, 8)
    .forEach((keyword) => keywordSet.add(keyword));

  return {
    date,
    title: titleMatch ? cleanMarkdown(titleMatch[1]) : `每周论文推荐：${date}`,
    source: `markdowns/${fileName}`,
    direction: directionMatch ? cleanMarkdown(directionMatch[0]) : "",
    keywords: Array.from(keywordSet),
    paperCount: papers.length,
    papers,
  };
}

function filePreference(fileName) {
  if (/^weekly_paper_recommendation_/i.test(fileName)) {
    return 3;
  }
  if (/^weeky_paper_recommendation_/i.test(fileName)) {
    return 1;
  }
  return 2;
}

function selectMarkdownFiles(files) {
  const byDate = new Map();
  for (const fileName of files) {
    const date = fileName.match(/(\d{4}-\d{2}-\d{2})/)?.[1];
    if (!date) {
      continue;
    }
    const current = byDate.get(date);
    if (!current || filePreference(fileName) > filePreference(current)) {
      byDate.set(date, fileName);
    }
  }
  return Array.from(byDate.values()).sort();
}

function loadReadStatus() {
  if (!fs.existsSync(readStatusPath)) {
    return { papers: {} };
  }
  return JSON.parse(readUtf8(readStatusPath));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function main() {
  ensureDir(dataDir);

  const files = selectMarkdownFiles(
    fs
      .readdirSync(markdownDir)
      .filter((file) => /\.md$/i.test(file))
      .sort(),
  );

  const weeks = files.map(parseMarkdown).sort((a, b) => b.date.localeCompare(a.date));
  const allPapers = weeks.flatMap((week) => week.papers.map((paper) => ({ weekDate: week.date, ...paper })));
  const readStatus = loadReadStatus();
  readStatus.papers = readStatus.papers || {};

  for (const paper of allPapers) {
    if (!Object.prototype.hasOwnProperty.call(readStatus.papers, paper.id)) {
      readStatus.papers[paper.id] = false;
    }
  }

  const currentIds = new Set(allPapers.map((paper) => paper.id));
  for (const id of Object.keys(readStatus.papers)) {
    if (!currentIds.has(id)) {
      delete readStatus.papers[id];
    }
  }

  const generatedAt = new Date().toISOString();
  const data = {
    generatedAt,
    title: "每周论文推荐",
    totals: {
      weeks: weeks.length,
      papers: allPapers.length,
    },
    weeks,
  };

  readStatus.generatedAt = generatedAt;
  writeJson(outputPath, data);
  writeJson(readStatusPath, readStatus);

  console.log(`Generated ${weeks.length} weeks and ${allPapers.length} papers.`);
  console.log(`Using markdown files: ${files.join(", ")}`);
}

main();
