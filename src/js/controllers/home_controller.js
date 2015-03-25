GulpAngular.controller('homeController', ['$scope', function($scope) {
  $scope.names = ['Name1', 'Name2', 'Name3'];

  $scope.sayHello = function() {
    alert("Hello");
  };
}]);
