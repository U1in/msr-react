const CsrfController = (ctx) => {
  ctx.body = {
    code: 0,
    message: '这是一条验证通过的请求',
    data: '这是一条验证通过的请求'
  }
}

export default CsrfController;