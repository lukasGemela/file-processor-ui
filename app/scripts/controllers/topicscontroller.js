'use strict';

/**
 * @ngdoc function
 * @name deimosApp.controller:TopicsController
 * @description
 * Controller of the deimosApp
 */
angular.module('deimosApp')
  .controller('TopicsController', ['$scope', 'TopicsService', 'ConfigService',
    function TopicsController($scope, TopicsService, ConfigService) {

      ConfigService.getConfig().then(function(config) {
        $scope.baseUrl = config.fileServiceUrl;
          TopicsService.getAllTopics().then(function(response) {
            console.log('Hooking ' + response);
            $scope.topics = response.topics;
        });
      });

    }]).controller('TopicRowController', ['$scope', 'TopicsService', 'ConfigService', 
    function TopicRowController($scope, TopicsService, ConfigService) {

      $scope.toggleRow = function () {
        $scope.selected = !$scope.selected;

        if($scope.selected && typeof $scope.docs === 'undefined') {
          ConfigService.getConfig().then(function(config) {
            $scope.baseLink = config.fileServiceUrl;
            TopicsService.getAllDocumentsForTopic($scope.topic).then(function(response) {
              $scope.docs = response.documents.map(function(doc) { 
                return {documentLink: config.fileServiceUrl + "/files/" + doc, documentName: doc}; 
              });
            });
          });
        }
      };
  
      $scope.isSelected = function () {
        return $scope.selected;
      };
    }]);