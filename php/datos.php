<meta hhtp-equiv="Content-Type" content="text/html; charset-UTF-8" />
<link href="/css/perfil.css" rel="stylesheet" type="text/css">
<?php 
 
class DatoUser{
 
private $id;
 
    function DatoUser($id){
    $this->id=$id;
   
 
    }
    function escribirDatos($id){
    $this->id=$id;
    $conexion = new mysqli('easy2train.es.mysql','easy2train_es', 'ps7SrwTfhh8XRy2UsdgKizDj','easy2train_es');
   $sql = "SELECT * FROM users WHERE user = '$id'";
    $result=$conexion->query($sql);
    echo "<br>";

    $num_filas=mysqli_num_rows($result);
        if($num_filas>0) { 
        $resultado = mysqli_fetch_array($result);
        $nombre = $resultado["user"];
        $correo = $resultado["email"];
        $deporte =$resultado["deporte"];
     
 ?>
 
        <div id="datos" style="text-align:left;">
        <h1>Datos personales</h1>
        <p> Nombre: <?php  echo "$nombre"; ?></p>
        <p> Correo: <?php  echo "$correo"; ?></p>
         <p> Deporte: <?php  echo "$deporte"; ?></p>
        </div>

 <?php
        }
 
        } 
 
            }

 ?>
