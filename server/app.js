import Koa from 'koa';
import serve from 'koa-static';
import config from 'config';
import path from 'path';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session-redis';
import { RedisStore } from 'koa-session-store2'
import router from './router';

import CSRFMiddleWare from './middleware/csrf';

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
  store: new RedisStore('', 
      {
        host: '127.0.0.1',
        port: 6379,
        ttl: 3600,
        // user     : 'auth',
        // password : '',
        // database : ''
      }
  ),
};

const app = new Koa();
app.keys = ['pAn1v'];
app.use(logger());
app.use(bodyParser());
app.use(serve(path.join(__dirname, '../dist')));
app.use(session(CONFIG, app));
app.use(CSRFMiddleWare());
app.use(router.routes(), router.allowedMethods());

app.listen(config.port, () => {
  console.log(`Listening at port ${config.port}`);
});