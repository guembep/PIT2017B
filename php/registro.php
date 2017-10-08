<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	//Incluimos fichero de conexion a la bd
	include('conectarBD.php');
	
	//Obtenemos los datos del registro
	/*$email=$_POST['email'];
	$user=$_POST['user'];
	$deporte=$_POST['deporte'];
	$pass=$_POST['pass'];
	$data = array();*/
	$email="a@a.a";
	$user="user";
	$deporte="balonmano";
	$pass="pass";
	echo $email;
	
	if(!isset($_SESSION['id'])){
		//Establecemos conexion co la bd
		//Comprobamos que el usuario o el email no exista
		$stmt = $db->prepare("SELECT user,email FROM users WHERE user=? OR email=?");
		$stmt->bind_param("ss",$user,$email);
		$stmt->execute();
		$stmt->store_result();
		echo $stmt->num_rows;
		createUser($email,$user,$deporte,$pass);

	}else{
		$data['estado'] = 'logged'
	}

?>