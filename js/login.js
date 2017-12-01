var sesion=Cookies.get('PHPSESSID');
$("#inicio").click(function(){document.location.href="https://easy2train.es"});
$("#title").hide();
if (sesion==null){
	$('#siUser').hide();
	$("#logout").hide();
	$('#noUser').show();
  $('#login').show();
  $("#back").hide();
}else{
	$('#siUser').show();
	$("#logout").show();
  $('#noUser').hide();
  $('#login').hide();

   if (window.localStorage) {
       $("#back").show();
    }
    else {
      console.log('Browser no soporta LocalStorage');
      $("#back").hide();
    }

    
    $("#contenido").load("./registrado.html", function(responseTxt, statusTxt, xhr){
			if(statusTxt == "success"){
        var script=document.createElement("script");
        script.setAttribute("type","text/javascript");
        script.setAttribute("src","js/registrado.js"); 
        document.getElementsByTagName("body")[0].appendChild(script);

        var script2=document.createElement("script");
        script2.setAttribute("type","text/javascript");
        script2.setAttribute("src","js/slider.js"); 
        document.getElementsByTagName("body")[0].appendChild(script2);



			}	
			if(statusTxt == "error"){
				console.log("Error: " + xhr.status + ": " + xhr.statusText);
			}
		});

}
$(document).ready(function(){
  $('#entrar').click(function(){
  /*Envio de formulario */
    console.log("Carga el js");
	if(($('#user').val()=="") || ($('#pass').val()=="")){
      $('#badPass').html('<b class="text-danger">Debes introducir un email y contraseña!</b>').hide();
      $('#badPass').fadeIn(300);
			console.log("no hay pass");

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
          if(estado=="ok"){ 
            $('#login').fadeOut();
            $('#siUser').show();
            $("#logout").show();
            $('#noUser').hide();
            //  $('#Log').fadeOut();
          //  setTimeout(function(){
            //  $('#Log').load('./loginMini.html').fadeIn();
            //},800);
            //$('#registrar').val('Registrando...');
            console.log("Todo deberia ir bien");
              
            document.location.href="https://easy2train.es";

            if (window.localStorage) {
              localStorage["paginasvisitadas"] = "https://.easy2train.es";
            }

            
           // $("#inicio").attr("href", "https://www.easy2train.es");
           // $('#bodyNav').load('./registrado.html');
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

  $("#logoutbtn").click( function(){
  	console.log("cerrando sesion...");
  	$.ajax({
  		url:"./php/logout.php",
  		success:( function (response) {
  					document.location.href="https://easy2train.es";
  				 }),
  	  error:(function(xhr, status){
  						 console.log( "La solicitud de cerrar sesión ha fallado: " +  status);
  		})
  	});
  });

  
});

