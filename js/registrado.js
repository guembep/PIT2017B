
$(document).ready(function(){

	$("#linkejercicios").click(function (){console.log("acceder a ejercicios"); ejercicios();});
	$("#linkconvocatorias").click(function (){console.log("acceder a convocatorias"); convocatorias();});
	
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

	function ejercicios(){
		
		$("#title").show();
		$("#title").html("Ejercicios");
		$("#contenido").html("<br>"); 
		
		var div= document.createElement("div");
			div.setAttribute("class","container");
		var div2= document.createElement("div");
			div2.setAttribute("class","row");
		var div3= document.createElement("div");
			div3.setAttribute("class","col-md-4");
		var h=document.createElement("h2");
			h.innerHTML="Ver lista de ejercicios";
		var enlace=document.createElement("a");
			enlace.setAttribute("href","#");
		var listado = document.createElement( "img" );
			listado.setAttribute("src","./images/verejercicios.jpg");
			listado.setAttribute("id","botonListado");
			listado.setAttribute("alt","Ver listado de ejercicios");
			listado.setAttribute("height","200");
			listado.setAttribute("width","200");
		div3.append(h);
		enlace.append(listado);
		div3.append(enlace);
		div2.append(div3);

		var div3crea= document.createElement("div");
			div3crea.setAttribute("class","col-md-4");
		var hcrea=document.createElement("h2");
			hcrea.innerHTML="Añadir nuevo ejercicio";
		var enlacecrea=document.createElement("a");
			enlacecrea.setAttribute("href","#");
		var nuevoejer = document.createElement( "img" );
			nuevoejer.setAttribute("src","./images/creaEjercicios.png");
			nuevoejer.setAttribute("id","botonAddExercise");
			nuevoejer.setAttribute("alt","Añadir un nuevo ejercicio");
			nuevoejer.setAttribute("height","200");
		div3crea.append(hcrea);
		enlacecrea.append(nuevoejer);
		div3crea.append(enlacecrea);
		div2.append(div3crea);
		div.append(div2);
		$("#contenido").append(div);
		
		$("#botonAddExercise").click(function (){console.log("acceder a añadir ejercicio"); 
		nuevoejercicio();
		});
		
		$("#botonListado").click(function (){
		console.log("acceder a lista de ejercicios"); 
		lista();	
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


});
