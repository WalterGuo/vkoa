'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost:27017/vkoa',
    options: {
      db: {
        safe: true
      }
    }
  },


  seedDB: false
};
