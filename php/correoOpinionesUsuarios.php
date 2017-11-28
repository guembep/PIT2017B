<?php
error_reporting(E_ALL);
	ini_set('display_errors', 1);

//Nos conectamos a la base de datos.
	ini_set('session.gc_maxlifetime', 3600);
	session_set_cookie_params(3600);
	session_start();
	$opinion = $_POST['opinion'];
if(isset($_SESSION['id'])){
	$id=$_SESSION['id'];

	$conexion = new mysqli('easy2train.es.mysql', 'easy2train_es','ps7SrwTfhh8XRy2UsdgKizDj', 'easy2train_es');
	
$sql = "SELECT * FROM users WHERE id=".$id;
$resultado = $conexion->query($sql);
	if (!$resultado) {
    die('No se pudo consultar:' . mysql_error());
	}else{
	/* array asociativo */
$k=0;
while ($row = $resultado->fetch_array(MYSQLI_ASSOC)) {
foreach ($row as $key => $value) {
   $result[$k][$key] = $value;

   
}
$k++;
}

$correo=$result[0]['email'];





$header = 'From: ' . $correo . " \n";
$header .= "X-Mailer: PHP/" . phpversion() . " \n";
$header .= "Mime-Version: 1.0 \n";
$header .= "Content-Type: text/plain";


$mensaje = "" . $opinion .". \n";
$mensaje .= "Su mail es: " . $correo . ". \n";
$mensaje .= "Enviado el " . date('d/m/Y', time());

$para = "info@easy2train.es";
$asunto = "Opinion sobre la pagina web";

mail($para, $asunto, utf8_decode($mensaje), $header);

}
}
?>