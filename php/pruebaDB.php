<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	include('conectarBD.php');
	$email="a@a.a";
	$user="user";
	$deporte="balonmano";
	$pass="pass";

	echo $email;
	echo $user;
	echo $deporte;
	echo $pass;
	$stmt = $db->prepare("INSERT INTO users (email, user, deporte, pass) VALUES (?, ?, ?, ?)");
	$stmt->bind_param('ssss',$email,$user,$deporte,$pass);
	$stmt->execute();
	$stmt->bind_result($respuesta);
	echo $respuesta;
	$stmt->close();	

?>




