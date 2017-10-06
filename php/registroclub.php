<?php
	//Incluimos fichero de funciones generales 
	include('functions.php');
	//Establecemos conexion co la bd
	connectDb();
	//Obtenemos los datos del registro
	$user=$_GET['user'];
	$pass=$_GET['pass'];
	$name=$_GET['clubname'];
	createuser($user,$pass,$name);






?>