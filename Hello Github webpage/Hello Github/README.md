# Hello Github

Webpage at `/hello-github` that displays the latest payload received by the [Webhook](<../Webhook/README.md>) step.

Reads `/storage/webhook-payloads/latest.json` (read-only mount of the `webhook-payloads` volume) at request time in `render.ts` and injects it into the page as `window.__PAYLOAD__`. `App.tsx` renders it as formatted JSON, or a placeholder message if nothing has been received yet.
