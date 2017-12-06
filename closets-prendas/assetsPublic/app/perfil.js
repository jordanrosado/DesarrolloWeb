angular.module('perfil', ['ngResource','ngCookies'])
  .factory('FindUsuarios', function($resource, $http, $cookies) {
    var Todo = $resource('https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/:entityKey', {entityKey: '@entityKey'});
    return Todo;
  })
  .controller('TodoCtrl', function($scope, $http, $cookies, FindUsuarios){
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
          $scope.todos = [];
          $scope.code=response.data.code;
          $scope.nombre=response.data.allow[0].nombre;
          $scope.tipo=response.data.allow[0].tipo;
          $scope.upload=response.data.allow[0].upload;
          $scope.key=response.data.allow[0].entityKey;
          $scope.uploadr=$scope.upload;
          //document.myForm.action=$scope.uploadr;
          $scope.blob=response.data.allow[0].blob_key;
          angular.forEach(response.data.allow, function(item) {
             var todo = new FindUsuarios();
             todo.email = item.email;
             todo.password = item.password;
             todo.nombre = item.nombre;
             todo.apellidos = item.apellidos;
             todo.tipo = item.tipo;
             todo.status = item.status;
             todo.verificado = item.verificado;
             todo.ciudad = item.ciudad;
             todo.estado = item.estado;
             todo.direccion = item.direccion;
             todo.telefono = item.telefono;
             todo.celular = item.celular;
             todo.horaf = item.horaf;
             todo.horai = item.horai;
             todo.entityKey = item.entityKey;
             $scope.todos.push(todo);
          });
        }
    });
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/';
    };
    $scope.update = function(todo) {
      $http({
          url: 'https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/update',
          method: "POST",
          data: {"token": sessionStorage.getItem('token'),
          "email":todo.email,
          "nombre":todo.nombre,
          "apellidos":todo.apellidos,
          "tipo":todo.tipo,
          "status":todo.status,
          "verificado":todo.verificado,
          "ciudad":todo.ciudad,
          "estado":todo.estado,
          "direccion":todo.direccion,
          "telefono":todo.telefono,
          "celular":todo.celular,
          "horai":todo.horai,
          "horaf":todo.horaf,
          "entityKey":todo.entityKey
        }
      })
      .then(function(response) {
          if(response.data.code==-1||response.data.code==-2){
            sessionStorage.clear();
            window.location.href = '/';
          }else{
            $scope.update=response.data.code;
          }
      });
    };
    $scope.updatepass = function(todo,thispassword,thisnew,thisreview) {
      $http({
          url: 'https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/password',
          method: "POST",
          data: {"token": sessionStorage.getItem('token'),
          "email":todo.email,
          "password":thispassword,
          "passwordnew":thisnew,
          "passwordnewrev":thisreview,
          "entityKey":todo.entityKey
        }
      })
      .then(function(response) {
          if(response.data.code==-1||response.data.code==-2){
            sessionStorage.clear();
            window.location.href = '/';
          }else{
            $scope.passwordup=response.data.code;
          }
      });
    };
    $scope.deleteimg = function(){
        $http({
          url: 'https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/deleteblob',
          method: "POST",
          data: {"tokenint": sessionStorage.getItem('token')
        }
      })
      .then(function(response) {
          if(response.data.code==-1||response.data.code==-2){
            sessionStorage.clear();
            window.location.href = '/';
          }else{
            $scope.imgdeleted=response.data.code;
            $scope.blob='0';
          }
      });
    };
  });