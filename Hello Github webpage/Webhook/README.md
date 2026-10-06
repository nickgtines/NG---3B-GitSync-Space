# Webhook

Accepts any HTTP request on `/webhook-ingest` (`route_auth = "external_id"`). Parses the request method, path, headers, and body — JSON bodies are parsed into an object, everything else is kept as raw text — and writes the result to `/storage/webhook-payloads/latest.json` (volume `webhook-payloads`), overwriting any previous payload. Responds `200 {"ok":true}`.

Read by the [Hello Github](<../Hello Github/README.md>) step, which displays the latest payload.
