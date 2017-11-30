<?php

session_start();

$email = $_POST['email'];
$user = $_SESSION['user'];
$deporte = $_SESSION['deporte'];

$header = 'From: ' . $email . " \n";
$header .= "X-Mailer: PHP/" . phpversion() . " \n";
$header .= "Mime-Version: 1.0 \n";
$header .= "Content-Type: text/plain";


$mensaje = "El usuario " . $user ." está interesado en los packs de ejercicios de " . $deporte . ". \n";
$mensaje .= "Su mail es: " . $email . ". \n";
$mensaje .= "Enviado el " . date('d/m/Y', time());

$para = "info@easy2train.es";
$asunto = "Usuario interesado en Packs Premium de ejercicios";

mail($para, $asunto, utf8_decode($mensaje), $header);

?>