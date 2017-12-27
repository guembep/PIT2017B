//Botones de slider
	$("#crearbtn").click(function (){console.log("-> nuevo ejercicio"); nuevoejercicio();});
	$("#verbtn").click(function (){console.log("-> ver ejercicios"); lista();});
	$("#sharebtn").text("Próximamente...");
	//$("#sharebtn").click(function(){compartir();});
	$("#buybtn").click(function (){console.log("-> comprar pkts");  compra();});
	$("#agrupabtn").click(function(){agrupa();});
	$("#convocbtn").click(function (){console.log("-> ver convocatorias"); convocatorias();});

	function agrupa(){
		localStorage["paginasvisitadas"] = "entrenamientos, "+localStorage["paginasvisitadas"];

		$("#title").show();
		$("#title").html("Mis entrenamientos");
		$("#contenido").html("");
		//CAMBIAR direccion!!!!!!!!!!!!!!!!
		$("#contenido").append("<iframe src='https://easy2train.es/entrenamientos.html' width='"+window.innerWidth+"'' height='800' frameborder='0' transparency='transparency'></iframe>");
		
	}

	function lista(){

		localStorage["paginasvisitadas"] = "visualizarejercicios, "+localStorage["paginasvisitadas"];

		$("#title").show();
		$('#contenido').load("/prueba.html");

	}


	function convocatorias(){

		localStorage["paginasvisitadas"] = "convocatorias, "+localStorage["paginasvisitadas"];

		$("#title").show();
		$("#title").html("Próximos Partidos");
		$("#contenido").load('/scrapper.html');
	}

	function nuevoejercicio(){
	
		localStorage["paginasvisitadas"] = "nuevoejercicio, "+localStorage["paginasvisitadas"];

		$("#title").show();
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

	function compra(){

		localStorage["paginasvisitadas"] = "compra, "+localStorage["paginasvisitadas"];

		$("#title").html("");
		$("#contenido").html("");
		$("#contenido").load('/comprarEjercicios.html');
	}
