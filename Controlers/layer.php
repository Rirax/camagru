<?php

session_start();

require_once('../Config/setup.php');

if ($_POST['img'] && $_POST['flt'] && $_SESSION['auth'])
{
	$img = $_POST['img'];
	$sticker = $_POST['flt'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$today = date("Y-m-d@H:i:s");
	$link = "../pic/"."{$_SESSION['auth']['pic_id']}"."@"."{$today}".".png";
	file_put_contents($link, $data);
	
	$source = imagecreatefrompng($sticker);
	$largeur_source = imagesx($source);
	$hauteur_source = imagesy($source);
	imagealphablending($source, true);
	imagesavealpha($source, true);
	if ($destination = imagecreatefrompng($link))
	{
		$largeur_destination = imagesx($destination);
		$hauteur_destination = imagesy($destination);
		$destination_x = ($largeur_destination - $largeur_source) / 2;
		$destination_y = ($hauteur_destination - $hauteur_source) / 2;
		imagecopy($destination, $source, $destination_x, $destination_y, 0, 0, $largeur_source, $hauteur_source);
		imagepng($destination, $link);
		imagedestroy($destination);
		imagedestroy($source);
		$req = $db->prepare("INSERT INTO gallery SET user_id = ?, link = ?, taken_on = NOW()");
		$req->execute(array($_SESSION['auth']['user_id'], $link));
	}
}

else {
	header('Location: ../Views/home.php');
}
