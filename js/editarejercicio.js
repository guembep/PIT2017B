
   var idejercicio=getCookie("idejercicio");
   if(idejercicio!== undefined){
      $.ajax({
        type: "POST",
        url: "../php/cogerejercicioId.php",
        data: {
          "idejercicio":idejercicio
        },
        error:(function(xhr, status){
              console.log( "La solicitud ha fallado: " +  status);
          }),
        success:(function(response){
          console.log(response);
          $('#exercisetype').val(response['categoria']);
          $('#exercisesub').val(response['subcategoria']);
          $('#exercisename').val(response['nombre']);
          $('#exercisedescription').val(response['explicacion']);
          $('#exercisematerial').val(response['material']);
          $('#exercisetime').val(response['duracion']);
          var deporte = response['deporte'];
          console.log(deporte);
          if( deporte == "balonmano" ){
            localStorage.setItem("main_handball",response['datospizarra']);
          }else if( deporte == "baloncesto" ){
            localStorage.setItem("main_basketball-new",response['datospizarra']);
          }
        })
      })
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


