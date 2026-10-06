const js = (await Bun.file('./bundle.js').text()).replaceAll('</script', '<\\/script');
const css = await Bun.file('./output.css').text();
const rawTitle = 'Hello World';
const basePath = process.env._3B_BRANCH_ID
  ? `/__3b/branch/${process.env._3B_BRANCH_ID}${process.env.ROUTE_PATH ?? ''}`
  : process.env.ROUTE_PATH ?? '';
const title = rawTitle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

console.log(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><rect width=\"16\" height=\"16\" rx=\"3\" fill=\"%230ea5e9\"/><text x=\"8\" y=\"12\" font-size=\"10\" text-anchor=\"middle\" fill=\"white\" font-family=\"sans-serif\">H</text></svg>')}">
  <style>${css}</style>
</head>
<body>
  <div id="root"></div>
  <script>window.__ROUTE_PATH__=${JSON.stringify(basePath).replaceAll('</script', '<\\/script')};</script>
  <script type="module">${js}</script>
</body>
</html>`);
