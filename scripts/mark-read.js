const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const papersPath = path.join(root, "data", "papers.json");
const statusPath = path.join(root, "data", "read-status.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function usage() {
  console.log(`Usage:
  node scripts/mark-read.js list
  node scripts/mark-read.js read <paper-id>
  node scripts/mark-read.js unread <paper-id>
  node scripts/mark-read.js toggle <paper-id>

Tip:
  Open the weekly detail page or run "list" to find paper ids.`);
}

function main() {
  const [command, paperId] = process.argv.slice(2);

  if (!command || command === "help" || command === "--help" || command === "-h") {
    usage();
    return;
  }

  if (!fs.existsSync(papersPath) || !fs.existsSync(statusPath)) {
    console.error("Missing generated data. Run: node scripts/generate-site.js");
    process.exit(1);
  }

  const papers = readJson(papersPath);
  const status = readJson(statusPath);
  status.papers = status.papers || {};

  const allPapers = papers.weeks.flatMap((week) =>
    week.papers.map((paper) => ({
      id: paper.id,
      date: week.date,
      title: paper.title,
      read: Boolean(status.papers[paper.id]),
    })),
  );

  if (command === "list") {
    for (const paper of allPapers) {
      const marker = paper.read ? "read  " : "unread";
      console.log(`${marker}  ${paper.date}  ${paper.id}  ${paper.title}`);
    }
    return;
  }

  if (!["read", "unread", "toggle"].includes(command) || !paperId) {
    usage();
    process.exit(1);
  }

  const exists = allPapers.some((paper) => paper.id === paperId);
  if (!exists) {
    console.error(`Unknown paper id: ${paperId}`);
    process.exit(1);
  }

  if (command === "read") {
    status.papers[paperId] = true;
  } else if (command === "unread") {
    status.papers[paperId] = false;
  } else {
    status.papers[paperId] = !Boolean(status.papers[paperId]);
  }

  status.generatedAt = new Date().toISOString();
  writeJson(statusPath, status);
  console.log(`${paperId}: ${status.papers[paperId] ? "read" : "unread"}`);
}

main();
