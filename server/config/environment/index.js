'use strict';

const path = require('path');
const _ = require('lodash');

// Base config
let base = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 1234,
  logType : 'dev',
  secrets  : {
    session: 'virgo-secret',
    token_secret:'virgotoken'
  },
};


// Overide base config with environment
module.exports = _.merge(base, require('./' + process.env.NODE_ENV + '.js') || {});
