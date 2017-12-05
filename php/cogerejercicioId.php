<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
//Nos conectamos a la base de datos.
ini_set('session.gc_maxlifetime', 3600);
session_set_cookie_params(3600);
session_start();
include('conectarBD.php');
if(isset($_GET['idejercicio'])){
	$idejercicio=$_GET['idejercicio'];
}
// Cogemos lo datos de los ejercicios de la BD si el usuario está registrado

if(isset($_SESSION['id'])){
	$stmt = $db->prepare("SELECT * FROM ejercicios WHERE idusuario=? AND id=?");
	$stmt->bind_param('ii',$_SESSION['id'],$idejercicio);
	if($stmt->execute()===false){
			$data['estado']='El ejercicio no existe o no te pertenece';
	}else{
		$res = $stmt->get_result();
		$data = $res->fetch_assoc();
	}	
}else{
	$data['estado']="no hay sesion de ususario";
}

// comprobar
   header('Content-type: application/json; charset=utf-8');
   print json_encode($data);
?>
