'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Tweet = mongoose.model('Tweet'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * List of Articles
 */
exports.list = function (req, res) {

  Tweet.find().exec(function (err, tweet) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tweet);
    }
  });
};

  exports.create = function (req, res) {
    var tweet = new Tweet(req.body);
    tweet.tweet = req.tweet;

    tweet.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(tweet);
      }
    });
  };
