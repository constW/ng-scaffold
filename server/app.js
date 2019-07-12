const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const session = require('koa-session2');
const bodyparser = require('koa-better-body');
const logger = require('koa-logger');
const convert = require('koa-convert');
const proxy = require('./routes/api/proxy');
const login = require('./routes/api/login');

// error handler
onerror(app);

// middlewares
app.use(session({
  key: 'ticketOfPassport',
  domain: 'localhost',
  port: '4200',
  maxAge: 1000 * 60 * 60 * 24 * 7
}, app));

app.use(convert(bodyparser({ jsonLimit: '50mb' })));
app.use(json());

if (process.env.NODE_ENV !== 'production') {
  app.use(logger());

  // logger
  app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    // eslint-disable-next-line no-console
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
}

// routes
app.use(login.routes(), login.allowedMethods());
app.use(proxy.routes(), proxy.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  // eslint-disable-next-line no-console
  console.error('server error', err, ctx);
});

module.exports = app;
