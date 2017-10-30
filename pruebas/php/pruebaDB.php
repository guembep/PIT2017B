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
	$stmt = $db->prepare("SELECT user,email FROM users WHERE user=? OR email=?");
	$stmt->bind_param('ss',$user,$email);
	$stmt->execute();
	$stmt->store_result();
	$numrows = $stmt->num_rows;
	echo $numrows;
	$stmt->close();	

?>




