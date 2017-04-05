(function (app) {
  'use strict';

  app.registerModule('tweets', ['core']);
  app.registerModule('tweets.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
