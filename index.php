<?php

if(isset($_COOKIE["Verified"])) {
	$session_key  = trim(file_get_contents("./security/current_user.txt")); //and our stored passwor
	if(intval($_COOKIE["Verified"]) == intval($session_key)) {
		header("Location: pass-protected.php");
	}
}

$user = ""; //prevent the "no index" error from $_POST
$pass = "";
if (isset($_POST['user'])){ //check for them and set them so
	$user = trim($_POST['user']);
}
if (isset($_POST['pass'])){ //so that they don't return errors
$pass = trim($_POST['pass']);
}    

$useroptions = ['cost' => 8,]; //all up to you
$pwoptions   = ['cost' => 8,]; //all up to you
$userhash    = password_hash($user, PASSWORD_BCRYPT, $useroptions); //hash entered user
$passhash    = password_hash($pass, PASSWORD_BCRYPT, $pwoptions);  //hash entered pw
$hasheduser  = file_get_contents("./security/username.txt"); //this is our stored user
$hashedpass  = file_get_contents("./security/password.txt"); //and our stored password

if ((password_verify($user, $hasheduser)) && (password_verify($pass,$hashedpass))) {
// the password verify is how we actually login here
// the $userhash and $passhash are the hashed user-entered credentials
// password verify now compares our stored user and pw with entered user and pw

	$session_key = strval(mt_rand());
	file_put_contents("./security/current_user.txt", $session_key);
	setcookie("Verified", $session_key, time() + 60 * 60, "/");
	header("Location: pass-protected.php");
} 
else // if it was invalid it'll just display the form, if there was never a $_POST
	 // then it'll also display the form. that's why I set $user to "" instead of a $_POST
{?>  
	<html>
	<head>
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">

		<!-- Latest compiled and minified JavaScript -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
	</head>
	<body>

		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-4">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">Yale Experience Project</a>
				</div>
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-4">
					<p class="navbar-text"></p>
				</div>
			</div>
		</nav>

		<?php

			if($pass != "" && $user != "") { ?>
				<div class="row">
				<div class="col-md-offset-3 col-md-6">
				<div class="alert alert-danger" role="alert">
			  	  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				  <span class="sr-only">Error:</span>
				  Username/Password combination invalid
				</div>
				</div>
				</div>
			<?php } ?>

		<div class="row">
		<div class="col-md-offset-3 col-md-6">
				<div class="panel panel-default">
					<div class="panel-body">
						<form method="POST" action="index.php">
							<div class="form-group">
								<label for="exampleInputEmail1">Username</label>
								<input type="username" class="form-control" name="user" placeholder="Enter Username">
							</div>
							<div class="form-group">
								<label for="exampleInputPassword1">Password</label>
								<input type="password" class="form-control" name="pass" placeholder="Password">
							</div>
							<button type="submit" name="submit" class="btn btn-default">Submit</button>
						</form>
					</div>
				</div>

			</div>
		</div>

	</body>
	</html>
	<?php 
} 
?>