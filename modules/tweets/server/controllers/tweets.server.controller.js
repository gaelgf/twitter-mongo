'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Tweet = mongoose.model('Tweet'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * List des tweets
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

/**
 * Moyenne des retweets pour tous les tweets
 */
exports.Retweet = function (req, res) {

  Tweet.find({}).select('retweet_count').exec(function (err, tweet) {
    console.log(tweet.length);

    var count = 0;
    var countAverage = {};

    for(var i = 0; i < tweet.length;i++){
      if(tweet[i].retweet_count != null) {
        count = count + tweet[i].retweet_count;
        console.log(count);
      }
    }

    countAverage = count/tweet.length;

    var data = {
      total_tweet: tweet.length,
      retweet_average: countAverage
    };
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(data);
    }
  });
};

/**
 * Liste des tweets entre 2 dates
 */
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


        var Infos = {};

        Infos.start = start;
        Infos.end = end;
        Infos.nb = tweet.length;

        var data = {};
        data.infos = Infos;
        data.tweet = tweet;


        res.json(data);
      }
    });
  };


/**
 * Liste des tweets et nombres de tweets pour un hashtag
 */
  exports.listByHashtags = function (req, res) {
    var hashtags = req.params.hashtags;
    Tweet.find({'entities.hashtags.text': hashtags})
      .exec(function (err, tweet) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {

        var Infos = {};

        Infos.hastags = hashtags;
        Infos.Nb = tweet.length;

        var data = {};
        data.infos = Infos;
        data.tweet = tweet;

        res.json(data);
      }
    });
  };


/**
 * Nombres de tweets par langue
 */
exports.listAllLanguage = function (req, res) {

  console.log(req);
  var lang = req.params.lang;

  var countEn;
  var countFr;
  var countEs;

  Tweet.find({lang: "en"}).exec(function (err, tweetEn) {
    countEn = tweetEn.length;
    console.log(countEn);

    Tweet.find({lang: "fr"}).exec(function (err, tweetFr) {
      countFr = tweetFr.length;

      Tweet.find({lang: "es"}).exec(function (err, tweetEs) {
        countEs = tweetEs.length;


        var data = [{
          name: 'English',
          y: countEn,
          drilldown: 'English'},
          {
            name: 'French',
            y: countFr,
            drilldown: 'French'},
          {
            name: 'Spanish',
            y: countEs,
            drilldown: 'Spanish'}
        ];

        res.json(data);
      });
    });
  });
};


/**
 * Liste des tweets pour une langue
 */
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
