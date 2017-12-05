<?php
	//Nos conectamos a la base de datos.
	ini_set('session.gc_maxlifetime', 3600);
	session_set_cookie_params(3600);
	session_start();
	include('conectarBD.php');

	//Recogemos los datos del ejercicio en variables.
    $sport = $_POST['exercisesport'];  
    $category = $_POST['exercisestype'];
    $subcategory = $_POST['exercisesub'];
    $club = 1;
	$name = $_POST['exercisename'];
	$description = $_POST['exercisedescription'];
	$duration = $_POST['exercisetime'];
    $material = $_POST['exercisematerial'];
	$personmin = (int)$_POST['exercisemin'];
	$personmax = (int)$_POST['exercisemax'];
	$imagename = "../images/ejercicios/".sha1($_POST['imagename']).".png";
	$datospizarra= $_POST['datospizarra'];
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
	
	
	//Recogemos imagen externa en caso de que la haya
	if ( isset($_FILES['imgexterna']) ) {
		$datospizarra= "nohay";
		$foto_info=$_FILES['imgexterna'];
		//print_r($foto_info);

		if ($foto_info['error']!=0) {
		  //print("problema al subir el fichero");
		  
		}else{

			$type=$foto_info['type'];

			$validformat=false;
			if ( $type=='image/png' ) {
			  $ext='.png';
			  $validformat=true;
			} else if ( $type=='image/jpg' ) {
			  $ext='.jpg';
			  $validformat=true;
			} else if ( $type=='image/jpeg' ) {
			  $ext='.jpeg';
			  $validformat=true;
			} else if ( $type=='image/gif' ) {
			  $ext='.gif';
			  $validformat=true;
			}
			
			if (!$validformat) {
			  //print("formato no soportado");
			}else{	

				//Guardarla cambiando el nombre
				$filename=$foto_info['name'];
				$base=str_replace($ext,'',$filename);
				//$filename=$_SESSION['id'].'.'.$ext;
				$filename=$_SESSION['id'].'_'.sha1($filename).$ext;
				if ( ! move_uploaded_file($foto_info['tmp_name'],"../images/imgexternas/".$filename) ) { 
				  //print("problema importando imagen");
				}else { 
					//Guardar directorio imagen en DB
					$imagename="../images/imgexternas/".$filename;

					//print("ok-img: ").$imagename;
				}
			}	
		}	
	}	
		//-------------------------
	//Si el usuario está registrado hacemos la petición para subir el ejercicio.
	
	if(isset($_SESSION['id'])){

		$sport = $_SESSION['deporte'];
        $iduser = (int)$_SESSION['id'];
        //$url =  Enchufamos la url con la imagen .png
        //$club = $_SESSION['idequipo']; //Cuando tengamos url y equipo implementamos
        //$data['idequipo'] = $club;

		$stmt = $db->prepare("INSERT INTO `ejercicios`(`deporte`, `idequipo`, `categoria`, `subcategoria`, `nombre`, `explicacion`, `duracion`, `material`, `personasmin`, `personasmax`, `foto`, `idusuario` , `datospizarra`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		
		//echo 'Deporte: ' .$sport;
	    $stmt->bind_param('sissssssiisis', $sport, $club, $category, $subcategory, $name, $description, $duration, $material, $personmin, $personmax, $imagename, $iduser, $datospizarra);

	    if($stmt->execute()===false){
			$data['estado']='error1';
			$data['foto'] = var_dump($stmt);

		}else{
			if ( !isset($_FILES['imgexterna']) ){
				move_uploaded_file($_FILES['imagen']['tmp_name'], $imagename);	
			}
			$idejercicio =  mysqli_insert_id($db);
			
		    //$data['id'] = $idejercicio;
		    
	        $stmt = $db->prepare("INSERT INTO `ejerciciosusers`(`iduser`, `idejercicio`) VALUES (?, ?)");
	        $stmt-> bind_param('ii', $iduser, $idejercicio);
	        
	        if($stmt->execute()===false){
				$data['estado']='error2';

			}else{
				$data['estado']='subido';
			}
	    }  
        $stmt->close();
		
		
		
	}else{
	    $data['estado'] = "No hay sesion de usuario";
	    
	}
	header('Content-type: application/json; charset=utf-8');
	echo json_encode($data);
	
?>
