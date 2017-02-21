<?php

session_start();

require_once('../Config/setup.php');

if($_POST['like'] && isset($_SESSION['auth']))
{
	if ($_POST['like'] == 'true')
	{
		$req = $db->prepare('INSERT INTO likes SET user_id = ?, image_id = ?');
		$req->execute(array($_SESSION['auth']['user_id'], $_POST['image_id']));
		die();
	}
	if ($_POST['like'] == 'false') 
	{
		$req = $db->prepare('DELETE FROM likes WHERE user_id = ? AND image_id = ?');
		$req->execute(array($_SESSION['auth']['user_id'], $_POST['image_id']));
	}
}
?>