'use strict';

/**
 * @ngdoc service
 * @name deimosApp.FileTransferService
 * @description
 * # FileTransferService
 * Service in the deimosApp.
 */
angular.module('deimosApp')
  .service('TopicsService', ['$q', '$http', 'ConfigService', function ($q, $http, ConfigService) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    function getAllTopicsWithConfig(config) {
        var deferred = $q.defer();
        $http.get(config.fileServiceUrl + "/topics")
            .then(
            function (response) {
              console.log('Received All Topics: ' + response.data);
              deferred.resolve(response.data);
            },
            function (err) {
              deferred.reject(err);
            });
        return deferred.promise;
      }

      function getAllDocumentsForTopicWithConfig(config, topic) {
        var deferred = $q.defer();
        $http.get(config.fileServiceUrl + "/topics/" + topic + "/documents")
            .then(
            function (response) {
              console.log('Received All Files for Topic: ' + JSON.stringify(response.data));
              deferred.resolve(response.data);
            },
            function (err) {
              deferred.reject(err);
            });
        return deferred.promise;
      }

    function getAllTopics() {
      return ConfigService.getConfig().then(function(config) {return getAllTopicsWithConfig(config);});
    }

    function getAllDocumentsForTopic(topic) {
        return ConfigService.getConfig().then(function(config) {return getAllDocumentsForTopicWithConfig(config, topic);});
    }

    return {
      getAllTopics: getAllTopics,
      getAllDocumentsForTopic: getAllDocumentsForTopic

    };

  }]);