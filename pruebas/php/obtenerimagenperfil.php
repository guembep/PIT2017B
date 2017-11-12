<?php
init_set('session.gc_maxlifetime',3600);
session_set_cookie_params(3600);
session_start('conectarBD.php');
$id = $_SESSION['id'];
$sql = "SELECT * FROM users WHERE user ='$id'";
$conexion = new mysqli('easy2train.es.mysql', 'easy2train_es','ps7SrwTfhh8XRy2UsdgKizDj', 'easy2train_es');
$resultado = $conexion->query($sql);
$result = mysql_fetch_array($resultado);
$datos=$result['foto'];

echo $datos;
?>