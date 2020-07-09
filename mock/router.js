import Router from 'koa-router';

const router = Router();

router.get(`/test`, (ctx) => {
  ctx.body = {
    code: 0,
    message: '这是一条同构的Ajax请求结果，刷新页面也会请求，前端路由载入组件时候也会请求。',
    data: ''
  }
})

router.get(`/csrf`, (ctx) => {
  ctx.body = {
    code: 0,
    message: '这是一条验证通过的请求',
    data: ''
  }
})

export default router;