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

        OkMsgId = '#OkMsgCall';
        ErrMsgId = '#ErrMsgCall';
    }


    var cssValuesOk = {
        "border-color":"#433c8a",
        "box-shadow":"0 1px 0 0 #433c8a"
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



$(function() {
    //	Preloader
    // $(window).on('load', function(){
    //     setTimeout( function () {
    //         $('#preloader').fadeOut('slow',function(){$(this).remove();});
    //         console.log('preloader hide');
    //     }, 2000);
    // });
    setTimeout( function () {
        $('#preloader').fadeOut('slow',function(){$(this).remove();});
        console.log('preloader hide');
    }, 1000);
    //Липкая шапка
    var h_hght = 112; // высота шапки
    var h_mrg = 0;    // отступ когда шапка уже не видна

    var elem = $('.menu-cont2');
    var top = $(this).scrollTop();

    if(top > h_hght){
        elem.css('top', h_mrg);
    }

    $(window).scroll(function(){
        top = $(this).scrollTop();

        if (top+h_mrg < h_hght) {
            elem.css('top', (h_hght-top));
        } else {
            elem.css('top', h_mrg);
        }
    });

	// Custom JS
    $('#main-slider').owlCarousel({
        loop:true,
        nav:true,
        items: 1,
        navContainer: '#customNavMain-slider',
        navText: ['<div href="" class="control-btn owl-prev left-btn"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>', '<div href="" class="control-btn owl-next right-btn"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>'],
        smartSpeed: 700
    });
    $('#brands-slider').owlCarousel({
        loop:true,
        nav:true,
        items: 6,
        navContainer: '#customNavBrand',
        navText: ['<div href="" class="control-btn owl-prev left-btn"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>', '<div href="" class="control-btn owl-next right-btn"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>'],
        smartSpeed: 700,
        margin:50,
        responsive:{
            0:{
                items:1,
                nav:true,
                margin:0
            },
            600:{
                items:3,
                nav:false,
                margin:0
            },
            1000:{
                items:6,
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

});
