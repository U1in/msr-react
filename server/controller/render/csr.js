import { matchPath } from 'react-router-dom';
import routes from '../../../view/page/router';
import config from 'config';
import fs from 'fs';
import path from 'path';

const ClientRenderController = async(ctx) => {
  const currentRoute = routes.find(route => matchPath(ctx.request.url, route)) || {};
  const PageTitle = currentRoute.title || config.title;
  let template = fs.readFileSync(path.join(__dirname, '../../../dist/template.html'), 'utf-8');
  template = template.replace('<script id="inject"></script>', `<script id="inject">window.__RENDER__ = 'CSR';</script>`);
  template = template.replace('<title>msr</title>', `<title>${PageTitle}</title>`);
  ctx.type = "text/html";
  ctx.body = template;
}

export default ClientRenderController;