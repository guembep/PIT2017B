var sesion=Cookies.get('PHPSESSID');
if (sesion==null){
	$('#siUser').hide();
}else{
	$('#siUser').show();
    $('#noUser').hide();
    $('#login').hide();
    $('#bodyNav').load('./registrado.html');
    $("#inicio").attr("href", "https://www.easy2train.es/registrado.html");
}	
$(document).ready(function(){
  $('#entrar').click(function(){
  /*Envio de formulario */
    console.log("Carga el js");
	if(($('#user').val()=="") || ($('#pass').val()=="")){
      $('#badPass').html('<b class="text-danger">Debes introducir un email y contraseña!</b>').hide();
      $('#badPass').fadeIn(300);
      return false;
	}else{
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
          if((estado=="ok")||(estado=="logged")){ //quitar opcion logged cuando haya cerrar sesion
            $('#login').fadeOut();
            $('#siUser').show();
            $('#noUser').hide();
            //  $('#Log').fadeOut();
          //  setTimeout(function(){
            //  $('#Log').load('./loginMini.html').fadeIn();
            //},800);
            //$('#registrar').val('Registrando...');
            console.log("Todo deberia ir bien");
            $('#bodyNav').load('./registrado.html');
            $("#inicio").attr("href", "https://www.easy2train.es/registrado.html");
            //  $('#logReg').load("../loginMini.html");
            /* El plan es aqui quitar el form de registro y poner un login */
          }else{
            console.log("Algo no ha ido bien");
            //$("#resultado").fadeIn(1000, function(){
            //$("#resultado").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp;'+data+' !</div>');
            //$('#registrar').val("Registrar");
          //  });
            $('#badPass').html('<b class="text-danger">¡Algo no ha ido bien!</b> <a href="#" data-target="#pwdModal" class="ml-5 alert-link" data-toggle="modal">Olvidaste tu contraseña?</a>').hide();
            $('#badPass').fadeIn(300);

          }
        }
      });
      return false;
	  }
});

$("#frmRestablecer").submit(function(event){
  event.preventDefault();
  $.ajax({
    url:'php/validaremail.php',
    type:'post',
    dataType:'json',
    data:$("#frmRestablecer").serializeArray()
  }).done(function(respuesta){
    $("#mensaje").html(respuesta.mensaje);
    $("#email").val('');
  });
});
});

