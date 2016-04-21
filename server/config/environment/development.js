'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://videojj:c0ed2059079ce7345594791a5c9293ed@test.videojj.com:20001/blog',
    options: {
      db: {
        safe: true
      }
    }
  },


  seedDB: false
};
