const router = require('koa-router')();
const md5 = require('md5-nodejs');
import * as svgCaptcha from 'svg-captcha';
const verifCaptcha = (session, code) => {
  const {
    captcha
  } = session;
  return code.toLocaleUpperCase() !== captcha;
};

const USERS = [
  {
    username: 'admin',
    password: '21232f297a57a5a743894a0e4a801fc3'
  },
  {
    username: 'test1',
    password: 'e10adc3949ba59abbe56e057f20f883e'
  },
  {
    username: 'super',
    password: 'e10adc3949ba59abbe56e057f20f883e'
  }
];
router.get('/getCaptcha', ctx => {
  const captcha = svgCaptcha.create();
  ctx.session.captcha = captcha.text.toLocaleUpperCase();

  ctx.type = 'image/svg+xml';
  ctx.body = captcha.data;
});

router.post('/login', async ctx => {

  const { fields: { password, login, imgCode } } = ctx.request;
  const u = USERS.find(us => us.username === login && us.password === md5(password));
  let error = {
    code: 0,
    message: ''
  };
  if (!imgCode || verifCaptcha(ctx.session, imgCode)) {
    error.message = '图形验证码错误';
    ctx.body = error;
    return;
  }
  if (!u) {
    error.message = '用户名或密码错误';
    ctx.body = error;
    return;
  }
  const data = {
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
