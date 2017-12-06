angular.module('admin', ['ngCookies'])
.controller('TodoCtrl', function($scope, $cookies, $http){
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
            if (response.data.code!=1||response.data.allow[0].tipo!='Administrador'){
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
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/';
    };
  });