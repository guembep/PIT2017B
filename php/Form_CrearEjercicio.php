<?php

	//Nos conectamos a la base de datos.
	ini_set('session.gc_maxlifetime', 3600);
	session_set_cookie_params(3600);
	session_start();
	include('conectarBD.php');

	//Recogemos los datos del ejercicio en variables.
	// $sport = $_POST['exercisesport'];
	// $category = $_POST['exercisetype'];
	// $subcategory = $_POST['exercisesub'];
	// $name = $_POST['exercisename'];
	// $description = $_POST['exercisedescription'];
	// $duration = $_POST['exercisetime'];
	// $material = $_POST['exercisematerial'];
	// $personmin = $_POST['minpeople'];
	// $personmax = $_POST['maxpeople'];
	// $url = $_POST['materialintroduced'];
	$sport = "Balonmano";
	$category = "Ataque 6-0";
	$subcategory = "Juego con pivote";
	$name = "Ataque en 6-0 juego con pivote 1";
	$description = "hfdakshfldskhlksdjladsñjfldshflkdsjflkdshfñdsknvldskhfdslkafjhlsadfhdsñ";
	$duration = "15:00";
	$material = "10 balones, 4 conos";
	$personmin = 7;
	$personmax = 17;
	$url = sha1("dslafsdalfkjsdflksdjfsd");
	$data = array();

	//Si el usuario está registrado hacemos la petición para subir el ejercicio.
	
	if(!isset($_SESSION['id'])){
		$stmt = $db->prepare("INSERT INTO ejercicios (deporte, categoria, subcategoria, nombre, explicacion, duracion, material, personasmin, personasmax, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, )");
		$stmt->bind_param('sssssssiis',$sport, $category, $subcategory, $name, $description, $duration, $material, $personasmin, $personasmax, $url);
		if($stmt->execute()===false){
			$data['estado']='error';
		}else{
			$data['estado']='subido';
		}
		$stmt->close();
	}

	echo json_encode($data);

?>
