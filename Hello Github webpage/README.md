# Hello Github webpage

Ingests any payload sent to a webhook and displays the most recently received payload on a webpage.

## Flow

1. **Webhook** (`/webhook-ingest`, `route_auth = "external_id"`) accepts any HTTP request. It parses the method, path, headers, and body (JSON is parsed; anything else is kept as raw text) and writes it to the shared `webhook-payloads` volume as `latest.json`.
2. **Hello Github** (`/hello-github`) renders a page that reads `latest.json` from the `webhook-payloads` volume at request time and displays it as formatted JSON. If nothing has been received yet, it shows a placeholder message.

## Notes

- Only the most recently received payload is kept; sending a new request overwrites it.
- The webhook's external ID is minted by 3B — call it with that `external_id` query parameter, never a guessed value.
