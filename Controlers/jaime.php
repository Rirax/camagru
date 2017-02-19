<?php

session_start();

require_once('config/database.php');
if($_POST['like'])
{
	if ($_POST['like'] == 'true')
	{
		$req = $db->prepare('INSERT INTO likes SET 	user_id = ?, image_id = ?');
		$req->execute(array($_SESSION['id'], $_POST['image_id']));
	}
	if ($_POST['like'] == 'false') 
	{
		$req = $db->prepare('DELETE FROM likes WHERE user_id = ? AND image_id = ?');
		$req->execute(array($_SESSION['id'], $_POST['image_id']));
	}

?>