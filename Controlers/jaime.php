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

<?php 

echo "<img id='i{$value->id}' class='img_size' src='"."{$value->link}"."''>";
		echo "<div class='comment{$value->id} comment'>";
		getComments($db, $value->id);
		echo "</div>";
		if ($_SESSION['id']) {
		print_r("<div class='interaction'>");
		if($on)
		{
			echo "<i id='{$value->id}' class='fa fa-heart heart_s' aria-hidden='true' onclick='likeImg(this.id)' onclick='likeImg(this.id)' style='font-size: 28px;color:red;'></i>";
		}
		else
		{
			echo "<i id='{$value->id}' class='fa fa-heart-o heart_s' aria-hidden='true' onclick='likeImg(this.id)' style='font-size: 28px;@media screen and (min-width: 200px) and (max-width: 1024px){font-size: 57px;}'></i>";
		}
		echo "<input id='c{$value->id}' class='comment' type='text' placeholder='Add comment...' autocomplete='off' onkeypress='comment({$value->id})'>";
		print_r('</div>');
		}
		print_r('</div>');