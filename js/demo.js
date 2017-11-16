$("#demoadd").click(function (){
	$('#iframeregistrar').contents().find('body').find(".navbar").remove();
	$('#iframeregistrar').contents().find('body').css('padding-top',0);
});
