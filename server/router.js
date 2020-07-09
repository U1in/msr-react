import Router from 'koa-router';
import routes from '../view/page/router';
import os from 'os-utils';

import ServerRenderController from './controller/serverRender';
import ClientRenderController from './controller/clientRender';
import LoginController from './controller/login';
import IndexController from './controller/index';
import CsrfController from './controller/csrf';
import ApisController from './controller/apis';

const router = Router();
const routeNameArray = routes.map(route => route.path);
const needLoginArray = routes.filter(route => route.login === true)
const routeReg = routeNameArray.join('|');
const needLoginReg = needLoginArray.map(route => route.path).join('|');

router.get(`/`, (ctx) => {
  IndexController(ctx);
})

router.post(`/login`, (ctx) => {
  LoginController(ctx);
})

router.get(`/logout`, (ctx) => {
  ctx.session = null;
  ctx.body = {
    code: 0,
    message: '已登出',
    data: ''
  };
})

router.get(`(${routeReg.replace(/\//g, '\\/')})`, async(ctx) => {
  if(needLoginArray.length > 0 && new RegExp(`(${needLoginReg.replace(/\//g, '\\/')})`).test(ctx.request.url)) {
    if(!ctx.session.uid) {
      ctx.redirect('/');
      return ;
    }
  }
  const getOSUsage = () => {
    return new Promise((resolve) => {
      os.cpuUsage((v) => {
        resolve(v)
      });
    })
  }
  const cpu = await getOSUsage();
  console.log(`CPU Usage: ${(cpu * 100).toFixed(3)}%`)
  if(cpu < 0.7) {
    console.log('Use SSR');
    await ServerRenderController(ctx);
  } else {
    console.log('Use CSR');
    await ClientRenderController(ctx);
  }
})

router.post(`/apis`, async(ctx) => {
  await ApisController(ctx);
})

export default router;