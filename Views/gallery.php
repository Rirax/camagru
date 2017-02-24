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

	function getcomments($db, $image_id)
	{
		$req = $db->prepare('SELECT user_id, text_comment FROM comments WHERE image_id = ? ORDER BY id DESC');
		$req->execute(array($image_id));
		$var = $req->fetchAll(PDO::FETCH_CLASS);
		if ($var)
		{
			foreach ($var as $key => $value) {
				$user = findUser($db, $value->user_id);
				$user = htmlentities($user);
				$comment =htmlentities($value->text_comment);
				echo "<h4 class='commentaire'>{$user}</h4><p class='com'> {$comment}</p>";
				echo "<br>";
			}
		}
	}

	foreach ($pics as $key => $value) {
		$req2 = $db->prepare('SELECT * FROM likes WHERE image_id = ? AND user_id = ?');
		$req2->execute(array($value['pic_id'], $_SESSION['auth']['user_id']));
		$ok = $req2->fetch();
		print_r($value['pic_id']);
		
		while ((--$i - (($page - 1) * $post_per_page)) >= 0 && $tmp < 5) 
		{
				echo "<img src='".$pics[$i - (($page - 1) * $post_per_page)]['link']."'/><br>";
				echo "<div class='comment{$value['pic_id']} comment'>";
				getcomments($db, $value['pic_id']);
				echo ("</div>");
				print_r("<div class='jaime'>");
					if ($ok)
					{
						echo "<i id='{$value['pic_id']}' class='fa fa-heart' aria-hidden='true' onclick='likeImg(this.id)' style='font-size: 28px;color:red;'></i>";
					}
					else
					{	
						echo "<i id='{$value['pic_id']}' class='fa fa-heart-o' aria-hidden='true' onclick='likeImg(this.id)' style='font-size: 28px;@media screen and (min-width: 200px) and (max-width: 1024px){font-size: 57px;}'></i>";
					}
					echo "<input id='c{$value['pic_id']}' class='comment' type='text' placeholder='Add a comment...' autocomplete='off' onkeypress='comment({$value['pic_id']})'>";
				}
				print_r('</div>');
			$tmp++;
	}

	for ($i = 1; $i <= $page_max; $i++) { 
			echo "<a href='http://localhost:8080/camagru/Views/gallery.php?p=".$i."'>Page ".$i."</a>";
			if ($i != $page_max) {
				echo " ";
			}
	}
	
	require '../Views/footer.php';
?>