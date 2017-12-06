angular.module('arrendadores', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    if(!sessionStorage.getItem('token')){
		window.location.href = '/';
        sessionStorage.clear();
    }else{
        $http({
            url: 'https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/get',
            method: "POST",
            data: { "tokenint": sessionStorage.getItem('token')}
        })
        .then(function(response) {
            if (response.data.code!=1 && response.data.allow[0].tipo!='Administrador'){
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
    }
    $scope.addArr = function() {
      $http({
          url: 'https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/insert',
          method: "POST",
          data: { "token": sessionStorage.getItem('token'), "nombre":$scope.nombrereg, "apellidos":$scope.apellidosreg, "email":$scope.emailreg, "password":$scope.contrasenareg, "passwordrep":$scope.contrasenarepreg, "contrato":$scope.contrato, "tipo":"Arrendador"}
      })
      .then(function(response) {
           $scope.codeinsert=response.data.code;
           if (response.data.code==1){
               $scope.nombrereg='';
               $scope.apellidosreg='';
               $scope.emailreg='';
               $scope.contrasenareg='';
               $scope.contrasenarepreg='';
               $scope.contrato='';
           }
      });
    };
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/';
    };
    $scope.alerta = function(){
      alert($scope.contrato);
    };
  });