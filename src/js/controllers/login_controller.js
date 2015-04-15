GulpAngular.controller('loginController', ['sessionService',
  function(sessionService) {
    this.submitLogin = function() {
      sessionService.login(this.email, this.password);
    };
  }
]);
