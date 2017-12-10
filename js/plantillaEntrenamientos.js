$.ajax({
    async: false,
    url: "../../../php/cogerejerciciosBD.php",
    success:( function (response) {
    	ejercicios=response;
    	//En tabla izquierda añadir los ejercicios del usuario

//<tr><td class="dark"><div id="ar" class="redips-drag redips-clone ar">Ejercicio1</div><input id="b_ar" class="ar" type="button" value="" onclick="redips.report('ar')" title="Show only Arts"/></td></tr>
							

    	trLEFT=document.createElement("tr");
    	tdLEFT=document.createElement("td");
    	tdLEFT.setAttribute("class", "dark");
    	$.each(ejercicios,function(i,element){
    		divLEFT=document.createElement("div");
    		divLEFT.setAttribute("id", "ejer"+i);
    		divLEFT.setAttribute("class", "redips-drag redips-clone ejer");
    		divLEFT.innerHTML=ejercicios[i].categoria +" - "+ ejercicios[i].subcategoria +" : "+ ejercicios[i].nombre;
    		input=document.createElement("input");
    		input.setAttribute("id","b_ejer"+i);
    		input.setAttribute("class","ejer"+i);
    		input.setAttribute("type","button");
    		input.setAttribute("value","");
    		input.setAttribute("onclick","redips.report('ejer"+i+"')");
    		input.setAttribute("title","mostrar ejercicio"+i);
    		tdLEFT.appendChild(divLEFT);
    		tdLEFT.appendChild(input);
    	});
    	trLEFT.appendChild(tdLEFT);
    	document.getElementById("tbodyLEFT").appendChild(trLEFT);

    }),
    error:(function(xhr, status){
         console.log( "La solicitud ha fallado: " +  status);
	})
});






/*

        trLEFT=document.createElement("tr");
        tdLEFT=document.createElement("td");
        tdLEFT.setAttribute("class", "dark ejXX");
            divLEFT=document.createElement("div");
            divLEFT.setAttribute("id", "ejer");
           // divLEFT.setAttribute("class", "redips-drag redips-clone ejer");
            divLEFT.innerHTML="Mis ejercicios: ";
            input=document.createElement("input");
            input.setAttribute("id","b_ejer");
            input.setAttribute("class","ejer");
            input.setAttribute("type","button");
            input.setAttribute("value","");
            input.setAttribute("onclick","redips.report('ejer')");
            input.setAttribute("title","mostrar ejercicio");
            tdLEFT.appendChild(divLEFT);
            tdLEFT.appendChild(input);
        trLEFT.appendChild(tdLEFT);
        document.getElementById("tbodyLEFT").appendChild(trLEFT);

$(".ejXX").hide();


trLEFT=document.createElement("tr");
        tdLEFT=document.createElement("td");
        tdLEFT.setAttribute("class", "dark");
            divLEFT=document.createElement("div");
            divLEFT.setAttribute("id", "ejer");
            divLEFT.setAttribute("class", "redips-drag redips-clone ejer");
            divLEFT.innerHTML="zzzzzzzzzzz";
            input=document.createElement("input");
            input.setAttribute("id","b_ejer");
            input.setAttribute("class","ejer");
            input.setAttribute("type","button");
            input.setAttribute("value","");
            input.setAttribute("onclick","redips.report('ejer')");
            input.setAttribute("title","mostrar ejercicio");
            tdLEFT.appendChild(divLEFT);
            tdLEFT.appendChild(input);
       
        trLEFT.appendChild(tdLEFT);
        document.getElementById("tbodyLEFT").appendChild(trLEFT);
*/





  //Otro ajax con los entremaniemtos 
 /* $.ajax({
    url: "../php/cogerentrenamientosBD.php",
    success:( function (response) {
    	console.log("Creando plantilla con entrenamientos del usuario");
    	entrenamientos=response;
    	//añadirlos a checkbox y crear tantas tablas como entrenamientos.
 
//<option value="entrenamiento 1">Entrenamiento 1</option>
	$.each(entrenamientos,function(i,element){
    	var opcion=document.createElement("option");
    	opcion.setAttribute("value",entrenamientos[i].nombre);
    	opcion.innerHTML=entrenamientos[i].nombre;
    	$("#SelEntrenamiento").append(opcion);
    	//Crear tablas con contenido de db
    	//...
    	var table=document.createElement("table");
    	table.setAttribute("class","tablaEntr");
    	var colgroup=document.createElement("colgroup");
    	var col=document.createElement("col");
    	col.setAttribute("width","200");
    	for (var x=0; x<4; x++){
    		colgroup.appendChild(col);
    	}
    	table.appendChild(colgroup);
    	var tbody = document.createElement("tbody");
    	var tr = document.createElement("tr");
    	tr.setAttribute("class", "redips-mark dark");
    	tr.innerHTML= entrenamientos[i].nombre ;
    	tbody.appendChild(tr);
    	for (var x=0; x<4; x++){
	    	tr2= document.createElement("tr");
	    	td=document.createElement("td");
	    	for (var x=0; x<4; x++){
	    		tr2.appendChild(td);
	    	}
	    	tbody.appendChild(tr2);
	    }	
	    table.appendChild(tbody);
    }	

    }
    error:(function(xhr, status){
         console.log( "La solicitud ha fallado: " +  status);
         $('#myModal').modal('show');

	})
});  
*/
$("#table2").hide();
$(".tablaEntr").each(function(key, element){
  $(".tablaEntr")[key].hide();
});

$("#addEntr").hide();
$("#save").hide();
$('#SelEntrenamiento').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    if (valueSelected=="add"){
    	$("#addEntr").show();
		$("#table2").hide();
        $("#save").hide();
    }else{
    	$("#addEntr").hide();
        
    	
    	if (valueSelected!="-"){
            $("#save").show();
			$("#table2").show();
	   	//cargar elementos en tabla según elemento seleccionado
	   	$("#table2").find("tr").get(0).innerHTML=valueSelected;
	  /* 	palabra=valueSelected;
    	palabra = palabra.replace(/\s/g,"_");
	   	$("#"+palabra).show();
	  */ 	
	   }else{
	   	 $("#table2").hide();
         $("#save").hide();
	   }
    }

});

$("#btnAddEnt").click( function(){
	if ($("#entName").val()!=""){
		//Añadir a db
		//...
		//Añadir al select 
    	var opcion=document.createElement("option");
    	opcion.setAttribute("value",$("#entName").val());
    	opcion.innerHTML=$("#entName").val();
    	$("#SelEntrenamiento").append(opcion);

    	//Añadir tabla
   /*
   <table id="tableE1">
						<colgroup>
							<col width="200"/>
							<col width="200"/>
							<col width="200"/>
							<col width="200"/>
						</colgroup>
						<tbody>
							<tr class="redips-mark dark">Entrenamiento 1</tr>
							<tr>	
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>	
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>	
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
   */ 	
    	var table=document.createElement("table");
    	table.setAttribute("class","tablaEntr");
    	palabra=$("#entName").val();
    	palabra = palabra.replace(/\s/g,"_");
    	table.setAttribute("id",palabra);
    	var colgroup=document.createElement("colgroup");
    	var col=[]
    	for (var x=0; x<4; x++){
    		col[x]=document.createElement("col");
    		col[x].setAttribute("width","200");
    		colgroup.appendChild(col[x]);
    	}
    	table.appendChild(colgroup);
    	var tbody = document.createElement("tbody");
    	var tr = document.createElement("tr");
    	tr.setAttribute("class", "redips-mark dark");
    	tr.innerHTML= $("#entName").val() ;
    	tbody.appendChild(tr);
    	tr2=[];
    	td=[];
    	for (var x=0; x<8; x++){
	    	tr2[x]= document.createElement("tr");
	    	for (var w=0; w<4; w++){
	    		td[w]=document.createElement("td");
	    		tr2[x].appendChild(td[w]);
	    	}
	    	tbody.appendChild(tr2[x]);
	    }	
	    table.appendChild(tbody);
	    $("#right").append(table);
	    $(".tablaEntr:last").hide();
	    $("#entName").val("");
	}

});


//$("head").append('<script type="text/javascript" src="js/redips-drag-min.js"></script>');
$("body").append('<script type="text/javascript" src="js/entrenamientos.js"></script>');

	