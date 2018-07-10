<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=divice-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		<title>INCOM Computación</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
		<link rel="shortcut icon" href="img/mini.png"/>
		<link href='http://fonts.googleapis.com/css?family=Asap:400,700' rel='stylesheet' type='text/css'>
		<script src="custom.js" type="text/javascript"></script>
      <script src="jquery.js" type="text/javascript"></script>
	</head>
	<body>

<?php
	require 'PHPMailer/PHPMailerAutoload.php';

	$mail = new PHPMailer;

	$to = "ventas@incom.com.uy";

	$nombre = $_POST['name'];
	$celular = $_POST['mobile'];
	$telefono = $_POST['phone'];
	$email = $_POST['email'];
	$mensaje = nl2br($_POST['mensaje']);

		echo '<br><div class="mensaje container alert alert-success ">Mensaje Enviado Con Exito.<a href="index.html">Pulse aquí</a> para volver.</div>';
		$mail->From = $email;
		$mail->addAddress($to);
		$mail->isHtml(true);
		$mail->Body = '<strong>Nombre:</strong>  '.$nombre.'<br><br><strong>Celular:</strong>  '.$celular.'<br><br><strong>Correo de contacto:</strong>  '.$email.'<br><br><strong>Teléfono:</strong>  '.$telefono.'<br><br><strong>Nos a enviado el siguiente mensaje:<br><br></strong><p>'.$mensaje.'</p>';
		$mail->CharSet = 'UTF-8';
		$mail->send();

?>
	</body>

</html>
