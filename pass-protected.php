<?php
if(!isset($_COOKIE["Verified"]))
	header("Location: index.php");
else {
		$session_key  = trim(file_get_contents("./security/current_user.txt")); //and our stored passwor
		$a = 0;
		if(intval($_COOKIE["Verified"]) != intval($session_key)) {
			header("Locations: index.php");
		}
	}
	?>

	<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=640, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"/>
		<title>Tower man</title>
		<script src='http://cdn.html5quintus.com/v0.1.6/quintus-all.js'></script>
		<script src='game.js'></script>
		<style> body { padding:0px; margin:0px; background-color:black ; }  </style>
	</head>
	<body>
	</body>
	</html>