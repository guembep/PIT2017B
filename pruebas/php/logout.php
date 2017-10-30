<?php
	ini_set('session.gc_maxlifetime', 3600);
	session_set_cookie_params(3600);
	session_start();
	if(isset($_SESSION['id'])){
		session_destroy();
		$data['estado'] = 'ok';
	}
	header('Content-type: application/json; charset=utf-8');
	echo json_encode($data);
?>