<?php
	//Nos conectamos a la base de datos.
	ini_set('session.gc_maxlifetime', 3600);
	session_set_cookie_params(3600);
	session_start();
	include('conectarBD.php');

	//Recogemos los datos del ejercicio en variables.
    $sport = $_POST['exercisesport'];  
    $category = $_POST['exercisetype'];
    $subcategory = $_POST['exercisesub'];
	$name = $_POST['exercisename'];
	$description = $_POST['exercisedescription'];
	$duration = $_POST['exercisetime'];
    $material = $_POST['exercisematerial'];
	$personmin = $_POST['exercisemin'];
	$personmax = $_POST['exercisemax'];
	$imagename = "../images/ejercicios/".sha1($_POST['imagename']).".png";

	//$sport = "Baloncesto";
	//$category = "Ataque";
	//$subcategory = "Tiro";
	//$name = "Mejora tiros libres";
	//$description = "descripcion";
    //$duration = "07:30";
	//$material = "10 balones";
	//$personmin = 7;
	//$personmax = 14;
	//$url = "url";
    $data = array();
	
	
	//Si el usuario está registrado hacemos la petición para subir el ejercicio.
	
	if(isset($_SESSION['id'])){

        $iduser = $_SESSION['id'];
        $data['foto'] = $imagename;
        
        //$url =  Enchufamos la url con la imagen .png
        //$club = $_SESSION['idequipo']; //Cuando tengamos url y equipo implementamos
        //$data['idequipo'] = $club;

		$stmt = $db->prepare("INSERT INTO `ejercicios`(`deporte`, `idequipo`, `categoria`, `subcategoria`, `nombre`, `explicacion`, `duracion`, `material`, `personasmin`, `personasmax`, `foto`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		
		//echo 'Deporte: ' .$sport;

	    $stmt->bind_param('sissssssiis', $sport, $club, $category, $subcategory, $name, $description, $duration, $material, $personmin, $personmax, $imagename);
	    
	    if($stmt->execute()===false){
			$data['estado']='error';

		}else{
			move_uploaded_file($_FILES['imagen']['tmp_name'], $imagename);	
			$idejercicio =  mysqli_insert_id($db);
			
		    //$data['id'] = $idejercicio;
		    
	        $stmt = $db->prepare("INSERT INTO `ejerciciosusers`(`iduser`, `idejercicio`) VALUES (?, ?)");
	        $stmt-> bind_param('ii', $iduser, $idejercicio);
	        
	        if($stmt->execute()===false){
				$data['estado']='error';

			}else{
				$data['estado']='subido';
			}
	    }  
        $stmt->close();
		
		
		
	}else{
	    $data['estado'] = "No hay sesion de usuario";
	    
	}
	echo json_encode($data);
	
?>
