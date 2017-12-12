
$('#modaleliminarejercicio').modal('hide');
var click="false";
$(document).ready(function(){
	function editarejercicio(){

		if (window.localStorage) {
			localStorage["paginasvisitadas"] = "editarejercicio, "+localStorage["paginasvisitadas"];
		}

		$("#title").hide();
		console.log("Cargando pagina de nuevo ejercicio");
		$("#title").html("");
		$("#contenido").html("");
		$.ajax({
				url: "./php/getUserData.php",
				success:( function (response) {
						console.log(response['deporte']);
						if( response['deporte'] == "baloncesto"){
							$("#contenido").append("<iframe src='https://easy2train.es/Form_CrearEjercicioBasket.html' width='"+window.innerWidth+"'' height='800' frameborder='0' transparency='transparency'></iframe>");
						}else if(response['deporte'] == "balonmano"){
							$("#contenido").append("<iframe src='https://easy2train.es/Form_CrearEjercicio.html' width='"+window.innerWidth+"'' height='800' frameborder='0' transparency='transparency'></iframe>");
						}
				 }),
				 error:(function(xhr, status){
						 console.log( "La solicitud ha fallado: " +  status);
				 })
			});

	}

	function modaleliminar(){
	  console.log('modal eliminar');
	  $('#modaleliminarejercicio').modal('show');
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
	          console.log(response);
	          click="true";
	          $('#modaleliminarejercicio').modal('hide');
	        })
	      })
	    }
	}
	$('#modaleliminarejercicio').on('hidden.bs.modal', function (e) {
		if(click=="false"){

		}
		else if(click=="true"){
			lista();
		}
	})
	$("#botoneditarejer").click(function(){editarejercicio()});
	$("#botoneliminarejer").click(function(){modaleliminar()});
	$("#confeliminarejer").click(function(){eliminarejercicio()});



});


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

