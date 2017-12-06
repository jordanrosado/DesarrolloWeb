angular.module('publicaciones', ['ngResource','ngCookies'])
  .factory('Usuarios', function($resource, $http, $cookies) {
    var Todo = $resource('https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/:entityKey', {entityKey: '@entityKey'});
    return Todo;
  })
  .factory('Publicaciones', function($resource, $http, $cookies) {
    var Todo = $resource('https://frecuency-band.appspot.com/_ah/api/publicaciones_api/v1/publicacion/:entityKey', {entityKey: '@entityKey'});
    return Todo;
  })
  .controller('TodoCtrl', function($scope, $http, $cookies, Usuarios, Publicaciones){
    $scope.todos = [];
    $scope.usuario = [];
    $scope.publicaciones = [];
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
                angular.forEach(response.data.allow, function(item) {
                   var user = new Usuarios();
                   user.nombre = item.nombre;
                   user.apellidos = item.apellidos;
                   user.tipo = item.tipo;
                   user.status = item.status;
                   user.entityKey = item.entityKey;
                   $scope.usuario.push(user);
            });
            $scope.tipo=response.data.allow[0].tipo;
            if ($scope.tipo=="Arrendador"){
                $scope.esarrendador();
            }
            if ($scope.tipo=="Administrador"){
                $scope.esadministrador();
                setTimeout(function(){$scope.publicaciones = [];$scope.esadministrador();}, 1000);
            }
        }
    });
    $scope.esarrendador = function(){
        //PARA LISTA TODO DE PUBLICACIONES
                $http({
                    url: 'https://frecuency-band.appspot.com/_ah/api/publicaciones_api/v1/publicacion/list',
                    method: "POST",
                    data: { "tokenint": sessionStorage.getItem('token')}
                })
                .then(function(response) {
                    if(response.data.code!=1){
                      sessionStorage.clear();
                      window.location.href = '/';
                    }else{
                    angular.forEach(response.data.allow, function(item) {
                       var pubb = new Publicaciones();
                       pubb.entityKey = item.entityKey;
                       if(item.arrendador==$scope.usuario[0].entityKey){
                            pubb.arrendador = $scope.usuario[0].nombre + " " + $scope.usuario[0].apellidos;
                       }
                       pubb.titulo = item.titulo;
                       pubb.tipo = item.tipo;
                       pubb.operacion = item.operacion;
                       pubb.precio = item.precio;
                       pubb.status = item.status;
                       $scope.publicaciones.push(pubb);
                    });
                  }
                });   
    }
    $scope.esadministrador = function(){
        //PARA LISTA TODO DE USUARIOS
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
                //PARA LISTA TODO DE PUBLICACIONES
                $http({
                    url: 'https://frecuency-band.appspot.com/_ah/api/publicaciones_api/v1/publicacion/list',
                    method: "POST",
                    data: { "tokenint": sessionStorage.getItem('token')}
                })
                .then(function(response) {
                    if(response.data.code!=1){
                      sessionStorage.clear();
                      window.location.href = '/';
                    }else{
                    angular.forEach(response.data.allow, function(item) {
                       var pubb = new Publicaciones();
                       pubb.entityKey = item.entityKey;
                       angular.forEach($scope.todos, function(uno,index){
                            if(item.arrendador==uno.entityKey){
                                pubb.arrendador = uno.nombre + " " + uno.apellidos;
                            }
                       });
                       pubb.titulo = item.titulo;
                       pubb.tipo = item.tipo;
                       pubb.operacion = item.operacion;
                       pubb.precio = item.precio;
                       pubb.status = item.status;
                       $scope.publicaciones.push(pubb);
                    });
                  }
                });   
    }
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/';
    };
  });