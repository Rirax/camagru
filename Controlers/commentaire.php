<?php

session_start();

require('../Config/setup.php');

function sendEmailComment($name, $email, $user, $comment)
{ 
	// Mail
	$objet = ''.$user.' vient de poster un commentaire' ;
	$contenu = '
	<html>
	<head>
		<title>Activation Camagru</title>
		<link href="https://fonts.googleapis.com/css?family=Bungee+Shade|Amatic+SC|Cantarell" rel="stylesheet">
	</head>
	<body>
		<h1 style="font-family:Amatic SC;">Hello '.$name.' !</h1>
		<p>'.$user.' vient de commenter votre <a href='.$comment.'>photo</a></p>
		</body>
		</html>';
		$entetes =
		'Content-type: text/html; charset=utf-8' . "\r\n" .
		'From: Camagru@domain.tld' . "\r\n" .
		'Reply-To: Camagru@domain.tld' . "\r\n" .
		'X-Mailer: PHP/' . phpversion();
	//Envoi du mail
		mail($email, $objet, $contenu, $entetes);
}

if($_POST['comment'] && $_POST['image_id'] && isset($_SESSION['auth']))
{
	$com = $_POST['comment'];
	$com = trim($com);
	if (strlen($com) <= 250 && strlen($com) > 0)
	{
		$req = $db->prepare('INSERT INTO comments SET user_id = ?, image_id = ?, text_comment = ?');
		$req->execute(array($_SESSION['auth']['user_id'], $_POST['image_id'], $_POST['comment']));
		$req = $db->prepare('SELECT user_id FROM gallery WHERE pic_id = ?');
		$req->execute(array($_POST['image_id']));
		$var = $req->fetch();
	}
	if ($_SESSION['auth']['user_id'] != $var['user_id'])
	{
		$req = $db->prepare('SELECT username, email FROM users WHERE id = ?');
		$req->execute(array($var['user_id']));
		$ui = $req->fetch();
		$page = getPageImage($db, $_POST['image_id']);
		$link = "http://localhost:8080/camagru/Views/gallery.php?p=".$page."#i".$_POST['image_id'];
		echo $link;
		sendEmailComment($ui['username'], $ui['email'], $_SESSION['username'], $link);
	}
	else
	{
		echo "this is picture";
	}
}

?>