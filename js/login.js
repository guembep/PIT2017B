  $('#siUser').hide();
$(document).ready(function(){
  $('#entrar').click(function(){
  /*Envio de formulario */
    console.log("Carga el js");

      var data = $("#form-entrar").serialize();
      $.ajax({
        type : 'POST',
        url : './php/login.php',
        data : data,
        beforeSend: function(){
        console.log(data);
      },
        success: function(data){
          estado = data['estado'];
          console.log(estado);
          if(estado=="ok"){
            $('#login').fadeOut();
            $('#siUser').show();
            $('#noUser').hide();
            //  $('#Log').fadeOut();
          //  setTimeout(function(){
            //  $('#Log').load('./loginMini.html').fadeIn();
            //},800);
            //$('#registrar').val('Registrando...');
            console.log("Todo deberia ir bien");
            $('#bodyNav').load('./selec.html');
            //  $('#logReg').load("../loginMini.html");
            /* El plan es aqui quitar el form de registro y poner un login */
          }else{
            console.log("Algo no ha ido bien");
            //$("#resultado").fadeIn(1000, function(){
            //$("#resultado").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp;'+data+' !</div>');
            //$('#registrar').val("Registrar");
          //  });
          }
        }
      });
      return false;

});
});
