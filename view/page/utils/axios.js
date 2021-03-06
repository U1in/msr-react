import axios from 'axios';
import cookie from 'js-cookie';
import { message } from 'antd';

const instance = axios.create({});

instance.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    const _csrf = cookie.get('_csrf');

    const data = {...config.data, _csrf: _csrf};
    config.data = data;
    config.url = 'http://127.0.0.1:9123' + config.url;
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    if(!(response.data && response.data.code === 0)) {
      messsage.error(response.data.messsage);
    }
    return response.data;
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance;