'use strict';

// Production specific configuration
// =================================
module.exports = {
  ip: process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined,

  port: process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080,
  logType: 'combined',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
      process.env.MONGOHQ_URL ||
      process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
      'mongodb://videojj:c0ed2059079ce7345594791a5c9293ed@test.videojj.com:20001/blog'
  }
};
