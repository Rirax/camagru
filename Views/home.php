<?php 
	session_start();

	require '../Config/setup.php';

	if (!$_SESSION['auth'] || !isset($_SESSION['auth']))
	{
		header('Location: ../Views/sign_in.php?redirect=unsigned');
	}

 ?>
 		<link rel="stylesheet" href="../Css/home.css">
		<div id="content">
		<div id="rendu_final">
			<video class="video" id="video"></video>
		</div>

		<canvas id="canvas"></canvas>
			<div id= "bouton">
			<button id="startbutton">Take a picure!</button>	
			    <button id="fileToUpload" onclick="document.getElementById('file').click();">Select image to upload:</button>
					</div>
						<form  method="post" enctype="multipart/form-data">
						    <input type="file" name="fileToUpload" id="file"/>
						</form>
			<table>
					<td><input type="checkbox" id="cb1" onclick="selectOnlyThis(this.id)">Filter 1</option></td>
					<td><input type="checkbox" id="cb2" onclick="selectOnlyThis(this.id)">Filter 2</option></td>
					<td><input type="checkbox" id="cb3" onclick="selectOnlyThis(this.id)">Filter 3</option></td>
			</table>
			</div>
		</div>

		<script src="../Js/webcamHandle.js"></script>
		<script src="../Js/script.js"></script>
<?php 

$req = $db->prepare("SELECT * FROM gallery WHERE user_id = ?");
	$req->execute(array($_SESSION['auth']['user_id']));
	$pic = $req->fetchAll();

	$i = count($pic);

	require '../Views/header.php';

	if ($i > 0) {
		while (--$i >= 0)
		{
			echo "<img id='".$pic[$i]['pic_id']."' src='".$pic[$i]['link']."' onclick='deletePic(this.id)' class='picture' /><br>";
		}
	}

	require '../Views/footer.php' ?>
