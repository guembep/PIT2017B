<?php
	$data = $_FILES['imagen'];
	move_uploaded_file(
	    $_FILES['imagen']['tmp_name'], 
	    "/var/www/pizarra/imagenes/test.png"
	); 
?>