$("#demoadd").click(function (){
	$('#iframeregistrar').contents().find('body').find(".navbar").remove();
	$('#iframeregistrar').contents().find('body').css('padding-top',0);
	$('#iframeregistrar').contents().find('body').find('#registrar').click(function(){
		//si el registro ha sido correcto 
		//if()
		console.log("cerrar popup");
		//$("#popupDemo").dialog('close');
	});
});

