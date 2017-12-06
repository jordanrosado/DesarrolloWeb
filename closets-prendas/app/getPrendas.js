function ConsigueObject() {
    this.tokenint = sessionStorage.token;
    this.closet_key = sessionStorage.closetEntKey;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function ConsigueOneClosetObject(entiKey) {
    this.tokenint = sessionStorage.token;
    this.entityKey = entiKey;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function getOnePre(entKey)
{
  angular.element(document.getElementById('leerPrenda')).scope().editarPrenda(entKey);
}

function deletePrenda(entKey)
{
  try
  {
    var myData = new ConsigueOneClosetObject(entKey);
    jQuery.ajax({
      url: "https://parcial-segundo.appspot.com/_ah/api/prendas_api/v1/prendas/delete",
      dataType: 'json',
      cache: false,
      contentType: 'application/json; charset=utf-8',
      processData: true,
      data: myData.toJsonString(),
      type: 'POST',
      crossDomain: true,
      success: function(response){
        window.location.href = '/prendas';
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

angular.module('getPrendas', ['ngResource','ngCookies'])
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
        url: 'https://parcial-segundo.appspot.com/_ah/api/prendas_api/v1/prendas/list',
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

        $("lstPrendas").empty();

        var myTablePrendas = "<table class='table'>" +
                               "         <thead class='text-primary'>" +
                               "             <th class='text-center'>Opciones</th>" +
                               "             <th class='text-center'>Color</th>" +
                               "             <th class='text-center'>Talla</th>" +
                               "             <th class='text-center'>Tipo Prenda</th>" +
                               "             <th class='text-center'>Imagen</th>" +
                               "         </thead>" +
                               "    <tbody>";

        var contador = 0;
        angular.forEach(response.data.data, function(item) {
           contador = contador + 1;
           myTablePrendas +=      "<tr>" +
                                    "   <td> " +
                                    "     <div id='leerPrenda'><button onclick='getOnePre(\""+ item.entityKey +
                                          "\")' class='btn btn-info'>" +
                                          " Editar </button> " +
                                    "     <button onclick='deletePrenda(\""+ item.entityKey +
                                          "\")' class='btn btn-danger'>" + "Eliminar </button> </div>" +
                                    "   </td>" +
                                    "   <td class='text-center'>" + item.color + "</td>" +
                                    "   <td class='text-center'>" + item.talla + "</td>" +
                                    "   <td class='text-center'>" + item.tipoPrenda + "</td>" +
                                    "   <td>" + "<img src=\"" + item.urlImage + "\" style=\" width: 64px; height: 64px; \">" + "</td>" +
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
          myTablePrendas += "</tbody>" +
                            "</table>";
          $("#lstPrendas").append(myTablePrendas);
          sessionStorage.contador = contador;
      }
    });
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/login';
    };
    $scope.editarPrenda = function(data) {
         var myData = new ConsigueOneClosetObject(data);

         $http({
          url: 'https://parcial-segundo.appspot.com/_ah/api/prendas_api/v1/prendas/get',
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
                sessionStorage.color = response.data.data[0].color;
                sessionStorage.talla = response.data.data[0].talla;
                sessionStorage.tipoPrenda = response.data.data[0].tipoPrenda;
                sessionStorage.entityKeyPrenda = response.data.data[0].entityKey;
                window.location.href = '/editarPrenda';
            }
        });
     };
  });
