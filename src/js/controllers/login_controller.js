GulpAngular.controller('loginController', ['sessionService',
  function(sessionService) {
    var vm = this;

    vm.submitLogin = function() {
      sessionService.login(vm.email, vm.password);
    };
  }
]);
