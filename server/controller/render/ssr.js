import Manifest from '../../../dist/manifest.json';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import Wrapper from '../../../view/template/wrapper';
import routes from '../../../view/page/router';
import config from 'config';
import fs from 'fs';
import path from 'path';

const ServerRenderController = async(ctx) => {
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
  let template = fs.readFileSync(path.join(__dirname, '../../../dist/template.html'), 'utf-8');
  template = template.replace('<div id="app"></div>', `<div id="app">${EleString}</div>`);
  template = template.replace('<script id="inject"></script>', `<script id="inject">window.__RENDER__ = 'SSR'; window.__SERVERDATA__ = JSON.parse('${JSON.stringify(serverData || {})}');</script>`);
  template = template.replace('<title>msr</title>', `<title>${PageTitle}</title>`);
  ctx.type = "text/html";
  ctx.body = template;
}

export default ServerRenderController;