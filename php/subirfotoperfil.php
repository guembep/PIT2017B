<?php

class Subir{
    private $id;
    public $imagen;
    public $type;
    public $size;
    public $name;
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
                $name=$this->imagen;
                $tipo =$this->type;
                $data =file_get_contents($name);
                $conexion = new mysqli('easy2train.es.mysql', 'easy2train_es','ps7SrwTfhh8XRy2UsdgKizDj', 'easy2train_es');
                $data = mysqli_real_escape_string($conexion,$data);
                //$data = str_replace('##','##',mysqli_real_escape_string($conexion,$data)); 
                $sq2 = "UPDATE users SET foto ='$data', tipofoto='$tipo' WHERE user ='$id'";
               
              
                $result = $conexion->query($sq2);
            }else{
                echo "Formato de archivo o permitido o excede el tamaño límite de $limite_kb Kbyte.";
                $this->error=true;
            }
    }
}
}

?>