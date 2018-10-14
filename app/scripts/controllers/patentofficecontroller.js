'use strict';

/**
 * @ngdoc function
 * @name deimosApp.controller:PatentOfficeController
 * @description
 * Controller of the deimosApp
 */
angular.module('deimosApp')
  .controller('PatentOfficeController', ['$scope', 'FileTransferService',
    function PatentOfficeController($scope, FileTransferService) {

    $scope.uploadDisabled = true;
    $scope.selectingFileDisabled = false;
    $scope.uploadMessage = 'Please select file for upload';

    $scope.uploadClicked = function() {
      console.log('Upload started for ' + $scope.file);
      $scope.uploadMessage = 'Uploading...';

      FileTransferService.uploadFile($scope.file).then(
        function(response) {
          $scope.uploadDisabled = true;
          $scope.selectingFileDisabled = false;
          $scope.uploadMessage = 'File ' + response.fileName + ' successfully uploaded, topic is: ' + response.topic;
        }, function() {
          $scope.uploadDisabled = true;
          $scope.selectingFileDisabled = false;
          $scope.uploadMessage = 'Upload failed for unknown reason';
        }
      );
    };
    
    //Hacky workaround because Angular does not support input file fields
    $scope.setFile = function(file){
      console.log(file);
      $scope.file = file;
      $scope.uploadDisabled = false;
      $scope.selectingFileDisabled = false;
      $scope.$apply();
      console.log($scope.uploadDisabled);      
    };

    }]);