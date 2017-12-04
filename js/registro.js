$('#modalregistro').modal('hide');
$('#alertemail').hide();
$('#alertuser').hide();
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
      beforeSend:( function(){
        $('#registrar').val("Comprobando información...");
        console.log(data);
      }),
      success:( function(data){
        estado = data['estado'];
        console.log(estado);
        if(estado=="registrado"){
          $('#registrar').val('Registrando...');
          console.log("Todo deberia ir bien");
          $('#modalregistro').modal('show');
          localStorage["registronuevo"] = "true";
        }else if(estado=="userexiste"){
          console.log("prob");
          $('#alert_placeholder_user').html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Usuario existe</span></div>');
        }else if(estado=="emailexiste"){
          $('#alert_placeholder_email').html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>Email existe</span></div>');

        }
      })
    });
    return false;
  }
});

$('#modalregistro').on('hidden.bs.modal', function (e) {
      document.location.href="https://easy2train.es";
});