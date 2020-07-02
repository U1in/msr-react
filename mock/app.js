import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './router';

const app = new Koa();
app.use(bodyParser());
app.use(router.routes(), router.allowedMethods());

app.listen(9124, () => {
  console.log(`Listening at port 9124`);
});

export default app;