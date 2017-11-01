$(document).ready(function(){
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
	$("#contenido").html("listado de ejercicios"); 
	//Cuando este listo el html de coger listado ejers
	//$("#contenido").load("./htmlcojoejerciciophp.html"); 
	//console.log("Añadiendo lista de ejercicios...");
	
	var nuevoejer = document.createElement( "input" );
	nuevoejer.setAttribute("type","button");
	nuevoejer.setAttribute("id","botonAddExercise");
	nuevoejer.setAttribute("value","Añadir un nuevo ejercicio");
	$("#contenido").append(nuevoejer);
	$("#botonAddExercise").click(function (){console.log("acceder a añadir ejercicio"); 
		nuevoejercicio();
		});
		
	var listado = document.createElement( "input" );
	listado.setAttribute("type","button");
	listado.setAttribute("id","botonListado");
	listado.setAttribute("value","Ver listado de ejercicios");
	$("#contenido").append(listado);
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
