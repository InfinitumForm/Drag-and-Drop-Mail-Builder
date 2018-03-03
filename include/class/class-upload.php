<?php defined( '_PCSD_' ) or die( 'ERROR: It is forbidden to go directly to this pages!' );
/*------------------------------------------------------------------------
# author    Ivijan-Stefan Stipic
# copyright Copyright (C) 2015 CreativForm. All Rights Reserved
# generator CreativeCore 1.0
# license   Licensed under MIT (http://creativform.com/MIT-License)
# website   www.CreativForm.com
-------------------------------------------------------------------------*/
class upload
{
	/**
		Universal function for uploading files created by: Ivijan-Stefan Stipic
		@copyright: Ivijan-Stefan Stipic 23.04.2014.
		@version: 2.0.0 BETA Updated 21.04.2016.
		@contact: creativform@gmail.com
		
		WARNING: Some of extensions can compromise security on the server.
		Choose carefully extensions that you will allow.
		The author does not have any responsibility if this code make problem,
		This section is only available for developers who is expert in this area and know what to use.
	**/
	private $option		=	array();
	private $name		=	false;
	private $new_name	=	false;
	private $results	=	array();
	private $i			=	false;
	private $post_errors= array(
        "There is no error, the file is uploaded with success",
        "The uploaded file exceeds the upload_max_filesize directive in php.ini",
        "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form",
        "The uploaded file was only partially uploaded",
        "No file was uploaded",
        "Missing a temporary folder"
	); 
	/**
		EXAMPLE:
		// Setup
		$option=array(
			'location' 		=> [Location to the folder where you want to upload your file
								example: "root/upload/files/" (default: false)], 
			'new_name' 		=> [New file name (default: false)],
			'extensions'	=> [Allowed extensions separated by commas
								(default: doc, docx, xls, xlsx, pdf, gif, jpeg, jpg, png, psd, txt, mp3, mp4, wav, 3gp)],
			'size'			=> [The maximum file size (default 2MB)],
			'debug'			=> [BOOLEAN (true/false) - display on top of the page debug information (default: false)],
			'encrypt'		=> [encription for the filename (default:false)],
			// SPECIAL OPTIONS
				// Maximum execution time of each script, in seconds
				// http://php.net/max-execution-time
				// Note: This directive is hardcoded to 0 for the CLI SAPI (Unlimited)
			'max_execution_time'	=> 60,
				// Maximum amount of time each script may spend parsing request data. It's a good
				// idea to limit this time on productions servers in order to eliminate unexpectedly
				// long running scripts.
				// Note: This directive is hardcoded to -1 for the CLI SAPI
				// Default Value: -1 (Unlimited)
				// Development Value: 60 (60 seconds)
				// Production Value: 60 (60 seconds)
				// http://php.net/max-input-time
			'max_input_time'		=> 60,
				// Maximum amount of memory a script may consume (128MB)
				// http://php.net/memory-limit
			'memory_limit'			=> 128,
				// Time limit for execution time
			'set_time_limit'		=> 60,
				// Maximum allowed size for uploaded files.
				// http://php.net/upload-max-filesize
			'upload_max_filesize' => 128,
				// Maximum size of POST data that PHP will accept.
				// http://php.net/post-max-size
			'post_max_size' => 128
		);
		
		$upload=new upload('file_name', $option)
		
		if($upload['return']===true)
		{
			// file is uploaded
			echo $upload['message'];
		}
		else
		{
			// error
			echo $upload['message'];	
		}
	**/
	public function __construct($name, $options=array())
	{
		$name=preg_replace("/[^a-zA-Z0-9\-\_]/is","",$name);
		$this->name = $name;
		// default values
		$option=array(
			'location' 		=> false,
			'new_name' 		=> false,
			'extensions'	=> "doc, docx, xls, xlsx, pdf, gif, jpeg, jpg, png, psd, txt, mp3, mp4, wav, 3gp",
			'size'			=> 2,
			'i'				=> false,
			'debug'			=> false,
			'encode'		=> false,
			// SPECIAL OPTIONS
			/*
				; Maximum execution time of each script, in seconds
				; http://php.net/max-execution-time
				; Note: This directive is hardcoded to 0 for the CLI SAPI (Unlimited)
			*/
			'max_execution_time'	=> 60,
			/*
				; Maximum amount of time each script may spend parsing request data. It's a good
				; idea to limit this time on productions servers in order to eliminate unexpectedly
				; long running scripts.
				; Note: This directive is hardcoded to -1 for the CLI SAPI
				; Default Value: -1 (Unlimited)
				; Development Value: 60 (60 seconds)
				; Production Value: 60 (60 seconds)
				; http://php.net/max-input-time
			*/
			'max_input_time'		=> 60,
			/*				
				; Maximum amount of memory a script may consume (128MB)
				; http://php.net/memory-limit
			*/
			'memory_limit'			=> 128,
			/*
				; Time limit for execution time
			*/
			'set_time_limit'		=> 60,
			/*
				; Maximum allowed size for uploaded files.
				; http://php.net/upload-max-filesize
			*/
			'upload_max_filesize' => 128,
			/*
				; Maximum size of POST data that PHP will accept.
				; http://php.net/post-max-size
			*/
			'post_max_size' => 128
		);
		// manual change values
		foreach($options as $key=>$value)
		{
			if(!empty($key))
			{
				unset($option[$key]);
				$option[$key]=$value;
			}
		}
		
		$this->i = $option['i'];
		
		/**
			Set PHP.ini and server for special executions
			
			WARNING: Changing this options can compromise security on the server or make problems.
			Use carefully!
			The author does not have any responsibility if this code make problem,
			This section is only available for developers who is expert in this area and know what to use.
		**/
		if (function_exists("set_time_limit") == true && @ini_get("safe_mode") == 0)
		{
			@set_time_limit($option['max_execution_time']);
		}
		else
		{
			@ini_set("max_execution_time", $option['max_execution_time']);
		}
		@ini_set("max_input_time", $option['max_input_time']);
		@ini_set("memory_limit", $option['size']."M");
		@ini_set("upload_max_filesize", $option['upload_max_filesize']."M");
		@ini_set("post_max_size", $option['post_max_size']."M");
		
		## Debug
		if($option['debug']===true){echo $this->debug();}
		
		## setup globals
		if( $this->i !== false ? (isset($_FILES[$name]["name"][$this->i]) && !empty($_FILES[$name]["name"][$this->i])):(isset($_FILES[$name]["name"]) && !empty($_FILES[$name]["name"])) )
		{
			$extension = $this->extension($this->i !== false ? $_FILES[$name]["name"][$this->i]:$_FILES[$name]["name"]);
			$rename=(empty($option['new_name'])?implode("",explode($extension,strtolower($this->i !== false ? $_FILES[$name]["name"][$this->i]:$_FILES[$name]["name"]))):$option['new_name']);
			$rename=strtolower($rename);
			if(is_bool($option['encode']) && $option['encode'])
			{
				$this->new_name=$this->encode($rename).'.'.$extension;
			}
			else
			{
				$this->new_name=$this->set_name($rename).'.'.$extension;
			}
			$this->option=$option;
			// setup pharametars
			$extensions=(is_array($option['extensions'])?$option['extensions']:array_map("trim",explode(",",$option['extensions'])));
			$type=array();
			foreach($extensions as $e)
			{
				// Images
				if(in_array($e, array('jpeg','jpg','pjpeg','gif','png','bmp','tiff','tif','jp2','iff','mdi','rf','rgb','bm')))
				{
					$type[]="image/".$e;
					if($e=='tiff' || $e=='tif')
					{
						$type[]="image/x-tiff";
						$type[]="application/tiff";
					}
					else if($e=='bmp') $type[]="image/x-windows-bmp";
					else if($e=='rgb') $type[]="image/x-rgb";
					else
					{
						$type[]="image/vnd.ms-modi";
						$type[]="image/vnd.rn-realflash";
					}
				}
				// Adobe Standards
				else if(in_array($e, array('pdf', 'psd', 'cdr', 'eps', 'epsf', 'epsi')))
				{
					$type[]="application/".$e;
					if($e=='pdf' || $e=='psd' || $e=='cdr')
					{
						$type[]="image/vnd.adobe.photoshop";
						$type[]="application/x-photoshop";
						$type[]="image/x-coreldraw";
					}
					else if($e=='eps' || $e=='epsf' || $e=='epsi')
					{
						$type[]="application/postscript";
						$type[]="application/x-eps";
						$type[]="image/x-eps";
						if($e=='epsf' || $e=='epsi') $type[]="image/x-eps";
					}
				}
				// Package files
				/** 
					WARNING: These extensions can compromise security on the server.
					Do not allow upload unless you are very sure
					The author does not have any responsibility if there is a problem,
					This section is only available for developers who is expert and know why he used.
				**/
				else if(in_array($e, array('zip', 'rar', '7z', 'tar', 'gtar')))
				{
					$type[]="application/".$e;
					$type[]="application/x-zip-compressed";
					$type[]="application/octet-stream";
					$type[]="application/x-zip";
					$type[]="application/x-compressed";
					$type[]="application/x-rar-compressed";
					$type[]="application/x-7z-compressed";
					$type[]="application/x-tar";
					$type[]="application/x-gtar";
					$type[]="application/x-script.zsh";
				}
				// Video files
				else if(in_array($e, array('avi','mpeg','mpg','mov','wmv','rm','mp4','jpgv','m4v','webm','au')))
				{
					$type[]="video/".$e;
					$type[]="video/jpeg";
					$type[]="audio/basic";
					$type[]="audio/x-au";
					$type[]="video/msvideo";
					$type[]="video/x-msvideo";
					$type[]="application/x-troff-msvideo";
					$type[]="video/x-m4v";
					$type[]="audio/mp4"; // DEBUG
					$type[]="application/mp4"; // DEBUG
				}
				else if(in_array($e, array('3gp','3g2','movie')))
				{
					$type[]="video/".$e;
					$type[]="video/3gpp";
					$type[]="video/3gpp2";
					$type[]="video/x-sgi-movie";
				}
				// Audio files
				else if(in_array($e, array('mp3','wav','mp4','mp4a','midi','wma','wax','weba','s3m')))
				{
					$type[]="audio/".$e;
					$type[]="audio/x-wav";
					$type[]="audio/x-ms-wma";
					$type[]="audio/x-ms-wax";
					$type[]="audio/webm";
					$type[]="audio/mpeg";
					$type[]="audio/mpeg3";
					$type[]="audio/x-mpeg-3";
					$type[]="video/mpeg"; // DEBUG
					$type[]="video/x-mpeg"; // DEBUG
					$type[]="video/mp4"; // DEBUG
					$type[]="application/mp4"; // DEBUG
					if($e=='mp4a')$type[]="audio/mp4"; // DEBUG
				}
				// Web files
				else if(in_array($e, array('php','htm','html','htmls','htx','shtml','acgi','rt','shtml')))
				{
					$type[]="text/".$e;
					$type[]="text/txt";
					$type[]="text/html";
					$type[]="text/x-server-parsed-html";
					$type[]="text/richtext";
					$type[]="text/vnd.rn-realtext";
				}
				// Flash files
				else if(in_array($e, array('swf','swc','flw','svf')))
				{
					$type[]="application/".$e;
					$type[]="application/x-shockwave-flash";
					$type[]="application/vnd.kde.kivio";
					$type[]="image/vnd.dwg";
					$type[]="image/x-dwg";
				}
				// Some sensitive applications. 
				/** 
					WARNING: These extensions can compromise security on the server.
					Do not allow upload unless you are very sure
					The author does not have any responsibility if there is a problem,
					This section is only available for developers who is expert and know why he used.
				**/
				else if(in_array($e, array('exe','cil','cab','ims','application','chat','json','rtx','c','c++','cc','cat')))
				{
					$type[]="application/".$e;
					$type[]="application/x-msdownload";
					$type[]="application/vnd.ms-artgalry";
					$type[]="application/vnd.ms-cab-compressed";
					$type[]="application/vnd.ms-ims";
					$type[]="application/x-ms-application";
					$type[]="application/x-chat";
					$type[]="application/octet-stream";
					$type[]="application/octet-stream";
					$type[]="application/x-zip-compressed";
					$type[]="application/rtf";
					$type[]="application/x-rtf";
					$type[]="text/richtext";
					$type[]="text/plain";
					$type[]="text/x-c";
					$type[]="application/vnd.ms-pki.seccat";
				}
				// Only Text formats
				else if(in_array($e, array('ini','rtx','etx','sgml','tsv','txt','ttl','uri','vcs','vcf','csv','java','jar','js')))
				{
					$type[]="text/".$e;
					$type[]="text/richtext";
					$type[]="text/x-setext";
					$type[]="text/tab-separated-values";
					$type[]="text/plain";
					$type[]="text/turtle";
					$type[]="text/uri-list";
					$type[]="text/x-vcalendar";
					$type[]="text/x-vcard";
					$type[]="text/x-java-source,java";
					$type[]="application/java-archive";
					$type[]="application/javascript";
				}
				// MS Office aplications
				else if(in_array($e, array('one','onetoc2','onetmp','onepkg')))
				{
					$type[]="application/".$e;
					$type[]="application/msonenote";
				}
				else if(in_array($e, array('tmx')))
				{
					$type[]="application/".$e;
					$type[]="application/vnd.ms-officetheme";
				}
				else if(in_array($e, array('doc','docx','docm','dotx','dotm')))
				{
					$type[]="application/".$e;
					$type[]="application/msword";
					$type[]="application/vnd.ms-word.document.macroEnabled.12";
					$type[]="application/vnd.ms-word.template.macroEnabled.12";
					$type[]="application/vnd.openxmlformats-officedocument.wordprocessingml.template";
					$type[]="application/vnd.openxmlformats-officedocument.wordprocessingml.document";
				}
				else if(in_array($e, array('pptx','pptm','ppsx','ppsm','ppt','potx','potm','ppam','sldx','sldm')))
				{
					$type[]="application/".$e;
					$type[]="application/vnd.openxmlformats-officedocument.presentationml.presentation";
					$type[]="application/vnd.ms-powerpoint.presentation.macroEnabled.12";
					$type[]="application/vnd.openxmlformats-officedocument.presentationml.slideshow";
					$type[]="application/vnd.ms-powerpoint.slideshow.macroEnabled.12";
					$type[]="application/vnd.openxmlformats-officedocument.presentationml.template";
					$type[]="application/vnd.ms-powerpoint.template.macroEnabled.12";
					$type[]="application/vnd.ms-powerpoint.addin.macroEnabled.12";
					$type[]="application/vnd.openxmlformats-officedocument.presentationml.slide";
					$type[]="application/vnd.ms-powerpoint.slide.macroEnabled.12";
					$type[]="application/vnd.ms-powerpoint";
				}
				else if(in_array($e, array('xls','xlb','xlt','xlam','xlsb','xlsm','xltm','xlsx','xlv')))
				{
					$type[]="application/".$e;
					$type[]="application/excel";
					$type[]="application/x-excel";
					$type[]="application/x-msexcel";
					$type[]="application/vnd.ms-excel";
					$type[]="application/vnd.ms-excel.addin.macroEnabled.12";
					$type[]="application/vnd.ms-excel.sheet.binary.macroEnabled.12";
					$type[]="application/vnd.ms-excel.sheet.macroEnabled.12";
					$type[]="application/vnd.ms-excel.template.macroEnabled.12";
					$type[]="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
				}
				
			}
			// check size of file
			if( $this->i !== false ? ($_FILES[$name]["size"][$this->i] < round($option['size']*1000000)):($_FILES[$name]["size"] < round($option['size']*1000000)) )
			{
				// Check type, extension and size
				if(
					(count($type)>=1)
					&& in_array(($this->i !== false ? $_FILES[$name]["type"][$this->i]:$_FILES[$name]["type"]), $type, true) 
					&& (($this->i !== false ? $_FILES[$name]["size"][$this->i]:$_FILES[$name]["size"]) < round($option['size']*1000000))
					&& in_array($extension, $extensions, true)
				)
				{
					// if file have error
					if ($this->i !== false ? ($_FILES[$name]["error"][$this->i] > 0):($_FILES[$name]["error"] > 0))
					{
						$this->results = array(
							'return'=>false,
							'message'=>$this->post_errors[($this->i !== false ? $_FILES[$name]["error"][$this->i]:$_FILES[$name]['error'])],
							'file_name'=>false,
						);
					}
					else
					{
						// Upload on server
						$upload = $this->uploadOnServer();

						$this->results = array(
							'return'=>$upload['return'],
							'message'=>$upload['message'],
							'file_name'=>$upload['file_name'],
						);

					}
				}
				else
				{
					$this->results = array(
						'return'=>false,
						'message'=>"Allowed extensions are: ".$this->option['extensions'],
						'file_name'=>false
					);
				}
			}
			else
			{
				$this->results = array(
					'return'=>false,
					'message'=>"File what you want to upload is larger (".round(($this->i !== false ? $_FILES[$name]["size"][$this->i]:$_FILES[$name]["size"])/1000000)."MB) than allowed size: ".$option['size'].'MB',
					'file_name'=>false
				);
			}
		}
		else
		{
			$this->results = array(
				'return'=>false,
				'message'=>"No file selected. Please select file for upload!",
				'file_name'=>false,
			);	
		}
		if(empty($this->results))
		{
			// OPTIONAL ERROR MESSAGE THROW EXEPTIONS:
			// throw new Error("ERROR: There was an unexpected error around the upload script. Please try again or contact the system administrator");
			
			// DIRECT ERROR MESSAGE THROW RETURN IN ARRAY
			$this->results = array(
				'return'=>false,
				'message'=>'There was an unexpected error around the upload script. Please try again or contact the system administrator',
				'file_name'=>false,
			);
		}
		return $this->results;
	}
	
	/**
		result() Returns array with 3 parameters:
		
			'return'	=>	[BOOLEAN (true/false)],
			'message'	=>	[INFO OR ERROR MESSAGE],
			'file_name'	=>	[NEW FILE NAME]
			
		NOTE: If you whant to use this function, you must remove line 465
	**/
	public function result(){return $this->results;}
	
	/**
		debug() Returns all file informations:
		
			$return[]= "Upload: " . $_FILES[$this->name]["name"];
			$return[]= "Type: " . $_FILES[$this->name]["type"];
			$return[]= "Size: " . ($_FILES[$this->name]["size"] / $this->option['size']) . " kB";
			$return[]= "Temp file: " . $_FILES[$this->name]["tmp_name"];
	**/
	public function debug()
	{
		$return=array();
		if($this->i !== false ? isset($_FILES[$this->name]["name"][$this->i]):isset($_FILES[$this->name]["name"]))	$return[]= "Upload: " . ($this->i !== false ? $_FILES[$this->name]["error"][$this->i]:$_FILES[$this->name]["name"]);
		if($this->i !== false ? isset($_FILES[$this->name]["type"][$this->i]):isset($_FILES[$this->name]["type"]))	$return[]= "Type: " . ($this->i !== false ? $_FILES[$this->name]["type"][$this->i]:$_FILES[$this->name]["type"]);
		if($this->i !== false ? isset($_FILES[$this->name]["size"][$this->i]):isset($_FILES[$this->name]["size"]))	$return[]= "Size: " . ($this->i !== false ? $_FILES[$this->name]["size"][$this->i]:$_FILES[$this->name]["size"]);
		if($this->i !== false ? isset($_FILES[$this->name]["tmp_name"][$this->i]):isset($_FILES[$this->name]["tmp_name"]))	$return[]= "Temp file: " . ($this->i !== false ? $_FILES[$this->name]["tmp_name"][$this->i]:$_FILES[$this->name]["tmp_name"]);
		if($this->i !== false ? isset($_FILES[$this->name]["error"][$this->i]):isset($_FILES[$this->name]["error"]))	$return[]= "Error: " . ($this->i !== false ? $_FILES[$this->name]["error"][$this->i]:$_FILES[$this->name]["error"]);
		return join("<br>", $return);
	}
	/************** PRIVATE FUNCTIONS **************/
	## find file extension
	private function extension($str)
	{
		$str = explode("\\",$str);
		$str = implode("",$str);
		$str = explode(".",$str);
		$str = end($str);
		$str = strtolower($str);
		$str = trim($str);
		return $str;
	}
	## Upload function
	private function uploadOnServer()
	{
		if (($this->i !== false ? $_FILES[$this->name]["error"][$this->i]:$_FILES[$this->name]["error"]) > 0)
		{
			return array(
						'return'=>false,
						'message'=>"Return Code: " . ($this->i !== false ? $_FILES[$this->name]["error"][$this->i]:$_FILES[$this->name]["error"]) . "<br>",
						'file_name'=>false
					);
		}
		else
		{	
			// make directory in not exist
			if (!file_exists($this->option['location']) && !is_dir($this->option['location'])) {
				@mkdir($this->option['location'], 0644, true);
			}
			// make empty index.htm if not exist
			if (!file_exists($this->option['location'].'index.htm') && !is_file($this->option['location'].'index.htm')) {
				$file_html = @fopen($this->option['location'].'index.htm','w');
				@fclose($file_html);
			}
			if (file_exists($this->option['location'].$this->new_name))
			{
				return array(
						'return'=>false,
						'message'=>$this->new_name . " already exists. ",
						'file_name'=>false
					);
			}
			else
			{
				$uploaded=@move_uploaded_file(($this->i !== false ? $_FILES[$this->name]["tmp_name"][$this->i]:$_FILES[$this->name]["tmp_name"]),
				$this->option['location'].$this->new_name);
				if($uploaded)
				{
					return array(
							'return'=>true,
							'message'=>"File " . $this->new_name . " are uploaded.",
							'file_name'=>$this->new_name
						);
				}
				else
				{
					return array(
							'return'=>false,
							'message'=>"Because of some server error, upload is not possible. Try again!",
							'file_name'=>$this->new_name
						);	
				}
			}
		}
	}
	## clean filename or generate hash name
	private function set_name($content)
	{
		$exist = array('/[\x00-\x08\x10\x0B\x0C\x0E-\x19\x7F]'.'|[\x00-\x7F][\x80-\xBF]+'.'|([\xC0\xC1]|[\xF0-\xFF])[\x80-\xBF]*'.'|[\xC2-\xDF]((?![\x80-\xBF])|[\x80-\xBF]{2,})'.'|[\xE0-\xEF](([\x80-\xBF](?![\x80-\xBF]))|(?![\x80-\xBF]{2})|[\x80-\xBF]{3,})/S','/\xE0[\x80-\x9F][\x80-\xBF]'.'|\xED[\xA0-\xBF][\x80-\xBF]/S','/\%/','/\@/','/\&/','/\s[\s]+/','/[\s\W]+/','/^[\-]+/','/[\-]+$/');
		$replace = array('','',' % ',' at ',' and ','-','-','','');
		$content = preg_replace($exist,$replace,$content);
		return strtolower(trim($content));
	}
	private function encode($string)
	{
		return strtolower(
				implode("",
					explode("=",
						str_rot13(
							base64_encode(
								str_rot13(
									base64_encode(
										$this->set_name($string)
										)
									)
								)
							)
						)
					)
				);
	}
}
?>