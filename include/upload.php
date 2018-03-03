<?php define( '_PCSD_', 1);

include dirname(__FILE__).'/class/class-upload.php';

if(
	isset($_SERVER['HTTP_X_REQUESTED_WITH']) 
	&& !empty($_SERVER['HTTP_X_REQUESTED_WITH'])
	&& (strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])=="xmlhttprequest") &&
	isset($_POST['session_id']) && isset($_POST['option'])
)
{
	header('Content-type:application/json');
	$results=array();
	$dir = dirname(dirname(__FILE__)).'/attachment/';
	
	switch($_POST['option']){
		default:
			echo json_encode(array('return'=>false,'meddage'=>'No POST data provided.')); exit;
		break;
		case 'upload':
			foreach($_FILES['attachment']["name"] as $i=>$file){
				
				$name = str_replace('.'.end(explode('.',$file)),'',$file);
				
				$option=array(
					'location' 		=>  $dir,
					'new_name' 		=> $_POST['session_id'].'_'.$name,
					'i'				=>	$i,
				);
				
				$upload=new upload('attachment', $option);
				$results[]=$upload->result();
			}
			echo json_encode($results); exit;
		break;
		case 'remove':
			$filename = $_POST['filename'];
			if(file_exists($dir.$filename)){
				@unlink($dir.$filename);
				echo json_encode(array('return'=>true)); exit;
			}
			else
			{
				echo json_encode(array('return'=>false)); exit;
			}
		break;
	}
}
else
{
	exit("Wrong way...");
}