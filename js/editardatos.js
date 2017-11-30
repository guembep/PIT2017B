//console.log('editardatos');
$('#myModal').modal('hide');
$("#form-cambios").validate({
			rules:
			    {
			      deporte: {
			        required : true,
			      },
			      pass1: {
			        required: true,
			        minlength: 6,
			        maxlength: 15
			      },
			      pass2: {
			        required: true,
			        equalTo: '#pass1'
			      }
			    },
			messages: {
			      pass1:{
			        required: "Introduce una contraseña!",
			        minlength: "La contraseña es demasiado corta",
			        maxlength: "La contraseña es demasiado larga"
			      },
			      pass2:{
			        required: "Debes introducir tu contraseña",
			        equalTo: "Las contraseñas no coinciden"
			      },
			      deporte: {
			        required: "Debes seleccionar un deporte"
			      }
			    },
			submitHandler: submitForm
	})
function submitForm(){
		var data = $("#form-cambios").serialize();
		$.ajax({
	      type : 'POST',
	      url : './php/editardatos.php',
	      data : data,
	      success: function(data){
	        estado = data['estado'];
	        if(estado=="ok"){
	          console.log("Datos Modificados");
			  $('#myModal').modal('show');
	        //  $('#logReg').load("../loginMini.html");
	          /* El plan es aqui quitar el form de registro y poner un login */
	        }else{
	        	console.log("Dato no modificados");
	        }
	      }
	    });
}
$('#myModal').on('hidden.bs.modal', function (e) {
  getUserData();	
  datosPerfil();
})