var myApp = angular.module('myapplication', ['ngRoute', 'ngResource']);
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/users',{
      templateUrl: '/templates/users/index.html',
      controller: 'UserListCtr'
    });
    $routeProvider.when('/users/new', {
      templateUrl: '/templates/users/new.html',
      controller: 'UserAddCtr'
    });
    $routeProvider.when('/users/:id/edit', {
      templateUrl: '/templates/users/edit.html',
      controller: "ShowUserCtr"
    });
    $routeProvider.otherwise({
      redirectTo: '/users'
    });
  }
]);

myApp.factory('Users', ['$resource',function($resource){
  return $resource('/users.json', {},
    {
    query: {
      method: 'GET', isArray: true },
      create: { method: 'POST' }
  })
}]);

myApp.factory('User', ['$resource', function($resource){
  return $resource('/users/:id.json', {}, {
    show: { method: 'GET' },
         update: { method: 'PUT', params: {id: '@id'} },
         delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

myApp.controller("UserListCtr", ['$scope', '$http', '$location', function($scope, $http, $location) {
  $http.get("/users.json").
      success(function(data, status, headers, config) {
        $scope.users = data
      }).
      error(function(data, status, headers, config) {
        alert("failure");
      });
}]);


myApp.controller("UserListCtr", ['$scope', '$http', '$resource', 'Users', 'User', '$location', function($scope, $http, $resource, Users, User, $location) {
  $scope.users = Users.query();

  $scope.deleteUser = function (userId) {
    if (confirm("Are you sure you want to delete this user?")){
      User.delete({ id: userId }, function(){
        $scope.users = Users.query();
        $location.path('/');
      });
    }
  };
}]);


myApp.controller("ShowUserCtr", ['$scope', '$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
  var id = $routeParams.id
  $http.get('/users/'+ id + ".json").
      success(function(data, status, headers, config) {
        $scope.user = data
      }).
      error(function(data, status, headers, config) {
        alert("failure");
      });
}]);


myApp.controller("UserAddCtr", ['$scope', '$resource', '$location', '$http', function($scope, $resource, $location, $http) {
   $scope.user = {};
   $scope.user.firstName = "first"

  $scope.user.createUser = function () {
    var user = {first_name: $scope.user.firstName, last_name: $scope.user.lastName, email: $scope.user.email}
    var responsePromise = $http.post('/users', {user: user}).
      success(function(data, status, headers, config) {
        $location.path("/");
      }).
      error(function(data, status, headers, config) {
        alert("failure");
      });
  }
}]);

