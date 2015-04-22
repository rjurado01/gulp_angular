GulpAngular.controller('homeController', ['$rootScope', '$http', '$state', 'sessionService',
  function($rootScope, $http, $state, sessionService) {
    var vm = this;
    vm.post = [];
    vm.email = '';

    activate();

    function activate() {
      vm.email = sessionService.getEmail();

      // get posts from api
      $http.get($rootScope.api_url + '/posts')
      .success(function(data) {
        vm.posts = data;
      })
    }

    vm.sayHello = function() {
      alert("Hello");
    };
  }
]);
