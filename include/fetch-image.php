<?php define( '_PCSD_', 1);
header('Content-type:application/json');
if(
	isset($_SERVER['HTTP_X_REQUESTED_WITH']) 
	&& !empty($_SERVER['HTTP_X_REQUESTED_WITH'])
	&& (strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])=="xmlhttprequest")
)
{
    switch($_POST['option']){
		default:
			echo json_encode(array('return'=>false,'message'=>'No POST data provided.')); exit;
		break;
    
            
            
        case 'save':
            function filePath($filePath)
            {
                $fileParts = pathinfo($filePath);
                if(!isset($fileParts['filename']))
                {
                    $fileParts['filename'] = substr($fileParts['basename'], 0, strrpos($fileParts['basename'], '.'));
                }
                return $fileParts;
            }

            // get URL
            $srcfile = $_POST['url'];
            $hash = (string)$_POST['id'];
            $base = (string)$_POST['base'];
            
            /*if(!@getimagesize($srcfile)){
                echo json_encode(array('return'=>false,'message'=>'Image not exists or you not have proper format.')); exit; return;
            }*/

            // fix URL
            $fileInfo = filePath($srcfile);
            $name = '_'.$hash.'_'.$fileInfo['basename'];

            // Setup attachment
            $dstfile=dirname(dirname(__FILE__)).'/attachment/'.$name;
            
            if(!file_exists(dirname($dstfile)))
                mkdir(dirname($dstfile), 0755, true);
            
            if(file_exists($dstfile)) 
                    @unlink($dstfile);

            // Let's put into folder
            if(@copy($srcfile, $dstfile))
            {
                $stat = stat(dirname($dstfile));
                $data = posix_getpwuid($stat['uid']);
                if(isset($data['name']) && !empty($data['name'])){
                //    @chown($dstfile, $data['name']);
                //    @chmod($dstfile, 0644);
                }
                echo json_encode(array(
                    'return'=>true,
                    'src'=>$base.'/attachment/'.$name,
                    'name'=>$name
                )); exit;
            }
            else
                echo json_encode(array('return'=>false,'message'=>'You don\'t have permission to upload this image. Try another one.')); exit;
        break;
            
            
        case 'clean':
            $clean = (isset($_POST['clean'])?$_POST['clean']:false);
            if($clean!==false)
            {
                $dstfile=dirname(dirname(__FILE__)).'/attachment/'.$clean;
                if(file_exists($dstfile))
                {
                    @unlink($dstfile);
                    echo json_encode(array('return'=>true,'removed'=>$clean)); exit;
                }
                else
                {
                     echo json_encode(array('return'=>false,'message'=>"Can't delete image what not exists.",'patch'=>$dstfile)); exit;
                }
            }
            else
            {
                 echo json_encode(array('return'=>false,'message'=>"POST data missing",'patch'=>$dstfile)); exit;
            }
        break;
            
        case 'destroy':
            $clean = (isset($_POST['clean'])?$_POST['clean']:false);
            $path = dirname(dirname(__FILE__)).'/attachment/';
            $search = glob($path.'*_'.$clean.'_*');
            $array = array();
            foreach ($search as $find)
            { 
                if (preg_match("/\.(^|\b)\.((pn|bp|jpe?)?(g)(if)?|(webp|bm)(p))(\b|$)/i",$find)) 
                {
                    if(file_exists($path.$find))
                    {
                        @unlink($path.$find);
                        $array[]= array('removed'=>$path.$find);
                    }
                }
            }
            if(count($array)>0)
            {
                echo json_encode(array('return'=>true,'data'=>$array)); exit;
            }
            else
            {
                echo json_encode(array('return'=>false)); exit;
            }
        break;
            
            
        case 'generate':
            function base64_to_jpeg($base64_string, $output_file, $base) {
                $parse = explode(',', $base64_string);
                $data = base64_decode($parse[1]);
                $ext = preg_replace('@(;base64)@i', '', $parse[0]);
                $ext = preg_replace('@(data:image/)@i', '', $ext);
                
                if(file_exists($output_file.'.'.$ext)) 
                    @unlink($output_file.'.'.$ext);
                
                file_put_contents($output_file.'.'.$ext, $data);
                
                return (object) array(
                    'url'   =>  $base.'.'.$ext.'?v='.time().mt_rand(1000,9999),
                    'patch'   =>  $output_file.'.'.$ext,
                    'type'   =>  'image/'.$ext,
                    'extension'   =>  $ext,
                    'encoded'   =>  $base64_string
                );
            }
            
            $image = $_POST['image'];
            $name = $_POST['name'];
            $base = $_POST['base'];
            
            $name = preg_replace("/(\.(jpe?g|gif|png|webp|bpg|bmp))/Ui","",$name);
            
            $name = '_render'.$name;
            
            $dstfile=dirname(dirname(__FILE__)).'/attachment/'.$name;
            $base = $base.'/attachment/'.$name;
            
            $return = base64_to_jpeg($image, $dstfile, $base);
            echo json_encode(array('return'=>true, 'image'=>$return, 'name'=>$name.'.'.$return->extension, 'original' => $_POST['name'])); exit;
        break;
    }
}
else
{
    echo json_encode(array('return'=>false,'message'=>'This file is not called on proper way.')); exit;
}