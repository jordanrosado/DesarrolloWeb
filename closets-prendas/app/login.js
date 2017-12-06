function LoginObject(myEmail, myPasswd) {
    this.email = myEmail;
    this.password = myPasswd;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function NuevoUsuarioObject(myNewEmail, myNewPassword){
  this.email = myNewEmail;
  this.password = myNewPassword;
  this.toJsonString = function () { return JSON.stringify(this); };
};

angular.module('login', ['ngCookies'])
  .controller('TodoCtrl', function($scope, $cookies, $http){
    if(sessionStorage.getItem('token')){
        sessionStorage.clear();
        window.location.href = '/usuario';
    }
    $scope.loger = function() {
        var myData = new LoginObject($scope.email, $scope.password);
        //alert(myData.toJsonString());
    $http({
        url: 'https://parcial-segundo.appspot.com/_ah/api/usuarios_api/v1/users/login',
        method: 'POST',
        data: myData.toJsonString(),
        headers : {
            'Content-Type' : 'application/json; charset=utf-8',
            'dataType' : 'json'
        },
    })
    .then(function(response) {
        if (response.data.code!=1){
            $scope.code=response.data.code;
        }else{
            sessionStorage.setItem('token',response.data.token);
            sessionStorage.setItem('code',response.data.code);
            sessionStorage.setItem('tipo',response.data.message);
            sessionStorage.setItem('entKey',response.data.entityKey);
            window.location.href = '/usuario';
        }
    });
    };

    $scope.registraUsuario = function() {
      if($scope.passwordNuevo != $scope.confirmaPassword)
      {
        alert("La contraseña debe coincidir");
      }
      else
      {
          var myData = new NuevoUsuarioObject($scope.emailNuevo, $scope.passwordNuevo);

          $http({
              url: 'https://parcial-segundo.appspot.com/_ah/api/usuarios_api/v1/users/insert',
              method: 'POST',
              data: myData.toJsonString(),
              headers : {
                  'Content-Type' : 'application/json; charset=utf-8',
                  'dataType' : 'json'
              },
          })
          .then(function(response) {
              if (response.data.code!=1){
                  $scope.code=response.data.code;
              }else{
                  alert("Usuario agregado");
              }
          });
      }
    };
  });
