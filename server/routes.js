'use strict';

const mount = require('koa-mount');

module.exports = function(app) {

  app.use(function*(next) {
    try {
      yield next;
    } catch (err) {
      this.status = 500;
      this.body = err.message;
      this.app.emit('error', err, this);
    }
  });
  app.use(function*(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
  });
  let book = require('./api/book');
  let user = require('./api/user');
  app.use(mount('/api/book', book));
  app.use(mount('/api/user', user));

  app.use(function*() {
    var err = new Error();
    err.status = 404;
    this.status = 404;
    this.body = yield this.render('404', {
      error: err
    });
  });

};
