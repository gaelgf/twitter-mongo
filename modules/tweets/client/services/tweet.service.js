(function () {
  'use strict';

  angular
    .module('tweets')
    .factory('TweetsService', TweetsService);

  TweetsService.$inject = ['$http', '$log'];

  function TweetsService($http, $log) {
     return {
       getRetweets: getRetweets,
       getTweetsByLangage: getTweetsByLangage,
       getTweetsByDate: getTweetsByDate
     };

     function getRetweets() {
       return $http.get('/api/tweets/Retweet');
     }

    function getTweetsByLangage() {
      return $http.get('/api/tweets/ByLanguage');
    }

    function getTweetsByDate(start, end) {
      return $http.get('/api/tweets/ByDate/'+encodeURI(start)+ '/' +encodeURI(end));
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
