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

  exports.listByDate = function (req, res) {

    console.log(req.params.start);
    var start = req.params.start;
    var end = req.params.end;

    Tweet.find({created_at: { $gte: start, $lt: end}}).exec(function (err, tweet) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(tweet);
      }
    });
  };



  exports.listByHashtags = function (req, res) {

    var hashtags = req.params.hashtags;

   // Tweet.find({ entities: { $text: { $search: hashtags}}}).exec(function (err, tweet) {
    Tweet.find({entities: { hashtags: [{ text: hashtags }]}})
      .exec(function (err, tweet) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(tweet);
        console.log(tweet);
      }
    });
  };

exports.listByLanguage = function (req, res) {

  console.log(req);
  var lang = req.params.lang;

  Tweet.find({lang: lang}).exec(function (err, tweet) {
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
