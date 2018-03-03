<!DOCTYPE html>
<html lang="en">
  <head>
	  <script>
		/*
		* SETUP BASE URL
		* @author         Ivijan-Stefan Stipic <creativform@gmail.com>
		*
		* AVAILABLE OBJECTS
		* window.base              //- Define base URL of this application
		* window.session_id        //- Define unique session ID for current user [timestamp-random]
		*/
		var base = '/mail-editor',
    		refactor = function(){
			var elements = {
				'script' : 'src',
				'img'    : 'src',
				'link'   : 'href',
				'a'      : 'href',
			},
			generateID = function (min, max) {
				min = min || 0;
				max = max || 0;
				
				if(min===0 || max===0 || !(typeof(min) === "number" || min instanceof Number) || !(typeof(max) === "number" || max instanceof Number)) 
					return Math.floor(Math.random() * 999999) + 1;
				else
					return Math.floor(Math.random() * (max - min + 1)) + min;
			};
			
			/* CHANGE THIS IF YOU NEED */
			var baseURL = window.location.protocol + '//' + window.location.hostname + base;
			/* USER SESSION ID */
			if (!localStorage.getItem("session_id"))
			{
				window.session_id = localStorage.getItem("session_id");
			}
			else
			{
				var generate = new Date().getTime() + '-' + generateID(10000,99999) + '' + generateID(100000,999999) + '' + generateID(1000000,9999999) + '' + generateID(10000000,99999999);
				window.session_id = generate;
				localStorage.setItem("session_id",generate);
			}
			window.base = baseURL;
			
			for(tag in elements)
			{
				var list = document.getElementsByTagName(tag)
					listMax = list.length;
				if(listMax>0)
				{
					for(i=0; i<listMax; i++)
					{
						var src = list[i].getAttribute(elements[tag]);
						if(!(/(https?|ftps?|file|chrome)\:\/\//g.test(src)) && !(/^#(.*?)$/g.test(src)) && '' != src && null != src)
						{
							src = baseURL + '/' + src;
							list[i].setAttribute('src',src);
						}
					}
				}
			}
			
		}
		document.addEventListener("DOMContentLoaded", function() {
			refactor();
		});
    </script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>IMAGE EDITOR</title>

    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
    <link href="assets/css/bootstrap-colorpicker.min.css" rel="stylesheet">
    <link href="assets/css/bootstrap-slider.min.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style>
		#img-editor{
			display:block;
			margin:0 auto;
			width:100%;
			max-width:600px;
			min-height: 100px;
			position:relative;
			overflow:hidden;
			z-index:0;
			border:1px solid #000;
		}
		#img-editor:hover{
			border:1px solid #000;
		}
		#img-editor img{
			position:absolute;
			top:0;
			left:0;
			width:100%;
			z-index:0;
		}
		#image-editor-console{
			list-style:none;
			padding:0;
			margin:0 auto;
			width:100%;
			max-width:600px;
			color:#FFF;
			background:#000;
			z-index:150;
		}
		#image-editor-console>li{
			margin:0;
			padding:0;
			display:inline-block;
			padding:10px 2px;
			position:relative;
		}
		
		#image-editor-console>li>.button{
			position:relative;
			padding:10px;
			background:#222;
			border: 1px solid #444;
			color:#FFF;
			border-radius:0;
			-webkit-border-radius:0;
			-moz-border-radius:0;
			-ms-border-radius:0;
			-o-border-radius:0;
			text-shadow:none;
			-webkit-text-shadow:none;
			z-index:0;
			cursor: pointer
		}
		#image-editor-console>li>form.button{
			overflow:hidden;
			display: inline-flex;
		}
		#image-editor-console>li>form.button > input[type^="file"]{
			width: 100%;
			height: 500px;
			position: absolute;
			background: none;
			top: 0;
			left: 0;
			opacity: 0;
			cursor: pointer
		}
		#image-editor-console>li.separator{
			background: #444;
			width: 2px;
			padding: 17px 0;
			margin: 0px 5px -12px 5px;
		}
		#image-editor-console>li>.button .property{
			position: absolute;
			top: 35px;
			left: -2px;
			color: #333;
			padding: 5px 32px 32px 5px;
			z-index: 5;
			width: 100%;
			min-width: 250px;
			max-width: 350px;
			text-align: left;
			display: none;
			cursor: default;
			font-family:Arial, Helvetica, sans-serif;
			
		}
		#image-editor-console>li>.button .property.active{
			display:block;
		}
		#image-editor-console>li>.button:disabled .property
		#image-editor-console>li>.button:disabled .property.active{
			display:none;
		}
		
		#image-editor-console>li>.button .property-default{
			top:38px;
			padding:10px 10px 15px 10px;
			background-color:#eee;
			color:#333;
			border:1px solid #ddd;
		}
		
		#image-editor-console>li>.button.active{
			background-color:#111;
			color:#999;
		}
		#image-editor-console>li>.button:disabled{
			color:#555;
			background-color:#222;
		}
		
		#layers{
			list-style: none;
			padding: 5px;
			margin: 0 auto;
			width: 100%;
			max-width: 600px;
			color: #FFF;
			background-color: #222;
			z-index: 150;
			overflow: auto;
			overflow-y: hidden;
			text-align: left;
			display: flex;
		}
		#layers:empty{
			display:none;
		}
		#layers > li{
			margin: 0;
			padding: 7px 0;
			display: block;
			position: relative;
			background-color: #444;
			border: 6px solid #444;
			color: #FFF;
			width: 65px;
			height: 40px;
			overflow: hidden;
			cursor:pointer;
			font-size:10px;
			vertical-align:middle;
		}
		#layers > li > span {
			display: block;
			width: 9999px;
		}
		#layers > li+li{
			margin-left:5px;
		}
		#layers > li:hover{
			background-color:#777;
			border: 6px solid #777;
		}
		#layers > li.active,
		#layers > li.active:hover{
			background-color:#3FA9F5;
			border: 6px solid #3FA9F5;
			cursor:default;
		}
		
		#img-editor .ruler{
			background:#3FA9F5;
			position:absolute;
			z-index: 0;
			display:none;
		}
		#img-editor .ruler-x{
			left: -1000%;
			right: -1000%;
			bottom: -4px;
			width: 99999px;
			height: 1px;
			box-shadow:  0 1px 1px 0px rgba(255,255,255,0.5), 1px 0 1px 0px rgba(0,0,0,0.5);
			-webkit-box-shadow: 0 -1px 1px 0px rgba(255,255,255,0.5), 1px 0 1px 0px rgba(0,0,0,0.5);
		}
		#img-editor .ruler-y{
			left: -4px;
			top: -1000%;
			bottom: -1000%;
			height: 99999px;
			width: 1px;
			box-shadow: -1px 0 1px 0px rgba(255,255,255,0.5), 1px 0 1px 0px rgba(0,0,0,0.5);
			-webkit-box-shadow: -1px 0 1px 0px rgba(255,255,255,0.5), 1px 0 1px 0px rgba(0,0,0,0.5);
		}
		
		#img-editor .text-editor{
			text-align:left;
			padding:5px;
			position:absolute;
			z-index:1;
			border:3px dashed transparent;
			cursor:pointer;
		}
		#img-editor .text-editor:hover{
			border:3px dashed rgba(220,220,220,0.8);
			z-index:100;
		}
		#img-editor .text-editor.active{
			border:3px dashed #3FA9F5;
			background:rgba(255,255,255,0.8);
			cursor:pointer;
    		cursor: hand;
			cursor: -webkit-grab;
		}
		
		#img-editor .text-editor.active .ruler{
			display:block;
		}
		
		#img-editor .text-editor.ui-draggable-dragging,
		#img-editor .text-editor.ui-draggable-dragging:hover,
		#img-editor .text-editor.ui-draggable-dragging:active{
			cursor: grabbing;
			cursor: -webkit-grabbing;
		}
		#img-editor .text-editor .edit-text{
			display:block;
			width:100%;
			height:100%;
			overflow:hidden;
		}
		#img-editor .text-editor.active .edit-text{
			text-shadow:  0px 0px 3px rgba(255,255,255,0.5),0px 0px 3px rgba(0,0,1,0.5);
			-webkit-text-shadow:  0px 0px 3px rgba(255,255,255,0.5),0px 0px 3px rgba(0,0,1,0.5);
		}
		#img-editor .text-editor .edit-text:focus{
			box-shadow:none !important;
			border:none;
			outline:0;
		}
		
		.ui-rotatable-handle {
			height: 24px;
			width: 24px;
			position: absolute;
			color: #fff;
			border: 3px solid #3FA9F5;
			background: #fff;
			border-radius: 100px;
			-webkit-border-radius: 100px;
			-moz-border-radius: 100px;
			-ms-border-radius: 100px;
			-o-border-radius: 100px;
			display: none;
			background-image: url(assets/img/cursor-rotate.png);
			background-repeat: no-repeat;
			background-position: center center;
			background-size: cover;
		}
		
		#img-editor .text-editor .remove {
			height: 18px;
			width: 18px;
			position: absolute;
			color: #ff0000;
			background: #fff;
			border: 2px solid #3FA9F5;
			border-radius: 100px;
			-webkit-border-radius: 100px;
			-moz-border-radius: 100px;
			-ms-border-radius: 100px;
			-o-border-radius: 100px;
			top: -10px;
			right: -10px;
			text-align: center;
			font-size: 7pt;
			font-family: cursive, arial, geneva;
			line-height: 14px;
			padding: 0 1px 0 0px;
			display: none;
			z-index: 100;
			cursor:pointer !important;
		}
		
		#img-editor .text-editor.active .ui-rotatable-handle,
		#img-editor .text-editor.active .remove{
			display:block;
		}
		
		.ui-rotatable-handle:hover{
			cursor: url("assets/img/cursor-rotate.png"), auto;
		}
		
		.ui-rotatable-handle-active{
			cursor: grabbing;
			cursor: -webkit-grabbing;
		}
		.ui-rotatable-handle-active:hover,
		.ui-rotatable-handle-active:active,
		.ui-rotatable-handle-active:focus{
			opacity:1;
		}
		
		.ui-rotatable-handle-se {
			bottom: -16px;
			left: -16px;
		}
		
		#rc-logo{
			z-index: 10;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			padding: 25px;
		}

    </style>
  </head>
  <body>
    <div class="container-fullscreen">
    	<div class="container text-center" id="container">
        	<ul id="image-editor-console">
            	<!-- <li><form class="button glyphicon glyphicon-upload" title="Upload Image">
   					<input type="file" id="upload">
                </form></li> -->
                
                <li>
                	<button type="button" class="button glyphicon glyphicon-upload" id="upload-new-image" title="Upload Image">
                    	<div class="property property-default">
                            <div class="row">
                            	<div class="col-sm-12">
                                	<input type="file" id="upload" class="form-control">
                                </div>
                                <div class="col-sm-12">
                                	<input type="text" id="embed" class="form-control" placeholder="...or embed from URL">
                                </div>
                            </div>
                        </div>
                    </button>
                </li>
                <li class="separator"></li>
                <li><button type="button" class="button glyphicon glyphicon-plus" id="new" title="New Element"></button></li>
                <li><button type="button" class="button glyphicon glyphicon-floppy-save" id="save" title="Save"></button></li>
                <li class="separator"></li>
                <li><button type="button" class="button glyphicon glyphicon-bold reset" id="text-bold" title="Bold"></button></li>
                <li><button type="button" class="button glyphicon glyphicon-italic reset" id="text-italic" title="Italic"></button></li>
                <li>
                    <button type="button" class="button glyphicon glyphicon-text-size reset" id="text-size" title="Resize">
                    	<div class="property property-default">
                            <div class="row">
                            	<div class="col-xs-8">
                                    <select id="font-size" class="form-control">
                                        <option value="10pt">10pt</option>
                                        <option value="12pt">12pt</option>
                                        <option value="14pt">14pt</option>
                                        <option value="16pt">16pt</option>
                                        <option value="18pt">18pt</option>
                                        <option value="22pt">22pt</option>
                                        <option value="24pt">24pt</option>
                                        <option value="32pt">32pt</option>
                                        <option value="38pt">38pt</option>
                                        <option value="42pt">42pt</option>
                                        <option value="48pt">48pt</option>
                                        <option value="52pt">52pt</option>
                                        <option value="64pt">64pt</option>
                                        <option value="72pt">72pt</option>
                                        <option value="83pt">83pt</option>
                                        <option value="92pt">92pt</option>
                                        <option value="100pt">100pt</option>
                                    </select>
                                </div>
                                <div class="col-xs-4">
                                	<div class="btn btn-default btn-block" id="uppercase"><span class="glyphicon glyphicon-text-size"></span></div>
                                </div>
                                <div class="col-xs-12">
                                <br>
                                    <select id="font-family" class="form-control">
                                        <option value="Arial, Helvetica, sans-serif" style="font-family:Arial, Helvetica, sans-serif">Arial</option>
                                        <option value="'Arial Black', Gadget, sans-serif" style="font-family:'Arial Black', Gadget, sans-serif">Arial Black</option>
                                        <option value="'Courier New', Courier, monospace" style="font-family:'Courier New', Courier, monospace">Courier New</option>
                                        <option value="'Comic Sans MS', cursive" style="font-family:'Comic Sans MS', cursive">Comic Sans MS</option>
                                        <option value="Georgia, 'Times New Roman', Times, serif" style="font-family:Georgia, 'Times New Roman', Times, serif">Georgia</option>
                                        <option value="'Lucida Console', Monaco, monospace" style="font-family:'Lucida Console', Monaco, monospace">Lucida Console</option>
                                        <option value="'Lucida Sans Unicode', 'Lucida Grande', sans-serif" style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif">Lucida Sans Unicode</option>
                                        <option value="'MS Serif', 'New York', serif" style="font-family:'MS Serif', 'New York', serif">MS Serif</option>
                                        <option value="'Palatino Linotype', 'Book Antiqua', Palatino, serif" style="font-family:'Palatino Linotype', 'Book Antiqua', Palatino, serif">Palatino Linotype</option>
                                        <option value="Tahoma, Geneva, sans-serif" style="font-family:Tahoma, Geneva, sans-serif">Tahoma</option>
                                        <option value="'Trebuchet MS', Arial, Helvetica, sans-serif" style="font-family:'Trebuchet MS', Arial, Helvetica, sans-serif">Trebuchet MS</option>
                                        <option value="'Times New Roman', Times, serif" style="font-family:'Times New Roman', Times, serif">Times New Roman</option>
                                        <option value="Verdana, Geneva, sans-serif" style="font-family:Verdana, Geneva, sans-serif">Verdana</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </button>
                </li>
                <li><button type="button" class="button glyphicon glyphicon-align-left reset" id="align-left"></button></li>
                <li><button type="button" class="button glyphicon glyphicon-align-center reset" id="align-center"></button></li>
                <li><button type="button" class="button glyphicon glyphicon-align-right reset" id="align-right"></button></li>
                <li><button type="button" class="button glyphicon glyphicon-align-justify reset" id="align-justify"></button></li>
                <li>
                	<button type="button" class="button glyphicon glyphicon-text-color reset" id="text-color">
                    	<div class="property">
                            <div class="form-horizontal">
                            	<div class="form-group">
                                    <div class="col-sm-12 text-left">
                                    	<div class="input-group colorpicker-component">
                                        	<input type="text" value="#000000" class="form-control" data-type="background" >
                                            <span class="input-group-addon"><i></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                </li>
                <li><button type="button" class="button glyphicon glyphicon glyphicon-text-background reset" id="text-background">
	                <div class="property">
                        <div class="form-horizontal">
                            <div class="form-group">
                                <div class="col-sm-12 text-left">
                                    <div class="input-group colorpicker-component">
                                        <input type="text" value="transparent" class="form-control" data-type="background" >
                                        <span class="input-group-addon"><i></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </button></li>
            </ul>
            <div id="img-editor">
            	<img id="image-edit" src="star.png">
            </div>
            <ul id="layers"></ul>
        </div>
    </div>
    <div id="alerts"></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="assets/js/jquery.ui.rotatable.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/debounce.js"></script>
    <script src="assets/js/bootstrap-colorpicker.min.js"></script>
	<script src="assets/js/creative.tools.js"></script>
    <script src="assets/js/html2canvas.js"></script>
	<script>
	(function($){	
		$.fn.imageEditor = function(){				
			// Place cursor on end
			$.fn.placeCaretAtEnd = function() {
				var el = this.get(0);
				el.focus();
				if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
					var range = document.createRange();
					range.selectNodeContents(el);
					range.collapse(false);
					var sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
				} else if (typeof document.body.createTextRange != "undefined") {
					var textRange = document.body.createTextRange();
					textRange.moveToElementText(el);
					textRange.collapse(false);
					textRange.select();
				}
				return this;
			};
			// Point cursor on begin
			$.fn.placeCaretAtBegin = function(){
				function moveCaretToStart(el) {
					if (typeof el.selectionStart == "number") {
						el.selectionStart = el.selectionEnd = 0;
					} else if (typeof el.createTextRange != "undefined") {
						el.focus();
						var range = el.createTextRange();
						range.collapse(true);
						range.select();
					}
				}
				var textBox = this.get(0);
				textBox.onfocus = function() {
					moveCaretToStart(textBox);
					// Work around Chrome's little problem
					window.setTimeout(function() {
						moveCaretToStart(textBox);
					}, 10);
				};
			};
			
			// Load data to editor
			$.fn.loadData = function(){
				var el = this, e = this.get(0), css = e.style;
				
				// console.log(css);

				$('#image-editor-console button.active').each(function(){
					$(this).removeClass('active').removeAttr('style');
				});
				
				$('#image-editor-console button').each(function(){
					$(this).removeAttr('style');
				});
				
				if($.inArray(css.textAlign,[0, 'left','right','center','justify']))
				{
					$('#image-editor-console #align-' + css.textAlign).addClass('active');
				}
				
				$('#image-editor-console #text-color' ).css('background',css.color);
				$('#image-editor-console #text-color input' ).val(css.color.toString('hex'));
				
				$('#image-editor-console #text-background' ).css('background',css.background);
				$('#image-editor-console #text-background input' ).val(css.background.toString('hex'));
				
				if(css.fontSize != '')
				{
					$('#image-editor-console #font-size option' ).prop("selected",false);
					$('#image-editor-console #font-size option[value^="'+css.fontSize+'"]' ).prop("selected",true);
				}
				
				if(css.fontFamily != '')
				{
					$('#image-editor-console #font-family option' ).prop("selected",false);
					$('#image-editor-console #font-family option[value^="'+css.fontFamily.replace(/(")/g,"'")+'"]' ).prop("selected",true);
				}
				
				if(css.fontWeight == 'bold')
				{
					$('#image-editor-console #text-bold').addClass('active');
				}
				
				if(css.fontStyle == 'italic')
				{
					$('#image-editor-console #text-italic').addClass('active');
				}
				return this;
			};
			
			/***************************/
			
			
			// Editor container
			var $this = this,
				loader = '<svg version="1.1" id="rc-logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="100px" viewBox="-5.42 -1.566 50 50" enable-background="new -5.42 -1.566 50 50" xml:space="preserve"> <g><g><path id="r" fill="#6D6D6D" d="M-5.42,48.177L2.698,8.609C2.985,7.108,3.125,6.18,3.125,5.835c0-0.601-0.168-1.059-0.503-1.387C2.293,4.111,1.791,3.868,1.125,3.712C0.466,3.56-0.365,3.459-1.36,3.43c-1-0.04-2.131-0.055-3.429-0.055l0.313-2.415C1.75-0.646,6.51-1.453,9.83-1.453c2.407,0,4.345,0.437,5.807,1.313c1.47,0.874,2.208,2.163,2.208,3.875c0,0.314-0.02,0.686-0.05,1.144c6.414-4.295,12.872-6.444,19.33-6.444l0.364,0.479c-1.257,5.487-2.456,11.247-3.617,17.29l-3.242,0.523c-0.63-3.808-1.406-6.396-2.305-7.775c-0.915-1.375-2.225-2.076-3.938-2.076c-1.844,0-4.316,0.77-7.39,2.315L9.198,47.638L-5.42,48.177z"/></g></g><path id="fish" fill="#494949" d="M32.124,14.289c0.026-1.781,1.096-4.482,3.97-8.67c-4.736,1.839-7.651,4.064-9.489,6.019c-1.222-0.351-2.497-0.585-3.816-0.68C13.679,10.3,3.44,16.303,1.217,24.833c-0.285,1.091-0.474,2.222-0.557,3.385c-0.051,0.719,2.666,0.879,2.738,2.232c0.045,0.838-2.613,1.799-2.459,2.604c1.542,8.102,10.553,14.482,19.168,15.104c8.039,0.578,15.254-4.026,18.367-10.979c0.479-1.069,0.861-2.193,1.134-3.364c0.22-0.945,4.9,3.268,4.972,2.27c0.031-0.436-1.513-3.784-1.497-6.236c0.016-2.408,1.524-6.447,1.497-6.864c-0.065-1.016-4.735,3.342-4.96,2.374C38.571,20.836,35.858,16.906,32.124,14.289z"/><g><path id="c" fill="#FFFFFF" d="M24.01,32.078l5.445,0.061c-0.661,3.043-1.876,5.398-3.652,7.059c-1.772,1.663-3.938,2.479-6.499,2.45c-2.866-0.031-4.945-1.139-6.235-3.328c-1.29-2.19-1.626-5.176-1.008-8.95c0.616-3.771,1.916-6.726,3.9-8.888c1.984-2.16,4.381-3.223,7.191-3.192c2.591,0.029,4.497,0.863,5.72,2.497c1.221,1.633,1.676,3.948,1.363,6.954l-5.499-0.061c0.111-1.184-0.041-2.078-0.449-2.689c-0.415-0.604-1.082-0.914-2.005-0.925c-1.127-0.013-2.057,0.507-2.794,1.566c-0.737,1.062-1.28,2.657-1.631,4.8c-0.343,2.106-0.303,3.7,0.12,4.783c0.422,1.085,1.213,1.639,2.369,1.65c0.896,0.01,1.655-0.319,2.286-0.97C23.259,34.243,23.721,33.298,24.01,32.078z"/></g><path id="eye" fill="#DBDBDB" d="M7.82,23.135c0,0.928-0.752,1.68-1.681,1.68l0,0c-0.928,0-1.68-0.752-1.68-1.68l0,0c0-0.93,0.752-1.682,1.68-1.682l0,0C7.068,21.454,7.82,22.206,7.82,23.135L7.82,23.135z"/></svg>',
			// Global Seup
				setup = {
					container : {
						maxWidth : 600,
					},
					textBox : {
						width	:	240,
						height	:	60,
						top		:	32,
						left	:	32
					}
					
				}
				// Image what to edit
				img = $this.find('#image-edit'),
				// Reset object
				reset = {
					// reset text fields
					fields : function(){
						var i = 1;
						$(".text-editor", $this).each(function(){
							var This = $(this),
								editor = This.find('.edit-text'),
								id = editor.attr('data-id');
							This.css({
								zIndex : i++
							})
							.removeClass('active')
							.resizable("disable");
							
							editor.blur().prop('contenteditable',false);
							
							$('#layers > #'+id).removeClass('active');
						});
					},
					// reset active buttons
					activeButtons : function(){
						$('#image-editor-console button.active').each(function(){
							$(this).removeClass('active').removeAttr('style');
						});
						$('#image-editor-console button').each(function(){
							$(this).removeAttr('style');
						});
					},
					// reset button property
					activeButtonsProperty : function(e){
						$('#image-editor-console > li > button .property.active').each(function(el){
							var id = $(this).parent('button').attr('id');
							if(e && e.target.id == id)
								{}
							else
								$(this).removeClass('active');
						});
					},
					// reset action buttons
					buttons : function(action){
						var i = 1;
						if(typeof action == 'undefined' || !$.isBool(action))
							action = true;
						$("button.reset").each(function(){
							$(this).prop('disabled', action);
						});
						reset.activeButtons();
					},
				},
				// Size setup for image and container
				size = function(){
					var img = $this.find('#image-edit'),
						imgWidth = img.width(),
						imgHeight = img.height();
						
					$this.height(imgHeight);
				},
				// Init Draggable and Rezizable
				initDraggable = function(){
					
					var nw = $("<div>", {
							class: "ui-rotatable-handle"
						}),
						rem = $("<div>", {
							class: "remove"
						}),
						ruler = $("<div>", {
							class: "ruler"
						});
					
					/// Activate draggable for text fields
					$('.text-editor', $this).draggable({
						cancel: ".ui-rotatable-handle",
						cursor : '-webkit-grabbing',
						tolerance: "pointer",
						grid: [ 1, 1 ],
						delay : 100,
						scroll: false,
						revertDuration: 0,
						start:function( event, ui ){
							$(document.body).css( 'cursor', '-webkit-grabbing' );
						},
						stop:function( event, ui ){
							$(document.body).css( 'cursor', 'auto' );
						},
						drag : function( event, ui ) {
							var This = $(this, $this);
							
							$(document.body).css( 'cursor', '-webkit-grabbing' );
							
							/// fix positions to margins
							ui.position.left = Math.max(-8, Math.min(($this.width()-This.width()-6), ui.position.left));
							ui.position.top = Math.max(-8,  Math.min((img.height() - This.height()-6), ui.position.top));
						}
					})
					// Activate resizable for text fields
					.resizable({
						maxWidth:setup.container.maxWidth,
						create : function( event, ui ) {
							/// Initialize first sizes
							$(this, $this).css({
								width:setup.textBox.width,
								height:setup.textBox.height,
								top:setup.textBox.top,
								left:setup.textBox.left,
							})
						},
						resize: function( event, ui ) {
							
						}
					});
					// Rotatable
					//.rotatable();
					
					rem.text('X');
					rem.attr('data-type','delete');
					
					var rulerX = ruler.clone();
					
					ruler.addClass('ruler-y');
					rulerX.addClass('ruler-x');
					
					//$('.text-editor', $this).resizable().rotatable();
					//$('.text-editor div.ui-rotatable-handle', $this).addClass("ui-rotatable-handle-se");
					$('.text-editor', $this).append(/*rem, */ruler, rulerX);
					
				},
				// Global collection
				__construct = function(){
					size();
					initDraggable();
					reset.fields();
					reset.buttons();
					reset.activeButtonsProperty();
				};
			
			/***************************/
			
			/* Upload new image */
			$("#upload").on('change',function(){
				var el = $(this),
					This = el.get(0);
				
				if (This.files && This.files[0]) {
					var FR= new FileReader(),
						allowed = 'gif,jpeg,jpg,png'.split(','),
						type = This.files[0].type.toLowerCase().split('/');
					
					if(type[1])
						type = type[1];
					else
						type = type[0];	
					
					if(allowed.indexOf(type) > -1)
					{
						
					//	$this.append(loader);
						FR.addEventListener("load", function(e) {
							$("#image-edit").attr('src',e.target.result).promise().done(function(){
								
								setTimeout(function(){
									size();
									el.parents('.property').removeClass('active');
									$("#embed").val('');
									
								},10);
							});
						}); 
						FR.readAsDataURL( This.files[0] );
					}
					else alert('Wrong format!');
				}
			});
			
			/* Get embeded image */
			$("#embed").on('change keyup input',$.debounce(300,function(){
				var This = $(this),
					val = This.val(),
					toDataURL = function(url, callback) {
						try{
							
						//	$this.append(loader);
							var xhr = new XMLHttpRequest();
							xhr.open('GET', url);
							xhr.onload = function () {
								if (xhr.readyState === 4) {  
									if (xhr.status === 200) {
										var reader = new FileReader();
										reader.onloadend = function() {
											callback(reader.result);
											
										}
										reader.readAsDataURL(xhr.response);
									} else {  
									   alert("Error " + xhr.statusText);  
									   
									}  
								}
								else
								{
									
								}
							};
							xhr.responseType = 'blob';
							xhr.send();
						}catch(err){
							alert(err);
							
						}
					};
					
				if(!$.empty(val) && $.isImg(val))
				{
					toDataURL($.trim(val), function(dataUrl) {
						$("#image-edit").attr('src',dataUrl).promise().done(function(){
							
							setTimeout(function(){
								size();
								This.parents('.property').removeClass('active');
								$("#upload").val('');
								
							},10);
						});
					});
				
				}
			}));
			
			// Compile and save image
			$(document).on('click', '#save', function(){
				var This = $(this);

				reset.fields();
				reset.buttons(true);
				reset.activeButtonsProperty();

				function generateImage(canvas, width, height){
					var img = new Image();
					img.crossOrigin = "Anonymous";
					img.width = width;
					img.height = height;
					img.src = canvas.toDataURL();
					img.align = 'middle';
					img.class = 'img-responsive';
					img.style.width = '100%';
					img.style.maxWidth = width + 'px';
					img.style.border = 'none';

					document.body.appendChild(img);
				}
				
				html2canvas($this, {
					onrendered: function(canvas) {
						generateImage(canvas, ($this.width()+2),($this.height()+2));
					},
					width: $this.width()+2,
					height: $this.height()+2
				});
			});
			
			// Activate and setup rotatable
			/*
            $(document).on("mousedown", ".text-editor .ui-rotatable-handle",  function(e) {
				$(this).addClass('ui-rotatable-handle-active');
				$('.text-editor', $this).rotatable("instance").startRotate(e);
			}).on("mouseup", ".text-editor .ui-rotatable-handle",  function(e) {
				$(this).removeClass('ui-rotatable-handle-active');
			});
			*/
			// Activate on layers
			$(document).on('click', 'li[id^="layer-"]', function(){
				reset.fields();
				var This = $(this),
					id = This.attr('id')
					element = $('div[data-id^="' + id + '"]').parent();
				
				if(!(element.hasClass('active')))
				{
					reset.buttons(false);
					element.css({
						zIndex : 99
					})
					.addClass('active')
					.resizable( "enable" );
					
					element.find('.edit-text').prop('contenteditable',true).placeCaretAtEnd().loadData();
				}
				else
				{
					element.find('.edit-text').focus().placeCaretAtEnd();
				}
				This.addClass('active');
			});
			
			// Delete active editor
			$(document).on('click touchstart','.text-editor .remove',function(e){
				if(e.target.dataset.type && e.target.dataset.type == 'delete')
				{
					var This = $(this),
						elem = This.parent('.text-editor'),
						id = elem.find('div[data-id^="layer-"]').attr('data-id');
					e.preventDefault();
					//if(e.target.class)
					elem.remove();
					$('#'+id).remove();
					
					reset.fields();
					reset.buttons(true);
					reset.activeButtonsProperty();
				}
			});
			
			// Focus and activate editors
			$(document).on('click touchstart mousedown','.text-editor',function(e){
				
				reset.activeButtonsProperty();
				if(e.target.dataset.type != 'delete')
				{
					if(!($(this, $this).hasClass('active')))
					{
						reset.fields();
						reset.buttons(false);
						$(this, $this).css({
							zIndex : 99
						})
						.addClass('active')
						.resizable( "enable" );
						
						var editor = $('.text-editor.active').find('.edit-text');
						
						editor.prop('contenteditable',true).placeCaretAtEnd().loadData();
						var id = editor.attr('id');
						
						$('#layers > #'+id).addClass('active');
					}
					else
					{
						var editor = $('.text-editor.active').find('.edit-text');
						editor.focus().placeCaretAtEnd();
						var id = editor.attr('data-id');
						$('#layers > #'+id).addClass('active');
					}
				}
			});
			
			// When something is changed in active editor
			$(document).on('change keyup','.text-editor.active .edit-text',function(e){
				var el = $(this),
					layer = el.attr('data-id'),
                    text = el.text();
				//el.text(el.text()).pointCursor();
				$('#layers > #' + layer + ' > span')
                    .text(text)
                    .parent()
                    .attr('title',text);
			});
			
			// Disable editor
			$(document).on('click touchstart','#image-edit',function(e){
				reset.fields();
				reset.buttons(true);
				reset.activeButtonsProperty();
			});
			
			// Toggle action buttons
			$(document).on('click touchstart', '#image-editor-console > li > button', function(e){
				
				if(e.target.type == 'button')
				{
					var This = $(this),
						prop = This.find('.property');
					
					if(prop)
					{
						reset.activeButtonsProperty(e);
						
						if(prop.hasClass('active'))
							prop.removeClass('active');
						else
							prop.addClass('active');
					}
				}
			});
			
			// Focus and activate editors
			$(document).on('click touchstart','#image-editor-console #new',function(){
				reset.fields();
				reset.buttons(false);
				var id = $.rand(1111,99999)+Math.floor(Date.now() / 1000),
					html = '<div class="text-editor active" style="z-index:99;"><div class="edit-text" contenteditable="true" ondragenter="event.preventDefault(); event.dataTransfer.dropEffect = \'none\'" ondragover="event.preventDefault(); event.dataTransfer.dropEffect = \'none\'" data-id="layer-' + id + '">Edit Text</div></div>',
					layer = '<li id="layer-' + id + '" class="active"><span>Edit Text</span></li>';
				$this.prepend(html);
				$('#layers').append(layer);
				
				$('.text-editor.active', $this).find('.edit-text').placeCaretAtEnd().css({
					textAlign : 'left',
					color : '#00000',
					background : 'transparent',
					fontSize : '12pt',
					fontFamily : 'Arial, Helvetica, sans-serif',
				}).loadData();
				initDraggable();
			});
			// Text Size
			$(document).on('click touchstart','#image-editor-console #uppercase',function(){
				var e = $('.text-editor.active', $this).find('.edit-text').get(0), uppercase;
				if(e.style.textTransform == 'uppercase')
					uppercase = '';
				else
					uppercase = 'uppercase';
					
				$('.text-editor.active', $this).find('.edit-text').css({
					textTransform:uppercase
				}).loadData();
			});
			// Font size
			$(document).on('change select','#image-editor-console #font-size',function(){
				var val = $(this).val();
				$('.text-editor.active', $this).find('.edit-text').css({
					fontSize:val
				}).loadData();
			});
			// Font family
			$(document).on('change select','#image-editor-console #font-family',function(){
				var val = $(this).val();
				$('.text-editor.active', $this).find('.edit-text').css({
					fontFamily:val
				}).loadData();
			});
			//	Bold
			$(document).on('click touchstart','#image-editor-console #text-bold',function(){
				var e = $('.text-editor.active', $this).find('.edit-text').get(0), bold;
				if(e.style.fontWeight == 'bold')
					bold = '';
				else
					bold = 'bold';
					
				$('.text-editor.active', $this).find('.edit-text').css({
					fontWeight:bold
				}).loadData();
			});
			//	Italic
			$(document).on('click touchstart','#image-editor-console #text-italic',function(){
				var e = $('.text-editor.active', $this).find('.edit-text').get(0), italic;
				if(e.style.fontStyle == 'italic')
					italic = '';
				else
					italic = 'italic';
					
				$('.text-editor.active', $this).find('.edit-text').css({
					fontStyle:italic
				}).loadData();
			});
			//	Align left
			$(document).on('click touchstart','#image-editor-console #align-left',function(){
				$('.text-editor.active', $this).find('.edit-text').css({
					textAlign:'left'
				}).loadData();
			});
			// Align right
			$(document).on('click touchstart','#image-editor-console #align-right',function(){
				$('.text-editor.active', $this).find('.edit-text').css({
					textAlign:'right'
				}).loadData();
			});
			// Align center
			$(document).on('click touchstart','#image-editor-console #align-center',function(){
				$('.text-editor.active', $this).find('.edit-text').css({
					textAlign:'center'
				}).loadData();
			});
			// Align justify
			$(document).on('click touchstart','#image-editor-console #align-justify',function(){
				$('.text-editor.active', $this).find('.edit-text').css({
					textAlign:'justify'
				}).loadData();
			});
			
			/* Colorpicker enable text color */
			$('#text-color .colorpicker-component').colorpicker().on('changeColor',function(e){
				var This = $(this),
					value = e.color.toString('hex');
					
				$("#text-color").css({
					background:value,
				});
				$('#text-color .colorpicker-component input').val(value);
				
				$('.text-editor.active', $this).find('.edit-text').css({
					color:value,
				});
			});
			
			/* Colorpicker enable text background color */
			$('#text-background .colorpicker-component').colorpicker().on('changeColor',function(e){
				var This = $(this),
					value = e.color.toString('rgba');
					
				$("#text-background").css({
					background:value,
				});
				$('#text-background .colorpicker-component input').val(value);
				
				$('.text-editor.active', $this).find('.edit-text').css({
					background:value,
				});
			});
			
			/***************************/
			
			/* When form is changed, save into storage */
		/*
			$('#container').isChange(function(e){
				var html = $(this).html();
				$.storage('save-image-editor',html);
			},{offset:2000});
		*/
			
			// Global includes
			$(document).ready(__construct);
			$(window).resize(size);
		};
		
		$("#img-editor").imageEditor();
	}(window.jQuery || window.Zepto));
    </script>
  </body>
</html>