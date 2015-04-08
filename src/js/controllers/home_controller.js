GulpAngular.controller('homeController', ['$state', 'sessionService',
  function($state, sessionService) {
    if( sessionService.getUser() )
      this.email = sessionService.getUser().email;
    else
      $state.go('login');

    this.colors = ['Red', 'Green', 'Blue'];

    this.sayHello = function() {
      alert("Hello");
    };
  }
]);
