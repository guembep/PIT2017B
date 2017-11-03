<?php
	//Incluimos fichero de conexion a la bd y ajustamos tiempo de variables de sesion
	session_start();
	include('conectarBD.php');

	$user=$_POST['user'];
	$pass=$_POST['pass'];
	$pass=sha1($pass);

	if(!isset($_SESSION['id'])){
		//Establecemos conexion con la bd
		//Buscamos un usuario o un email en la bd
		$stmt = $db->prepare("SELECT user,email,id,deporte FROM users WHERE (user=? OR email=?) AND pass=?");
		$stmt->bind_param('sss',$user,$user,$pass);
		$stmt->execute();
		$stmt->store_result();
		$numrows = $stmt->num_rows;
		if($numrows!=0){
			//Login correcto y creamos las variables de sesion
			$stmt->bind_result($user1,$email,$id,$deporte);
			$stmt->fetch();
			$_SESSION['id']=$id;
			$_SESSION['email']=$email;
			$_SESSION['deporte']=$deporte;
			$_SESSION['user']=$user1;
			$data['estado'] = 'ok';
		}else{
			$data['estado'] = 'nook';
			session_destroy(); // destroy session
			setcookie("PHPSESSID","",time()-3600,"/"); // delete session cookie 
		}	
	}else{
		$data['estado'] = 'logged';
	}
	header('Content-type: application/json; charset=utf-8');
	echo json_encode($data);
?>