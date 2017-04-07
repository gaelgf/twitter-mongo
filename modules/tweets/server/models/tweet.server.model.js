'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var explain = require('mongoose-explain');

/**
 * Article Schema
 */
var TweetSchema = new Schema({
   created_at:{
    type: String,
    default: '',
    trim: true
  },
  id_str: {
    type: String,
    default: '',
    trim: true
  },
  text: {
    type: String,
    default: '',
    trim: true
  },
  entities: {
    hashtags: [{ text:{ type: String, default: '', trim: true } }]
  },
  lang: {
    type: String,
    default: '',
    trim: true
  },
  retweet_count: {
    type: Number,
    default: '',
    trim: true
  }
});

TweetSchema.plugin(explain);

mongoose.model('Tweet', TweetSchema);
