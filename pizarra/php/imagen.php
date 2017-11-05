<?php
	$data = $_FILES['imagen'];
	move_uploaded_file(
	    $_FILES['imagen']['tmp_name'], 
	    "../imagenes/test1.png"
	); 
?>