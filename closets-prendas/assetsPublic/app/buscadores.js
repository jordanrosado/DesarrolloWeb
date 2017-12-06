angular.module('buscadores', ['ngResource'])
  .controller('TodoCtrl', function($scope, $http){
    $scope.addBus = function() {
      $http({
          url: 'https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/insert',
          method: "POST",
          data: { "token": sessionStorage.getItem('token'), "nombre":$scope.nombre, "apellidos":$scope.apellidos, "email":$scope.email, "password":$scope.contrasena, "passwordrep":$scope.contrasenarep, "tipo":"Buscador"}
      })
      .then(function(response) {
           $scope.code=response.data.code;
           if ($scope.code==1){
               $scope.nombre='';
               $scope.apellidos='';
               $scope.email='';
               $scope.contrasena='';
               $scope.contrasenarep='';
           }
      });
    };
  });