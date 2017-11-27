<?php

$email = $_POST['email'];

$header = 'From: ' . $email . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$mensaje = "El mail del usuario interesaco en los packs de ejercicios es: " . $email . "; \r\n";
$mensaje .= "Enviado el " . date('d/m/Y', time());

$para = "info@easy2train.es";
$asunto = "Usuario interesado en Packs Premium de ejercicios";

if (mail($para, $asunto, utf8_decode($mensaje), $header))
{
console.log('Su solicitud ha sido enviada correctamente');
}
else
{
console.log('Su solicitud no ha sido enviada correctamente');
}
?>