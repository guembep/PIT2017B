<?php
	//Nos conectamos a la base de datos.
	ini_set('session.gc_maxlifetime', 3600);
	session_set_cookie_params(3600);
	session_start();
	include('conectarBD.php');


	if (isset($_POST['entrenamiento_nuevo'])) {//Crear entrenamiento
		$nombre = $_POST['entrenamiento_nuevo'];  
		$ejercicios="";
		$data = array();

		//Si el usuario está registrado hacemos la petición para crear el entrenamiento.	
		if(isset($_SESSION['id'])){
	        $iduser = (int)$_SESSION['id'];

			$stmt =$db->prepare("INSERT INTO entrenamientos (nombre, ejercicios, idusuario) VALUES (?,?,?)");
			$stmt->bind_param('sss',$nombre,$ejercicios,$iduser);

		    if($stmt->execute()===false){
				$data['estado']='error al crear';
			}else{
				$data['estado']='creado';
		    }  
	        $stmt->close();

			
		}else{
		    $data['estado'] = "No hay sesion de usuario";
		    
		}

		header('Content-type: application/json; charset=utf-8');
		echo json_encode($data);
	}else{ //Guardar cambios entrenamiento

		//Recogemos los datos del entrenamiento en variables.
	    $nombre = $_POST['entrenamiento_name'];  
	    $ejercicios = $_POST['entrenamiento_ejers']; 

	    $data = array();
		
			//-------------------------
		//Si el usuario está registrado hacemos la petición para actualizar el entrenamiento.
		
		if(isset($_SESSION['id'])){
	        $iduser = (int)$_SESSION['id'];

			$stmtup =$db->prepare("UPDATE entrenamientos SET ejercicios= ? WHERE nombre=? AND idusuario=?");
			$stmtup->bind_param('sss',$ejercicios,$nombre,$iduser);
				
		    if($stmtup->execute()===false){
				$data['estado']='error1';

			}else{
				$data['estado']='actualizado';
		    }  
	        $stmtup->close();

			
		}else{
		    $data['estado'] = "No hay sesion de usuario";
		    
		}

		header('Content-type: application/json; charset=utf-8');
		echo json_encode($data);
	}

?>
