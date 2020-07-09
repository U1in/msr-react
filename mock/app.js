import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './router';
import logger from 'koa-logger';

const app = new Koa();
app.use(logger());
app.use(bodyParser());
app.use(router.routes(), router.allowedMethods());

app.listen(9125, () => {
  console.log(`Listening at port 9125`);
});

export default app;