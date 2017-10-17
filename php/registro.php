<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	//Incluimos fichero de conexion a la bd
	session_start();
	include('conectarBD.php');
	
	//Obtenemos los datos del registro
	$email=$_POST['email'];
	$user=$_POST['user'];
	$deporte=$_POST['deporte'];
	$pass=$_POST['pass'];
	$pass2=$_POST['rpass'];
	$pass=sha1($pass);
	/*$data = array();
	$email="b@b.b";
	$user="user1";
	$deporte="balonmano";
	$pass="pass";*/
	
	if(!isset($_SESSION['id'])){
		//Establecemos conexion co la bd
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
		}else{
			$stmt = $db->prepare("INSERT INTO users (email, user, deporte, pass) VALUES (?, ?, ?, ?)");
			$stmt->bind_param('ssss',$email,$user,$deporte,$pass);
			if($stmt->execute()===false){
				$data['estado']='error';
			}else{
				$data['estado']='registrado';
				$_SESSION['id']=$user;
				$_SESSION['email']=$email;
			}
			$stmt->close();
		}	
	}else{
		$data['estado'] = 'logged';
	}
	header('Content-type: application/json; charset=utf-8');
	echo json_encode($data);
?>