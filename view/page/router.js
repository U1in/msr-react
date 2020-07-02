
const serverRouter = [
  { 
    path: '/login',
    exact: true,
    component: () => (require('./components/login/index.jsx').default),
    name: 'login',
    title: '登录',
    login: false,
  },
  { 
    path: '/index',
    exact: true,
    component: () => (require('./components/index/index.jsx').default),
    name: 'index',
    title: '主页',
    login: true,
  },
  {
    path: '/csrf',
    exact: true,
    component: () => (require('./components/csrf/index.jsx').default),
    name: 'csrf',
    title: 'CSRF',
    login: true,
  },
  {
    path: '/xss',
    exact: true,
    component: () => (require('./components/xss/index.jsx').default),
    name: 'xss',
    title: 'XSS',
    login: true,
  }
];

export default serverRouter;

