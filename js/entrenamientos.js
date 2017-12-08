var itemselected;
/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";


// create redips container
var redips = {};


// redips initialization
redips.init = function () {
	// reference to the REDIPS.drag object
	var	rd = REDIPS.drag;
	// initialization
	rd.init();
	// REDIPS.drag settings
	rd.dropMode = 'single';			// dragged elements can be placed only to the empty cells
	rd.hover.colorTd = '#9BB3DA';	// set hover color
	rd.clone.keyDiv = true;			// enable cloning DIV elements with pressed SHIFT key
	// prepare node list of DIV elements in table2
	redips.divNodeList = document.getElementById('table2').getElementsByTagName('div');
	// show / hide report buttons (needed for dynamic version - with index.php)
	//redips.reportButton();
	// element is dropped
	rd.event.dropped = function () {
		var	objOld = rd.objOld,					// original object
			targetCell = rd.td.target,			// target cell
			targetRow = targetCell.parentNode,	// target row
			i, objNew;							// local variables
		// if checkbox is checked and original element is of clone type then clone spread subjects to the week
		// print message only if target and source table cell differ
		if (rd.td.target !== rd.td.source) { 
			console.log('Content has been changed!');
		    $("#right").find(".ejer").bind("contextmenu", function(e){
	          $("#menu").css({'display':'block', 'left':e.pageX, 'top':e.pageY});
	          itemselected=$(this).attr('id');
	          return false;
			});
		}
		
	};

};

	// add onload event listener
	if (window.addEventListener) {
		window.addEventListener('load', redips.init, false);
	}
	else if (window.attachEvent) {
		window.attachEvent('onload', redips.init);
	}

/*
$("#right").find(".ejer").mousedown(function(e){
   		//1: izquierda, 2: medio/ruleta, 3: derecho
        	if(e.which == 3) 
        		{
           		 $('#mensaje1').text("has hecho click derecho");
        		}
    	});
});
*/

//Ocultamos el menú al cargar la página
    $("#menu").hide();


     
     
    //cuando hagamos click, el menú desaparecerá
    $(document).click(function(e){
          if(e.button == 0){
                $("#menu").css("display", "none");
          }
    });
     
    //si pulsamos escape, el menú desaparecerá
    $(document).keydown(function(e){
          if(e.keyCode == 27){
                $("#menu").css("display", "none");
          }
    });
     
    //controlamos los botones del menú
    $("#menu").click(function(e){
           
          // El switch utiliza los IDs de los <li> del menú
          switch(e.target.id){
                case "eliminar":
                      //Eliminar el elemento
                      $("#"+ itemselected).remove();
                      break;
          }
           
    });
    $("#save").click(function(){
    	console.log("guardando...");
    	//Guardar en db
    })