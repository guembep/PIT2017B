$("#demoadd").click(function (){
	$('#iframeregistrar').contents().find('body').find(".navbar").remove();
	$('#iframeregistrar').contents().find('body').css('padding-top',0);
	$('#iframeregistrar').contents().find('body').find('#registrar').click(function(){
		parent.location.href = 'https://easy2train.es';
	});
});

