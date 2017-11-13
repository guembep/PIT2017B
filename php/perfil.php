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
		
		$subir->imagen = $_FILES['imagen'];
		$ia = $_FILES['imagen'];
		$ias = $_FILES['imagen']['name'];

	
		$subir->type = $_FILES['imagen']['type'];
		$subir->size = $_FILES['imagen']['size'];
		
    	$subir->tmpa=$_FILES['imagen']['tmp_name'];
             $subir->subirImagen($id);
             
             $temp=$_FILES['imagen']['tmp_name'];
              $type =$_FILES['imagen']['type'];
              $names1 ='imagenperfil';
                  $images1=$id;
                $images1.=$ias;
                $var=$names1."/".$images1;
               
              if($subir->error==false){
                  $resize=new Redimensionar($var,$type,$tmp);
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
<link rel="stylesheet" href="/css/index.css">
    <!-- Bootstrap core CSS -->
   <link href="/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->

 <link href="/css/popup.css" rel="stylesheet">
    <link href="/css/popup.css" rel="stylesheet">
    
     <link rel="stylesheet" href="/css/popper.css">
     <link rel="stylesheet" href="/css/index.css">

<!--------------HighChart------------->

<script src="/js/data.js"></script>
<script src="/js/drilldown.js"></script>
  <script src="/js/highcharts.js"></script>
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
                <li class="nav-item">
                     <a class="nav-link" id="linkconvocatorias" href="#">Estadísticas</a>
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

<div id="openModal" class="modalDialog">
    <div>
    <a href="#close" title="Close" class="close">X</a>
 
            
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

 <div id="padre">
	<div id="recuadro">
				
				<div id="foto">
				<?php 
	 
					echo "";
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
<div id="divboton">
      <p id="botonedita"><a class="btn btn-primary btn-lg" href="#openModal" role="button">Edita tus datos personales »</a> </p>
</div>


       


<div id="contenedor">
<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
</div>
		<script type="text/javascript">


// Create the chart
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Resultados'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: '%'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Partidos ganados',
            y: 50.00,
            drilldown: 'Microsoft Internet Explorer'
        }, {
            name: 'Partidos perdidos',
            y: 25.00,
            drilldown: 'Chrome'
        }, {
            name: 'Partidos empatados',
            y: 25.00,
            drilldown: 'Firefox'
        }]
    }],
    drilldown: {
        series: [{
            name: 'Microsoft Internet Explorer',
            id: 'Microsoft Internet Explorer',
            data: [
                [
                    'v11.0',
                    24.13
                ],
                [
                    'v8.0',
                    17.2
                ],
                [
                    'v9.0',
                    8.11
                ]
            ]
        }, {
            name: 'Chrome',
            id: 'Chrome',
            data: [
                [
                    'v40.0',
                    5
                ],
                [
                    'v41.0',
                    4.32
                ],
                [
                    'v42.0',
                    3.68
                ],
                [
                    'v39.0',
                    2.96
                ],
                [
                    'v36.0',
                    2.53
                ],
                [
                    'v43.0',
                    1.45
                ],
                [
                    'v31.0',
                    1.24
                ],
                [
                    'v35.0',
                    0.85
                ],
                [
                    'v38.0',
                    0.6
                ],
                [
                    'v32.0',
                    0.55
                ],
                [
                    'v37.0',
                    0.38
                ],
                [
                    'v33.0',
                    0.19
                ],
                [
                    'v34.0',
                    0.14
                ],
                [
                    'v30.0',
                    0.14
                ]
            ]
        }, {
            name: 'Firefox',
            id: 'Firefox',
            data: [
                [
                    'v35',
                    2.76
                ],
                [
                    'v36',
                    2.32
                ],
                [
                    'v37',
                    2.31
                ],
                [
                    'v34',
                    1.27
                ],
                [
                    'v38',
                    1.02
                ],
                [
                    'v31',
                    0.33
                ],
                [
                    'v33',
                    0.22
                ],
                [
                    'v32',
                    0.15
                ]
            ]
        }, {
            name: 'Safari',
            id: 'Safari',
            data: [
                [
                    'v8.0',
                    2.56
                ],
                [
                    'v7.1',
                    0.77
                ],
                [
                    'v5.1',
                    0.42
                ],
                [
                    'v5.0',
                    0.3
                ],
                [
                    'v6.1',
                    0.29
                ],
                [
                    'v7.0',
                    0.26
                ],
                [
                    'v6.2',
                    0.17
                ]
            ]
        }, {
            name: 'Opera',
            id: 'Opera',
            data: [
                [
                    'v12.x',
                    0.34
                ],
                [
                    'v28',
                    0.24
                ],
                [
                    'v27',
                    0.17
                ],
                [
                    'v29',
                    0.16
                ]
            ]
        }]
    }
});
		</script>
		

		
		
		
		
		
		
<div id=easyt>
    <footer>
        <p id="easy">© Easy2Train 2017</p>
    </footer>
  </div>
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
      <script language="javascript" type="text/javascript" src="/js/popper.js"></script>
      <!-- Para cuando estas registrado-->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.js"></script>



</body></html>