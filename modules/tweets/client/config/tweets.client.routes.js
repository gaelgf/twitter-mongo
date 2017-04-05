(function () {
  'use strict';

  angular
    .module('tweets.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tweets', {
        url: '/tweets',
        templateUrl: '/modules/tweets/client/views/tweets.client.view.html',
        controller: 'TweetsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Tweets'
        }
      });
  }
}());
