<?php
ini_set('session.gc_maxlifetime', 3600);
session_set_cookie_params(3600);
session_start();
require_once('subirfotoperfil.php');
require_once('redimensionar.php');
require_once('datos.php');

if(isset($_SESSION['id'])){
    $id=$_SESSION['id'];
    $subir = new Subir($id);
        if($_FILES){
            //$subir->imagen=$_FILES['imagen'];
             $subir->type=$_FILES['imagen']['type'];
             $subir->size=$_FILES['imagen']['size'];
             $subir->name=$_FILES['imagen']['name'];
             $subir->tempname=$_FILES['imagen']['tmp_name'];
             $temp =$_FILES['imagen']['tmp_name'];
             $subir->subirImagen($id);
             
             
              $type =$_FILES['imagen']['type'];
              
              if($subir->error==false){
                  $resize=new Redimensionar($temp,$type);
                  if($resize->error){
                      echo $resize->error;
                      
                  }else{
                      $resize->resize(200,170);
                      $resize->guardar($id);
                  }
                  
              }
            
        }
}else {
    echo "Esta página es solo para usuarios registrados.<br>";
    echo "<a href='../registro.html'>Inicia Session aquí</a>";
    exit();
}
$now=time();
$num=1610140498;

if($now > $num){
    session_destroy();
    echo "Su sesion ha terminado, <a href='../registro.html'>Necesita hacer login</a>";
    exit();
}
?>








<html id="main_html" lang="en"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="/images/favicon.ico">

    <title>Easy2Train</title>
    <link rel="stylesheet" href="/css/perfil.css">

    <!-- Bootstrap core CSS -->
    <link href="/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/css/jumbotron.css" rel="stylesheet">

    <link href="/css/popup.css" rel="stylesheet">
     <link rel="stylesheet" href="/css/popper.css">
     <link rel="stylesheet" href="/css/index.css">
   <!--  <link rel="stylesheet" href="https://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css" /> -->
   <!--   <script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
      <script src="https://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
     -->
  </head>

  <body id="main_body">

    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
         <a class="navbar-brand" id="inicio" href="">Easy2Train</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>

                 <div class="collapse navbar-collapse" id="navbarsExampleDefault">

          <!-- SI ES USUARIO USAREMOS ESTA INFO -->
                <ul id="siUser" class="navbar-nav mr-auto">
                     <li class="nav-item active">
                          <a class="nav-link" id="linkejercicios" href="#">Ejercicios <span class="sr-only">(current)</span></a>
		           	</li>
                <li class="nav-item">
                     <a class="nav-link" id="linkconvocatorias" href="#">Convocatorias</a>
		    	</li>

                 </ul>
		<ul id="logout" class="navbar-nav">
			<li>
				 
				   <button id="logoutbtn" type="button" class="btn btn-default btn-sm"> 
					     Cerrar sesión <img src="/images/logout.png" height="20" width="20">
				   </button>
				 
			</li>
		</ul>

      <!-- SI NO ES USUARIO USAREMOS ESTA INFO -->

    <ul id="noUser" class="navbar-nav mr-auto" style="display: none;">
      <li class="nav-item active">
        <a class="nav-link" href="../funcionalidades.html">Funcionalidades <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active ">
        <a href="./registro.html" class="btn btn-primary btn-primary"><span class="glyphicon glyphicon-plus"></span> Registrarse</a>
      </li>
      <li>
        <br>
      </li>
    </ul>
    <ul id="login" class="navbar-nav" style="display: none;">
  <li>
      <form id="form-entrar" method="POST" class="navbar-form form-inline">
        <div class="form-group">
          <input id="user" name="user" type="text" placeholder="Usuario" class="form-control">
        </div>
        <div class="form-group">
          <input id="pass" name="pass" type="password" placeholder="Contraseña" class="form-control">
        </div>
        <div class="form-group">
        <button id="entrar" class="btn btn-success">Entrar</button>
      </div>
        </form>
        <div id="badPass" class="container">
        </div>
  </li>
  <li>
  </li>
</ul>
 
    </div>
    </nav>
<!-- Hasta aqui va el nav -->


 <div id="padre">
	<div id="recuadro">
				
				<div id="foto">
				<?php 
					echo "<img src='obtenerimagenperfil.php'>";
				?>
				</div>
				<p>
					<form method='POST' action='' enctype= 'multipart/form-data'>
						<h5>Sube una imagen de perfil</h5>
						<p>
							<input name='imagen' type='file' required />
					    </p>
					    <p>
							<input type='submit' value='Enviar' />
						</p>
					</form>
				</p>
		
    </div>
</div>
<div id="derecha">
    <?php
    $datos = new DatoUser($id);
    $datos->escribirDatos($id);
    ?>
</div>

<section>				
       <div id="contenedor2">
       		<div id="cuadro">
            	<div  id="registro">
				 <form method="post" action="" autocomplete="on">
     				<h1>Actualizar</h1>
            		<p>
						<label for="nombre" data-icon="&#xe971;">user</label>
						<input id="nombre" name="nombre" type="text" />
					</p>
            		<p>	
						<label for="correo" data-icon="&#xea85;">Email</label>
						<input id="correo" name="correo" type="email" placeholder="Ej.correo@mail.com" />
					</p>
            		<p>	
						<label for="contraseña" data-icon="&#xe98d;">Password</label>
						<input id ="contraseña" name="contra" type="password"  />
					</p>
        			
     
             		<p class="boton_registro">
	   					<input type="submit" value="Actualizar" />	
             		</p>
                    
	 			</form>
               </div>
     		</div>
        </div>
     </section>


    <footer>
        <p id="easy">© Easy2Train 2017</p>
    </footer>
  



    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script>window.jQuery || document.write('<script src="/js/jquery.min.js"><\/script>')</script>

    <script language="javascript" type="text/javascript" src="/js/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
    <script language="javascript" type="text/javascript" src="/js/popper.js"></script>
    <script type="text/javascript" src="/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug
    <script src="../../../../assets/js/ie10-viewport-bug-workaround.js"></script> -->
    <script type="text/javascript" src="/js/login.js"></script>
      
      <!-- Para cuando estas registrado-->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.js"></script>
    <script type="text/javascript" src="/js/registrado.js"></script>


  

</body></html>