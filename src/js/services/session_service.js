GulpAngular.service('sessionService', ['$rootScope', '$http', '$state',
  function($rootScope, $http, $state) {
    return({
      login: login,
      getEmail: getEmail
    });

    var session;

    function login(email, password) {
      $http.post($rootScope.api_url + '/session', {
        user: {
          email: email,
          password: password
        }
      }).
      success(function(data) {
        session = data.session;
        $state.go('home');
      }).
      error(function() {
        alert("Invalid email or password");
      });
    };

    function getEmail() {
      if( session )
        return session.user_email;
    };
  }
]);
