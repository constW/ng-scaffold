import { BaseRequest } from '~/services/BaseRequest';
import { permission } from '~/middleware/permission';

const router = require('koa-router')();

// router.use(permission('user'));
router.use(permission());

router.all('*', async (ctx, next) => {
  const { url, method } = ctx;
  const { fields } = ctx.request;

  const r = new BaseRequest(ctx.session);

  ctx.body = await r.request(url, {
    method: method,
    data: fields,
    context: r.context
  });
});

module.exports = router;
