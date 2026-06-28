const state = {
  data: null,
  readStatus: null,
  sort: "desc",
};

const collator = new Intl.Collator("zh-CN");

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Cannot load ${path}`);
  }
  return response.json();
}

function isRead(paperId) {
  return Boolean(state.readStatus?.papers?.[paperId]);
}

function countRead(papers) {
  return papers.filter((paper) => isRead(paper.id)).length;
}

function formatKeywords(keywords) {
  if (!keywords || !keywords.length) {
    return "未提取关键词";
  }
  return keywords.slice(0, 6).join(" / ");
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function progressPercent(read, total) {
  return total ? Math.round((read / total) * 100) : 0;
}

function renderIndex() {
  const weekList = document.getElementById("weekList");
  if (!weekList) {
    return;
  }

  const allPapers = state.data.weeks.flatMap((week) => week.papers);
  const readTotal = countRead(allPapers);
  setText("readCount", readTotal);
  setText("paperCount", allPapers.length);
  setText("weekSummary", `${state.data.weeks.length} 期推荐，最新数据生成于 ${new Date(state.data.generatedAt).toLocaleString("zh-CN")}`);

  const weeks = [...state.data.weeks].sort((a, b) => {
    const direction = state.sort === "desc" ? -1 : 1;
    return direction * collator.compare(a.date, b.date);
  });

  weekList.innerHTML = weeks
    .map((week) => {
      const read = countRead(week.papers);
      const total = week.papers.length;
      const percent = progressPercent(read, total);
      return `
        <a class="week-card" href="week.html?date=${encodeURIComponent(week.date)}" aria-label="打开 ${week.date} 论文推荐">
          <div class="week-date">${week.date}</div>
          <div class="week-main">
            <h3>${escapeHtml(week.title)}</h3>
            <p>${escapeHtml(week.direction || formatKeywords(week.keywords))}</p>
            <div class="tag-row">
              ${week.keywords.slice(0, 5).map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("")}
            </div>
          </div>
          <div class="week-progress">
            <strong>${total}</strong>
            <span>推荐论文</span>
            <em>${read} / ${total} 已读</em>
            <div class="progress-track" aria-hidden="true">
              <i style="width: ${percent}%"></i>
            </div>
          </div>
        </a>
      `;
    })
    .join("");

  document.getElementById("sortDesc")?.classList.toggle("active", state.sort === "desc");
  document.getElementById("sortAsc")?.classList.toggle("active", state.sort === "asc");
}

function renderDetail() {
  const paperList = document.getElementById("paperList");
  if (!paperList) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const date = params.get("date") || state.data.weeks[0]?.date;
  const week = state.data.weeks.find((item) => item.date === date);

  if (!week) {
    setText("weekTitle", "未找到该期论文");
    setText("weekLead", "请返回首页选择已有的每周推荐。");
    paperList.innerHTML = "";
    return;
  }

  const read = countRead(week.papers);
  const total = week.papers.length;
  const percent = progressPercent(read, total);

  document.title = `${week.title} - 每周论文推荐`;
  setText("weekTitle", week.title);
  setText("weekLead", `${formatKeywords(week.keywords)} · 数据来源：${week.source}`);
  setText("weekReadCount", read);
  setText("weekPaperCount", total);
  const progress = document.getElementById("weekProgress");
  if (progress) {
    progress.style.width = `${percent}%`;
  }

  paperList.innerHTML = week.papers
    .map((paper) => {
      const readClass = isRead(paper.id) ? "read" : "unread";
      const statusText = isRead(paper.id) ? "已读" : "未读";
      const meta = [paper.priority && `优先级：${paper.priority}`, paper.readingLevel && `建议：${paper.readingLevel}`]
        .filter(Boolean)
        .join(" · ");
      return `
        <article class="paper-card ${readClass}">
          <div class="paper-status">${statusText}</div>
          <div class="paper-body">
            <p class="paper-id">${escapeHtml(paper.id)}</p>
            <h2>Top ${paper.top}. ${escapeHtml(paper.title)}</h2>
            <p class="paper-meta">${escapeHtml(meta || paper.yearVenue || "推荐论文")}</p>
            <p class="paper-keywords">${escapeHtml(paper.keywords || "关键词未提取")}</p>
            ${paper.reason ? `<p class="paper-reason">${escapeHtml(paper.reason)}</p>` : ""}
            ${paper.link ? `<a class="paper-link" href="${escapeAttribute(paper.link)}" target="_blank" rel="noreferrer">打开论文</a>` : ""}
          </div>
        </article>
      `;
    })
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

async function init() {
  try {
    const [data, readStatus] = await Promise.all([loadJson("data/papers.json"), loadJson("data/read-status.json")]);
    state.data = data;
    state.readStatus = readStatus;

    document.getElementById("sortDesc")?.addEventListener("click", () => {
      state.sort = "desc";
      renderIndex();
    });
    document.getElementById("sortAsc")?.addEventListener("click", () => {
      state.sort = "asc";
      renderIndex();
    });

    renderIndex();
    renderDetail();
  } catch (error) {
    const target = document.getElementById("weekList") || document.getElementById("paperList");
    if (target) {
      target.innerHTML = `<p class="error">数据载入失败：${escapeHtml(error.message)}</p>`;
    }
  }
}

init();
