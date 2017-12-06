angular.module('user', ['ngCookies'])
  .controller('TodoCtrl', function($scope, $cookies, $http){
    $http({
        url: 'https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/get',
        method: "POST",
        data: { "tokenint": sessionStorage.getItem('token')}
    })
    .then(function(response) {
        if (response.data.code==-1){
            $scope.code=response.data.code;
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