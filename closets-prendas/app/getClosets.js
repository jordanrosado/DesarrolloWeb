function ConsigueObject() {
    this.tokenint = sessionStorage.token;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function ConsigueOneClosetObject(entiKey) {
    this.tokenint = sessionStorage.token;
    this.entityKey = entiKey;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function getOneClo(entKey)
{
  angular.element(document.getElementById('leerCloset')).scope().editarCloset(entKey);
}

function deleteCloset(entKey)
{
  try
  {
    var myData = new ConsigueOneClosetObject(entKey);
    jQuery.ajax({
      url: "https://parcial-segundo.appspot.com/_ah/api/closets_api/v1/closet/delete",
      dataType: 'json',
      cache: false,
      contentType: 'application/json; charset=utf-8',
      processData: true,
      data: myData.toJsonString(),
      type: 'POST',
      crossDomain: true,
      success: function(response){
        window.location.href = '/closets';
      },
      error: function(error){
        alert(error)
      }
    });
  }
  catch(error)
  {
    alert(error)
  }
}

function creaPrendas(datoss)
{
  var datos = datoss.split(",");
  sessionStorage.cantidadPrendas = datos[0];
  sessionStorage.closetEntKey = datos[1];
  //var cadena = "amaya, julio, miguel ángel, elena, saira, nacho, andrea";
  //var nombres = cadena.split(",");
  window.location.href = '/prendas';
}

angular.module('getClosets', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    if(!sessionStorage.getItem('token')){
        sessionStorage.clear();
        window.location.href = '/login';
    }
    $scope.show=0;
    $scope.todos = [];
    var datos = [];
    var contador  = 0;

    var myData = new ConsigueObject();
    console.log(myData.toJsonString());

    $http({
        url: 'https://parcial-segundo.appspot.com/_ah/api/closets_api/v1/closet/list',
        method: 'POST',
        data: myData.toJsonString(),
        headers : {
            'Content-Type' : 'application/json; charset=utf-8',
            'dataType' : 'json'
        },
    })
    .then(function(response) {
        if(response.data.code!=1){
          sessionStorage.clear();
          window.location.href = '/login';
        }else{
        //var datos = ((response.data.data[0]));
        //alert(datos['entityKey']);

        $("lstClosets").empty();

        var myTableClosets = "<table class='table'>" +
                               "         <thead class='text-primary'>" +
                               "             <th class='text-center'>Opciones Closet</th>" +
                               "             <th class='text-center'>Ubicación</th>" +
                               "             <th class='text-center'>Cantidad Prendas</th>" +
                               "             <th>Opciones Prendas</th>" +
                               "         </thead>" +
                               "    <tbody>";


        angular.forEach(response.data.data, function(item) {

           myTableClosets +=      "<tr>" +
                                    "   <td> " +
                                    "     <div id='leerCloset'><button onclick='getOneClo(\""+ item.entityKey +
                                          "\")' class='btn btn-info'>" +
                                          " Editar </button> " +
                                    "     <button onclick='deleteCloset(\""+ item.entityKey +
                                          "\")' class='btn btn-danger'>" + "Eliminar </button> </div>" +
                                    "   </td>" +
                                    "   <td class='text-center'>" + item.ubicacion + "</td>" +
                                    "   <td class='text-center'>" + item.cantidadPrendas + "</td>" +
                                    "   <td> " +
                                    "   <div id='leerPrendas'><button onclick='creaPrendas(\""+ item.cantidadPrendas + "," + item.entityKey +
                                          "\")' class='btn btn-success'>" +
                                          " Ver Prendas </button>" +
                                    "   </div>" +
                                    "   </td>" +
                                    "</tr>";
           //var nombreTexto = (JSON.stringify($scope.proNombre));
           //alert(nombreTexto);
           //$scope.proNombre = nombreTexto;
           //datos[contador] = nombreTexto;
           //alert(datos[contador]);
           //contador = contador + 1;
           //alert($scope.proNombre);
        });
        //var datos = (($scope.todos[0]));
          myTableClosets += "</tbody>" +
                            "</table>";
          $("#lstClosets").append(myTableClosets);
      }
    });
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/login';
    };
    $scope.editarCloset = function(data) {
        var myData = new ConsigueOneClosetObject(data);

         $http({
          url: 'https://parcial-segundo.appspot.com/_ah/api/closets_api/v1/closet/get',
          method: 'POST',
          data: myData.toJsonString(),
          headers : {
              'Content-Type' : 'application/json; charset=utf-8',
              'dataType' : 'json'
          },
        })
        .then(function(response) {
            if(response.data.code!=1){
                sessionStorage.clear();
                window.location.href = '/login';
            }else{
                sessionStorage.ubicacion = response.data.data[0].ubicacion;
                sessionStorage.cantidadPrendas = response.data.data[0].cantidadPrendas;
                sessionStorage.entityKey = response.data.data[0].entityKey;
                window.location.href = '/editarCloset';
            }
        });
     };
  });
