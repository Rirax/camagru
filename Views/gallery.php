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

	foreach ($pics as $key => $value) {
		$req2 = $db->prepare('SELECT * FROM likes WHERE image_id = ? AND user_id = ?');
		$req2->execute(array($value['pic_id'], $_SESSION['auth']['user_id']));
		$ok = $req2->fetch();
		//var_dump($ok);
	
			while ((--$i - (($page - 1) * $post_per_page)) >= 0 && $tmp < 5) {
				echo "<img src='".$pics[$i - (($page - 1) * $post_per_page)]['link']."'/><br>";
					if ($ok)
					{
						echo "<i id='{$value['pic_id']}' class='fa fa-heart' aria-hidden='true' onclick='likeImg(this.id)' style='font-size: 28px;color:red;'></i>";
					}
					else
					{	
						echo "<i id='{$value['pic_id']}' class='fa fa-heart-o' aria-hidden='true' onclick='likeImg(this.id)' style='font-size: 28px;@media screen and (min-width: 200px) and (max-width: 1024px){font-size: 57px;}'></i>";
					}
				}
				$tmp++;
					//pic id à remplacer par image_id
	}

	for ($i = 1; $i <= $page_max; $i++) { 
			echo "<a href='http://localhost:8080/camagru/Views/gallery.php?p=".$i."'>Page ".$i."</a>";
			if ($i != $page_max) {
				echo " ";
			}
	}
	
	require '../Views/footer.php';
?>