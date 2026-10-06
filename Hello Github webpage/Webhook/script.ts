import { mkdir, writeFile } from "node:fs/promises";

const raw = await Bun.stdin.text();

const headerEnd = raw.indexOf("\r\n\r\n");
const headSection = headerEnd === -1 ? raw : raw.slice(0, headerEnd);
const body = headerEnd === -1 ? "" : raw.slice(headerEnd + 4);

const headerLines = headSection.split("\r\n");
const requestLine = headerLines[0] ?? "";
const [method = "GET", path = "/"] = requestLine.split(" ");

const headers: Record<string, string> = {};
for (const line of headerLines.slice(1)) {
  const idx = line.indexOf(":");
  if (idx === -1) continue;
  headers[line.slice(0, idx).trim().toLowerCase()] = line.slice(idx + 1).trim();
}

let parsedBody: unknown = body;
const contentType = headers["content-type"] ?? "";
if (contentType.includes("application/json") && body.trim().length > 0) {
  try {
    parsedBody = JSON.parse(body);
  } catch {
    parsedBody = body;
  }
}

const record = {
  receivedAt: new Date().toISOString(),
  method,
  path,
  headers,
  body: parsedBody,
};

const dir = "/storage/webhook-payloads";
await mkdir(dir, { recursive: true });
await writeFile(`${dir}/latest.json`, JSON.stringify(record, null, 2));

const responseBody = JSON.stringify({ ok: true });
process.stdout.write(
  `HTTP/1.1 200 OK\r\n` +
    `Content-Type: application/json\r\n` +
    `Content-Length: ${Buffer.byteLength(responseBody)}\r\n` +
    `\r\n` +
    responseBody,
);
