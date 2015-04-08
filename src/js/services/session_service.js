GulpAngular.service('sessionService', function() {
  return({
    saveUser: saveUser,
    getUser: getUser
  });

  function saveUser(email) {
    this.user = {
      email: email
    };
  };

  function getUser() {
    return this.user;
  };
});
