'use strict';

/**
 * @ngdoc overview
 * @name deimosApp
 * @description
 * # deimosApp
 *
 * Main module of the application.
 */
angular
  .module('deimosApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/uploadFile', {
        templateUrl: 'views/mainmenu.html',
        controller: 'PatentOfficeController',
        controllerAs: 'patentofficecontroller'
      })
      .when('/topics', {
        templateUrl: 'views/topicsview.html',
        controller: 'TopicsController',
        controllerAs: 'topicsController'
      })
      .otherwise({
        redirectTo: '/topics'
      });
  });

  
