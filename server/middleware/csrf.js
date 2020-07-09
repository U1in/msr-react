import crypto from 'crypto';

const CSRFMiddleWare = (opt) => {
  return async (ctx, next) => {
    //判断如下方式验证csrf
    if(/^(POST|DELETE|UPDATE|PUT)$/.test(ctx.method)) {
      const csrfToken = ctx.request.query._csrf || ctx.request.body._csrf;
      //验证csrfToken
      if(csrfToken !== ctx.cookies.get('_csrf')) {
        ctx.status = 403;
        ctx.body = 'CSRF Token Error';
        return ;
      }
    }
    //验证通过
    await next();
    //后续处理
    //生成下一份csrftoken
    const csrfToken = crypto.randomBytes(16).toString('hex');
    //写入cookie返回
    ctx.cookies.set('_csrf', csrfToken, {
      signed: true,
      maxAge: (opt && opt.maxAge) || 3600000,
      httpOnly: false,
    });
  }
}

export default CSRFMiddleWare;