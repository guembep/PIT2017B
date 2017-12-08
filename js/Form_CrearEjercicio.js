var  materialA = [];
$(document).ready(function() {
  var ancho =window.innerWidth*0.95;
  $(".container").attr("style","max-width: "+ancho+"px;")   ;
  var i=0;    
  var matseparado= [];
  var idejercicio;
  var  input=document.getElementById("exercisematerial");
  var  material=document.getElementById("materialintroduced");
  input.addEventListener("keypress", mas);
 

  function mas(e){
	    $("#resultadomat").html("");
        var tecla = (document.all) ? e.keyCode  :e.which;
        if (tecla==43) {
			//var mas=true;
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
                    e.preventDefault();
            }else{
                $("#resultadomat").html("Por favor, introduce correctamente el formato del material");
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
    $("#imgcheck").change(function (){
        if (this.checked){
            //console.log("Activando max... ");
            document.getElementById("divimg").style.visibility = "visible"; 
        }else {
            //console.log("Desactivando max... ");
            document.getElementById("divimg").style.visibility = "hidden"; 
        }
    });


    //Analizar si ha rellenado los campos requeridos

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
        submitHandler: function (){ //Enviar datos a servidor
			//Comprobar los tics de las opciones no obligatorias
           document.getElementById("btn_save_image_img").click();

         }
      });
 });
        

});
