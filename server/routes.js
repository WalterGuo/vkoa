'use strict';

const router = require('koa-router')();

const users = require('./api/user');
const videos = require('./api/video');

module.exports = function(app) {


  app.use(async(ctx, next) => {
      try {
        await next();
      } catch (err) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
          message: err.message
        };
      }
    })
    // logger
  app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
  router.use('/api/user', users.routes(), users.allowedMethods());
  router.use('/api/video', videos.routes(), videos.allowedMethods());

  app.use(router.routes(), router.allowedMethods());


  app.use(async(ctx, next) => {
    console.log("404");
    await ctx.render('404', {});
  });



};
