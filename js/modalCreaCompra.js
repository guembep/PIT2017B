
$(document).ready(function(){

	$("#botoncrearejer").click(function(){nuevoejercicio()});
	$("#botoncomprarejer").click(function(){compra()});

	function nuevoejercicio(){
		Cookies.remove('idejercicio');
		if (window.localStorage) {
			localStorage["paginasvisitadas"] = "nuevoejercicio, "+localStorage["paginasvisitadas"];
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
                            localStorage.removeItem("main_basketball-new");
							$("#contenido").append("<iframe src='https://easy2train.es/Form_CrearEjercicioBasket.html' width='"+window.innerWidth+"'' height='800' frameborder='0' transparency='transparency'></iframe>");
						}else if(response['deporte'] == "balonmano"){
							localStorage.removeItem("main_handball");
							$("#contenido").append("<iframe src='https://easy2train.es/Form_CrearEjercicio.html' width='"+window.innerWidth+"'' height='800' frameborder='0' transparency='transparency'></iframe>");
						}
				 }),
				 error:(function(xhr, status){
						 console.log( "La solicitud ha fallado: " +  status);
				 })
			});

		$('.modal-backdrop').remove();
	}

	function compra(){

		if (window.localStorage) {
			localStorage["paginasvisitadas"] = "compra, "+localStorage["paginasvisitadas"];
		}

		$("#title").html("");
		$("#contenido").html("");
		$("#contenido").load('/comprarEjercicios.html');

		//$('#myModal').modal('hide');
		$('.modal-backdrop').remove();
	}

})