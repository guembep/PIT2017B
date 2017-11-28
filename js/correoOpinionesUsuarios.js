$('#modalOpinion').on('hidden.bs.modal', function (e) {
    var data = $("#correoOpinion").serialize();
    $.ajax({
      type : 'POST',
      url : './php/correoOpinionesUsuarios.php',
      data : data,
      success: (function(data){
      		console.log("El mail se ha enviado correctamente.")
        })
      })
});

