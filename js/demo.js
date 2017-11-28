$("#demoadd").click(function (){
	$('#iframeregistrar').contents().find('body').find(".navbar").remove();
	$('#iframeregistrar').contents().find('body').css('padding-top',0);
	$('#iframeregistrar').contents().find('body').find('#registrar').click(function(){
		setTimeout(function(){
				if(localStorage["registronuevo"]=="true"){
						parent.location.href = 'https://easy2train.es';
				}
		}, 2000);

	});
});

