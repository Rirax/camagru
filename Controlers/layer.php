<?php

session_start();

require_once('../Config/setup.php');

if ($_POST['img'] && $_SESSION['auth']) {
	$img = $_POST['img'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$today = date("Y-m-d@H:i:s");
	$link = "../pic/"."{$_SESSION['auth']['username']}"."@"."{$today}".".png";
	file_put_contents($link, $data);
	$req = $db->prepare("INSERT INTO gallery SET user_id = ?, link = ?, taken_on = NOW()");
	$req->execute(array($_SESSION['auth']['user_id'], $link));

}
else {
	header('Location: ../Views/home.php');
}
?>