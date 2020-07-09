import axios from 'axios';

const instance = axios.create({});

instance.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.url = 'http://127.0.0.1:9125' + config.url;
    console.log(config.url);
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