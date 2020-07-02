import Manifest from '../../dist/manifest.json';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import Wrapper from '../../view/template/wrapper';
import routes from '../../view/page/router';
import config from 'config';

const RenderController = async(ctx) => {
  //执行预请求
  const currentRoute = routes.find(route => matchPath(ctx.request.url, route)) || {};
  const serverData = currentRoute.component().getInitProps ? await currentRoute.component().getInitProps() : null;
  console.log(`执行${currentRoute.name}的预请求，取得结果${JSON.stringify(serverData)}`);
  const ActiveComponent = currentRoute.component();
  const PageTitle = currentRoute.title || config.title;
  //怎么传递服务端请求结果, 保持同步
  const EleString = renderToString(
    <StaticRouter location={ctx.request.url}>
      <Wrapper>
        <ActiveComponent/>
      </Wrapper>
    </StaticRouter>
  );
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
      <div id="app">${EleString}</div>
      ${serverData ? `<script>window.__SERVERDATA__ = JSON.parse('${JSON.stringify(serverData)}')</script>` : ''}
      <script src="${Manifest["main.js"] ? Manifest["main.js"] : ''}"></script>
      <script src="${Manifest["vendor.js"] ? Manifest["vendor.js"] : ''}"></script>
      <script src="${Manifest["runtime.js"] ? Manifest["runtime.js"] : ''}"></script>
    </body>
    </html>
  `;
}

export default RenderController;