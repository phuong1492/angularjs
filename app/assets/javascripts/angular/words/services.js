angular.module('movieApp.services', []).factory('Word', function($resource) {
  return $resource('http://localhost:3000/api/v1/words/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});