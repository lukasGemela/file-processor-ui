'use strict';

/**
 * @ngdoc service
 * @name deimosApp.FileTransferService
 * @description
 * # FileTransferService
 * Service in the deimosApp.
 */
angular.module('deimosApp')
  .service('FileTransferService', ['$q', '$http', 'ConfigService', function ($q, $http, ConfigService) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    function uploadFileWithConfig(config, file) {
        var deferred = $q.defer();

        var fd = new FormData();
        fd.append("file", file);
    
        $http.post(config.fileProcessorUploadUrl, fd, {
            withCredentials: false,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).then(
          function (response) {
            console.log('File Uploaded: ' + response.data);
            deferred.resolve(response.data);
          },
          function (err) {
            console.log('File Not Uploaded: ' + JSON.stringify(err));
            deferred.reject(extractErrorMessage(err));
          });

        return deferred.promise;
      }

    function extractErrorMessage(httpError) {
      if(httpError.data && httpError.data.errors && httpError.data.errors[0]) { //TODO: replace with lodash
        return httpError.data.errors[0].message;
      } else {
        return "Unknown error, HTTP Code: " + httpError.status;
      }
    }

    function uploadFile(file) {
      return ConfigService.getConfig().then(function(config) {return uploadFileWithConfig(config, file);});
    }

    return {
      uploadFile: uploadFile
    };

  }]);