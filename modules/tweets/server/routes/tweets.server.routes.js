'use strict';

/**
 * Module dependencies
 */
var tweets = require('../controllers/tweets.server.controller');

module.exports = function (app) {
  app.route('/api/tweets')
    .get(tweets.list)
    .post(tweets.create);
};
