<?php
function connectDb(){
	$server = "localhost";
	$user = "root";
	$password = "toor";
	$dbname = "easy2train";
	// Conectar
	$db = new mysqli($server, $user, $password, $dbname);
	// Comprobar conexión
	if($db->connect_error){
	    die("La conexión ha fallado, error número " . $db->connect_errno . ": " . $db->connect_error);
	}
}
function createUser($user,$pass,$clubname){
	//Preparamos la peticion
	echo $user;
	echo $pass;
	echo $clubname;
	$stmt = $db->prepare("INSERT INTO clubs (user, pass, name) VALUES (?, ?, ?)");
	$stmt->bind_param('sss',$user1,$pass1,$clubname1);
	$user1 = $user;
	$pass1 = $pass;
	$clubname1 = $clubname;
	$stmt->execute();
	$stmt->close();	
}
function editUser($user,$pass,$clubname){

}





?>