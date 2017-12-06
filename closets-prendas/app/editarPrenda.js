function PrendaObject(myColor, myTalla, myTipoPrenda) {

    this.color = myColor;
    this.talla = myTalla;
    this.tipoPrenda = myTipoPrenda;
    this.token = sessionStorage.token;
    this.entityKey = sessionStorage.entityKeyPrenda;
    this.llaveCloset = sessionStorage.closetEntKey;
    this.urlImage = sessionStorage.urlImage;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function uploadDemo()
{
    var file_data = $("#uploaded_file").prop("files")[0];
    var form_data = new FormData();
    form_data.append("uploaded_file", file_data)

    jQuery.support.cors = true;
    try
    {
     $.ajax({
                url: "https://parcial-segundo.appspot.com/up",
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                crossDomain: true,
                success: function(response){
                                sessionStorage.urlImage = response;
                                //alert(sessionStorage.urlImage);
                }
      });
    }
    catch(e)
    {
      alert("error : " +  e);
     }
}

angular.module('edPrenda', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    if(!sessionStorage.getItem('token')){
        sessionStorage.clear();
        window.location.href = '/login';
    }

    $scope.addPrenda = function() {
      var myData = new PrendaObject($scope.color, $scope.talla, $scope.tipoPrenda);
      $http({
          url: 'https://parcial-segundo.appspot.com/_ah/api/prendas_api/v1/prendas/update',
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
                window.location.href = '/prendas';
           }
      });
    };

    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/login';
    };
  });
