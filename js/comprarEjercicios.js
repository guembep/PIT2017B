$('#submitcomprar').click(function () {
    var data = $("#comprarEjercicios").serialize();
    $.ajax({
      type : 'POST',
      url : './php/comprarEjercicios.php',
      data : data,
      success: (function(data){
      		console.log("El mail se ha enviado correctamente.")
        })
      })
});

$('#comprarEjercicios').validate({
	rules:
		{
			email: {
				required: true,
				email: true,
			}
		},
	messages:
		{
			email: "El mail no es valido."
		}
})

$('#comprarEjercicios input').on('keyup blur', function () { // fires on every keyup & blur
        if ($('#comprarEjercicios').valid()) {                   // checks form for validity
            $('#submitcomprar').prop('disabled', false);        // enables button
        } else {
            $('#submitcomprar').prop('disabled', 'disabled');   // disables button
        }
});
