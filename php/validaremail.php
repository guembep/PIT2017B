<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);


function generarLinkTemporal($idusuario, $username){
   // Se genera una cadena para validar el cambio de contraseña
   $cadena = $idusuario.$username.rand(1,9999999).date('Y-m-d');
   $token = sha1($cadena);

   $conexion = new mysqli('easy2train.es.mysql', 'easy2train_es','ps7SrwTfhh8XRy2UsdgKizDj', 'easy2train_es');

   // Se inserta el registro en la tabla tblreseteopass
   $sql = "INSERT INTO tblreseteopass (idusuario, username, token, creado) VALUES($idusuario,'$username','$token',NOW());"; 

   $resultado = $conexion->query($sql); 
    
  
  
      // Se devuelve el link que se enviara al usuario
      $enlace ='http://easy2train.es/php/restablecer.php?idusuario='.sha1($idusuario).'&token='.$token;
      return $enlace;
  
}

 
function enviarEmail( $email, $link ){
require("PHPMailer.php");
$mail = new PHPMailer();


//Luego tenemos que iniciar la validación por SMTP:
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Host = "send.one.com"; // A RELLENAR. Aquí pondremos el SMTP a utilizar. Por ej. mail.midominio.com
$mail->Port = 465; // Puerto de conexión al servidor de envio. 
$mail->From = "psb2j@easy2train.es"; // A RELLENARDesde donde enviamos (Para mostrar). Puede ser el mismo que el email creado previamente.
$mail->FromName = "EASY2TRAIN"; //A RELLENAR Nombre a mostrar del remitente. 
$mail->AddAddress("$email"); // Esta es la dirección a donde enviamos 
$mail->IsHTML(true); // El correo se envía como HTML 
$mail->Subject = "Restablece tu contrasñea"; // Este es el titulo del email. 
$body = " Hemos recibido una petición para restablecer la contraseña de tu cuenta"; 
$body .= "Si hiciste esta petición, haz clic en el siguiente enlace, si no hiciste esta petición puedes ignorar este correo. El enlace $link";
$mail->Body = $body; // Mensaje a enviar.
$exito = $mail->Send(); // Envía el correo.
if($exito){ 
    echo "El correo fue enviado correctamente."; 
    
}else{ 
    echo "Hubo un problema. Contacta a un administrador.";
    } 




}

$email =  htmlspecialchars($_POST['email']);
$respuesta = new stdClass();


if( $email != "" ){
   $conexion = new mysqli('easy2train.es.mysql', 'easy2train_es','ps7SrwTfhh8XRy2UsdgKizDj', 'easy2train_es');

   	// Comprobar conexión

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
   else{
      $respuesta->mensaje = '<div class="alert alert-warning"> No existe una cuenta asociada a ese correo. </div>';
   }
   
}
else{
   $respuesta->mensaje= "Debes introducir el email de la cuenta";
 }
   	header('Content-type: application/json; charset=utf-8');
 echo json_encode( $respuesta );

?>