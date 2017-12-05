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
$sql = "SELECT * FROM ejercicios WHERE idusuario=".$id;
$resultado = $db->query($sql);
	if (!$resultado) {
    die('No se pudo consultar:' . mysql_error());
	}
	/* array asociativo */
$k=0;
while ($row = $resultado->fetch_array(MYSQLI_ASSOC)) {
foreach ($row as $key => $value) {
    $result[$k][$key] = $value;
}
$k++;
}
}else{
	    echo "No hay conexion";
	    
	}
// comprobar

   header('Content-type: application/json; charset=utf-8');
	print json_encode($result);
?>
