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
            divLEFT.setAttribute("tiempo", ejercicios[i].duracion);
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
         toastr.warning('Ha ocurrido un problema al cargar los ejercicios, inténtelo de nuevo');
	})
});

//ajax con los entremaniemtos 
$.ajax({

    async: false,
    url: "../php/cogerEntrenamientosBD.php",
    success:( function (response) {
        entrenamientos=response;
 
        //<option value="entrenamiento 1">Entrenamiento 1</option>
        $.each(entrenamientos,function(i,element){
            var opcion=document.createElement("option");
            opcion.setAttribute("value",entrenamientos[i].nombre);
            opcion.innerHTML=entrenamientos[i].nombre;
            $("#SelEntrenamiento").append(opcion);
        })

    }),
    error:(function(xhr, status){
        toastr.warning('Ha ocurrido un problema al cargar los entremaniemtos, inténtelo de nuevo');
    })
});  


$("#table2").hide();
$(".tablaEntr").each(function(key, element){
  $(".tablaEntr")[key].hide();
});

$("#addEntr").hide();
$("#save").hide();
$("#calctime").hide();
$('#SelEntrenamiento').on('change', function (e) {

    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    if (valueSelected=="add"){
    	$("#addEntr").show();
		$("#table2").hide();
        $("#save").hide();
        $("#calctime").hide();
    }else{
    	$("#addEntr").hide();
        
    	
    	if (valueSelected!="-"){

            $("#table2").find(".ejer").remove();

            $("#save").show();
            $("#calctime").show();
			$("#table2").show();
	   	//cargar elementos en tabla según elemento seleccionado
	   	$("#table2").find("tr").get(0).innerHTML=valueSelected;
	  /* 	palabra=valueSelected;
    	palabra = palabra.replace(/\s/g,"_");
	   	$("#"+palabra).show();
	  */ 	
            //Coger de DB lo que ya se había guardado

              //ajax con los entremaniemtos 
                $.ajax({
                    async: false,
                    url: "../php/cogerEntrenamientosBD.php",
                    success:( function (response) {
                        entrenamientos=response;
                        
                        $.each(entrenamientos,function(i,element){
                            var ejercicios=[];
                            ejercicios[entrenamientos['nombre']]=entrenamientos['ejercicios'];
                             if (entrenamientos[i].nombre==valueSelected){
                               
                                  ejerc= entrenamientos[i].ejercicios ;
                                  ejerc=ejerc.replace("{","");
                                  ejerc=ejerc.replace(", }","");
                                  ejerc=ejerc.replace("}","");
                                  ejers=[];
                                  ejers=ejerc.split(", ");
                                  for (j=0;j<ejers.length;j++){
                                      ejercicio=ejers[j].replace(":","::");
                                      ejercicio=ejercicio.split("::");

                                    if (ejercicio.length>1 ){
                                      ejercicio[0]=ejercicio[0].replace(/"/g,"");
                                      ejercicio[0]=ejercicio[0].replace(/'/g,"");
                                      ejercicio[1]=ejercicio[1].replace(/'/g,"");
                                      $("#table2").find("."+ejercicio[0]).append(ejercicio[1]); 
                                     }                                                                     
                                  }
                                      
                            }
                        })
                    }),
                    error:(function(xhr, status){
                                toastr.warning('Ha ocurrido un problema al cargar los entremaniemtos, inténtelo de nuevo');
                    })
                });  

                redips.init();
                calcularDuracion();

	   }else{
	   	 $("#table2").hide();
         $("#save").hide();
        $("#calctime").hide();
	   }

    }

});

$("#btnAddEnt").click( function(){
	if ($("#entName").val()!=""){

		//Añadir a db
		//...
		//Añadir al select 
        var nuevo=$("#entName").val();
        if( validate(nuevo)=="yes"){
        	var opcion=document.createElement("option");
        	opcion.setAttribute("value",nuevo);
        	opcion.innerHTML=nuevo;
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
               /* 	var table=document.createElement("table");
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
            	    
                    */
	
      

            $.ajax({ 
                        url: "../php/addEntrenamiento.php",
                        type: "POST",
                        async: false,
                        data: {"entrenamiento_nuevo":nuevo},
                        success:( function(response) {
                            estado = response['estado'];
                            if( estado == 'creado' ){
                                toastr.success('Entrenamiento creado');
                            }
                        }),
                        error:( function() {
                            toastr.error("Ha ocurrido un problema, vuelva a intentarlo en unos minutos");
                        })
             });
            $("#entName").val("");
        }else{
            toastr.warning("Hay caracteres no admitidos en el nombre del entrenamiento")
        }
    }
});


//$("head").append('<script type="text/javascript" src="js/redips-drag-min.js"></script>');
$("body").append('<script type="text/javascript" src="js/entrenamientos.js"></script>');

	
function calcularDuracion(){
    var duracion="00:00:00";
            for (var i=0; i<$("#table2").find(".ejer").length; i++){
                tiempos=$("#table2").find(".ejer")[i].getAttribute("tiempo").split(":");
                tiemposdur=duracion.split(":");
                //Sumar las horas
                tiemposdur[0]=parseInt(tiemposdur[0])
                //Sumar los minutos
                tiemposdur[1]=parseInt(tiempos[0])+parseInt(tiemposdur[1]);
                //Sumar los segundos
                tiemposdur[2]=parseInt(tiempos[1])+parseInt(tiemposdur[2]);
                if (tiemposdur[2]>=60){
                    tiemposdur[1]=tiemposdur[1]+1;
                    tiemposdur[2]=tiemposdur[2]-60;
                }
                if (tiemposdur[1]>=60){
                    tiemposdur[0]=tiemposdur[0]+1;
                    tiemposdur[1]=tiemposdur[1]-60;
                }
                if(tiemposdur[0]>=10){
                    duracion=tiemposdur[0]
                }else{
                    duracion="0"+tiemposdur[0]
                }
                if(tiemposdur[1]>=10){
                    duracion=duracion+":"+tiemposdur[1]
                }else{
                    duracion=duracion+":0"+tiemposdur[1]
                }
                if(tiemposdur[2]>=10){
                    duracion=duracion+":"+tiemposdur[2]
                }else{
                    duracion=duracion+":0"+tiemposdur[2]
                }
            }
            $("#calctime").html("Duración: "+duracion+ " (hh:mm:ss)");
}

function validate(cctt) {
  var valid = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚáéíóúü.,+¿?¡!@#$%&()= _-:"
  var ok = "yes";
  var temp;
  for (var i=0; i<cctt.length; i++) {
      temp = "" + cctt.substring(i, i+1);
      if (valid.indexOf(temp) == "-1") ok = "no";
  }
  return ok;
}