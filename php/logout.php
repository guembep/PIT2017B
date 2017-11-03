<?php
	session_start();
	if(isset($_SESSION['id'])){
		session_destroy(); // destroy session
		setcookie("PHPSESSID","",time()-3600,"/"); // delete session cookie 
		$data['estado'] = 'ok';
	}
	header('Content-type: application/json; charset=utf-8');
	echo json_encode($data);
?>