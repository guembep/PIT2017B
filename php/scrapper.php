<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	//INICIALICAMOS VARIABLES
	$arraybusqueda = array();

	//$deporte = $_SESSION['deporte'];
	//$equipo = $_SESSION['equipo'];
	$equipo = "lagunak";
	$deporte = "balonmano";
	if($deporte=="baloncesto"){

	}elseif($deporte=="balonmano"){
		$fini=date("d/m/Y");
		$ffin=date("d/m/Y", strtotime("+10 days"));
		$url = "http://fnavarrabm.es/JSON/get_partidos.asp?fini=".$fini."&ffin=".$ffin;

		//Realizamos la peticion de los señalamientos de los partidos
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		$result = curl_exec($curl);
		$elementos = json_decode($result, true);
		//Comenzamos a recorrer el json en busca de los partidos que incluyan al equipo
		foreach ($elementos['items'] as $partido) {
			if ((stripos($partido['ELOCAL'], $equipo) !== false)||(stripos($partido['EVISITANTE'], $equipo) !== false)) {
	    	$arraybusqueda[] = $partido;
			}
		}
	}	
	header('Content-type: application/json; charset=utf-8');
	print json_encode($arraybusqueda);
?>