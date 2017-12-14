
$.('#modaleliminarejercicio').modal('hide');

function modaleliminar(){
  $.('#modaleliminarejercicio').modal('show');
}


function eliminarejercicio(){
   var idejercicio=getCookie("idejercicio");
   if(idejercicio!== undefined){
      $.ajax({
        type: "POST",
        url: "../php/eliminarejercicio.php",
        data: {
          "idejercicio":idejercicio
        },
        error:(function(xhr, status){
              console.log( "La solicitud ha fallado: " +  status);
          }),
        success:(function(response){
          consol.log(response);
          $.('#modaleliminarejercicio').modal('hide');
        })
      })
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


