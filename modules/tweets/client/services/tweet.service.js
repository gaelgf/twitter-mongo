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
       getTweetsByDate: getTweetsByDate,
       getTweetsByText: getTweetsByText,
       listSeriesByFrTweets: listSeriesByFrTweets,
       listVikingsByCharacter: listVikingsByCharacter,
       listGOTByCharacter: listGOTByCharacter,
       listWalkingDeadByCharacter: listWalkingDeadByCharacter
     };

     function getRetweets() {
       return $http.get('/api/tweets/Retweet');
     }

    function getTweetsByLangage(serie) {
      return $http.get('/api/tweets/ByLanguage?serie=' + serie);
    }

    function getTweetsByDate(start, end) {
      return $http.get('/api/tweets/ByDate/'+encodeURI(start)+ '/' +encodeURI(end));
    }

    function getTweetsByText(text) {
      return $http.get('/api/tweets/ByText/'+text);
    }

    function listSeriesByFrTweets() {
      return $http.get('/api/tweets/listSeriesByFrTweets');
    }

    function listVikingsByCharacter() {
      return $http.get('/api/tweets/listVikingsByCharacter');
    }
    function listGOTByCharacter() {
      return $http.get('/api/tweets/listGOTByCharacter');
    }
    function listWalkingDeadByCharacter() {
      return $http.get('/api/tweets/listWalkingDeadByCharacter');
    }



    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
