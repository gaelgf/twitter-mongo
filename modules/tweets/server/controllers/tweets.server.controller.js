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

    var count = 0;
    var countAverage = {};

    for(var i = 0; i < tweet.length;i++){
      if(tweet[i].retweet_count != null) {
        count = count + tweet[i].retweet_count;
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
   * Liste des tweets contenant du texte
   */
    exports.listByText = function (req, res) {
      var text = req.params.text;
      Tweet.find({"text" : {$regex : ".*" + text + ".*"}})
        .exec(function (err, tweet) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {

          var Infos = {};

          Infos.text = text;
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

  var lang = req.params.lang;

  var countEn;
  var countFr;
  var countEs;

  if(req.query && req.query.serie !== undefined) {
    Tweet.find({lang: "en", "text" : {$regex : ".*" + req.query.serie + ".*"}}).exec(function (err, tweetEn) {
      countEn = tweetEn.length;

      Tweet.find({lang: "fr", "text" : {$regex : ".*" + req.query.serie + ".*"}}).exec(function (err, tweetFr) {
        countFr = tweetFr.length;

        Tweet.find({lang: "es", "text" : {$regex : ".*" + req.query.serie + ".*"}}).exec(function (err, tweetEs) {
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
  } else {
    Tweet.find({lang: "en"}).exec(function (err, tweetEn) {
      countEn = tweetEn.length;

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
  }

};

exports.listSeriesByFrTweets = function (req, res) {

  var lang = req.params.lang;

  var countwalkingdead;
  var countVikings;
  var countGOT;

  Tweet.find({lang: "fr", "text" : {$regex : ".*" + 'walkingdead' + ".*"}}).exec(function (err, tweetEn) {
    countwalkingdead = tweetEn.length;

    Tweet.find({lang: "fr", "text" : {$regex : ".*" + 'Vikings' + ".*"}}).exec(function (err, tweetFr) {
      countVikings = tweetFr.length;

      Tweet.find({lang: "fr", "text" : {$regex : ".*" + 'GOT' + ".*"}}).exec(function (err, tweetEs) {
        countGOT = tweetEs.length;


        var data = [{
          name: 'walkingdead',
          y: countwalkingdead,
          drilldown: 'walkingdead'},
          {
            name: 'Vikings',
            y: countVikings,
            drilldown: 'Vikings'},
          {
            name: 'GOT',
            y: countGOT,
            drilldown: 'GOT'}
        ];

        res.json(data);
      });
    });
  });

};

exports.listVikingsByCharacter = function (req, res) {

  var countwalkingdead;
  var countVikings;
  var countGOT;

  Tweet.find({"text" : {$regex : ".*" + 'Ragnar.*Vikings' + ".*"}}).exec(function (err, tweetEn) {
    countwalkingdead = tweetEn.length;

    Tweet.find({"text" : {$regex : ".*" + 'Lagertha.*Vikings' + ".*"}}).exec(function (err, tweetFr) {
      countVikings = tweetFr.length;

      Tweet.find({"text" : {$regex : ".*" + 'Floki.*Vikings' + ".*"}}).exec(function (err, tweetEs) {
        countGOT = tweetEs.length;


        var data = [{
          name: 'Ragnar',
          y: countwalkingdead,
          drilldown: 'Ragnar'},
          {
            name: 'Lagertha',
            y: countVikings,
            drilldown: 'Lagertha'},
          {
            name: 'Floki',
            y: countGOT,
            drilldown: 'Floki'}
        ];

        res.json(data);
      });
    });
  });

};

exports.listGOTByCharacter = function (req, res) {

  var countwalkingdead;
  var countVikings;
  var countGOT;

  Tweet.find({"text" : {$regex : ".*" + 'Jon Snow.*GOT' + ".*"}}).exec(function (err, tweetEn) {
    countwalkingdead = tweetEn.length;

    Tweet.find({"text" : {$regex : ".*" + 'Daenerys Targaryen.*GOT' + ".*"}}).exec(function (err, tweetFr) {
      countVikings = tweetFr.length;

      Tweet.find({"text" : {$regex : ".*" + 'Arya Stark.*GOT' + ".*"}}).exec(function (err, tweetEs) {
        countGOT = tweetEs.length;


        var data = [{
          name: 'Jon Snow',
          y: countwalkingdead,
          drilldown: 'Jon Snow'},
          {
            name: 'Daenerys Targaryen',
            y: countVikings,
            drilldown: 'Daenerys Targaryen'},
          {
            name: 'Arya Stark',
            y: countGOT,
            drilldown: 'Arya Stark'}
        ];

        res.json(data);
      });
    });
  });

};

exports.listWalkingDeadByCharacter = function (req, res) {

  var countwalkingdead;
  var countVikings;
  var countGOT;

  Tweet.find({"text" : {$regex : ".*" + 'Rick.*TWD' + ".*"}}).exec(function (err, tweetEn) {
    countwalkingdead = tweetEn.length;

    Tweet.find({"text" : {$regex : ".*" + 'Daryl Dixon.*TWD' + ".*"}}).exec(function (err, tweetFr) {
      countVikings = tweetFr.length;

      Tweet.find({"text" : {$regex : ".*" + 'Carl.*TWD' + ".*"}}).exec(function (err, tweetEs) {
        countGOT = tweetEs.length;


        var data = [{
          name: 'Rick',
          y: countwalkingdead,
          drilldown: 'Rick'},
          {
            name: 'Daryl Dixon',
            y: countVikings,
            drilldown: 'Daryl Dixon'},
          {
            name: 'Carl',
            y: countGOT,
            drilldown: 'Carl'}
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

  var lang = req.params.lang;
  if(req.query && req.query.serie !== undefined) {
    Tweet.find({lang: lang, "text" : {$regex : ".*" + req.query.serie + ".*"}}).exec(function (err, tweet) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(tweet);
      }
    });
  }

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
