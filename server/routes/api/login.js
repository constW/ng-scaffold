import * as svgCaptcha from 'svg-captcha';
import {
  BaseRequest
} from '~/services/BaseRequest';

const router = require('koa-router')();

const verifCaptcha = (session, code) => {
  const {
    captcha
  } = session;
  return code.toLocaleUpperCase() !== captcha;
};

router.get('/middle/cii/passport/takeCaptcha', ctx => {
  const captcha = svgCaptcha.create();
  ctx.session.captcha = captcha.text.toLocaleUpperCase();

  ctx.type = 'image/svg+xml';
  ctx.body = captcha.data;
});

router.post('/middle/cii/passport/authen/login', async ctx => {
  const {
    fields,
    url
  } = ctx.request;

  const {
    imgCode,
    login,
    password
  } = fields;
  const {
    captcha
  } = ctx.session;

  const error = {
    code: 0,
    message: '图形验证码错误'
  };

  if (!imgCode) {
    ctx.body = error;
    return;
  }

  if (captcha !== imgCode.toLocaleUpperCase()) {
    ctx.body = error;
    return;
  }

  const r = new BaseRequest(ctx.session);
  const result = await r.request(url, {
    data: {
      login,
      password
    }
  });

  const {
    code,
    message,
    data
  } = result;

  if (code === 1) {
    ctx.session.logon = true;
    ctx.session.ticket = data.ticket;
  }

  ctx.body = {
    code,
    message,
    data: null
  };
});

router.post('/middle/cii/passport/authen/findPassword', async ctx => {
  const {
    fields,
    url
  } = ctx.request;
  const {
    imgCode
  } = fields;

  const error = {
    code: 0,
    message: '图形验证码错误'
  };

  if (!imgCode) {
    ctx.body = error;
    return;
  }

  if (verifCaptcha(ctx.session, imgCode)) {
    ctx.body = error;
    return;
  }

  const r = new BaseRequest(ctx.session);

  ctx.body = await r.request(url, {
    data: Object.assign(fields, {
      verifyCode: fields.captcha
    })
  });
});

router.post('/middle/cii/passport/authen/register', async ctx => {
  const {
    fields,
    url
  } = ctx.request;
  const {
    imgCode
  } = fields;

  const error = {
    code: 0,
    message: '图形验证码错误'
  };

  if (!imgCode) {
    ctx.body = error;
    return;
  }

  if (verifCaptcha(ctx.session, imgCode)) {
    ctx.body = error;
    return;
  }

  const r = new BaseRequest(ctx.session);

  ctx.body = await r.request(url, {
    data: Object.assign(fields, {
      verifyCode: fields.captcha
    })
  });
});

router.post('/middle/cii/passport/authen/sendCode4Register', async ctx => {
  const {
    fields,
    url
  } = ctx.request;
  const {
    imgCode,
    mobile
  } = fields;

  const error = {
    code: 0,
    message: '图形验证码错误'
  };

  if ((!imgCode) || !mobile) {
    error.message = '验证码或手机号码不能为空';
    ctx.body = error;
    return;
  }

  if (verifCaptcha(ctx.session, imgCode)) {
    ctx.body = error;
    return;
  }

  const r = new BaseRequest(ctx.session);
  ctx.body = await r.request(url, {
    data: fields
  });
});

router.post('/middle/cii/passport/authen/sendCode4FindPassword', async ctx => {
  const {
    fields,
    url
  } = ctx.request;
  const {
    imgCode,
    mobile
  } = fields;

  const error = {
    code: 0,
    message: '图形验证码错误'
  };

  if ((!imgCode) || !mobile) {
    error.message = '验证码或手机号码不能为空';
    ctx.body = error;
    return;
  }

  if (verifCaptcha(ctx.session, imgCode)) {
    ctx.body = error;
    return;
  }

  const r = new BaseRequest(ctx.session);
  ctx.body = await r.request(url, {
    data: fields
  });
});

router.get('/middle/cii/passport/authen/verifCaptcha', ctx => {
  const {
    fields: {
      imgCode
    }
  } = ctx.request;
  const {
    captcha
  } = ctx.session;

  const error = {
    code: 0,
    message: '验证码错误',
    data: null
  };

  if (imgCode && imgCode.toLocaleUpperCase() === captcha) {
    ctx.body = {
      code: 1,
      data: true
    };

    return;
  }

  ctx.body = error;
});

router.post('/middle/cii/passport/authen/checkVerifyCode', async ctx => {
  const {
    url,
    fields
  } = ctx.request;

  const r = new BaseRequest(ctx.session);
  ctx.body = await r.request(url, {
    data: Object.assign(fields, {
      verifyCode: fields.captcha
    })
  });
});

router.post('/middle/cii/passport/authen/findPassword', async ctx => {
  const {
    url,
    fields
  } = ctx.request;

  const r = new BaseRequest(ctx.session);
  ctx.body = await r.request(url, {
    data: Object.assign(fields, {
      verifyCode: fields.captcha
    })
  });
});

router.get('/middle/cii/passport/logout', async ctx => {
  ctx.session = {};
  ctx.body = {
    code: 1,
    message: '',
    data: null
  };
});

module.exports = router;
