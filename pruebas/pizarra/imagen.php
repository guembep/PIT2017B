<?php

	$data = $_POST['data'];
	header('Content-type: application/json; charset=utf-8');
	print json_encode($data);


?>