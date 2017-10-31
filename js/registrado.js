$(document).ready(function(){
	$("#linkejercicios").click(function (){console.log("acceder a ejercicios"); ejercicios();});
	$("#linkconvocatorias").click(function (){console.log("acceder a convocatorias"); convocatorias();});


function ejercicios(){
	$("#title").html("Ejercicios");
	$("#contenido").html("listado de ejercicios"); //Leer contenido ejercicios de servidor, AJAX
	var nuevoejer = document.createElement( "input" );
	nuevoejer.setAttribute("type","button");
	nuevoejer.setAttribute("id","botonAddExercise");
	nuevoejer.setAttribute("value","Añadir un nuevo ejercicio");
	$("#contenido").append(nuevoejer);
	$("#botonAddExercise").click(function (){console.log("acceder a añadir ejercicio"); 
		nuevoejercicio();
		});
}

function convocatorias(){
	$("#title").html("Convocatorias");
	$("#contenido").html("listado de convocatorias");
}

function nuevoejercicio(){
	console.log("Cargando pagina de nuevo ejercicio");
	$("#contenido").load("./Form_CrearEjercicio.html", function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success")
            console.log("Carga de página correcta");
            var nuevoscript = document.createElement( "script" );
		//	nuevoscript.setAttribute("type","text/javascript");
			nuevoscript.setAttribute("src","js/Form_CrearEjercicio.js");
			$("body").append(nuevoscript);
        if(statusTxt == "error")
            console.log("Error: " + xhr.status + ": " + xhr.statusText);
    });
}
});
