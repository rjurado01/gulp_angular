GulpAngular = angular.module('GulpAngular', ['ui.router', 'pascalprecht.translate']);

GulpAngular.config(
  ['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/login");

    // Set up the states
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginController as loginController'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'homeController as homeController'
      })
  }
]);

GulpAngular.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: '/locales/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('en');
}]);

function init() {
  console.log('Gulp angular works fine !!');
}

init();
