<?php
	$server = "localhost";
	$user = "root";
	$password = "toor";
	$dbname = "easy2train";


	/*
	$server = "easy2train.es.mysql";
	$user = "easy2train_es";
	$password = "ps7SrwTfhh8XRy2UsdgKizDj";
	$dbname = "easy2train_es";
	*/
	
	// Conectar
	$db = new mysqli($server, $user, $password, $dbname);
	// Comprobar conexión
	if($db->connect_error){
	    die("La conexión ha fallado, error número " . $db->connect_errno . ": " . $db->connect_error);
	}
?>