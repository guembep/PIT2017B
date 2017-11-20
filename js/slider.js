//Botones de slider
	$("#crearbtn").click(function (){console.log("-> nuevo ejercicio"); nuevoejercicio();});
	$("#verbtn").click(function (){console.log("-> ver ejercicios"); lista();});
	$("#sharebtn").text("Próximamente...");
	//$("#sharebtn").click(function(){compartir();});
	$("#buybtn").click(function (){console.log("-> comprar pkts");  compra();});
	$("#agrupabtn").text("Próximamente...");
	//$("#agrupabtn").click(function(){agrupa();});
	$("#convocbtn").click(function (){console.log("-> ver convocatorias"); convocatorias();});

	function lista(){
		$("#title").show();
		console.log("Cargando listado...");
			/*$("#contenido").load("./htmlcojoejerciciophp.html", function(responseTxt, statusTxt, xhr){
					if(statusTxt == "success"){
					console.log("Carga de listado correcta");
					}	
					if(statusTxt == "error"){
						console.log("Error: " + xhr.status + ": " + xhr.statusText);
					}
				});	*/
			$.ajax({
				url: "./php/cogerejerciciosBD.php",
				success:( function (response) {
						console.log( "La solicitud se ha completado correctamente" );
					/*	var div = document.getElementById("demo");
						div.textContent = data.email;
						data.email;
						data.id;*/
						$("#contenido").html("Listado de ejercicios: "+response);
				 }),
				 error:(function(xhr, status){
						 console.log( "La solicitud ha fallado: " +  status);
				 })
			});				
	}


	function convocatorias(){

		$("#title").show();
		$("#title").html("Próximos Partidos");
		$("#contenido").load('/scrapper.html');
	}

	function nuevoejercicio(){
		
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
		$("#title").html("");
		$("#contenido").html("");
		$("#contenido").load('/comprarEjercicios.html');
	}
