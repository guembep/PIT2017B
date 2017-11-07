<?php
	session_start();
	//INICIALICAMOS VARIABLES
	$arraybusqueda = array();
	if(!isset($_SESSION['deporte'])){
		$deporte = $_GET['deporte'];
	}else{
		$deporte = $_SESSION['deporte'];
	}
	if(!isset($_SESSION['equipo'])){
		$equipo = $_GET['equipo'];
	}else{
		$equipo = $_SESSION['equipo'];
	}
	if($deporte == "baloncesto"){
		$json =	file_get_contents("../partidos/baloncesto.json");
	}elseif($deporte == "balonmano"){
		$json =	file_get_contents("../partidos/balonmano.json");
	}
	$array = json_decode($json,true);
	foreach ($array as $partido) {
		if ((stripos($partido['ELOCAL'], $equipo) !== false)||(stripos($partido['EVISITANTE'], $equipo) !== false)) {
	    	$arraybusqueda[] = $partido;
		}
	}		
	header('Content-type: application/json; charset=utf-8');
	print json_encode($arraybusqueda);
?>