angular.module('registros', ['ngResource','ngCookies'])
  .factory('Usuarios', function($resource, $http, $cookies) {
    var Todo = $resource('https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/:entityKey', {entityKey: '@entityKey'});
    return Todo;
  })
  .controller('TodoCtrl', function($scope, $http, $cookies, Usuarios){
    $scope.show=0;
    $http({
        url: 'https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/list',
        method: "POST",
        data: { "tokenint": sessionStorage.getItem('token')}
    })
    .then(function(response) {
        if(response.data.code!=1){
          sessionStorage.clear();
          window.location.href = '/';
        }else{
        $scope.todos = [];
        angular.forEach(response.data.allow, function(item) {
           var todo = new Usuarios();
           todo.nombre = item.nombre;
           todo.apellidos = item.apellidos;
           todo.tipo = item.tipo;
           todo.status = item.status;
           todo.entityKey = item.entityKey;
           $scope.todos.push(todo);
        });
      }
    });
    $http({
        url: 'https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/get',
        method: "POST",
        data: { "tokenint": sessionStorage.getItem('token')}
    })
    .then(function(response) {
        if(response.data.code!=1){
            sessionStorage.clear();
            window.location.href = '/';
        }else{
            $scope.code=response.data.code;
            $scope.nombre=response.data.allow[0].nombre;
            $scope.apellidos=response.data.allow[0].apellidos;
            $scope.email=response.data.allow[0].email;
            $scope.tipo=response.data.allow[0].tipo;
        }
    });
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/';
    };
  });