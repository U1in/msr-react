import axios from '../axios/axios';
import apis from '../../apis/apis';

const ApisController = async (ctx) => {
  const api = ctx.query.API_NAME;
  console.log(ctx.query);
  const config = apis[api];
  console.log('api', api);
  console.log('config', config());
  const result = await axios(config());
  ctx.body = result;
}

export default ApisController;