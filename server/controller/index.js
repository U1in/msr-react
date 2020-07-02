import session from "koa-session";

const IndexController = (ctx) => {
  const uid = ctx.session.uid;
  uid ? ctx.redirect('/index') : ctx.redirect('/login');
}

export default IndexController;