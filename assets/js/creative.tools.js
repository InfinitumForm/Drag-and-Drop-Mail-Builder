/** 
* Creative Tools v1.0.0
* 
* @author Ivijan-Stefan Stipic (creativform@gmail.com)
* @required jQuery library
* @license Licensed under MIT License
*/
;(function($){
/*
*	$.empty(string) -  Returns BOOLEAN "true" if string is false, empty or null; or "false" if string is true, not empty or not null
*	
*	EXAMPLE 1:
*	------------------------------------------------
	val email = $("input[name='email']").val();
	if($.empty(email)){
		// email field is empty
	}
	else{
		// email field is NOT empty
	}
*	
*	EXAMPLE 2:
*	------------------------------------------------
	val element = false;
	if($.empty(element)){
		// element is false
	}
	else{
		// element is true
	}
*	
*	EXAMPLE 4:
*	------------------------------------------------
	val element = null;
	if($.empty(element)){
		// element is null
	}
	else{
		// element is not null
	}
*	
*	EXAMPLE 5 (tinyMCE support):
*	------------------------------------------------
	val element = $('#tinyeditor').val();
	if($.empty(element, 'tinyeditor')){
		// element is empty
	}
	else{
		// element is not empty
	}
*/
$.empty = function (element, tinyMCE_ID){
	string = element;
	if (tinyMCE_ID && tinyMCE_ID!='' && typeof(tinyMCE) != 'undefined' && $.isFunction(tinyMCE) && (element.length > 0)) {
		element = tinyMCE.get(tinyMCE_ID).getContent();
	}
	if( $.isArray( element ) || $.type( element ) === "string")
    return (string.length === 0);
  else{
    if( $.isEmptyObject(element) ) return true;
  }
  return false;
};
/*
*	$.isset(element) - Check if string is setup or not, return BOOLEAN true/false
*/
$.isset = function (element){
	return (typeof(element) != "undefined" && element.length > 0);
};
/*
*	$.isNull(element) - Check if string is NULL, return BOOLEAN true/false
*/
$.isNull = function (element){
	return (!element);
};
/*
*	$.isBool(element) - Check if string is boolean, return BOOLEAN true/false
*/
$.isBool = function (element){
	return (typeof(element) === "boolean" || element instanceof Boolean);
};
/*
*	$.isObject(element) - Check if string is object, return BOOLEAN true/false
*/
$.isObject = function (element){
	return (typeof(element) === "object" || element instanceof Object);
};
/*
*	$.isNumber(element) - Check if string is number, return BOOLEAN true/false
*/
$.isNumber = function (element){
	return (typeof(element) === "number" || element instanceof Number);
};
/*
*	$.isNumeric(element) - Check if string is numeric, return BOOLEAN true/false
*/
$.isNumeric = function (element){
	return !$.isArray( element ) && (element - parseFloat( element ) + 1) >= 0;
};
/*
*	$.isString(element) - Check if string is real string, return BOOLEAN true/false
*/
$.isString = function (element){
	return (typeof(element) === "string" || element instanceof String);
};
/*
*	$.isFunction(element) - Check if string is function, return BOOLEAN true/false
*/
$.isFunction = function (element){
	var getType = {};
	return (element && getType.toString.call(element) === '[object Function]');
};
/*
*	$.isMobile() - Check if browser is mobile, return BOOLEAN true/false
*/
$.isMobile=function(){
	/*return ((/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) ? true : false);*/
	return ((/mi(ui)?|android|webos|avantgo|iphone|ipad|ipod|blackberry|iemobile|bolt|boost|cricket|docomo|fone|hiptop|mini|opera mini|kitkat|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos/i.test(navigator.userAgent.toLowerCase())) ? true : false);
};
/*
*	$.isTouch() - Check if device is touch, return BOOLEAN true/false
*/
$.isTouch = function(){
	return (('ontouchstart' in window) || ((window.DocumentTouch) && (document instanceof DocumentTouch)) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints > 0));
};
/*
*	$.isImage(string) - Check if string is image, return BOOLEAN true/false
*/
$.isImage = function(string) {
	
	if(null === string || false === string)
		return false;
	return ((string.match(/\.(jpeg|jpg|gif|png|bmp|svg|tiff|jfif|exif|ppm|pgm|pbm|pnm|webp|hdr|hif|bpg|img|pam|tga|psd|psp|xcf|cpt|vicar)$/)!=null) ? true : false);
};
/*
*	$.isVideo(string) - Check if string is video, return BOOLEAN true/false
*/
$.isVideo = function(string) {
	
	if(null === string || false === string)
		return false;
	
	return ((string.match(/\.(webm|mkv|flv|vob|ogv|ogg|drc|gifv|mng|avi|mov|qt|wmv|yuv|rm(vb)?|mp[42evg]|mpeg|m4p|3g[p2]|f4[vapb]|asf)$/)!=null) ? true : false);
};
/*
*	$.isImg(string) - alias of $.isImage(string), return BOOLEAN true/false
*/
$.isImg = function(string) { return $.isImage(string); };
/*
*	$.imageExists(string,callback) - Check is image exists, return BOOLEAN true/false
*/
$.imageExists = function(string,callback){
	if($.isImage(string)){
		var img = new Image(10,10);
		img.src = string;
		img.onload = function() {
			if(typeof callback == 'function'){
				callback(true);
				img = null;
			}
		};
		img.onerror = function() {
			if(typeof callback == 'function'){
				callback(false);
				img = null;
			}
		};
	}
	else
	{
		if(typeof callback == 'function'){
			callback(false);
			img = null;
		}
	}
};
/*
*	$.imgExists(string) - alias of $.isImageExists(string,callback), return BOOLEAN true/false
*/
$.imgExists = function(string,callback){
	return $.imageExists(string,callback)
};
/*
*	$.toSlug(text) - Convert text to URL slug
*/
/*
*	$.isJSON(string) - check is string JSON format, return BOOLEAN false or parsed object
*/
$.isJSON = function(string) {
	 try {
		if (string && typeof string === "object"){
			return string;
		}else{			
			var o = JSON.parse(string);

			if (o && typeof o === "object") {
				return o;
			}
		}
    }
    catch (e) { }

    return false;
};
/*
*	$.toSlug(text) - Convert text to URL slug
*/
$.toSlug = function(text) {
	text = text.replace(/\s+\s/g,' ');
	var arrayFind=['š','đ','č','ć','ž','љ','њ','е','р','т','з','у','и','о','п','ш','ђ','а','с','д','ф','г','х','ј','к','л','ч','ћ','ж','ѕ','џ','ц','в','б','н','м',/\W/g, /\s/g,'--',/[^a-z0-9\-]/g,"--",/\-+\-/],
		arrayRemove=['s','dj','c','c','z','q','w','e','r','t','z','u','i','o','p','s','dj','a','s','d','f','g','h','j','k','l','c','c','z','s','dz','c','v','b','n','m','-','-','-','','-','-'],
		maxArr=arrayFind.length;
	text=text.toLowerCase();
	for(var i=0; i<maxArr; i++){
		text=text.replace(arrayFind[i],arrayRemove[i]);
	}
	text = text.replace(/-{2,}/g,'-');
	return text;
};
/*
*	$.toObjects(object) - Convert objects from array
*/
$.toObjects = function(t) {
	for (var e = {}, n = 0; n < t.length; n++) void 0 != t[n] && (e[n] = t[n]);
	return e
};
/*
*	$.toArray(object) - Convert array from object
*/
$.toArray = function(t) {
	var e = function(t) {
			return !isNaN(parseFloat(t)) && isFinite(t)
		},
		n = [];
	for (var r in t) t.hasOwnProperty(r) && (e(r) ? n[r] = t[r] : n.push(t[r]));
	return n
};
/*
*	$.shuffle(array) - Shuffle array to get some random results
*/
$.shuffle = function(t) {
	for (var e, n, r = t.length; 0 != r;) n = Math.floor(Math.random() * r), r -= 1, e = t[r], t[r] = t[n], t[n] = e;
	return t
};
/*
*	$.rand(min, max) - Get random number
*/
$.rand = function (min, max) {
	min = min || 0;
	max = max || 0;
	
	if(min===0 || max===0 || !$.isNumber(min) || !$.isNumber(max)) 
		return Math.floor(Math.random() * 999999) + 1;
	else
		return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
*	$.urlExists(url) - Check is URL exists
*/
$.urlExists = function(url) {
	var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
};
    
/*
* $.base64_encode(str) - Encode string to Base 64 (support unicode characters)
*/
$.base64_encode = function(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}
/*
* $.base64_decode(str) - Decode Base 64 string to normal value (support unicode characters)
*/
$.base64_decode = function(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

/*
*	$.compare(value1, value2, operator) - Safe compare 2 strings, return BOOLEAN true/false

	EXAMPLE 1:
	----------------------------------------------
	value1 = '100';
	value2 = '50';
	if($.compare(value1, value2, ">")){
		// value1 is bigger then value2
	}
	// equal like
	if(value1 > value2){
		// value1 is bigger then value2
	}
	
	EXAMPLE 2:
	----------------------------------------------
	value1 = 'john';
	value2 = 'john';
	if($.compare(value1, value2)){
		// result is true. John is realy John
	}
	// equal like
	if(value1 === value2){
		// result is true. John is realy John
	}
	
	OPERATORS:
	----------------------------------------------
	"&", "&&", "and"		//compare 2 values:
							0 & 1 = false
							0 & 0 = false
							1 & 0 = false
							1 & 1 = true
							
	">"						value1 > value2 = true
	"<"						value1 < value2 = true
	">="					value1 >= value2 = true
	"<="					value1 <= value2 = true
	"=", "===", "double"		value1 === value2 = true
	"===", "!"				value1 === value2 = true // absolute
	
	"|", "||", "or", "?"	//compare 2 values:
							0 || 1 = true
							0 || 0 = false
							1 || 0 = true
							1 || 1 = true
	
	"xor"					TRUE if either value1 or value2 is TRUE, but not both.
							0 xor 1 = true
							0 xor 0 = false
							1 xor 0 = true
							1 xor 1 = false
*/
$.compare = function (value1, value2, operator){
	value1 = value1 || null;
	value2 = value2 || null;
	operator = operator || "absolute";
	operator = operator.toLowerCase();
	
	if(operator==='&' || operator==='&&' || operator==='and')
		return (value1 && value2);
	else if(operator==='xor')
		return ( value1 || value2 ) && !( value1 && value2 );
	else if(operator==='>')
		return (value1 > value2);
	else if(operator==='>=')
		return (value1 >= value2);
	else if(operator==='<')
		return (value1 < value2);
	else if(operator==='<=')
		return (value1 <= value2);
	else if(operator==='=' || operator==='===' || operator==='double')
		return (value1 === value2);
	else if(operator==='===' || operator==='absolute' || operator==='!')
		return (value1 === value2);
	else if(operator==='||' || operator==='|' || operator==='or' || operator==='?')
		return (value1 || value2);
	else
		return alert('Operator "'+ operator +'" in function $.compare() is not valid!');
};
/*
	$(element).imgRefresh(interval); - Refresh image each ??? milisecond, default 10000 ms (10s);
	
	EXAMPLE:
	----------------------------------------------
	$("#gallery img").imgRefresh(1000); // refresh images each 1s
*/
$.fn.imgRefresh=function(interval){
	var e = this,
		s = e.attr("src"),
		i = (interval || 10000);
	if(e && s)
	{
		setInterval(function(){
			e.attr("src", s + "?" + new Date().getTime());
		},i);
	}
	return e;
};
/*
	$(element).isChange(callback, options); - Derect all changes on and in elemen
	
	EXAMPLE:
	----------------------------------------------
	$("textarea").isChange(function(){
		// Do something
	},{
		offset 	: 300,		// interval of monitoring
		monitoring	: true	// if you put `false` then monitoring stop on first change
	});
*/
$.fn.isChange=function(callback, options){
	var s=$.extend({
		offset 	: 300,
		monitoring	: true
	},options);

	var $this = this,
        $init = ($this ? $this.html() : ''),
        checking 	= setInterval(function() {
            var $check = ($this ? $this.html() : '');
            if($init != $check)
            {
                if (typeof callback === 'function') {
					if(s.monitoring===false){clearInterval(checking);}
					callback.call($this);
				}
				$init = $check;
            }
        },s.offset);
    return $this;
};
/*
	$(element).onPopup(options); - Open Popup window
	-Ths function open new popup window on your browser
	
	EXAMPLE:
	----------------------------------------------
	<a href="http://google.com">Google</a>
	
	$("a#link").onPopup({
		name		:	"Popup Window",
		width 		:	800,
		height		:	600
	});
	
	OPTIONS:
	----------------------------------------------
	attr			// attribute where is located link
	name			// name of popup window
	width			// max width
	height			// max height
	left			// position left	(px)
	top				// position top	(px)
	resizable		// resizable 1 or 0
	location		// display location 1 or 0
	fullscreen		// open in full screen	1 or 0
	scrollbars		// display scroll bars	1 or 0
	titlebar		// display title bar	1 or 0
	toolbar			// display tool bar		1 or 0
	directories		// display directories	1 or 0
*/
$.fn.onPopup=function(options){
	var $element	= this,
		s=$.extend({
			attr		:	"href",
			name		:	"Popup Window",
			width 		:	700,
			height		:	600,
			left  		:	false,
   			top   		:	false,
			resizable	:	0,
			location	:	0,
			fullscreen	:	0,
			scrollbars	:	1,
			titlebar	:	0,
			toolbar		:	0,
			directories	:	0
		},options);
	
	if(s.left == true || s.left == false || s.left == null)
		s.left = ($(window).width()/2)-(s.width/2);
		
	if(s.top == true || s.top == false || s.top == null)
		s.top = ($(window).width()/2)-(s.height/2);
		
	$element.on("click",function(e) {
		e.stopPropagation(); e.preventDefault();
		window.open(
			$(this).attr(s.attr), s.name, "width="+s.width+", height="+s.height+", directories="+s.directories+", toolbar="+s.toolbar+", titlebar="+s.titlebar+", scrollbars="+s.scrollbars+", fullscreen="+s.fullscreen+", location="+s.location+", resizable="+s.resizable+", top="+s.top+", left="+s.left
		);
	 });
};
/*
*	$.rot13(string) - Perform the rot13 transform on a string
*
*	The ROT13 encoding simply shifts every letter by 13 places in the alphabet while leaving non-alpha characters untouched.
*	Encoding and decoding are done by the same function, passing an encoded string as argument will return the original version. 
*/
$.rot13 = function (a,b){return++b?String.fromCharCode((a<"["?91:123)>(a=a.charCodeAt()+13)?a:a-26):a.replace(/[a-zA-Z]/g,$.rot13);};
/*
*	$.round(number,decimals) -  Returns the round number in string. 
*/
$.round = function (number,decimals){
	var sign = ((number >= 0) ? 1 : -1); decimals=decimals||2;
	return (Math.round((number*Math.pow(10,decimals))+(sign*0.001))/Math.pow(10,decimals)).toFixed(decimals);
};
/*
*	$.count(array) -  Returns the number of elements in an array (immproved equivalent to .length property). 
*/
$.count = function (array){
	var length=array.length;
	if(length) return length;
	else
	{
		length = 0;
		for ( var p in array ){
			if(array.hasOwnProperty(p)) length++;
		}
		return length;
	}
};
/*
*	$.countWords(string) -  Returns the number of words in string. 
*/
$.countWords = function (string){
	string = string.replace(/[,\.\-\_\+\"\'\?\=\/\|\;\:\%\$\#\!\&\€\*\ ]+/g," ").replace(/[^a-zA-Z\ ]+/g,"");
	string = $.trim(string).split(" ");
	return string.length;
};
/*
*	$.upperWords(string) - Uppercase the first character of each word in a string
*/
$.upperWords = function(string){
	var pieces = string.split(" ");
	for ( var i = 0; i < pieces.length; i++ )
	{
		var j = pieces[i].charAt(0).toUpperCase();
		pieces[i] = j + pieces[i].substr(1);
	}
	return pieces.join(" ");
};
/*
*	$.upperFirst(string) - Make a string's first character uppercase
*/
$.upperFirst = function(string){
	return string && string.charAt(0).toUpperCase() + string.slice(1);
};
/*
*	$.prepend(number, max) - Adding extra zeros in front of a number
*/
$.prepend = function(number, max) {
	var str = number.toString();
	return ((str.length < max) ? $.prepend("0" + str, max) : str);
};
/*
*             discuss at: http://phpjs.org/functions/parse_url/
*            original by: Steven Levithan (http://blog.stevenlevithan.com)
*       reimplemented by: Brett Zamir (http://brett-zamir.me)
*               input by: Lorenzo Pisani
*               input by: Tony
*            improved by: Brett Zamir (http://brett-zamir.me)
* added to CreativeTools: Ivijan-Stefan Stipic (http://creativform.com)
*                   note: original by http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
*                   note: blog post at http://blog.stevenlevithan.com/archives/parseuri
*                   note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
*                   note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
*                   note: a seriously malformed URL.
*                   note: Besides function name, is essentially the same as parseUri as well as our allowing
*                   note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
*
*                example: $.parseURL('http://username:password@hostname/path?arg=value#anchor');
*                returns: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
*	
*	LIVE EXAMPLE:
*	------------------------------------------------
	var url=$.parseURL('http://creativform.com/webmaster-tools/');
	alert("Visit our Webmaster Tools: "+url['scheme']+'://'+url['host']);
*/
$.parseURL = function(str, component) {
	var query, key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port','relative', 'path', 'directory', 'file', 'query', 'fragment'],
		ini = (this.php_js && this.php_js.ini) || {},
		mode = (ini['phpjs.parse_url.mode'] &&
		ini['phpjs.parse_url.mode'].local_value) || 'php',
		parser = {
			php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
		};
	var m = parser[mode].exec(str),
		uri = {},
		i = 14;
	while (i--){if (m[i]) {uri[key[i]] = m[i];}}
	
	if (component) {
		return uri[component.replace('PHP_URL_', '').toLowerCase()];
	}
	if (mode != 'php') {
		var name = (ini['phpjs.parse_url.queryKey'] &&
		ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
		parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
		uri[name] = {};
		query = uri[key[12]] || '';
		query.replace(parser, function($0, $1, $2){if ($1) {uri[name][$1] = $2;}});
	}
	delete uri.source;
	return uri;
};

/*
*	$.validate(variable, filter) - Validate a variable with a specified filter [return value or (BOOLEAN) false]
*
*	FILTERS:
*	------------------------------------------------
	EMAIL			// validate email
	URL				// validate URL
	IP				// validate IP address
	FLOAT			// validate float number
	NUMBER			// validate number 
	YOUTUBE			// validate all YouTube links
	FACEBOOK		// validate all Facebook links
	TWITTER			// validate all Twitter links
	LINKEDIN		// validate all Linkedin links
	PINTEREST		// validate all Pinterest links
	INSTAGRAM		// validate all Instagram links
	GITHUB			// validate all Pinterest links
	REDDIT			// validate all Reddit links
	CREATIVFORM		// validate all CreativForm links
*
*	EXAMPLE:
*	------------------------------------------------
	var email=$.validate('example@domain.com', "EMAIL");
	if(email!=false){
		alert( email );
	} else {
		alert( 'Email is not valid' );
	}
*/
$.validate = function(variable, filter){
	variable = $.trim(variable) || false;
	filter 	 = $.trim(filter) || false;
	if(variable && filter)
	{
		
		if(filter === "EMAIL" || filter === "MAIL")
		{
			f=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if(f.test(variable)) return variable;
		}
		else if(filter === "URL")
		{
			f=/((((s?ft|ht{2})ps?):\/{2})?([a-z0-9\-\_]{1,255})\.?([a-z0-9\-\_\@]{2,255})\.([a-z]{2,10})\:?([0-9]+)?($|\/([a-z0-9\#\!\:\.\?\+\=\&\%\@\!\-\/\|\_]+)?))/i;
			if(f.test(variable)) return variable;
		}
		else if(filter === "IP")
		{
			var blocks = variable.split(".");
			if(blocks.length === 4)
			{
				if( blocks.every(function(block){return parseInt(block,10) >=0 && parseInt(block,10) <= 255;}))
				{
					return variable;
				}
			}
		}
		else if(filter === "FLOAT")
		{
			if(!$.isArray( variable ) && (variable - parseFloat( variable ) + 1) >= 0)
			return variable;
		}
		else if(filter === "NUMBER")
		{
			return $.isNumeric(variable);
		}
		else if(filter === "FACEBOOK")
		{
			f=/^(https?:\/\/)?((w{3}\.)?)facebook\.com\/.*/i;
			if(f.test(variable)) return variable;
		}
		else if(filter === "TWITTER")
		{
			f=/^(https?:\/\/)?((w{3}\.)?)twitter\.com\/(#!\/)?[a-z0-9_]+$/i;
			if(f.test(variable)) return variable;
		}
		else if(filter === "YOUTUBE")
		{
			f=/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
			if(f.test(variable)) return variable;
		}
		else if(filter === "LINKEDIN")
		{
			f=/(http|https):\/\/?(?:www\.)?linkedin\.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
			if(f.test(variable)) return variable;
		}
		else if(filter === "PINTEREST")
		{
			f=/(http|https):\/\/?((w{3}\.)?)pinterest\.com\/.*/i;
			if(f.test(variable)) return variable;
		}
		else if(filter === "INSTAGRAM")
		{
			f=/(http|https):\/\/?((w{3}\.)?)instagram\.com\/.*/i;
			if(f.test(variable)) return variable;
		}
		else if(filter === "GITHUB")
		{
			f=/^(https?:\/\/)?((w{3}\.)?)github\.com\/(#!\/)?[a-z0-9_]+$/i;
			if(f.test(variable)) return variable;
		}
		else if(filter === "REDDIT")
		{
			f=/(http|https):\/\/?((w{3}\.)?)reddit\.com\/.*/i;
			if(f.test(variable)) return variable;
		}
		else if(filter === "CREATIVFORM")
		{
			f=/(http|https):\/\/?((w{3}\.)?)creativform\.com\/.*/i;
			if(f.test(variable)) return variable;
		}
		return false;
	} else return false;
};
/*
*	FULL SCREEN BOX
*	This option resize any element to fit on screen size. This is realy good for responsive themplates.
*	Also detects and resizing windows in real time what is good for mobiles and tablets
*	
*	USAGE:
*	------------------------------------------------
*	$(element).fullScreen(options);
*	
*	EXAMPLE:
*	------------------------------------------------
<div class="content-box">1</div>
<div class="content-box">2</div>
<div class="content-box">3</div>
<div class="content-box">4</div>
<script>
	$(function(){
		$(".content-box").fullScreen();
	});
</script>
*
*	CUSTOM OPTIONS:
*	------------------------------------------------
	offset		 	DEFAULT: 0			//-This is vertical offset (allows negative values)
	width			DEFAULT: 0			//-Custom width
	height			DEFAULT: 0			//-Custom height
	css_support		DEFAULT: false		//-Put this true if you whant to use CSS for hadle with elements
*
*	CORE HTML STRUCTURE:
*	------------------------------------------------
	<div class="full-screen-box-table">
		<div class="full-screen-box-cell">... Your content automaticly inserted with fullScreen() function ...</div>
	</div>
*/
$.fn.fullScreen = function(options){
	// make default options or methods
	var settings=$.extend({
		offset		 	: 	0,
		width				: 	0,
		height			:	0,
		css_support	:	false,
		attach			:	false,
		attach_offset	:	0,
	}, options ),
	// set CSS for table
		boxTable = {
		'display':'table',
		'padding':'0px'
	},	boxCell = {
		'display':'table-cell',
		'vertical-align':'middle'
	};
	// make container for content
	this.each(function(){
		var element	= $(this),
			content	= $(this).html();
		element.html("").append('<'+'div'+' class'+'='+'"full-screen-box-table"'+'>'+'<'+'div'+' class'+'='+'"full-screen-box-cell"'+'>'+content+'<'+'/'+'div'+'>'+'<'+'/'+'div'+'>');
	});
	var SetupSize=function(){
		var win_height	=	((settings.attach!=false)? ($(settings.attach).height())-settings.attach_offset : $(window).height());
		$('.full-screen-box-table').each(function(){
			$(this).css({
				'width':(settings.width===0?('100%'):settings.width),
				'height':(settings.height===0?(win_height-settings.offset+'px'):settings.height)
			});
			if(settings.css_support===false){
				$(this).css(boxTable);	
			}
		});
		$('.full-screen-box-cell').each(function(){
			$(this).css({
				'width':(settings.width===0?('100%'):settings.width),
				'height':(settings.height===0?(win_height-settings.offset+'px'):settings.height)
			});
			if(settings.css_support===false){
				$(this).css(boxCell);	
			}
		});
	};
	// set size on load page
	$(document).ready(function(){SetupSize();});
	// set size on resize window
	$(window).on("resize",function(){SetupSize();});
};
/*
	$(element).typingPreview(options); - Read textarea or input element and display in another element in real time
	
	EXAMPLE:
	------------------------------------------------
	<input name="text" type="text" id="text">
	<div id="display"></div>
	<div id="count-letters"></div>
	<div id="count-words"></div>
	
	$("#text").typingPreview({
		text : '#display',
		count : '#count-letters',
		count_words : '#count-words'
	}):
*/
$.fn.typingPreview=function(options){
	var s=$.extend({
		text : 'undefined',
		count : 'undefined',
		count_words : 'undefined'
	},options);
	this.on("keyup", function(){
		var content=$(this).val(),
			len = $(this).val().length;
		if(s.text!='undefined' && s.text!=false && s.text!=null){
			$(s.text).text(content);
		}
		if(s.count!='undefined' && s.count!=false && s.count!=null){
			$(s.count).text(len);
		}
		if(s.count_words!='undefined' && s.count_words!=false && s.count_words!=null){
			$(s.count_words).text($.countWords(content));
		}
	});
};
//  discuss at: http://phpjs.org/functions/date/
// original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
// original by: gettimeofday
//    parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// improved by: MeEtc (http://yass.meetcweb.com)
// improved by: Brad Touesnard
// improved by: Tim Wiel
// improved by: Bryan Elliott
// improved by: David Randall
// improved by: Theriault
// improved by: Theriault
// improved by: Brett Zamir (http://brett-zamir.me)
// improved by: Theriault
// improved by: Thomas Beaucourt (http://www.webapp.fr)
// improved by: JT
// improved by: Theriault
// improved by: Rafał Kukawski (http://blog.kukawski.pl)
// improved by: Theriault
//    input by: Brett Zamir (http://brett-zamir.me)
//    input by: majak
//    input by: Alex
//    input by: Martin
//    input by: Alex Wilson
//    input by: Haravikk
// bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// bugfixed by: majak
// bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// bugfixed by: Brett Zamir (http://brett-zamir.me)
// bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
// bugfixed by: Chris (http://www.devotis.nl/)
//        note: Uses global: php_js to store the default timezone
//        note: Although the function potentially allows timezone info (see notes), it currently does not set
//        note: per a timezone specified by date_default_timezone_set(). Implementers might use
//        note: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
//        note: in order to adjust the dates in this function (or our other date functions!) accordingly
//   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
//   returns 1: '09:09:40 m is month'
//   example 2: date('F j, Y, g:i a', 1062462400);
//   returns 2: 'September 2, 2003, 2:26 am'
//   example 3: date('Y W o', 1062462400);
//   returns 3: '2003 36 2003'
//   example 4: x = date('Y m d', (new Date()).getTime()/1000);
//   example 4: (x+'').length === 10 // 2009 01 09
//   returns 4: true
//   example 5: date('W', 1104534000);
//   returns 5: '53'
//   example 6: date('B t', 1104534000);
//   returns 6: '999 31'
//   example 7: date('W U', 1293750000.82); // 2010-12-31
//   returns 7: '52 1293750000'
//   example 8: date('W', 1293836400); // 2011-01-01
//   returns 8: '52'
//   example 9: date('W Y-m-d', 1293974054); // 2011-01-02
//   returns 9: '52 2011-01-02'
$.date=function(format, timestamp) {
  var that = this,
	  jsdate, f,
	 txt_words = [
    'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  var formatChr = (/\\?(.?)/gi);
  var formatChrCb = function(t, s) {
    return (f[t] ? f[t]() : s);
  };
  var _pad = function(n, c) {
    n = String(n);
    while (n.length < c) {
      n = ('0' + n);
    }
    return n;
  };
  f = {
    // Day
    d: function() { // Day of month w/leading 0; 01..31
      return _pad(f.j(), 2);
    },
    D: function() { // Shorthand day name; Mon...Sun
      return f.l()
        .slice(0, 3);
    },
    j: function() { // Day of month; 1..31
      return jsdate.getDate();
    },
    l: function() { // Full day name; Monday...Sunday
      return txt_words[f.w()] + 'day';
    },
    N: function() { // ISO-8601 day of week; 1[Mon]..7[Sun]
      return (f.w() || 7);
    },
    S: function() { // Ordinal suffix for day of month; st, nd, rd, th
      var j = f.j(), i = (j % 10);
      if (i <= 3 && parseInt((j % 100) / 10, 10) === 1) {
        i = 0;
      }
      return (['st', 'nd', 'rd'][i - 1] || 'th');
    },
    w: function() { // Day of week; 0[Sun]..6[Sat]
      return jsdate.getDay();
    },
    z: function() { // Day of year; 0..365
      	var a = new Date(f.Y(), f.n() - 1, f.j()),
	  		b = new Date(f.Y(), 0, 1);
      return Math.round((a - b) / 864e5);
    },

    // Week
    W: function() { // ISO-8601 week number
      	var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
	  		b = new Date(a.getFullYear(), 0, 4);
      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
    },

    // Month
    F: function() { // Full month name; January...December
      return txt_words[6 + f.n()];
    },
    m: function() { // Month w/leading 0; 01...12
      return _pad(f.n(), 2);
    },
    M: function() { // Shorthand month name; Jan...Dec
      return f.F()
        .slice(0, 3);
    },
    n: function() { // Month; 1...12
      return jsdate.getMonth() + 1;
    },
    t: function() { // Days in month; 28...31
      return (new Date(f.Y(), f.n(), 0))
        .getDate();
    },

    // Year
    L: function() { // Is leap year?; 0 or 1
      var j = f.Y();
      return (((j % 4) === 0) & ((j % 100) != 0) | ((j % 400) === 0));
    },
    o: function() { // ISO-8601 year
      var n = f.n(), W = f.W(), Y = f.Y();
      return Y + ((n === 12) && ((W < 9) ? 1 : n === 1) && ((W > 9) ? -1 : 0));
    },
    Y: function() { // Full year; e.g. 1980...2010
      return jsdate.getFullYear();
    },
    y: function() { // Last two digits of year; 00...99
      return f.Y().toString().slice(-2);
    },

    // Time
    a: function() { // am or pm
      return (jsdate.getHours() > 11 ? 'pm' : 'am');
    },
    A: function() { // AM or PM
      return f.a()
        .toUpperCase();
    },
    B: function() { // Swatch Internet time; 000..999
      var H = (jsdate.getUTCHours() * 36e2);
      // Hours
      var i = (jsdate.getUTCMinutes() * 60);
      // Minutes
      var s = jsdate.getUTCSeconds(); // Seconds
      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
    },
    g: function() { // 12-Hours; 1..12
      return (f.G() % 12 || 12);
    },
    G: function() { // 24-Hours; 0..23
      return jsdate.getHours();
    },
    h: function() { // 12-Hours w/leading 0; 01..12
      return _pad(f.g(), 2);
    },
    H: function() { // 24-Hours w/leading 0; 00..23
      return _pad(f.G(), 2);
    },
    i: function() { // Minutes w/leading 0; 00..59
      return _pad(jsdate.getMinutes(), 2);
    },
    s: function() { // Seconds w/leading 0; 00..59
      return _pad(jsdate.getSeconds(), 2);
    },
    u: function() { // Microseconds; 000000-999000
      return _pad(jsdate.getMilliseconds() * 1000, 6);
    },

    // Timezone
    e: function() { // Timezone identifier; e.g. Atlantic/Azores, ...
      // The following works, but requires inclusion of the very large
      // timezone_abbreviations_list() function.
      throw 'Not supported (see source code of date() for timezone on how to add support)';
    },
    I: function() { // DST observed?; 0 or 1
      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
      // If they are not equal, then DST is observed.
      var a = new Date(f.Y(), 0);
      // Jan 1
      var c = Date.UTC(f.Y(), 0);
      // Jan 1 UTC
      var b = new Date(f.Y(), 6);
      // Jul 1
      var d = Date.UTC(f.Y(), 6); // Jul 1 UTC
      return (((a - c) != (b - d)) ? 1 : 0);
    },
    O: function() { // Difference to GMT in hour format; e.g. +0200
      var tzo = jsdate.getTimezoneOffset();
      var a = Math.abs(tzo);
      return ((tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4));
    },
    P: function() { // Difference to GMT w/colon; e.g. +02:00
      var O = f.O();
      return (O.substr(0, 3) + ':' + O.substr(3, 2));
    },
    T: function() { // Timezone abbreviation; e.g. EST, MDT, ...
      // The following works, but requires inclusion of the very
      // large timezone_abbreviations_list() function.
      /*              var abbr, i, os, _default;
      if (!tal.length) {
        tal = that.timezone_abbreviations_list();
      }
      if (that.php_js && that.php_js.default_timezone) {
        _default = that.php_js.default_timezone;
        for (abbr in tal) {
          for (i = 0; i < tal[abbr].length; i++) {
            if (tal[abbr][i].timezone_id === _default) {
              return abbr.toUpperCase();
            }
          }
        }
      }
      for (abbr in tal) {
        for (i = 0; i < tal[abbr].length; i++) {
          os = -jsdate.getTimezoneOffset() * 60;
          if (tal[abbr][i].offset === os) {
            return abbr.toUpperCase();
          }
        }
      }
      */
      return 'UTC';
    },
    Z: function() { // Timezone offset in seconds (-43200...50400)
      return (-jsdate.getTimezoneOffset() * 60);
    },

    // Full Date/Time
    c: function() { // ISO-8601 date.
      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
    },
    r: function() { // RFC 2822
      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
    },
    U: function() { // Seconds since UNIX epoch
      return jsdate / 1000 | 0;
    }
  };
  this.date = function(format, timestamp) {
    that = this;
    jsdate = (timestamp === undefined ? new Date() : // Not provided
      (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
      new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
    );
    return format.replace(formatChr, formatChrCb);
  };
  return this.date(format, timestamp);
};
/*
* CURRENT TIMESTAMP
* $.time(); - return current timestamp
*/
$.time=function(){return Math.floor(new Date().getTime() / 1000);};
//  discuss at: http://phpjs.org/functions/strtotime/
//     version: 1109.2016
// original by: Caio Ariede (http://caioariede.com)
// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// improved by: Caio Ariede (http://caioariede.com)
// improved by: A. Matías Quezada (http://amatiasq.com)
// improved by: preuter
// improved by: Brett Zamir (http://brett-zamir.me)
// improved by: Mirko Faber
//    input by: David
// bugfixed by: Wagner B. Soares
// bugfixed by: Artur Tchernychev
//        note: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
//   example 1: strtotime('+1 day', 1129633200);
//   returns 1: 1129719600
//   example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
//   returns 2: 1130425202
//   example 3: strtotime('last month', 1129633200);
//   returns 3: 1127041200
//   example 4: strtotime('2009-05-04 08:30:00 GMT');
//   returns 4: 1241425800
$.strtotime = function (text, now) {
  var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;
  if (!text){return fail;}
  // Unecessary spaces
  text = text.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, ' ').replace(/[\t\r\n]/g, '').toLowerCase();
  // in contrast to php, js Date.parse function interprets:
  // dates given as yyyy-mm-dd as in timezone: UTC,
  // dates with "." or "-" as MDY instead of DMY
  // dates with two-digit years differently
  // etc...etc...
  // ...therefore we manually parse lots of common date formats
  match = text.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);
  if (match && match[2] === match[4]) {
    if (match[1] > 1901) {
      switch (match[2]) {
        case "-":
          { // YYYY-M-D
            if (match[3] > 12 || match[5] > 31) {return fail;}
            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
			}
        case ".":
          { // YYYY.M.D is not parsed by strtotime()
            return fail;
          }
        case "/":
          { // YYYY/M/D
            if (match[3] > 12 || match[5] > 31) {
              return fail;
            }

            return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
      }
    } else if (match[5] > 1901) {
      switch (match[2]) {
        case "-":
          { // D-M-YYYY
            if (match[3] > 12 || match[1] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case ".":
          { // D.M.YYYY
            if (match[3] > 12 || match[1] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case "/":
          { // M/D/YYYY
            if (match[1] > 12 || match[3] > 31) {
              return fail;
            }

            return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
      }
    } else {
      switch (match[2]) {
        case "-":
          { // YY-M-D
            if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
              return fail;
            }

            year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
            return new Date(year, parseInt(match[3], 10) - 1, match[5],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
          }
        case ".":
          { // D.M.YY or H.MM.SS
            if (match[5] >= 70) { // D.M.YY
              if (match[3] > 12 || match[1] > 31) {
                return fail;
              }

              return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
            }
            if (match[5] < 60 && !match[6]) { // H.MM.SS
              if (match[1] > 23 || match[3] > 59) {
                return fail;
              }

              today = new Date();
              return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
            }

            return fail; // invalid format, cannot be parsed
          }
        case "/":
          { // M/D/YY
            if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
              return fail;
            }

            year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
            return new Date(year, parseInt(match[1], 10) - 1, match[3],
              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0)/1000;
          }
        case ":":
          { // HH:MM:SS
            if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
              return fail;
            }

            today = new Date();
            return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
              match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
          }
      }
    }
  }

  // other formats and "now" should be parsed by Date.parse()
  if (text === 'now') {
    return now === null || isNaN(now) ? new Date()
      .getTime() / 1000 | 0 : now | 0;
  }
  if (!isNaN(parsed = Date.parse(text))) {
    return parsed / 1000 | 0;
  }

  date = now ? new Date(now * 1000) : new Date();
  days = {
    'sun': 0,
    'mon': 1,
    'tue': 2,
    'wed': 3,
    'thu': 4,
    'fri': 5,
    'sat': 6
  };
  ranges = {
    'yea': 'FullYear',
    'mon': 'Month',
    'day': 'Date',
    'hou': 'Hours',
    'min': 'Minutes',
    'sec': 'Seconds'
  };

  function lastNext(type, range, modifier) {
    var diff, day = days[range];

    if (typeof day != 'undefined') {
      diff = day - date.getDay();

      if (diff === 0) {
        diff = 7 * modifier;
      } else if (diff > 0 && type === 'last') {
        diff -= 7;
      } else if (diff < 0 && type === 'next') {
        diff += 7;
      }

      date.setDate(date.getDate() + diff);
    }
  }

  function process(val) {
    var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
      type = splt[0],
      range = splt[1].substring(0, 3),
      typeIsNumber = /\d+/.test(type),
      ago = splt[2] === 'ago',
      num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

    if (typeIsNumber) {
      num *= parseInt(type, 10);
    }

    if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
      return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
    }

    if (range === 'wee') {
      return date.setDate(date.getDate() + (num * 7));
    }

    if (type === 'next' || type === 'last') {
      lastNext(type, range, num);
    } else if (!typeIsNumber) {
      return false;
    }

    return true;
  }

  times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
    '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
    '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
  regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

  match = text.match(new RegExp(regex, 'gi'));
  if (!match) {
    return fail;
  }

  for (i = 0, len = match.length; i < len; i++) {
    if (!process(match[i])) {
      return fail;
    }
  }

  // ECMAScript 5 only
  // if (!match.every(process))
  //    return false;
  return (date.getTime() / 1000);
};
/*
*	COUNTDOWN FUNCTION
*	This plugin is used to discount from the set size to zero and returns information.
*	
*	USAGE:
*	------------------------------------------------
*	$(element).countdown(options,callback);
*	
*	EXAMPLE:
*	------------------------------------------------
<div id="timer"></div>
<script>
	$(document).ready(function(){
		$("#timer").countdown({
			duration	:	30,				// Discount start from defined number (in this case 30 seconds) DEFAULT: 0
			interval	:	1000,			// interval in millisecond (DEFAULT: interval every 1000ms (1 second))
			text_before	:	"Redirection begins in exactly ",	// initial text before number (example: Redirection begins in exactly 30), DEFAULT: blank
			text_after	:	"seconds"	// initial text after number (example: 30seconds), DEFAULT: blank
		},
		// callback function when discount stop on 0
		function(){
			this.html("Done counting, redirecting.");
   			window.location = "http://www.creativform.com";
		});
	});
</script>
*/
$.fn.countdown = function (options,callback) {
    var settings=$.extend({
        duration        :   0,
        interval        :   1000,
        text_before     :   "",
        text_after      :   "",
        disable         :   false,
    }, options );
    var container = $(this[0]).html(settings.text_before + settings.duration + settings.text_after),
        countdown = setInterval(function (){
        var dd = (settings.duration-1);
        if(settings.disable===true){
            clearInterval(countdown);
        }
        else if (dd > 0){
            container.html(settings.text_before + dd + settings.text_after);
        } else {
            clearInterval(countdown);

            if (typeof callback === 'function') {
                callback.call(container);   
            }
        }
    }, settings.interval);
	return this;
};
/*
	$(element).clock(format); - Update element with time value in real time
*/
$.fn.clock=function(format){
    var This=this;
	format=(format||"m-d-Y H:i:s");
	setInterval(function(){return This.html($.date(format));},1000);
	return this;
};
/* $.cookie(name, [value], [options]); - jQuery cookie plugin for manipulating cookies.
*	
*	USAGE AND EXAMPLE FOR JQUERY PLUGIN:
*	------------------------------------------------
	// Set a session cookie
	$.cookie('the_cookie', 'the_value');
	$.cookie('the_cookie'); // -> 'the_value'
	
	// Set a cookie that expires in 7 days
	$.cookie('the_cookie', 'the_value', { expires: 7 });
	
	// delete the cookie
	$.cookie('the_cookie', null);
*
*	USAGE AND EXAMPLE FOR JQUERY PLUGIN:
*	------------------------------------------------
	
    expires - the expiration time in days or an expiry date
    domain - the domain name
    path - the value of the path for the cookie
    secure - if the cookie requires HTTPS put true (DEFAULT: false)
*/
$.cookie=function(name, value, options){
	var s=$.extend({
		expires	:	0,
		path	:	"",
		domain	:	"",
		secure	:	false,
	}, options );
	var path 	= 	($.empty(s.path)? "" : "; path="+s.path),
		domain 	= 	($.empty(s.domain)? "" : "; domain="+s.domain),
		secure 	= 	((s.secure===true)? "; secure" : "");
	name	=	name	|| "";
	if(typeof value === 'undefined' || value === 'undefined')
		value = false;
	// Create cookie
	if(false === value)
	{//alert("set");
		var expires = "";
		if(s.expires > 0)
		{
			var d = new Date();
			d.setTime(d.getTime() + ((s.expires)*60*60*24*1000));
			expires = "; expires="+d.toUTCString();
		}
		document.cookie = name + "=" + value + expires + domain + path + secure + ";";
	}
	// Destroy/Delete Cookie
	else if(null === value)
	{//alert("delete");
		var d = new Date();
		d.setTime(d.getTime() - (9*365*60*60*24*1000));
		var expires = "; expires="+d.toUTCString();
		document.cookie = name + "=;" + expires + domain + path + secure + ";";
	}
	// Get value from cookie
	else
	{
		var name = name + "=";
		var ca = document.cookie.split(";");
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)===" ") c = c.substring(1);
			if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
		}
		return null;
	}
};
/*
*	$.storage(name, value) - Save, edit, delete to HTML5 Local Storage
*	
*	USAGE AND EXAMPLE FOR JQUERY PLUGIN:
*	------------------------------------------------
	// check if browser support storage
	if($.storage())
	{
		// Set a session storage
		$.storage('the_storage', 'the_value');
		
		// Get session storage
		$.storage('the_storage');
		
		// delete storage
		$.storage('the_storage', null);
	}
	else
	{
		// browser not support, use cookie
	   	alert("WARNING!!! Your Browser is old and not have Web Storage support.\r\nPerhaps you'll have problems using this site.");
	}
*/
$.storage = function(name, value){
	name = $.trim(name).toLowerCase().replace(" ","_").replace(/^a-z_/i) || "";
	
	if(typeof value === 'undefined' || value === 'undefined')
		value = false;
	
	if(!$.empty(name))
	{
		if(typeof(Storage) != "undefined")
		{
			if(false != value)
			{
				localStorage.setItem(name, value);
				return value;
			}
			else if(null === value)
			{
				localStorage.removeItem(name);
				return null;
			}
			else return localStorage.getItem(name);
		} else {
			var saveStorage	=	new Cookie("storage_"+name, "/", location.host);
			if(false != value)
			{
				saveStorage.set(value,(60*60*24*365*3));
				return value;
			}
			else if(null === value)
			{
				saveStorage.destroy();
				return null;
			}
			else return saveStorage.get();
		}
	} else return (typeof(Storage) != "undefined");
};
/*
*	$(element).keyPress(keyNumber, calback) - This function recognize keyboard keys and return event
*
*	EXAMPLE 1 (if keyNumber is false, null or 0, function return key number like event):
*	--------------------------------------------------------------
	$(document).keyPress(false, function(e){
		alert(e);	
	});
*
*	EXAMPLE 2 (return event):
*	--------------------------------------------------------------
	$('form#test').keyPress(13, function(e){
		alert('You press ENTER key!!!');	
	});
*/
$.fn.keyPress = function (keyNumber, callback) {
	keyNumber = (keyNumber || false);
	return this.each(function () {
		$(this).on("keyup", function (e) {
			var keycode = (typeof e.keyCode != 'undefined' && e.keyCode > -1 ? e.keyCode : e.which);
			if(keyNumber!=false || keyNumber > 0 || keyNumber!=null)
			{			
				if (keycode === keyNumber) {
					e.preventDefault();
					if (typeof callback === 'function') {
						callback.call(this, e);
					}
				}
			}
			else
			{
				e.preventDefault();
				if (typeof callback === 'function') {
					return callback.call(this, keycode);
				}
			}
		});
	});
};

/*
*	$(element).press(keyname, calback) - This function recognize keyboard keys by it's names and return event
*
*	EXAMPLE
*	--------------------------------------------------------------
	$(document).press('enter', function(element, key, event){
		alert(key);
	});
*/

$.fn.press = function(key,callback){
	var map = {
		'up' : 38,
		'down' : 0,
		'left' : 0,
		'right' : 0,
		'enter' : 13,
		'esc' : 27,
		'escape' : 27,
		'tab' : 9,
		'shift' : 16,
		'ctrl' : 17,
		'alt' : 18,
		'pgup' : 33,
		'pageup' : 33,
		'pgdn' : 34,
		'pagedown' : 34,
		'home' : 36,
		'end' : 35,
		'plus' : 43,
		'ins' : 45,
		'insert' : 45,
		'del' : 46,
		'delete' : 46,
	}, $this = this;
	
	if(key)
	{
		for(i in map)
		{
			if(i == key)
			{
				return $this.keyPress(map[i], function(e){
					if (typeof callback === 'function') {
						callback.call(this, i, e);
					}
				});
			}
		}
	}
	
	return $this;
};

/*
*	$(element).upKey(calback) - This function recognize up key
*/
$.fn.upKey = function (callback) {
    return this.keyPress(38, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).enterKey(calback) - This function recognize enter key
*/
$.fn.enterKey = function (callback) {
    return this.keyPress(13, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).escapeKey(calback) - This function recognize escape key
*/
$.fn.escapeKey = function (callback) {
    return this.keyPress(27, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).tabKey(calback) - This function recognize tab key
*/
$.fn.tabKey = function (callback) {
    return this.keyPress(9, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).shiftKey(calback) - This function recognize shift key
*/
$.fn.shiftKey = function (callback) {
    return this.keyPress(16, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).ctrlKey(calback) - This function recognize control key
*/
$.fn.ctrlKey = function (callback) {
    return this.keyPress(17, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).altKey(calback) - This function recognize alt key
*/
$.fn.altKey = function (callback) {
    return this.keyPress(18, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).capsKey(calback) - This function recognize caps lock key
*/
$.fn.capsKey = function (callback) {
    return this.keyPress(20, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).pageUpKey(calback) - This function recognize page up key
*/
$.fn.pageUpKey = function (callback) {
    return this.keyPress(33, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).pageDownKey(calback) - This function recognize page down key
*/
$.fn.pageDownKey = function (callback) {
    return this.keyPress(34, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).homeKey(calback) - This function recognize home key
*/
$.fn.homeKey = function (callback) {
    return this.keyPress(36, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).endKey(calback) - This function recognize end key
*/
$.fn.endKey = function (callback) {
    return this.keyPress(35, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).plusKey(calback) - This function recognize insert key
*/
$.fn.plusKey = function (callback) {
    return this.keyPress(43, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).insertKey(calback) - This function recognize insert key
*/
$.fn.insertKey = function (callback) {
    return this.keyPress(45, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);

		}
	});
};
/*
*	$(element).deleteKey(calback) - This function recognize delete key
*/
$.fn.deleteKey = function (callback) {
    return this.keyPress(46, function(e){
		if (typeof callback === 'function') {
			callback.call(this, e);
		}
	});
};
/*
*	$(element).createModal({options}) - Create Bootstrap modal and fill content into it
	
	EXAMPLE:
	-----------------------------------------------------
	<div id="modal"></div>
	
	$("#modal").createModal({
		header		: "New Modal",
		content		: "Some content...",
		footer		: "Is footer of modal",
		keyboard 	: true,		// enable/disable keyboard support
		static 		: false,	// is static or dynamic
		close		: true		// enable, disable close button
		large		: false		// large or small modal
	}, function(e){
		// Callback
	});
*/
$.fn.createModal = function (options, callback) {
	var This	=	this,
		s =	$.extend({
			header		:	"",
			content		:	"No content...",
			footer		:	"",
			keyboard 	:	true,
			static 		:	true,
			close		:	true,
			large		:	false,
			class		:	'',
		}, options ),
		currentID = $(This).attr('id').replace(/#/g, '');
		
		if(s.class!=='')
			s.class = ' ' + s.class;
		
	This.html("");
	if($("#cf-modal-"+currentID)!='undefined')	$("#cf-modal-"+currentID).data('modal', null);
	var modal	= 
		'<div class="modal fade' + s.class + '" id="cf-modal-'+currentID+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="'+(s.static?'static':'')+'" data-keyboard="'+(s.keyboard?'true':'false')+'" >'+
			'<div class="modal-dialog'+(s.large?' modal-lg':'')+'">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						(s.close===true?'<button type="button" class="btn btn-danger" style="float:right; font-size:13px; padding:5px 8px" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></button>':'')+
						( s.header!="" ? '<h4>'+s.header+'</h4>' : '' )+
					'</div>'+
					'<div class="modal-body">'+s.content+'</div>'+
					(s.footer!=""?'<div class="modal-footer">'+
					 	s.footer+
					'</div>':'')+
				'</div>'+
			'</div>'+
		'</div>';
	This.html(modal).promise().done(function(){
		if(typeof callback == 'function')
			callback(this);
	});
		
	$("#cf-modal-"+currentID).modal("show");
	$(document).on('hide.bs.modal', "#cf-modal-"+currentID, function(e){
		$(this).data('modal', null);
		This.html("");
		This.text("");
		This.val("");
		$(this).remove();
	});
	
	return this;
};
/*
*	$("img").responsiveImage(option) - Make images responsive. option=true for css support
*/
$.fn.responsiveImage = function(option){
	option = ($.empty(option) && $.isBool(option) ? option : false);
	this.each(function(){
		var This=$(this), pic_real_width, pic_real_height;
		$('<img/>')
		.attr('src', This.attr('src'))
		.load(function() {
			pic_real_width = this.width;
			pic_real_height = this.height;
			This.css({
				'max-width':pic_real_width,
				'max-height':pic_real_height
			});
			if(option===true)
			This.css({
				'width':'100%',
				'height':'auto'
			});
		});
	});
	return this;
};
$.fn.imgResponsive = function(option){
	return this.responsiveImage(option);
};
/*
*	$(element).removeDuplicates() - This function remove duplicate content and elements
*/
$.fn.removeDuplicates = function(){
	this.each(function() {
		var content = $(this).text();
		if (seen[content])
			$(this).remove();
		else
			seen[content] = true;
	});
	return this;
};
/*
*	$(element).replaceWords(assocArray) - This function replace words or sentence.
	EXAMPLE:
	-------------------------------------------------------
	$("body").replaceWords({"foo":"bar"});
*/
$.fn.replaceWords = function(assocArray){
	this.text(function(){
		var content = $(this).text();
		$.each(assocArray, function(a,b){
			return content.replace(a,b);
		});
	});
	return this;  
};
/*
*	$(element).replaceContent(find, replace) - This function replace words, sentence or any HTML content.
	EXAMPLE:
	-------------------------------------------------------
	$("body").replaceContent("foo","bar");
*/
$.fn.replaceContent = function(find, replace){
	this.each(function(){
		var element = $(this),
			getHTML = element.html(),
			getParts = getHTML.split(find),
			partMax = getParts.length,
			save = [];
		for(var i=0; i<partMax; i++){
			save[i]=getParts[i];
		}
		element.html(save.join(replace));
	});
	return this;
}

/*
	$.moneyFormat(price, sign, position) - This function return money format number with possibility to add sign arround number
	
	EXAMPLE:
	-------------------------------------------
	var price = 33.5;
	console.log($.moneyFormat(price, '€', 'left')); 	//- return €33.50
	console.log($.moneyFormat(price, '€', 'right')); 	//- return 33.50€
	console.log($.moneyFormat(price, '€', 'none'));		//- return 33.50
	console.log($.moneyFormat(price, '€'));				//- return €33.50
	console.log($.moneyFormat(price));					//- return 33.50
*/
$.moneyFormat = function(price, sign, position) {
	if(!sign)
        sign = '';
	
    if(!position || ['left','right','none'].indexOf(position) === -1)
        position = 'left';
    
	const pieces = parseFloat(price).toFixed(2).split('');
	
    var ii = (pieces.length - 3);
	
    while ((ii-=3) > 0) {
		pieces.splice(ii, 0, ',');
	}
	
    if(position=='left')
		return sign + pieces.join('');
	else if(position=='right')
		return pieces.join('') + sign;
	else
		return pieces.join('');
}

/* 
* $(element).placeCaretAtEnd() - Place cared on end of input 
*/
$.fn.placeCaretAtEnd = function() {
    var el = this.get(0);
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange() != "undefined") {
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
    
/* 
* $(element).placeCaretAtBegin() - Place cared on begin of input 
*/
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
    return this;
};
    
/* 
* $(element).moveCaret(position) - Place caret on crtain position of input 
*/  
$.fn.moveCaret = function(position) {
    var sel, range, win = this, charCount = position;
    if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var textNode = sel.focusNode;
            var newOffset = sel.focusOffset + charCount;
            sel.collapse(textNode, Math.min(textNode.length, newOffset));
        }
    } else if ( (sel = win.document.selection) ) {
        if (sel.type != "Control") {
            range = sel.createRange();
            range.move("character", charCount);
            range.select();
        }
    }
    return this;
}

//-End jQuery
}(window.Zepto || window.jQuery));
/*
* COOKIE CLASS IN PURE JAVASCRIPT (addition)
*	new Cookie(name, path, domain, secure) - COOKIE HELPER CLASS
*	This plugin is used to discount from the set size to zero and returns information.
*	
*	USAGE AND EXAMPLE FOR OBJECT ORIANTED STYLE:
*	------------------------------------------------
	// Path to folder where you whant to setup cookie (DEFAULT: "/" for root)
	var path	=	"/users";	
	
	// Define cookie names and variables
	var SaveUsername	=	new Cookie("username", path, domain, secure),
		SavePassword	=	new Cookie("password", path);
	
	// Set cookie with session to expire after 5 days
	SaveUsername.set( $("input[name=username]").val(), 5 );
	SavePassword.set( $("input[name=password]").val(), 5 );
	
	// Set temporary cookie (session expires after closing window)
	SaveUsername.tempSet( $("input[name=username]").val() );
	SavePassword.tempSet( $("input[name=password]").val() );
	
	// Check if cookie exist and have value
	if(SaveUsername.isset() && SavePassword.isset())
	{
		// Cookie exist and display values
		alert( "Username: " + SaveUsername.get() + "\r\n\r\n Password: " + SavePassword.get() );
		
		// Destroy/Delete cookies
		SaveUsername.destroy();
		SavePassword.destroy();
	}
	else alert("Cookies don't exists!");
*/
function Cookie(name, path, domain, secure) {this.name = name || ""; this.domain = domain || ""; this.path = path || ""; this.secure = secure || "";}
// Set cookie
Cookie.prototype.set = function(value, expire) {
  var expires = "";
	var path 	= 	((this.path!="")? "; path="+this.path:""),
		domain 	= 	((this.domain!="")? "; domain="+this.domain:""),
		secure 	= 	((this.secure!="")? "; secure":""),
		name	=	this.name,
		expire	=	(expire || "");
	
    if(expire > 0)
	{
		var d = new Date();
		d.setTime(d.getTime() + ((expire)*60*60*24*1000));
		var expires = "; expires="+d.toUTCString();
	}
	document.cookie = name + "=" + value + expires + domain + path + secure + ";";
};
// Set temporary cookie (session expires after closing window)
Cookie.prototype.tempSet = function(value) {
	var path 	= 	((this.path!="")? "; path="+this.path:""),
		domain 	= 	((this.domain!="")? "; domain="+this.domain:""),
		secure 	= 	((this.secure!="")? "; secure":""),
		name	=	this.name;
	document.cookie = name + "=" + value + domain + path + secure + ";";
};
// Destroy/Delete Cookie
Cookie.prototype.destroy = function() {
	var path = ((this.path==="")? "" : "; path="+this.path),
		secure 	= 	((this.secure!="")? "; secure":""),
        d = new Date();
    
	d.setTime(d.getTime() - (10*365*60*60*24*1000));
	var expires = "; expires="+d.toUTCString();
	document.cookie = this.name + "=" + value + expires + path + secure + ";";
};
// Get cookie value (Return VALUE if exist or BLANK if is empty)
Cookie.prototype.get = function () {
	var name = this.name + "=",
        ca = document.cookie.split(";"), i;
	
    for(i=0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)===" ") c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	}
	return "";
};
// Check if cookie exist and have value (Return BOOLEAN true/false)
Cookie.prototype.isset = function () {
	var name = this.name + "=",
        ca = document.cookie.split(";"), i;
	
    for(i=0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)===" ") c = c.substring(1);
		if (c.indexOf(name) != -1) return (c.substring(name.length,c.length)===""?false:true);
	}
	return false;
};
