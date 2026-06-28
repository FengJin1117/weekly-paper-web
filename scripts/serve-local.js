const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "data");
const papersPath = path.join(dataDir, "papers.json");
const statusPath = path.join(dataDir, "read-status.json");
const port = Number(process.env.PORT || process.argv[2] || 8000);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        req.destroy();
        reject(new Error("Request body is too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function listPaperIds() {
  const papers = readJson(papersPath);
  return new Set(papers.weeks.flatMap((week) => week.papers.map((paper) => paper.id)));
}

async function handleApi(req, res, pathname) {
  if (pathname !== "/api/read-status") {
    send(res, 404, "Not found");
    return;
  }

  if (req.method === "GET") {
    send(res, 200, fs.readFileSync(statusPath, "utf8"), "application/json; charset=utf-8");
    return;
  }

  if (req.method !== "POST") {
    send(res, 405, "Method not allowed");
    return;
  }

  const payload = JSON.parse(await readBody(req));
  const paperId = String(payload.paperId || "");
  const validIds = listPaperIds();
  if (!validIds.has(paperId)) {
    send(res, 400, `Unknown paper id: ${paperId}`);
    return;
  }

  const status = readJson(statusPath);
  status.papers = status.papers || {};
  status.papers[paperId] = typeof payload.read === "boolean" ? payload.read : !Boolean(status.papers[paperId]);
  status.generatedAt = new Date().toISOString();
  writeJson(statusPath, status);
  send(res, 200, JSON.stringify(status, null, 2), "application/json; charset=utf-8");
}

function serveStatic(req, res, pathname) {
  const cleanPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.resolve(root, `.${decodeURIComponent(cleanPath)}`);
  if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    send(res, 404, "Not found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  send(res, 200, fs.readFileSync(filePath), contentTypes[ext] || "application/octet-stream");
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url.pathname);
      return;
    }
    serveStatic(req, res, url.pathname);
  } catch (error) {
    send(res, 500, error.message || "Internal server error");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`weekly-paper-web local editor: http://127.0.0.1:${port}/`);
});
