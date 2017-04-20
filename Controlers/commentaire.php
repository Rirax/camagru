<?php

session_start();

require('../Config/setup.php');

if($_POST['comment'] && $_POST['image_id'] && isset($_SESSION['auth']))
{
	$com = $_POST['comment'];
	$pic_id = intval(str_replace("c", "", $_POST['pic_id']));
	$com = trim($com);
	if (strlen($com) <= 250 && strlen($com) > 0)
	{
		$db->prepare('INSERT INTO comments SET text_comment = ?, image_id = ?, user_id = ?')->execute(array($com, $image_id, $_SESSION['auth']['user_id']));
		$req = $db->prepare('SELECT user_id FROM gallery WHERE pic_id = ?');
		$req->execute(array($pic_id));
		$var = $req->fetch();
		var_dump($var);
	}
	if ($var)
	{
		if ($_SESSION['auth']['user_id'] != $var['user_id'])
		{
			$req = $db->prepare('SELECT email FROM users WHERE id = ?');
			$req->execute(array($var['user_id']));
			$email = $req->fetch();
			$mail = $email['email'];
			mail($mail, "Camagru - picture comment", "Someone commented on one of your pictures, go see what they said about it !\nhttp://localhost:8080/camagru/Views/gallery.php?p=".$_POST['page']."#".$pic_id);
		}
	}
}
else
{
	echo "this is picture";
}

?>