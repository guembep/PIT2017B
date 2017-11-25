<?php
	//Incluimos fichero de conexion a la bd
	ini_set('session.gc_maxlifetime', 3600);
	session_set_cookie_params(3600);
	session_start();
	include('conectarBD.php');
	
	//Obtenemos los datos del registro
	$email=$_POST['email'];
	$user=$_POST['user'];
	$deporte=$_POST['deporte'];
	if(isset($_POST['club'])){
		$equipo=$_POST['club'];
	}else{
		$equipo="";
	}
	$pass=$_POST['pass'];
	$pass2=$_POST['rpass'];
	$pass=sha1($pass);
	/*$data = array();
	$email="b@b.b";
	$user="user1";
	$deporte="balonmano";
	$pass="pass";*/
	
	if(!isset($_SESSION['id'])){
		//Establecemos conexion con la bd
		//Comprobamos que el usuario o el email no exista
		$stmt = $db->prepare("SELECT user,email FROM users WHERE user=? OR email=?");
		$stmt->bind_param('ss',$user,$email);
		$stmt->execute();
		$stmt->store_result();
		$numrows = $stmt->num_rows;

		if($numrows!=0){
			//Comprobamos si es el email o el usuario el que existe
			$stmt->bind_result($userexist,$emailexist);
			while ($stmt->fetch()) {
				if($userexist==$user){
					$data['estado']='userexiste';
				}elseif($emailexist==$email){
					$data['estado']='emailexiste';
				}
			}
			session_start();
			session_destroy(); // destroy session
			setcookie("PHPSESSID","",time()-3600,"/"); // delete session cookie 
		}else{
			$stmt = $db->prepare("INSERT INTO users (email, user, deporte, equipo ,pass) VALUES (?, ?, ?, ?, ?)");
			$stmt->bind_param('sssss',$email,$user,$deporte,$equipo,$pass);
			if($stmt->execute()===false){
				$data['estado']='error';
				session_start();
				session_destroy(); // destroy session
				setcookie("PHPSESSID","",time()-3600,"/"); // delete session cookie 
			}else{
				$data['estado']='registrado';
				$_SESSION['user']=$user;
				$id = mysqli_insert_id($db);
				$_SESSION['id']=$id;
				$_SESSION['email']=$email;
				$_SESSION['equipo']=$equipo;
				$_SESSION['deporte']=$deporte;
			}
			$stmt->close();
		}	
	}else{
		$data['estado'] = 'logged';
	}
	header('Content-type: application/json; charset=utf-8');
	echo json_encode($data);
?>