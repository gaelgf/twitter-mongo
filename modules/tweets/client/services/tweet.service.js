(function () {
  'use strict';

  angular
    .module('tweets')
    .factory('TweetsService', TweetsService);

  TweetsService.$inject = ['$resource', '$log'];

  function TweetsService($http, $log) {
     return {
       getRetweets: getRetweets
     };

     function getRetweets() {
       $http()
     }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
