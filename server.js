const http = require("node:http");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");

const PORT = process.env.PORT || 4173;
const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_DIR = path.join(__dirname, "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const MAX_BODY_SIZE = 50_000;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "content-type": type,
    "cache-control": "no-store"
  });
  res.end(body);
}

async function readJsonBody(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > MAX_BODY_SIZE) {
      throw new Error("Payload too large");
    }
  }
  return body ? JSON.parse(body) : {};
}

function clean(value, maxLength = 1000) {
  return String(value || "").trim().slice(0, maxLength);
}

async function saveLead(data) {
  if (clean(data.website, 120)) {
    return { ok: true, spam: true };
  }

  await fsp.mkdir(DATA_DIR, { recursive: true });

  let leads = [];
  try {
    leads = JSON.parse(await fsp.readFile(LEADS_FILE, "utf8"));
  } catch {
    leads = [];
  }

  const lead = {
    id: Date.now().toString(36),
    createdAt: new Date().toISOString(),
    name: clean(data.name, 120),
    phone: clean(data.phone, 40),
    email: clean(data.email, 160),
    service: clean(data.service, 80),
    message: clean(data.message, 1200)
  };

  if (!lead.name || !lead.phone || !lead.message) {
    return { ok: false, error: "Faltan campos obligatorios." };
  }

  leads.push(lead);
  await fsp.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
  return { ok: true, lead };
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === "/") pathname = "/index.html";
  if (!path.extname(pathname)) pathname = `${pathname}.html`;

  const filePath = path.resolve(PUBLIC_DIR, `.${pathname}`);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    send(res, 403, "Forbidden");
    return;
  }

  try {
    const data = await fsp.readFile(filePath);
    const type = MIME_TYPES[path.extname(filePath)] || "application/octet-stream";
    send(res, 200, data, type);
  } catch {
    const fallback = path.join(PUBLIC_DIR, "404.html");
    if (fs.existsSync(fallback)) {
      send(res, 404, await fsp.readFile(fallback), MIME_TYPES[".html"]);
      return;
    }
    send(res, 404, "Pagina no encontrada");
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/contact") {
      const result = await saveLead(await readJsonBody(req));
      send(res, result.ok ? 200 : 400, JSON.stringify(result), MIME_TYPES[".json"]);
      return;
    }

    if (req.method === "GET" || req.method === "HEAD") {
      await serveStatic(req, res);
      return;
    }

    send(res, 405, "Metodo no permitido");
  } catch (error) {
    send(res, 500, JSON.stringify({ ok: false, error: "Error del servidor." }), MIME_TYPES[".json"]);
  }
});

server.listen(PORT, () => {
  console.log(`Mario Sanchez web activa en http://127.0.0.1:${PORT}`);
});
