<?php
if(
	isset($_SERVER['HTTP_X_REQUESTED_WITH']) 
	&& !empty($_SERVER['HTTP_X_REQUESTED_WITH'])
	&& (strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])=="xmlhttprequest") &&
	isset($_POST['mail']) && isset($_POST['body'])
)
{
	require dirname(__FILE__).'/phpmailer/PHPMailerAutoload.php';
	$email = new PHPMailer();
		
	$to      = $_POST['mail'];
	$message = sprintf('<html><head><title>%s</title></head>%s</html>',$subject,$_POST['body']);
	
/*
	$email->isSMTP();
	$email->Host = '';
	$email->SMTPAuth = true;
	$email->Username = '';
	$email->Password = '';
	$email->SMTPSecure = 'tls';
*/
	
	
	$email->From      = 'office@creativform.com';
	$email->FromName  = 'Creativ Form';
	$email->Subject   = 'RC Mail Builder Test '.date('F j, Y. H:i:s');
	$email->Body      = replace("/\<[\/]{0,1}button[^\>]*\>/i", "", $message);
	$email->IsHTML(true);
	$email->AddAddress( $_POST['mail'] );
	
	// Add attachments
	$attachments = $_POST['attachments'];
	if(!empty($attachments))
	{
		$attachments=json_decode($attachments,true);
		if(is_array($attachments) && count($attachments)>0)
		{
			foreach($attachments as $i=>$attach)
			{
				$file_to_attach = dirname(dirname(__FILE__)).'/attachment/'.$attach;
				if(file_exists($file_to_attach))
					$email->AddAttachment( $file_to_attach , $attach );
			}
		}
	}
		
	$send = $email->Send();
	
	if($send)
		echo 'true';
	else
		echo 'false';
	exit();
}
else
{
	echo 'false';
	exit();
}
?>