declare global {
  interface Window {
    __PAYLOAD__?: unknown;
  }
}

export default function App() {
  const payload = typeof window !== 'undefined' ? window.__PAYLOAD__ : null;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center px-4 py-12 gap-6">
      <h1 className="text-4xl font-semibold text-slate-100">Webhook payload</h1>
      {payload ? (
        <pre className="w-full max-w-3xl overflow-auto rounded-lg bg-slate-800 text-slate-100 text-sm p-6 whitespace-pre-wrap break-words">
          {JSON.stringify(payload, null, 2)}
        </pre>
      ) : (
        <p className="text-slate-400 text-lg">No payload received yet. Send a request to the webhook to see it here.</p>
      )}
    </div>
  );
}
