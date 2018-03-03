/*
Image Editor Plugin
@author Ivijan-Stefan Stipic <creativform@gmail.com>
*/
(function($){	
    $.fn.imageEditor = function(){

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
                        .resizable()
                        .resizable('disable');

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
            initDraggableEdit = true,
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
                
                var image = $('#image-edit'),
                    name = image.attr('data-name'),
                    id = image.attr('data-id'),
                    active_image = $('#'+id),
                    data_change = active_image.attr('data-change');

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
                        
                        if(!data_change) initDraggableEdit = false;
                        
                        if(!data_change && !initDraggableEdit){
                            $(this, $this).css({
                                width:setup.textBox.width,
                                height:setup.textBox.height,
                                top:setup.textBox.top,
                                left:setup.textBox.left,
                            });
                        }
                        else initDraggableEdit = false;
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
                
                reset.fields();
                reset.buttons();
                reset.activeButtonsProperty();
                initDraggable();
                
               setTimeout(size,200);
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
        $('#save').on('click touchstart', function(e){
            
            
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
                    // generateImage(canvas, ($this.width()+2),($this.height()+2));
                    var image = $('#image-edit'),
                        name = image.attr('data-name'),
                        id = image.attr('data-id'),
                        active_image = $('#'+id),
                        active_field = $('[data-remove^="' + id.replace('add-','') + '"] [data-type^="src"]');
                    
                    $.post( window.base + '/include/fetch-image.php', {
                        name : name,
                        base : window.base,
                        image : canvas.toDataURL(),
                        option : 'generate'
                    }).done(function(data){
                                            
                        
                        if(data.return!==false)
                        {
                            
                            active_image.removeAttr('src');
                            active_image.removeAttr('data-name');
                            active_image.removeAttr('data-change');
                            active_image.removeAttr('alt');
                            active_field.val('');
                            
                            reset.fields();
                            reset.buttons(true);
                            reset.activeButtonsProperty();
                         
                         
                            var change = $.base64_encode($("#img-editor-container").html());
                            active_image.attr('src',data.image.url);
                            active_image.attr('data-name',data.name);
                            active_image.attr('data-change',change);
                            active_image.attr('alt',data.image.url);
                            active_field.val(data.image.url);

                            if($("#DeleteDynamicImage"))
                                $("#DeleteDynamicImage").removeClass('hidden');
                            
                            if($("#CreateDynamicImage"))
                                $("#CreateDynamicImage").html('<span class="glyphicon glyphicon-picture"></span> Edit Generic Image');
                            
                            $.post( window.base + '/include/fetch-image.php', {
                                clean : data.original,
                                option : 'clean'
                            }).done(function(data){
                                if($("#img-editor"))
                                    $("#img-editor").unbind('imageEditor');
                                
                                if($("#img-editor-wrapper"))
                                    $('#img-editor-wrapper').fadeOut('200',function(){
                                        $(this).remove();
                                    });
                            });
                        }
                        else
                        {
                            
                        }
                    });
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
        $(document).on('click touchstart', 'li[id^="layer-"]', function(e){
            
            
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
        $(document).on('click touchstart','.text-editor .remove, .text-editor .remove *',function(e){
            
            
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
                $(this).resizable('enable');
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
        $('#image-edit').on('click touchstart',function(e){
            reset.fields();
            reset.buttons(true);
            reset.activeButtonsProperty();
        });

        // Toggle action buttons
        $('#image-editor-console > li > button').on('click touchstart',  function(e){
            
            
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
        $('#image-editor-console #new').on('click touchstart',function(e){
            
            reset.fields();
            reset.buttons(false);
            var id = $.rand(1111,99999)+Math.floor(Date.now() / 1000),
                html = '<div class="text-editor active" style="z-index:99;"><span class="remove" data-type="delete"><span class="glyphicon glyphicon-remove" data-type="delete"></span></span><div class="edit-text" contenteditable="true" ondragenter="event.preventDefault(); event.dataTransfer.dropEffect = \'none\'" ondragover="event.preventDefault(); event.dataTransfer.dropEffect = \'none\'" data-id="layer-' + id + '">Edit Text</div></div>',
                layer = '<li id="layer-' + id + '" class="active"><span>Edit Text</span></li>';
            $this.prepend(html).promise().done(function(){
                if($('[data-id^="layer-' + id + '"]').length > 0)
                {
                    $('.text-editor.active', $this).find('.edit-text').placeCaretAtEnd().css({
                        textAlign : 'left',
                        color : '#00000',
                        background : 'transparent',
                        fontSize : '12pt',
                        fontFamily : 'Arial, Helvetica, sans-serif',
                    }).loadData();
                }

                if($('[data-id^="layer-' + id + '"]').length>0)
                {
                    $('#layers').append(layer);
                }
                initDraggable();
            });
        });
        // Text Size
        $('#image-editor-console #uppercase').on('click touchstart',function(x){

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
        $('#image-editor-console #font-size').on('change select',function(x){
            
            var val = $(this).val();
            $('.text-editor.active', $this).find('.edit-text').css({
                fontSize:val
            }).loadData();
        });
        // Font family
        $('#image-editor-console #font-family').on('change select',function(x){
            
            var val = $(this).val();
            $('.text-editor.active', $this).find('.edit-text').css({
                fontFamily:val
            }).loadData();
        });
        //	Bold
        $('#image-editor-console #text-bold').on('click touchstart',function(x){
            
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
        $('#image-editor-console #text-italic').on('click touchstart',function(x){
            
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
        $('#image-editor-console #align-left').on('click touchstart',function(x){
            
            $('.text-editor.active', $this).find('.edit-text').css({
                textAlign:'left'
            }).loadData();
        });
        // Align right
        $('#image-editor-console #align-right').on('click touchstart',function(x){
            
            $('.text-editor.active', $this).find('.edit-text').css({
                textAlign:'right'
            }).loadData();
        });
        // Align center
        $('#image-editor-console #align-center').on('click touchstart',function(x){
            
            $('.text-editor.active', $this).find('.edit-text').css({
                textAlign:'center'
            }).loadData();
        });
        // Align justify
        $('#image-editor-console #align-justify').on('click touchstart',function(x){
            
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
        
        return this;
    };
}(window.jQuery || window.Zepto));