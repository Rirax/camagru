<?php
	session_start();


	$req = $db->prepare("SELECT * FROM gallery");
	$req->execute();
	$pic = $req->fetch();

?>