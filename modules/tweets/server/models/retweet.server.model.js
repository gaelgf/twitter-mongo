'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var RetweetSchema = new Schema({
  retweet_count: {
    type: Number,
    default: '',
    trim: true
  }
});

mongoose.model('Retweet', RetweetSchema);
