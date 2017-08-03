function CheckValid(selector, length, type){
    //sekector - селекор проверяемого инпата
    //length - длина, которую должен иметь инпат для валидности
    //type - тип инпата, text or email
    var OkMsgId, ErrMsgId;
    if ($(selector).parent().parent().attr('id') == 'consult'){
        OkMsgId = '#OkMsgCon';
        ErrMsgId = '#ErrMsgCon';
    }
    else{
        OkMsgId = '#ok-sale-msg2';
        ErrMsgId = '#err-sale-msg2';
    }


    var cssValuesOk = {
        "border-color":"green",
        "box-shadow":"0 1px 0 0 green"
    }
    var cssValuesErr = {
        "border-color":"red",
        "box-shadow":"0 1px 0 0 red"
    }
    if(type == 'text'){
        if($(selector).val().length == length) {
            $(selector).css(cssValuesOk);
            $(OkMsgId).fadeIn();
            $(ErrMsgId).hide();
            return true;
        }
        else{
            $(selector).css(cssValuesErr);
            $(ErrMsgId).fadeIn();
            $(OkMsgId).hide();
            return false;
        }
    }
    else if(type == 'other'){
        if($(selector).val().length >= length) {
            $(selector).css(cssValuesOk);
            $(OkMsgId).fadeIn();
            $(ErrMsgId).hide();
            return true;
        }
        else{
            $(selector).css(cssValuesErr);
            $($(selector).parent().parent().attr('id') + ' .ErrMsgCon').fadeIn();
            $(OkMsgId).hide();
            return false;
        }
    }
    else{
        var re = /\S+@\S+\.\S+/;
        if(re.test($(selector).val()) == true){
            $(selector).css(cssValuesOk);
            $(OkMsgId).fadeIn();
            $(ErrMsgId).hide();
            return true
        }
        else{
            $(selector).css(cssValuesErr);
            $(ErrMsgId).fadeIn();
            $(OkMsgId).hide();
            return false;
        }
    }
}

function CunsultFormValid(){
    var data = {'action':'Consult','name':$('input[name="phoneCon"]').val(), 'lastname':$('input[name="lastname"]').val(), 'phoneCon':$('input[name="phoneCon"]').val()};
    var SendData = false;
    var validPhone = CheckValid('input[name="phoneCon"]', 17, 'text');
    // var validEmail = CheckValid('input[name="mail"]', 1, 'email');
    if(validPhone)
        SendData = true;

    if(SendData == true){
        $.ajax({
            type: "GET",
            url: "ajax.html",
            data: data
        }).done(function() {
            $("#popup").trigger('click');
        });
    }
    return false;
};

function SaleFormValid(){
    var data = {'action':'Sale','name':$('input[name="client-name"]').val(), 'email':$('input[name="client-email"]').val(), 'phoneCon':$('input[name="client-sale-phone"]').val()};
    var SendData = false;
    var validPhone = CheckValid('input[name="client-sale-phone"]', 17, 'text');
    var validEmail = CheckValid('input[name="client-email"]', 1, 'email');
    var validName = CheckValid('input[name="client-name"]', 2, 'other');
    if(validPhone && validEmail && validName){
        SendData = true;
        $('#err-sale-msg').hide();
        $('#ok-sale-msg').fadeIn();
    }
    else{
        $('#err-sale-msg').fadeIn();
        $('#ok-sale-msg').hide();
    }


    if(SendData == true){
        $.ajax({
            type: "GET",
            url: "ajax.html",
            data: data
        }).done(function() {
            $("#popup").trigger('click');
        });
    }
    return false;
};

function ActFormValid(){
    var data = {'action':'CallAct', 'phoneAct':$('input[name="phoneAct"]').val()};
    var SendData = false;
    var validPhone = CheckValid('input[name="phoneAct"]', 17, 'text');
    // var validEmail = CheckValid('input[name="mail"]', 1, 'email');
    if(validPhone)
        SendData = true;

    if(SendData == true){
        $.ajax({
            type: "GET",
            url: "ajax.html",
            data: data
        }).done(function() {
            $("#popup").trigger('click');
        });
    }
    return false;
};

//Tabs open
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

$(function() {
    //	Preloader
    // $(window).on('load', function(){
    //     setTimeout( function () {
    //         $('#preloader').fadeOut('slow',function(){$(this).remove();});
    //         console.log('preloader hide');
    //     }, 2000);
    // });

    //    Filter open
    //Range price slider
    /*
    function setSliderHandle(i, value) {
        var r = [null,null];
        r[i] = value;
        keypressSlider.noUiSlider.set(r);
    }
    */
    /*
    function RangeSliderInit() {
        //Range price slider
        var keypressSlider = document.getElementById('keypress');
        var input0 = document.getElementById('input-with-keypress-0');
        var input1 = document.getElementById('input-with-keypress-1');
        var inputs = [input0, input1];

        noUiSlider.create(keypressSlider, {
            start: [$('#keypress').data().min, $('#keypress').data().max],
            connect: true,
            range: {
                'min': $('#keypress').data().min,
                'max': $('#keypress').data().max
            }
        });

        keypressSlider.noUiSlider.on('update', function( values, handle ) {
            inputs[handle].value = values[handle];
        });


// Listen to keydown events on the input field.
        inputs.forEach(function(input, handle) {
            input.addEventListener('change', function(){
                setSliderHandle(handle, this.value);
            });

            input.addEventListener('keydown', function( e ) {
                var values = keypressSlider.noUiSlider.get();
                var value = Number(values[handle]);
                // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                var steps = keypressSlider.noUiSlider.steps();
                // [down, up]
                var step = steps[handle];
                var position;
                // 13 is enter,
                // 38 is key up,
                // 40 is key down.
                switch ( e.which ) {
                    case 13:
                        setSliderHandle(handle, this.value);
                        break;
                    case 38:
                        // Get step to go increase slider value (up)
                        position = step[1];
                        // false = no step is set
                        if ( position === false ) {
                            position = 1;
                        }
                        // null = edge of slider
                        if ( position !== null ) {
                            setSliderHandle(handle, value + position);
                        }
                        break;
                    case 40:
                        position = step[0];
                        if ( position === false ) {
                            position = 1;
                        }
                        if ( position !== null ) {
                            setSliderHandle(handle, value - position);
                        }
                        break;
                }
            });
        });
    }
    */


    setTimeout( function () {
        $('#preloader').fadeOut('slow',function(){$(this).remove();});
        console.log('preloader hide');
    }, 1000);


	// Custom JS
    $('#main-slider').owlCarousel({
        loop:true,
        nav:true,
        items: 1,
        navContainer: '#customNavMain-slider',
        navText: ['<div href="" class="control-btn owl-prev left-btn"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>', '<div href="" class="control-btn owl-next right-btn"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>'],
        smartSpeed: 700
    });
    $('#catalog-slider').owlCarousel({
        loop:true,
        nav:true,
        items: 3,
        navContainer: '#customNavCatalog',
        navText: ['<div href="" class="control-btn owl-prev left-btn"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>', '<div href="" class="control-btn owl-next right-btn"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>'],
        smartSpeed: 170,
        margin: 0,
        slideBy: 'page',
        responsive:{
            0:{
                items:1,
                nav:true,
                margin:0
            },
            767:{
                items:2,
                nav:false,
                margin:0
            },
            991:{
                items:3,
                nav:false,
                margin:0
            },
            1200:{
                items:4,
                nav:true,
                loop:true,
                margin:0
            }
        }
    });
    $('#license-gallery').owlCarousel({
        loop:true,
        nav:true,
        items: 3,
        navContainer: '#customNavLicense',
        navText: ['<div href="" class="control-btn owl-prev left-btn"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>', '<div href="" class="control-btn owl-next right-btn"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>'],
        smartSpeed: 700,
        margin:15,
        responsive:{
            0:{
                items:2,
                nav:true,
                margin:0
            },
            600:{
                items:3,
                nav:false,
                margin:15
            },
            1000:{
                items:3,
                nav:true,
                loop:true,
                margin:15
            }
        }
    });

    $(".fancybox").fancybox({
            prevEffect	: 'none',
            nextEffect	: 'none',
            helpers	: {
                title	: {
                    type: 'outside'
                },
                thumbs	: {
                    width	: 50,
                    height	: 50
                }
            }
        }
    );

    $('input[name="phoneCon"]').mask("+7 (999) 999-9999");
    $('input[name="phoneAct"]').mask("+7 (999) 999-9999");
    $('input[name="client-sale-phone"]').mask("+7 (999) 999-9999");

    $("#my-menu").mmenu({
        "extensions": [
            "fx-panels-zoom",
            "effect-menu-slide",
            "pagedim-black"
        ],
        "offCanvas": {
            "position": "right"
        },
        "navbar": {
            "title": "AQUALINE-M"
        },
        "navbars": [
            {
                "position": "bottom",
                "content": [
                    "<a class='fa fa-vk' href='https://vk.com/public98263653'></a>",
                    "<a class='fa fa-facebook' href='https://www.facebook.com/pages/Aqualine-M/697503640350827?ref=aymt_homepage_panel'></a>",
                    "<a class='fa fa-google-plus' href='/'></a>",
                    "<a class='fa fa-linkedin' href='https://www.linkedin.com/company/aqualine-m-%D1%81%D0%B0%D0%BB%D0%BE%D0%BD?trk=top_nav_home'></a>",
                ]
            }
        ]
    });
    var api = $("#my-menu").data( "mmenu" );
    $('#catalog-menu ul').html($('#category-menu').html());
    $("#catalog-menu").mmenu({
        "extensions": [
            "fx-panels-zoom",
            "effect-menu-slide",
            "pagedim-black"
        ],
        "offCanvas": {
            "position": "left"
        },
        "navbar": {
            "title": "Каталог"
        },
        "navbars": [
            {
                "position": "bottom",
                "content": [
                    "<a class='fa fa-vk' href='https://vk.com/public98263653'></a>",
                    "<a class='fa fa-facebook' href='https://www.facebook.com/pages/Aqualine-M/697503640350827?ref=aymt_homepage_panel'></a>",
                    "<a class='fa fa-google-plus' href='/'></a>",
                    "<a class='fa fa-linkedin' href='https://www.linkedin.com/company/aqualine-m-%D1%81%D0%B0%D0%BB%D0%BE%D0%BD?trk=top_nav_home'></a>",
                ]
            }
        ]
    });



    //   Hook into methods
    api.bind( "open:finish", function() {
        $("#menu-btn").addClass('is-active');
    });
    api.bind( "close:finish", function( $panel ) {
        $("#menu-btn").removeClass('is-active');
    });

    // ===== Scroll to Top ====
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function() {      // When arrow is clicked
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 500);
    });

//    Sorting
    $('.sort').click(function (){
        if($(this).find('.fa').hasClass('fa-rotate-180')){
            $(this).find('.fa').removeClass('fa-rotate-180');
            $(this).removeClass('active');
        }
        else{
            $(this).find('.fa').addClass('fa-rotate-180');
            $(this).addClass('active');
        }
    });
    $(document).on( "click", ".show-all", function() {
        console.log('gg');
        var sum_h = 0;
        var sum_5 = 0;
        if(!$(this).hasClass('active')){
            $($(this).data().id + ' li').each(function () {
                sum_h = sum_h + $(this).height();
            });
            $($(this).data().id).height(sum_h);
            $(this).addClass('active');
            $(this).html('- Свернуть');
        }
        else{
            $(this).removeClass('active');
            $($(this).data().id + ' li').each(function (index) {
                if (index < 5)
                    sum_5 = sum_5 + $(this).height();
            });
            $($(this).data().id).height(sum_5)
            $(this).html('+ Развернуть');
        }
    });
    //range star price
    $(".range-star-cont ul li").hover(function(){
        if(!$(".range-star-cont").hasClass('disable') && !$(".range-star-cont").hasClass('prod-range')){
            var  num = $(this).data().num;
            $('.range-star-cont ul li').removeClass('active');
            switch(num) {
                case 5:
                    $(".range-star-cont ul li:nth-child(5)").addClass('active');
                    $(".range-star-cont ul li:nth-child(4)").addClass('active');
                    $(".range-star-cont ul li:nth-child(3)").addClass('active');
                    $(".range-star-cont ul li:nth-child(2)").addClass('active');
                    $(".range-star-cont ul li:nth-child(1)").addClass('active');

                    $('.range-star-cont p').html('Премиум');
                    $(".range-star-cont ul li:nth-child(5)").addClass('fltr-active');
                    break;
                case 4:
                    $(".range-star-cont ul li:nth-child(4)").addClass('active');
                    $(".range-star-cont ul li:nth-child(3)").addClass('active');
                    $(".range-star-cont ul li:nth-child(2)").addClass('active');
                    $(".range-star-cont ul li:nth-child(1)").addClass('active');

                    $('.range-star-cont p').html('Выше среднего');
                    $(".range-star-cont ul li:nth-child(4)").addClass('fltr-active');
                    break;
                case 3:
                    $(".range-star-cont ul li:nth-child(3)").addClass('active');
                    $(".range-star-cont ul li:nth-child(2)").addClass('active');
                    $(".range-star-cont ul li:nth-child(1)").addClass('active');

                    $('.range-star-cont p').html('Средний');
                    $(".range-star-cont ul li:nth-child(3)").addClass('fltr-active');
                    break;
                case 2:
                    $(".range-star-cont ul li:nth-child(2)").addClass('active');
                    $(".range-star-cont ul li:nth-child(1)").addClass('active');

                    $('.range-star-cont p').html('Ниже среднего');
                    $(".range-star-cont ul li:nth-child(2)").addClass('fltr-active');
                    break;
                case 1:
                    $(".range-star-cont ul li:nth-child(1)").addClass('active');

                    $('.range-star-cont p').html('Бюджетный');
                    $(".range-star-cont ul li:nth-child(1)").addClass('fltr-active');
                    break;
                default:
                    console.log('def');
            }

            $(this).addClass('active');
        }
    });
    //set initial state.
    $('#AllProdPrice').val($(this).is(':checked'));

    $('.range-star-cont input').change(function() {
        console.log('#AllProdPrice changed');
        if($(this).is(":checked")) {
            $('.range-star-cont').css('cursor', 'not-allowed!important');
            $('.range-star-cont').addClass('disable');
        }
        else{
            $('.range-star-cont').removeClass('disable');
        }
    });


    //    Default open Tabs

    $("#defaultOpen11").click(function(){
        $(this).addClass('active');
    });
    $("#defaultOpen11").click();

});
