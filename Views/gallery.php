<?php 
	session_start();

	require '../Config/setup.php';

	$req = $db->prepare("SELECT * FROM gallery");
	$req->execute();
	$pics = $req->fetchAll();

	$max = $i = count($pics);
	$post_per_page = 5;
	$page_max = ceil($max / $post_per_page);


	if ($_GET && $_GET['p'] && is_numeric($_GET['p']) == true) {
		(int)$page = $_GET['p'];
	}
	else {
		$page = 1;
	}

	if ((int)$page > (int)$page_max && $max) {
		$redir = 'Location: ../Views/gallery.php?p='.(string)$page_max;
		header($redir);
		exit();
	}

	require '../Views/header.php';
	
	while ((--$i - (($page - 1) * $post_per_page)) >= 0 && $tmp < 5) {
		echo "<img src='".$pics[$i - (($page - 1) * $post_per_page)]['link']."'/><br>";
		$tmp++;
	}

	for ($i = 1; $i <= $page_max; $i++) { 
			echo "<a href='http://localhost:8080/camagru/Views/gallery.php?p=".$i."'>Page ".$i."</a>";
			if ($i != $page_max) {
				echo " ";
			}
	}
	
 ?>