<?php
	//Nos conectamos a la base de datos.
	ini_set('session.gc_maxlifetime', 3600);
	session_set_cookie_params(3600);
	session_start();
	include('conectarBD.php');

	//Recogemos los datos del ejercicio en variables.
    $nombre = $_POST['entrenamiento_name'];  
    $ejercicios = $_POST['entrenamiento_ejers']; 

    $data = array();
	
		//-------------------------
	//Si el usuario está registrado hacemos la petición para subir el entrenamiento.
	
	if(isset($_SESSION['id'])){
        $iduser = (int)$_SESSION['id'];

		$stmt = $db->prepare("INSERT INTO `entrenamientos`(`nombre`, `ejercicios`, `idusuario`) VALUES (?, ?, ?)");
		
		//echo 'Deporte: ' .$sport;
	    $stmt->bind_param('sissssssiisis', $nombre, $ejercicios, $iduser);

	    if($stmt->execute()===false){
			$data['estado']='error1';

		}else{
			$data['estado']='subido';
	    }  
        $stmt->close();

		
	}else{
	    $data['estado'] = "No hay sesion de usuario";
	    
	}
	header('Content-type: application/json; charset=utf-8');
	echo json_encode($data);
	
?>
