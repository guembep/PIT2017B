$(document).ready(function() {
  var  materialA = [];
  var i=0;    
  var matseparado= [];
  var  input=document.getElementById("exercisematerial");
  input.addEventListener("keypress", punto);
  var  material=document.getElementById("materialintroduced");

  function punto(e){
        var tecla = e.keyCode;
        if (tecla==39) {
            //Añadir con foto de etiqueta lo que haya introducido
            var valor= input.value;
            //Comprobar si los valores introducidos en material son validos
            matseparado=valor.split(" ");
            if ((matseparado.length>=2) && (!isNaN(matseparado[0])) ){ 
                    var  mat=document.createElement("div");
                    mat.innerHTML=input.value;
                    mat.setAttribute("class","material");
                    materialA[i]=input.value;
                    i++;
                    var  img=document.createElement("img");
                    img.setAttribute("src","images/etiqueta.png");
                    img.setAttribute("class","etiqueta");
                    img.setAttribute("heigth","15px");
                    img.setAttribute("width","15px");
                    img.setAttribute("align", "left");
                    material.appendChild(img);
                    material.appendChild(mat);
                    input.value="";
            }else{
                alert("Por favor, introduce correctamente el formato del material");
            }
        };

    } 
    
    // Segun si esta o no pulsada la casilla de personas min o max se vera el input o no
    $("#minpeople").change(function visibmin(){
        if (this.checked){
           // console.log("Activando min... ");
            document.getElementById("divexercisemin").style.visibility = "visible"; 
        }else {
            //console.log("Desactivando min... ");
            document.getElementById("divexercisemin").style.visibility = "hidden"; 
        }
    });

    $("#maxpeople").change(function (){
        if (this.checked){
            //console.log("Activando max... ");
            document.getElementById("divexercisemax").style.visibility = "visible"; 
        }else {
            //console.log("Desactivando max... ");
            document.getElementById("divexercisemax").style.visibility = "hidden"; 
        }
    });
	$("#rangoedad").change(function (){
        if (this.checked){
            //console.log("Activando max... ");
            document.getElementById("divrangoedad").style.visibility = "visible"; 
        }else {
            //console.log("Desactivando max... ");
            document.getElementById("divrangoedad").style.visibility = "hidden"; 
        }
    });


    //Enviar a servidor

    $("#registrarejer").click(function (){
     //  console.log("validando");
      // Parte de validacion
      $("#form-registroejer").validate({
        rules:
        {
		  exercisesport: {
            required : true
		  },
		  exercisetype: {
            required : true
		  },
		  exercisesub: {
            required : true
		  },
          exercisename: {
            required : true
          },
          exercisedescription: {
            required : true,
            minlength : 10
          }
        },
        messages: {
		  exercisesport: {
            required : "Introduce un deporte"
		  },
		  exercisetype: {
            required : "Introduce una categoria"
		  },
		  exercisesub: {
            required : "Introduce una subcategoria"
		  },
          exercisename: {
              required: "Introduce un nombre"
          },
          exercisedescription: {
            required: "Introduce una descripcion",
            minlength: "La descripcion es demasiado corta"
          }
        },
        submitHandler: function (){
                //Enviar a addexercise.php
                console.log("Enviando");
                
                $.ajax({
					data: { exercisesport:$("#exercisesport").val(), exercisetype: $("#exercisetype").val(), exercisesub: $("#exercisesub").val(), exercisename: $("#exercisename").val(), exercisedescription: $("#exercisedescription").val(), exercisetime: $("#exercisetime").val(),exercisematerial: $("#exercisematerial").val(), exercisemin: $("#exercisemin").val(), exercisemax: $("#exercisemax").val(), materialintroduced: JSON.stringify(materialA) }, //datos que se envian a traves de ajax
					url:   './php/Form_CrearEjercicio.php', //archivo que recibe la peticion
					type:  'post', //método de envio
					beforeSend: function () {
							$("#resultado").html("Procesando, espere por favor...");
					},
					success:  function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
                        $("#resultado").html("Ejercicio añadido");
                        materialA=[];
                        $("input").each(function(){	
								$($(this)).val('');
						});
						$("textarea").val(" ");
						$(".material").remove();
						$(".etiqueta").remove();
					}
				});
         }
      });
 });
    //Envio de formulario 
        
   
        


});
