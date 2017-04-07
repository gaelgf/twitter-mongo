'use strict';

/**
 * Module dependencies
 */
var tweets = require('../controllers/tweets.server.controller');

module.exports = function (app) {
  app.route('/api/tweets')
    .get(tweets.list)
    .post(tweets.create);

  app.route('/api/tweets/ByDate/:start/:end')
    .get(tweets.listByDate);

  app.route('/api/tweets/ByHashtags/:hashtags')
    .get(tweets.listByHashtags);

  app.route('/api/tweets/ByLanguage/:lang')
    .get(tweets.listByLanguage);

  app.route('/api/tweets/ByLanguage')
    .get(tweets.listAllLanguage);

  app.route('/api/tweets/Retweet')
    .get(tweets.Retweet);

    app.route('/api/tweets/ByText/:text')
      .get(tweets.listByText);

  app.route('/api/tweets/listSeriesByFrTweets')
    .get(tweets.listSeriesByFrTweets);

  app.route('/api/tweets/listVikingsByCharacter')
    .get(tweets.listVikingsByCharacter);
  app.route('/api/tweets/listGOTByCharacter')
    .get(tweets.listGOTByCharacter);
  app.route('/api/tweets/listWalkingDeadByCharacter')
      .get(tweets.listWalkingDeadByCharacter);

  app.param('start', tweets.listByDate);
  app.param('end', tweets.listByDate);
  app.param('hashtags', tweets.listByHashtags);
  app.param('lang', tweets.listByLanguage);
};
