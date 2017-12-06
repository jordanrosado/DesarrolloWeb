function getData()
{

	sessionStorage.empresa = "kubeet";

    jQuery.support.cors = true;
    try
    {
     $.ajax({
        url: "/getUsuarios",
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: true,
        data: {empresa: sessionStorage.empresa},
        type: 'get',
        crossDomain: true,
        success: function(response) {
          tweets = response;
          //alert(response);
          var infoUser = "";
          $("#infoUsuarios").empty();

          tweets.forEach(function (tweet)
          {
              alert(tweet.email);
              infoUser +=  "<div class='col-sm-3'>" +
                           "  <div id='infoUsuario' class='team-member wow flipInY' data-wow-duration='1000ms' data-wow-delay='300ms'>" +
                           "    <div class='member-image'>" +
                           "      <img class='img-responsive' src='" + tweet.urlImage + "' alt=''>" +
                           "     </div>" +
                           "    <div class='member-info'>" +
                           "      <h3>"+ tweet.nombre +"</h3>" +
                           "      <h4>"+ tweet.email +"</h4>" +
                           "      <p>"+ tweet.edad +"</p>" +
                           "    </div>" +
                           "    <div class='social-icons'>" +
                                  "<ul>"+
                                  "  <li><a class='facebook' href='#'><i class='fa fa-facebook'></i></a></li>" +
                                  "  <li><a class='twitter' href='#'><i class='fa fa-twitter'></i></a></li>" +
                                  "  <li><a class='linkedin' href='#'><i class='fa fa-linkedin'></i></a></li>" +
                                  "  <li><a class='dribbble' href='#'><i class='fa fa-dribbble'></i></a></li>"+
                                  "  <li><a class='rss' href='#'><i class='fa fa-rss'></i></a></li>"+
                                  "</ul>"+
                                  "</div>"+
                             " </div>"+
                           " </div> ";
          });
          $("#infoUsuarios").append(infoUser);
 	      }
      });
    }
 catch(e)
    {
      alert("error : " +  e);
     }
}
