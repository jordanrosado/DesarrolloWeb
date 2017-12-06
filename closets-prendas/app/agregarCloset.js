function ClosetObject(myUbicacion, myPrendas) {
    this.ubicacion = myUbicacion;
    this.cantidadPrendas = myPrendas;
    this.token = sessionStorage.token;
    this.toJsonString = function () { return JSON.stringify(this); };
};

angular.module('agCloset', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    if(!sessionStorage.getItem('token')){
        window.location.href = '/login';
        sessionStorage.clear();
    }

    $scope.addCloset = function() {
      var myData = new ClosetObject($scope.ubicacion, $scope.cantPrendas);
      $http({
          url: 'https://parcial-segundo.appspot.com/_ah/api/closets_api/v1/closet/insert',
          method: 'POST',
          data: myData.toJsonString(),
          headers : {
              'Content-Type' : 'application/json; charset=utf-8',
              'dataType' : 'json'
          },
      })
      .then(function(response) {
           if (response.data.code==-1){
                sessionStorage.clear();
                window.location.href = '/login';
           }
           else{
                window.location.href = '/closets';
           }
      });
    };

    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/login';
    };
  });
