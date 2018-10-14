'use strict';

/**
 * @ngdoc service
 * @name deimosApp.ConfigService
 * @description
 * # ConfigService
 * Service in the deimosApp.
 */
angular.module('deimosApp')
  .factory('ConfigService', ['$http', '$log', '$q', function ($http, $log, $q) {

    var config = null;

    function getConfig() {
      var deferred = $q.defer();

      if (!config) {
        $http.get('/config/config.json')
          .then(
          function (response) {
            config = response.data;
            deferred.resolve(config);
          },
          function (err) {
            $log.error(err);
            deferred.reject('Config Request Failed');
          }
          );
      } else {
        deferred.resolve(config);
      }

      return deferred.promise;
    }

    return {
      getConfig: getConfig
    };
}]);