angular.module('wordApp.controllers', []).controller('WordListController', function($scope, $state, popupService, $window, Word) {
  $scope.words = Word.query();

  $scope.deleteWord = function(word) {
    if (popupService.showPopup('Really delete this?')) {
      word.$delete(function() {
        $window.location.href = ''; //redirect to home
      });
    }
  };
}).controller('WordShowController', function($scope, $stateParams, Word) {
  $scope.word = Word.get({ id: $stateParams.id });
}).controller('WordCreateController', function($scope, $state, $stateParams, Word) {
  $scope.word = new Word();

  $scope.addWord = function() {
    $scope.word.$save(function() {
      $state.go('words');
    });
  };
}).controller('WordEditController', function($scope, $state, $stateParams, Word) {
  $scope.updateWord = function() {
    $scope.word.$update(function() {
      $state.go('words');
    });
  };

  $scope.loadWord = function() {
    $scope.word = Word.get({ id: $stateParams.id });
  };

  $scope.loadWord();
});