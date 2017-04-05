(function () {
  'use strict';

  angular
    .module('tweets')
    .factory('TweetsService', TweetsService);

  TweetsService.$inject = ['$http', '$log'];

  function TweetsService($http, $log) {
     return {
       getRetweets: getRetweets,
       getTweetsByLangage: getTweetsByLangage
     };

     function getRetweets() {
       return $http.get('/api/tweets/Retweet');
     }

    function getTweetsByLangage() {
      return $http.get('/api/tweets/ByLanguage');
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
