$(document).ready(function(){
	console.log("registrado.js funcionando");
	$("#linkejercicios").click(function (){console.log("acceder a ejercicios"); ejercicios();});
	$("#linkconvocatorias").click(function (){console.log("acceder a convocatorias"); convocatorias();});


	function lista(){
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
		$("#title").html("Convocatorias");
		$("#contenido").html("listado de convocatorias");
	}

	function nuevoejercicio(){
		console.log("Cargando pagina de nuevo ejercicio");
		$("#contenido").load("./Form_CrearEjercicio.html", function(responseTxt, statusTxt, xhr){
			if(statusTxt == "success"){
				console.log("Carga de página correcta");
				var nuevoscriptA = document.createElement( "script" );
				nuevoscriptA.setAttribute("type","text/javascript");
				nuevoscriptA.setAttribute("src","https://code.jquery.com/jquery-1.9.1.min.js");
				$("body").append(nuevoscriptA);
				console.log(nuevoscriptA);
				var nuevoscriptB = document.createElement( "script" );
				nuevoscriptB.setAttribute("type","text/javascript");
				nuevoscriptB.setAttribute("src","https://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js");
				$("body").append(nuevoscriptB);
				console.log(nuevoscriptB);
				var nuevoscriptE = document.createElement( "script" );
				nuevoscriptE.setAttribute("src","pizarra/watch.js");
				$("body").append(nuevoscriptE);
				console.log(nuevoscriptE);
				var nuevoscriptF = document.createElement( "script" );
				nuevoscriptF.setAttribute("src","pizarra/jquery-2.js");
				$("body").append(nuevoscriptF);
				console.log(nuevoscriptF);
				var nuevoscriptG = document.createElement( "script" );
				nuevoscriptG.setAttribute("src","pizarra/jquery.js");
				$("body").append(nuevoscriptG);
				console.log(nuevoscriptG);
				var nuevoscriptH = document.createElement( "script" );
				nuevoscriptH.setAttribute("src","pizarra/1.js");
				$("body").append(nuevoscriptH);
				console.log(nuevoscriptH);
				var nuevoscriptD = document.createElement( "script" );
				nuevoscriptD.setAttribute("src","pizarra/2.js");
				$("body").append(nuevoscriptD);
				console.log(nuevoscriptD);
				var nuevoscriptI = document.createElement( "script" );
				nuevoscriptI.setAttribute("src","pizarra/markup_handball.js");
				$("body").append(nuevoscriptI);
				console.log(nuevoscriptI);
				var nuevoscriptC = document.createElement( "script" );
			//	nuevoscript.setAttribute("type","text/javascript");
				nuevoscriptC.setAttribute("src","js/Form_CrearEjercicio.js");
				$("body").append(nuevoscriptC);
				console.log(nuevoscriptC);

			}	
			if(statusTxt == "error"){
				console.log("Error: " + xhr.status + ": " + xhr.statusText);
			}
		});
	}


});
