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



    

/*
      // Parte de validacion
      $("#form-registroejer").validate({
        rules:
        {
          exercisename: {
            required : true,

          },
           exercisedescripiton: {
            required: true,
            minlength: 10
          },
          duracion: {
            required: true,
            time:true,
          },
          date: {
            required: true,
            date: true,
          },
        },
        messages: {
          exercisename: "Introduce un nombre para el ejercicio",
          exercisedescripiton:{
            required: "Introduce una descripcion",
            minlength: "La descripcion es demasiado corta",
          },
          duracion:{
              required:"Introduce la duracion del ejercicio",
              time:"Formato de tiempo no valido, debe ser HH:MM"
          }  ,  
          email: {
            required: "Introduce la fecha",
              date: "Formato de fecha no valido",
          }
        },
        submitHandler: submitForm
      });


      // Hasta aqui la validacion 
*/


    //Envio de formulario 
    
    $("#registrarejer").click(function (){
        //Enviar a addexercise.php
        console.log("enviando");
      //  $.post( "addexercise.php", { nombre: "#exercisename", descripcion: "#exercisedescription", material: material } );
    });
    
 /*     function submitForm(){
        var data = $("#form-registroejer").serialize();
        $.ajax({
          type : 'POST',
          url : './php/addexercise.php',
          data : data,
          beforeSend: function(){
            $('#registrarejer').val("Comprobando información...");
            console.log(data);
          },
          success: function(data){
            estado = data['estado'];
            if(estado=="registrado"){
              $('#registrarejer').val('Registrando...');
              console.log("Todo deberia ir bien");
              // El plan es aqui quitar el form de registro y poner un login 
            }else{
              $("#resultado").fadeIn(1000, function(){
              $("#resultado").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp;'+data+' !</div>');
              $('#registrarejer').val("Añadir");
              });
            }

          }
        });
        return false;
      }
    });
    */

});
