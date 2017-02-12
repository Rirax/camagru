<?php 

	session_start();
	require_once '../Config/setup.php';

	$req = $db->prepare("SELECT * FROM gallery");
	$req->execute();
	$pic = $req->fetchAll();
	$i = count($pic);

	require '../Views/header.php';
	while (--$i >= 0) {
		echo "<img id='".$i."' src='".$pic[$i]['link']."'/><br>";
	}

?>