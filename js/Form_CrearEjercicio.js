$(document).ready(function() {
  var  materialA = [];
  var i=0;    
  var matseparado= [];
  var  input=document.getElementById("exercisematerial");
  input.addEventListener("keypress", enter);
  var  material=document.getElementById("materialintroduced");

  function enter(e){
        var tecla = e.keyCode;
        if (tecla==13) {
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



    //Enviar a servidor

    $("#registrarejer").click(function (){
     //  console.log("validando");
      // Parte de validacion
      $("#form-registroejer").validate({
        rules:
        {
          exercisename: {
            required : true
          },
          exercisedescription: {
            required : true,
            minlength : 10
          },
          date: {
            required : true,
            date : true
          }
        },
        messages: {
          exercisename: {
              required: "Introduce un nombre para el ejercicio"
          },
          exercisedescription: {
            required: "Introduce una descripcion",
            minlength: "La descripcion es demasiado corta"
          },  
          date: {
            required: "Introduce la fecha",
            date: "Formato de fecha no valido"
          }
        },
        submitHandler: function (){
                //Enviar a addexercise.php
                    console.log("Enviando");
              //  $.post( "addexercise.php", { nombre: "#exercisename", descripcion: "#exercisedescription", material: material } );
                }
      });
 });
    //Envio de formulario 
        
   
        


});
