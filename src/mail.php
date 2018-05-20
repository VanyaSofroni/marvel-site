<?php

$recepient = "mail.@mail.com"; //change
$siteName = "Название сайта \"Бренд\" "; //change

$pp_name = trim($_POST["pp_name"]);
$pp_surname = trim($_POST["pp_surname"]);
$pp_email = trim($_POST["pp_email"]);
$pp_subject = trim($_POST["pp_subject"]);
$pp_textarea = trim($_POST["pp_text"]);

$titleMail = "Новая заявка с сайта $siteName ";
$message = "
			ТЕМА:  $pp_subject

			ИМЯ:  $pp_name
			ФАМИЛИЯ:  $pp_surname
			EMAIL:  $pp_email
			
			СООБЩЕНИЕ:  $pp_textarea
";

mail($recepient, $titleMail, $message, "MIME-Version: 1.0\n Content-type: text/plain; charset=\"utf-8\" \n From: $recepient");

?>