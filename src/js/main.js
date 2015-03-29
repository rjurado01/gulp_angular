GulpAngular = angular.module('GulpAngular', ['ui.router']);

GulpAngular.config(
  ['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/home");

    // Set up the states
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'homeController as home_controller'
      })
  }
]);

function init() {
  console.log('Gulp angular works fine !!');
}

init();
