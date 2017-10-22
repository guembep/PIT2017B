$(document).ready(function(){

  /*$('#registrar').click(function(){ */

  /* Parte de validacion */
  $("#form-registro").validate({
    rules:
    {
      deporte: {
        required : true,

      },
      user: {
        required: true,
        minlength: 3
      },
      pass: {
        required: true,
        minlength: 6,
        maxlength: 15
      },
      rpass: {
        required: true,
        equalTo: '#pass'
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      user: "El usuario es demasiado corto",
      pass:{
        required: "Introduce una contraseña!",
        minlength: "La contraseña es demasiado corta",
        maxlength: "La contraseña es demasiado larga"
      },
      email: "El email no es valido",
      rpass:{
        required: "Debes introducir tu contraseña",
        equalTo: "Las contraseñas no coinciden"
      },
      deporte: {
        required: "Debes seleccionar un deporte"
      }
    },
    submitHandler: submitForm
  });


  /* Hasta aqui la validacion */

  /*Envio de formulario */
  function submitForm(){
    var data = $("#form-registro").serialize();
    $.ajax({
      type : 'POST',
      url : './php/registro.php',
      data : data,
      beforeSend: function(){
        $('#registrar').val("Comprobando información...");
        console.log(data);
      },
      success: function(data){
        estado = data['estado'];
        console.log(estado);
        if(estado=="registrado"){
          $('#Reg').fadeOut();
        //  $('#Log').fadeOut();
          setTimeout(function(){
            $('#Log').load('./loginMini.html').fadeIn();
          },800);
          $('#registrar').val('Registrando...');
          console.log("Todo deberia ir bien");
        //  $('#logReg').load("../loginMini.html");
          /* El plan es aqui quitar el form de registro y poner un login */
        }else{
          $("#resultado").fadeIn(1000, function(){
          $("#resultado").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp;'+data+' !</div>');
          $('#registrar').val("Registrar");
          });
        }
      }
    });
    return false;
  }
});
