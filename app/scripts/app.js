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
      .when('/', {
        templateUrl: 'views/mainmenu.html',
        controller: 'PatentOfficeController',
        controllerAs: 'patentofficecontroller'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  
