import axios from 'axios';
import cookie from 'js-cookie';

const isServer = typeof window === "undefined";

const instance = axios.create({});

instance.interceptors.request.use(
  config => {
    if(!isServer) {
      //用于标记是否是ajax请求，后端用于区分
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      //拿不到
      const _csrf = cookie.get('_csrf');
      // const params = {...config.params, _csrf: _csrf};
      // config.params = params;
      
      const data = {...config.data, _csrf: _csrf};
      config.data = data;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance;