<?php
	global $db;	
function connectDb(){
	//Datos de login bbdd
	$server = "localhost";
	$user = "root";
	$password = "toor";
	$dbname = "easy2train";
	// Conectar
	$db = new mysqli($server, $user, $password, $dbname);
	// Comprobar conexión
	if($db->connect_error){
	    die("La conexión ha fallado, error número " . $db->connect_error . ": " . $db->connect_error);
	}
}
function createUser($email,$user,$deporte,$pass){
	//Preparamos la peticion
	if($db->connect_error){
	    die("La conexión ha fallado, error número " . $db->connect_error . ": " . $db->connect_error);
	}
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
}
function editUser($user,$pass,$email){

}
function checkLogin(){
	if(!isset($_SESSION['id'])){
		return true;
	}else{
		return false;
	}

}





?>
