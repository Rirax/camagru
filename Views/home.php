<?php 
	session_start();

	if (!$_SESSION['auth'] || !isset($_SESSION['auth']))
		header('Location: ../Views/sign_in.php?redirect=unsigned');

	require '../Views/header.php';
 ?>

		<div id="content">
		<div id="rendu_final">
			<video class="video"id="video"></video>
			<!-- <div id="filter_prev" class = "filter1"></div> -->
		</div>

		<canvas id="canvas"></canvas>
			<div id= "bouton">
			<button id="startbutton">Take a picure!</button>
				
			<form action="../Controlers/upload.php" method="post" enctype="multipart/form-data">
			    Select image to upload:
			    <input type="file" name="fileToUpload" id="fileToUpload">
			    <input type="submit" value="Upload Image" name="submit">
			</form>
			<table>
					<td><input type="checkbox" id="cb1" onclick="selectOnlyThis(this.id)">Filter 1</option></td>
					<td><input type="checkbox" id="cb2" onclick="selectOnlyThis(this.id)">Filter 2</option></td>
					<td><input type="checkbox" id="cb3" onclick="selectOnlyThis(this.id)">Filter 3</option></td>
				</form>
				</select>
				<input id = "filter_button" type="submit" VALUE="filter"/>
			</table>
			</div>
		</div>

		<script src="../Js/webcamHandle.js"></script>
		<!-- <script type="text/javascript" src= "../Js/filter_preview.js"></script> -->
		<script src="../Js/script.js"></script>


<?php require '../Views/footer.php' ?>
