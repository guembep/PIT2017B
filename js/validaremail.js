
$(document).ready(function(){
  function submitForm(){

    setTimeout(function(){

    var data = $("#frmRestablecer").serialize();
    $.ajax({
      type : 'POST',
      url : './php/validaremail.php',
      data : data,
      beforeSend: function(){
        $('#recuperar').val("Comprobando información...");
        console.log(data);
      },
      success: function(data){
        estado = data['estado'];
        if(estado=="registrado"){
          $('#recuperar').val('Registrando...');
          console.log("Todo deberia ir bien");

        }
      }
    });
    return false;
  }
});