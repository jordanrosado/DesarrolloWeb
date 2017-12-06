angular.module('login', ['ngCookies'])

  .controller('TodoCtrl', function($scope, $cookies, $http){
    if(sessionStorage.getItem('token')){
        window.location.href = '/admin';
    }
    $scope.loger = function() {
    $http({
        //url: 'https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/login',
        url: 'https://frecuency-band.appspot.com/_ah/api/usuarios_api/v1/user/login',
        method: "POST",
        data: { "email": $scope.email, "password": $scope.password}
    })
    .then(function(response) {
        if (response.data.code!=1){
            $scope.code=response.data.code;
        }else{
            sessionStorage.setItem('token',response.data.token);
            sessionStorage.setItem('expire', response.data.expire);
            sessionStorage.setItem('code',response.data.code);
            sessionStorage.setItem('tipo',response.data.message);
            window.location.href = 'perfil.html';
        }
    });
    };
  });