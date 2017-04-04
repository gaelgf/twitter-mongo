'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var TweetSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true
  },
  text: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Tweet', TweetSchema);
