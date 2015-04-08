GulpAngular.controller('loginController', ['$state', 'sessionService',
  function($state, sessionService) {
    this.submit = function() {
      sessionService.saveUser(this.email);
      $state.go('home');
    };
  }
]);
