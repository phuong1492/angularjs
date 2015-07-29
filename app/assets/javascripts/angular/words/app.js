
angular.module('wordApp', ['ui.router', 'ngResource', 'wordApp.controllers', 'wordApp.services']);

angular.module('wordApp').config(function($stateProvider) {
  $stateProvider.state('words', {
    url: '/api/v1/words',
    templateUrl: '/templates/words.html',
    controller: 'WordListController'
  }).state('showWord', {
    url: '/api/v1/words/:id/view',
    templateUrl: '/templates/show.html',
    controller: 'WordShowController'
  }).state('newWord', {
    url: '/api/v1/words/new',
    templateUrl: '/templates/add.html',
    controller: 'WordCreateController'
  }).state('editWord', {
    url: '/api/words/:id/edit',
    templateUrl: '/templates/edit.html',
    controller: 'WordEditController'
  });
}).run(function($state) {
  $state.go('words');
});