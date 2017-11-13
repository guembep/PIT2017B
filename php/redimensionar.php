
<?php
 require_once("conectarBD.php");
include("conectarBD.php");
 
    class Redimensionar {
        private $name;
        private $type;
        private $temp;
// informacion de la imagen redimensionada
        private $Img_redimensionada;
        private $Redimensionar_width;
        private $Redimensionar_height;
        private $Img_redimensionada1;
        private $Redimensionar_width1;
        private $Redimensionar_height1;
        private $Img_redimensionada2;
        private $Redimensionar_width2;
        private $Redimensionar_height2;
        
        private $Img_redimensionada3;
        private $Redimensionar_width3;
        private $Redimensionar_height3;
        
        
        // informacion de la imagen original
        private $img_original;
        private $image_width;
        private $image_height;
        private $image_type;
        
        public $error;
        
        public function __construct($source,$tipo,$temp) {
            $this->type = $tipo;
            
            $image_info = getimagesize($source);
            $this->temp=$tmp;
            if($image_info) {
                $this->image_width = $image_info[0];
                $this->image_height = $image_info[1];
                $this->image_type = $image_info[2];
                
                switch($this->image_type) {
                    case IMAGETYPE_JPEG: {
                        $this->img_original = imagecreatefromjpeg($source);
                        break;
                    }
                    
                    case IMAGETYPE_GIF: {
                        $this->img_original = imagecreatefromgif($source);
                        break;
                    }
                    
                    case IMAGETYPE_PNG: {
                        $this->img_original = imagecreatefrompng($source);
                        break;
                    }
                    
                    default: {
                        $this->error = "Formato no soportado";
                        break;
                    }
                }
            } 
            else {
                $this->error = "Formato invalido";
            }
        }
        
       
        public function resize($width, $height = 0) {
            $this->Redimensionar_width = $width;
            
            if($height == 0) {
                $this->Redimensionar_height = $width;
            } else {
                $this->Redimensionar_height = $height;
            }
            
            $this->Img_redimensionada = imagecreatetruecolor($this->Redimensionar_width, $this->Redimensionar_height);
            
            imagecopyresampled( 
                $this->Img_redimensionada,
                $this->img_original, 0, 0, 0, 0, 
                $this->Redimensionar_width, 
                $this->Redimensionar_height, $this->image_width,
                $this->image_height);
        }
    public function resize2($width1, $height1 = 0,$width2, $height2 = 0,$width3, $height3 = 0) {
        $this->Redimensionar_width1 = $width1;
            if($height1 == 0) {
                $this->Redimensionar_height1 = $width1;
            } else {
                $this->Redimensionar_height1 = $height1;
            }
        $this->Img_redimensionada1 = imagecreatetruecolor(
            $this->Redimensionar_width1, 
            $this->Redimensionar_height1);
            imagecopyresampled(
            $this->Img_redimensionada1, $this->img_original, 0, 0, 0, 0,
            $this->Redimensionar_width1, $this->Redimensionar_height1,
            $this->image_width, $this->image_height
            );
            $this->Redimensionar_width2 = $width2;
                if($height2 == 0) {
                    $this->Redimensionar_height2 = $width2;
                } else {
                    $this->Redimensionar_height2 = $height2;
                }
            $this->Img_redimensionada2 = imagecreatetruecolor(
                $this->Redimensionar_width2, 
                $this->Redimensionar_height2);
            imagecopyresampled(
            $this->Img_redimensionada2, $this->img_original, 0, 0, 0, 0,
            $this->Redimensionar_width2, $this->Redimensionar_height2,
            $this->image_width, $this->image_height
            );
            $this->Redimensionar_width3 = $width3;
                if($height3 == 0) {
                    $this->Redimensionar_height3 = $width3;
                } else {
                    $this->Redimensionar_height3 = $height3;
                }
            $this->Img_redimensionada3 = imagecreatetruecolor(
                $this->Redimensionar_width3, 
                $this->Redimensionar_height3);
                    imagecopyresampled(
                $this->Img_redimensionada3.$this->img_original,0,0,0,0,
                $this->Redimensionar_width3,$this->Redimensionar_height3,
                $this->image_width,
                $his->image_height);
}

        public function guardar($i){
         
            $id=$i;
           
          
            $sql = "SELECT * FROM users WHERE user ='$id'";
            $conexion = new mysqli('easy2train.es.mysql', 'easy2train_es','ps7SrwTfhh8XRy2UsdgKizDj', 'easy2train_es');
            $resultado = $conexion->query($sql);
         $result = mysqli_fetch_array($resultado);
            ob_start();
           
            ob_end_clean();
            $tipo=$this->type;
            $jpg=$result['foto'];
            $red='redi';
            $var1=$red;
            $var1 .= $jpg;
           imagejpeg($this->Img_redimensionada,$var1);
           
            $rutimagenredi=$Img_redimensionada;
            $sq2 = "UPDATE users SET imagenredi = '$var1', tipoimagenredi = '$type' WHERE user = '$id'" ;
            $resulta=$conexion->query($sq2);
            //borro imagen
            unlink($jpg);
        }
        public function guardar2($i){

        $id=$i;
        ob_start();
        imagejpeg($this->Img_redimensionada1);
        $jpg1 = ob_get_contents();
        ob_end_clean();
        $jpg1 = str_replace('##','##',mysql_escape_string($jpg1)); 
        
        ob_start();
        imagejpeg($this->Img_redimensionada2);
        $jpg2 = ob_get_contents();
        ob_end_clean();
        $jpg2 = str_replace('##','##',mysql_escape_string($jpg2)); 
        
        ob_start();
        imagejpeg($this->Img_redimensionada3);
        $jpg3 = ob_get_contents();
        ob_end_clean();
        $jpg3 = str_replace('##','##',mysql_escape_string($jpg3)); 
        
        $tipo=$this->type;
        $valores=array($jpg1,$jpg2,$jpg3,$tipo);
        return $valores;

    }
  
        public function save($dir,$dir1,$dir2,$dir3,$dir4,$name, $quality = 95) {
                $path = $dir . $name;
            $path1 = $dir1 . $name;
            $path2 = $dir2 . $name;
            $path3= $dir3 . $name;
            $path4= $dir4. $name;
            
            imagejpeg($this->Img_redimensionada2, $path2, $quality);
            imagejpeg($this->Img_redimensionada2,$path4, $quality);
            imagedestroy($this->Img_redimensionada2);
            imagejpeg($this->img_original, $path, $quality);
            
            imagedestroy($this->img_original);
            imagejpeg($this->Img_redimensionada3, $path3, $quality);
            
            imagedestroy($this->Img_redimensionada3);
            imagejpeg($this->Img_redimensionada1, $path1, $quality);
            
            imagedestroy($this->Img_redimensionada1);
        }
        
       public function save2($dir,$name, $quality = 95) {
            $path = $dir . $name;
            imagejpeg($this->img_original, $path, $quality);
            
            imagedestroy($this->img_original);
        }
    }