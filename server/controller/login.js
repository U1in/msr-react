const LoginController = (ctx) => {
  const { username, password } = ctx.request.body;
  if(username === '123' && password === 'qaz') {
    ctx.session.uid = '123';
    ctx.body = {
      code: 0,
      message: '登陆成功',
      data: {}
    }
  } else {
    ctx.body = {
      code: 500,
      message: '用户名或密码错误',
      data: {}
    }
  }
}

export default LoginController;