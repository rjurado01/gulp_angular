GulpAngular.service('sessionService', ['$rootScope', '$http', '$state',
  function($rootScope, $http, $state) {
    return({
      login: login,
      getUser: getUser
    });

    var user;

    function login(email, password) {
      $http.post($rootScope.api_url + '/session', {
        user: {
          email: email,
          password: password
        }
      }).
      success(function(data) {
        user = data.user;
        $state.go('home');
      }).
      error(function() {
        alert("Invalid email or password");
      });
    };

    function getUser() {
      return user;
    };
  }
]);
