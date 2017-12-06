angular.module('publicar', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    $scope.show=0;
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
                $scope.telefono=response.data.allow[0].telefono;
                $scope.celular=response.data.allow[0].celular;
                $scope.nombrepub=$scope.nombre+" "+$scope.apellidos;
            }
        });
    }
    
    $scope.addPublicacion = function() {
      $http({
          url: 'https://frecuency-band.appspot.com/_ah/api/publicaciones_api/v1/publicacion/insert',
          method: "POST",
          data: { "token": sessionStorage.getItem('token'), "titulo":$scope.titulo, "tipo":$scope.tipoinm, "operacion":$scope.operacion, "precio":$scope.precio, "descripcion":$scope.descripcion, "pais":$scope.pais, "ciudad":$scope.ciudad, "estado":$scope.estado, "cp":$scope.codigopostal, "direccion":$scope.direccion, "lat":$scope.lat, "lon":$scope.lon}
      })
      .then(function(response) {
          $scope.codepub=response.data.code;
           if (response.data.code==1 || response.data.code==-4){
               $scope.show=0;
               $scope.titulo='';
               $scope.tipoinm='';
               $scope.operacion='';
               $scope.precio='';
               $scope.descripcion='';
               $scope.pais='';
               $scope.ciudad='';
               $scope.estado='';
               $scope.codigopostal='';
               $scope.direccion='';
               $scope.lat='';
               $scope.lon='';
           }    
      });
    };
    
    $scope.mapper=function(){
        document.getElementById('map').style.height = '200px';
            var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 19.4327798, lng: -99.2837003},
            scrollwheel: false,
            zoom: 5
        });
    };
    $scope.mapper();
    
    $scope.initMap = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                  var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
                  map = new google.maps.Map(document.getElementById('map'), {zoom: 16,center: myLatLng});
                  var marker = new google.maps.Marker({position: myLatLng,map: map,title: 'Estas aquí!'});
                  $scope.lat=position.coords.latitude;
                  $scope.lon=position.coords.longitude;
                $http({
                    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude,
                    method: "POST"
                })
                    .then(function (response) {
                            $scope.direccion=response.data.results[0].formatted_address;
                            var i=0;
                            var hasta=response.data.results[0].address_components.length;
                            for (i; i<hasta+1; i++){
                                if (response.data.results[0].address_components[i].types[0]=='locality'){
                                 $scope.ciudad=response.data.results[0].address_components[i].long_name;
                                }
                                if (response.data.results[0].address_components[i].types[0]=='postal_code'){
                                 $scope.codigopostal=response.data.results[0].address_components[i].long_name;
                                }
                                if (response.data.results[0].address_components[i].types[0]=='country'){
                                 $scope.pais=response.data.results[0].address_components[i].long_name;
                                }
                                if (response.data.results[0].address_components[i].types[0]=='administrative_area_level_1'){
                                 $scope.estado=response.data.results[0].address_components[i].long_name;
                                }
                            }
                        });
                });
             } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
             }
    };
    
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/';
    };
  });