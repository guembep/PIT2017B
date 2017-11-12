<?php
	session_start();
	if(isset($_SESSION['id'])){
		$data['id']=$_SESSION['id'];
		$data['email']=$_SESSION['email'];
		$data['idequipo']=$_SESSION['idequipo'];
		$data['equipo']=$_SESSION['equipo'];
		$data['deporte']=$_SESSION['deporte'];
		$data['user']=$_SESSION['user'];
	}else{
		$data['estado']='not logged';
	}
	header('Content-type: application/json; charset=utf-8');
	echo json_encode($data);