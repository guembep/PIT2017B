<?php
	session_start();
	include('conectarBD.php');
	if((isset($_SESSION['id']))&&(isset($_POST['idejercicio']))){
		$stmt = $db->prepare("DELETE FROM ejercicios WHERE idusuario=? AND id=?");
		$stmt->bind_param('ii',$_SESSION['id'],$_POST['idejercicio']);
		if($stmt->execute()===false){
			$data['estado']='El ejercicio no se ha podido eliminar';
		}else{
			$data['estado']='Ejercicio eliminado correctamente';
		}	
	}else{
		$data['estado']="no hay sesion de usuario";
	}
	// comprobar
	   header('Content-type: application/json; charset=utf-8');
	   print json_encode($data);
?>