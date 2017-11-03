<?php
error_reporting(E_ALL);
	ini_set('display_errors', 1);

//Nos conectamos a la base de datos.
	ini_set('session.gc_maxlifetime', 3600);
	session_set_cookie_params(3600);
	session_start();
	include('conectarBD.php');
	
// Cogemos lo datos de los ejercicios de la BD si el usuario está registrado

if(isset($_SESSION['id'])){
	$id=$_SESSION['id'];
$sql = "SELECT * FROM ejercicios WHERE idusuario =".$id;
$resultado = $db->query($sql);
	if (!$resultado) {
    die('No se pudo consultar:' . mysql_error());
	}
	/* array asociativo */
$arrayejercicio = $resultado->fetch_array(MYSQLI_ASSOC);
}else{
	    echo "No hay conexion";
	    
	}
// comprobar
foreach($arrayejercicio as $campo=>$valor)
	{
	echo "El " . $campo . " es " . $valor;
	echo "<br>";
	}
   header('Content-type: application/json; charset=utf-8');
	echo json_encode($arrayejercicio);
?>
