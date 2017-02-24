<?php

session_start();

require('../Config/setup.php');

if($_POST['comment'] && $_POST['image_id'] && isset($_SESSION['auth']))
{
	$req = $db->prepare('INSERT INTO comments SET user_id = ?, image_id = ?, text_comment = ?');
	$req->execute(array($_SESSION['auth']['user_id'], $_POST['image_id'], $_POST['comment']));
	$req = $db->prepare('SELECT user_id FROM gallery WHERE pic_id = ?');
	$req->execute(array($_POST['image_id']));
	$var = $req->fetch();
//regler ici LIGNE 12
	if ($_SESSION['auth']['user_id'] != $var['user_id'])
	{
		$req = $db->prepare('SELECT username, email FROM users WHERE id = ?');
		$req->execute(array($var['user_id']));
		$ui = $req->fetch();
		$page = getPageImage($db, $_POST['image_id']);
		$link = "http://localhost:8080/camagru/Views/gallery.php?p=".$page."#i".$_POST['image_id'];
		echo $link;
		//sendEmailComment($ui['username'], $ui['email'], $_SESSION['username'], $link);
	}
	else
	{
		echo "this is picture";
	}
}

?>