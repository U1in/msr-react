import Manifest from '../../dist/manifest.json';
import { matchPath } from 'react-router-dom';
import routes from '../../view/page/router';
import config from 'config';

const ClientRenderController = async(ctx) => {
  const currentRoute = routes.find(route => matchPath(ctx.request.url, route)) || {};
  const PageTitle = currentRoute.title || config.title;
  ctx.type = "text/html";
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="${Manifest["main.css"] ? Manifest["main.css"] : ''}" type="text/css">
      <link rel="stylesheet" href="${Manifest["vendor.css"] ? Manifest["vendor.css"] : ''}" type="text/css">
      <title>${PageTitle}</title>
    </head>
    <body>
      <div id="app"></div>
      <script>window.__RENDER__ = 'CSR'</script>
      <script src="${Manifest["main.js"] ? Manifest["main.js"] : ''}" defer></script>
      <script src="${Manifest["vendor.js"] ? Manifest["vendor.js"] : ''}" defer></script>
      <script src="${Manifest["runtime.js"] ? Manifest["runtime.js"] : ''}" defer></script>
    </body>
    </html>
  `;
}

export default ClientRenderController;