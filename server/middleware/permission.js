export function permission(permissionName = 'logon') {
  return async function (ctx, next) {
    const { url } = ctx;
    const logon = ctx.session[permissionName];

    if (!logon) {
      ctx.body = {
        code: 401,
        message: '您未登录或登录已过期，请前往登录',
        data: {
          requestUrl: url
        }
      };
      return;
    }

    await next();
  };
}
