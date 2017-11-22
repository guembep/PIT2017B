var datos;
getUserData();

function getUserData(){
	$.ajax({
		url: "./php/getUserData.php",
		success:( function (data) {
			$("#profileusername").html(data['user']);
			$("#profileequipo").html(data['equipo']);
			datos = data;
			datosPerfil();
		 }),
		 error:(function(xhr, status){
				 console.log( "La solicitud ha fallado: " +  status);
		 })
	});
}

function datosPerfil(){
	$("#contenidoperfil").load("plantilladatosuser.html", function() {
		console.log(datos);
		$("#modprofileuser").val(datos['user']);
		$("#modprofileemail").val(datos['email']);
		$("#modprofiledeporte").val(datos['deporte']);
		$("#modprofileequipo").val(datos['equipo']);

	});
}