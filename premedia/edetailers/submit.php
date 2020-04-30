<?php
	if(!isset($_POST['name'], $_POST['email'], $_POST['message'])) return;

	$name = htmlspecialchars($_POST['name'], ENT_DISALLOWED, 'UTF-8' );
	$email = htmlspecialchars($_POST['email'], ENT_DISALLOWED, 'UTF-8' );
	$phone = htmlspecialchars($_POST['phone'], ENT_DISALLOWED, 'UTF-8' );
	$company = htmlspecialchars($_POST['company'], ENT_DISALLOWED, 'UTF-8' );
	$message = htmlspecialchars($_POST['message'], ENT_DISALLOWED, 'UTF-8' );

	$to = 'info@vakilsonline.com';

	$subject = 'New Form Submission';

	$body = 'Name: ' . $name . '\r\n' .
			'Email: ' . $email . '\r\n' .
			'Phone: ' . $phone . '\r\n' .
			'Company: ' . $company . '\r\n' .
			'\r\n' . $message;

	$headers = 	'From: ' . 'something@vakilsonline.com' . '\r\n' .
				'Reply-To: ' . $email . '\r\n' .
				'MIME-Version: 1.0' . '\r\n' .
				'X-Mailer: PHP/' . phpversion();

	echo mail($to, $subject, $body, $headers);
	exit;
?>