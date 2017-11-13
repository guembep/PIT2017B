<?php

class Subir{
    private $id;
    public $imagen;
    public $type;
    public $size;
    public $tmpa;
    public $error;
    
    function Subir($id){
        $this->id=$id;
        $this->error=false;
        
    }
    
    function subirImagen($id){
      $this->id=$id;
        if(isset($this->imagen)){
            $permitidos = array("image/jpg","image/jpeg","image/gif","image/png");
            $limite_kb=10000;
            
            if(in_array($this->type,$permitidos)&& $this->size<=$limite_kb * 1024){
                $imagen=$this->imagen;
                $tipo =$this->type;
                
                $names1 ='imagenperfil';
                
                $images1=$id;
                $images1.=$imagen['name'];
                $var=$names1."/".$images1;
                if ( $imagen["error"] != 0 ) {
                    exit("ha habido un error y el fichero no se ha recibido\n");
                }
                if ( !move_uploaded_file( $imagen["tmp_name"],$var) ) {
                     exit("no he podido almacenar el fichero...\n");
                }
                 //move_uploaded_file($tmpa['tmp_name'],$var);
                $conexion = new mysqli('easy2train.es.mysql', 'easy2train_es','ps7SrwTfhh8XRy2UsdgKizDj', 'easy2train_es');
                //$data = mysqli_real_escape_string($conexion,$data);
    
                //$data = str_replace('##','##',mysqli_real_escape_string($conexion,$data)); 
                $sq2 = "UPDATE users SET foto = '$var', tipofoto='$tipo' WHERE user ='$id'";
               
              
                $result = $conexion->query($sq2);
            }else{
                echo "Formato de archivo o permitido o excede el tamaño límite de $limite_kb Kbyte.";
                $this->error=true;
            }
    }
}
}

?>