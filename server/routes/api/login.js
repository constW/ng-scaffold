const router = require('koa-router')();
router.post('/login', async ctx => {
  const { fields } = ctx.request;
  let data = {};
  if (fields) {
    data = {
      code: 1,
      message: '登录成功',
      data: {
        username: '张三',
        id: 'admin',
        password: '121212',
        mobilePhone: '15265552445',
        email: 'a@a1b245.com'
      }
    };
  }
  if (data.code === 1) {
    ctx.session.logon = true;
    ctx.session.ticketOfPassport = JSON.stringify(data);
  }
  ctx.body = data;
});
router.get('/logout', async ctx => {
  ctx.session = {};
  ctx.body = {
    code: 1,
    message: '退出成功',
    data: null
  };
});
module.exports = router;
