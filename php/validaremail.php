

<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);


function generarLinkTemporal($idusuario, $username){
   // Se genera una cadena para validar el cambio de contraseña
   $cadena = $idusuario.$username.rand(1,9999999).date('Y-m-d');
   $token = sha1($cadena);
 
   $conexion = new mysqli('easy2train.es.mysql', 'easy2train_es','ps7SrwTfhh8XRy2UsdgKizDj', 'easy2train_es');
   	if($registro>connect_error){
	    die("La conexión ha fallado, error número " . $reistro->connect_error . ": " . $registro->connect_error);
	}
   // Se inserta el registro en la tabla tblreseteopass
   $sql = "INSERT INTO tblreseteopass (idusuario, username, token, creado) VALUES($idusuario,'$username','$token',NOW());";
   $resultado = $conexion->query($sql);
   if($resultado){
      // Se devuelve el link que se enviara al usuario
      $enlace = "http://".$_SERVER["easy2train.es"].'/php/restablecer.php?idusuario='.sha1($idusuario).'&token='.$token;
      return $enlace;
   }
   else
      return FALSE;
   }

 
function enviarEmail( $email, $link ){
   $mensaje = '<html>
     <head>
        <title>Restablece tu contraseña</title>
     </head>
     <body>
       <p>Hemos recibido una petición para restablecer la contraseña de tu cuenta.</p>
       <p>Si hiciste esta petición, haz clic en el siguiente enlace, si no hiciste esta petición puedes ignorar este correo.</p>
       <p>
         <strong>Enlace para restablecer tu contraseña</strong><br>
         <a href="'.$link.'"> Restablecer contraseña </a>
       </p>
     </body>
    </html>';
 
   $cabeceras = 'MIME-Version: 1.0' . "\r\n";
   $cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
   $cabeceras .= 'From: <psb2j@easy2train.es>' . "\r\n";
   // Se envia el correo al usuario
   mail($email, "Recuperar contraseña", $mensaje, $cabeceras);
}

$email =  htmlspecialchars($_POST['email']);
$respuesta = new stdClass();
echo "hola";

if( $email != "" ){
   $conexion = new mysqli('easy2train.es.mysql', 'easy2train_es','ps7SrwTfhh8XRy2UsdgKizDj', 'easy2train_es');

   	// Comprobar conexión
	if($conexion->connect_error){
	    die("La conexión ha fallado, error número " . $conexion->connect_error . ": " . $conexion->connect_error);
   $sql = " SELECT * FROM users WHERE email = '$email' ";
   $resultado = $conexion->query($sql);
   if($resultado->num_rows > 0){
      $usuario = $resultado->fetch_assoc();
      $linkTemporal = generarLinkTemporal( $usuario['id'], $usuario['user'] );
      if($linkTemporal){
        enviarEmail( $email, $linkTemporal );
        $respuesta->mensaje = '<div class="alert alert-info"> Un correo ha sido enviado a su cuenta de email con las instrucciones para restablecer la contraseña </div>';
      }
   }
   else
      $respuesta->mensaje = '<div class="alert alert-warning"> No existe una cuenta asociada a ese correo. </div>';
   
}
else
   $respuesta->mensaje= "Debes introducir el email de la cuenta";
   	header('Content-type: application/json; charset=utf-8');
 echo json_encode( $respuesta );

?>
