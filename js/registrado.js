
$('#modalExer').modal('hide');
$(document).ready(function(){

	$("#linkejercicios").click(function (){ ejercicios();});
	$("#linkconvocatorias").click(function (){ convocatorias();});
	$("#linkperfil").click(function (){perfil();});
	$("#back").click(function(){volver()});


	function lista(){
		if (window.localStorage) {
			localStorage["paginasvisitadas"] = "visualizarejercicios, "+localStorage["paginasvisitadas"];
		}
		$.ajax({
			url: "../php/cogerejerciciosBD.php",
			error:(function(xhr, status){
         		console.log( "La solicitud ha fallado: " +  status);
         		$('#modalExer').modal('show');
    		})
		})
		$("#title").hide();
		console.log("Cargando listado...");
		$('#contenido').load("/prueba.html");
	}

	function ejercicios(){
		if (window.localStorage) {
			localStorage["paginasvisitadas"] = "menuejercicios, "+localStorage["paginasvisitadas"];
		}

		$("#title").show();
		$("#title").html("");
		
		$("#contenido").html("<br>");

		var div= document.createElement("div");
			div.setAttribute("class","container");
		var div2= document.createElement("div");
			div2.setAttribute("class","row");
		var div3= document.createElement("div");
			div3.setAttribute("class","col-md-4");
		var h=document.createElement("h5");
			h.innerHTML="Ver lista de ejercicios";
		var enlace=document.createElement("a");
			enlace.setAttribute("href","#");
		var listado = document.createElement( "img" );
			listado.setAttribute("src","./images/verejercicios.png");
			listado.setAttribute("id","botonListado");
			listado.setAttribute("alt","Ver listado de ejercicios");
			listado.setAttribute("height","250");
			listado.setAttribute("width","250");
		div3.append(h);
		enlace.append(listado);
		div3.append(enlace);
		div2.append(div3);

		var div3crea= document.createElement("div");
			div3crea.setAttribute("class","col-md-4");
		var hcrea=document.createElement("h5");
			hcrea.innerHTML="Añadir nuevo ejercicio";
		var enlacecrea=document.createElement("a");
			enlacecrea.setAttribute("href","#");
		var nuevoejer = document.createElement( "img" );
			nuevoejer.setAttribute("src","./images/creaEjercicios.png");
			nuevoejer.setAttribute("id","botonAddExercise");
			nuevoejer.setAttribute("alt","Añadir un nuevo ejercicio");
			nuevoejer.setAttribute("height","250");
			nuevoejer.setAttribute("width","250");
		div3crea.append(hcrea);
		enlacecrea.append(nuevoejer);
		div3crea.append(enlacecrea);
		div2.append(div3crea);
		div.append(div2);
		$("#contenido").append(div);

		var div3compra = document.createElement("div");
			div3compra.setAttribute("class","col-md-4");
		var hcompra = document.createElement("h5");
			hcompra.innerHTML = "Compra paquetes de ejercicios";
		var enlacecompra = document.createElement("a");
			enlacecompra.setAttribute("href","#");
		var compraejers = document.createElement("img");
			compraejers.setAttribute("src","./images/comprarEjercicios.png");
			compraejers.setAttribute("id","botonCompra");
			compraejers.setAttribute("alt","Compra paquetes de ejercicios");
			compraejers.setAttribute("heigth","250");
			compraejers.setAttribute("width", "250");

		div3compra.append(hcompra);
		enlacecompra.append(compraejers);
		div3compra.append(enlacecompra);
		div2.append(div3compra);
		div.append(div2);

		$("#contenido").append(div);

		$("#botonAddExercise").click(function (){console.log("acceder a añadir ejercicio");
		nuevoejercicio();
		});

		$("#botonListado").click(function (){
		console.log("acceder a lista de ejercicios");
		lista();
		});

		$("#botonCompra").click(function(){
			console.log("acceder a compra de ejercicios");
			compra();
		})

	}

	function convocatorias(){

		if (window.localStorage) {
			localStorage["paginasvisitadas"] = "convocatorias, "+localStorage["paginasvisitadas"];
		}
		$("#title").show();
		$("#title").html("Próximos Partidos");
		$("#contenido").load('/scrapper.html');
	}

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

	}


	function perfil(){
		if (window.localStorage) {
			localStorage["paginasvisitadas"] = "perfil, "+localStorage["paginasvisitadas"];
		}
		$("#title").html("");
		$("#contenido").html("");
		$("#contenido").load('/perfil.html');
	}

	function compra(){
		if (window.localStorage) {
			localStorage["paginasvisitadas"] = "compra, "+localStorage["paginasvisitadas"];
		}
		$("#title").html("");
		$("#contenido").html("");
		$("#contenido").load('/comprarEjercicios.html');
	}

	function volver(){
		if (window.localStorage) {
		    console.log("Atrás");
		    var back=localStorage["paginasvisitadas"].split(", ")[1]; //La 0 es la actual
		}
		    //console.log(back);

		    if ((back==undefined) || (back=="https://easy2train.es")){
		      location.href="https://easy2train.es";
		    }else if (back=="menuejercicios"){
		      ejercicios();
		    }else if (back=="compra"){
		      compra();
		    }else if (back=="nuevoejercicio"){
		      nuevoejercicio();
		    }else if (back=="editarejercicio"){
		      editarejercicio();
		    }else if (back=="visualizarejercicios"){
		      lista();
		    }else if (back=="convocatorias"){
		      convocatorias();
		    }else if (back=="perfil"){
		      perfil();
		    }
		 if(window.localStorage){   
		    localStorage["paginasvisitadas"]=localStorage["paginasvisitadas"].replace(localStorage["paginasvisitadas"].split(", ")[0]+", "+localStorage["paginasvisitadas"].split(", ")[1]+", ","" ); //actualizar variable local
		 }
  	};
});
