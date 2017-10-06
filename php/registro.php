<?php
	//Incluimos fichero de funciones generales 
	include('functions.php');
	//Establecemos conexion co la bd
	connectDb();
	//Obtenemos los datos del registro
	$user=mysql_real_escape_string($_POST['user']);
	$password=mysql_real_escape_string($_POST['password']);






?>