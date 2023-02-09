import $ from "jquery";
import LazyLoad from "vanilla-lazyload";
// eslint-disable-next-line no-unused-vars
import fancybox from "@fancyapps/fancybox";
import Inputmask from "inputmask";

window.fancybox = $.fancybox;

// eslint-disable-next-line no-unused-vars
const lazyLoadInstance = new LazyLoad({});

let windowWidth = $(window).width();
let headerHeight = $('.header').outerHeight();
let windowHeight = $(window).height();

$("a.scroll").on("click", function () {
    let link = $(this);
    if (windowWidth < 991) {
        burger();
    }
    $("html, body").animate({
        scrollTop: scrollTo = $(link.attr("href")).offset().top - headerHeight + "px"
    }, {
        duration: 800
    });
    return false;
});

$(window).on("scroll", function() {
    let scrollTop = $(window).scrollTop();

    if (scrollTop > 0) {
        $(".header").addClass("header--fixed");
    } else {
        $(".header").removeClass("header--fixed");
    }
    
    if (!$('.header').hasClass('header-project')) {
        $('.text--effect').each(function() {
            if (scrollTop >= $(this).offset().top - windowHeight) {
                $(this).removeClass('text--effect-active')
            }
        });
    }
});

$(".header__burger").on("click", function() {
    burger();
});

$(".shadow").on("click", function() {
    burger();
    $("html, body").css("overflow-y", "visible");
    $(this).addClass("hidden");
});

function burger() {
    $(".header").toggleClass("header--open");
    if ($(".header").hasClass("header--open")) {
        $(".shadow").removeClass("hidden");
        $("html, body").css("overflow-y", "hidden");
    } else {
        $(".shadow").addClass("hidden");
        $("html, body").css("overflow-y", "visible");
    }
}

headerAdaptive(windowWidth);

$(window).on('resize', function() {
    let widthWindow = $(window).width();
    headerAdaptive(widthWindow);
});

function headerAdaptive(widthBrowser) {
    switch(true) {
        case widthBrowser < 1099 && $('.header__mobile .header__menu').length == 0: 
            $('.header__mobile').append($('.header__menu'));
            $('.header__mobile').append($('.header__phone'));
        break;
        case widthBrowser > 1099 && $('.header__wrapper .header__menu').length == 0:
            $('.header__wrapper').append($('.header__menu'));
            $('.header__wrapper').append($('.header__phone'));
        break;
    }
}

let im = new Inputmask("+7(999)-999-99-99");
Inputmask().mask(document.querySelectorAll("input"));
im.mask(document.querySelectorAll(".phone"));

$('.phone').on('input', function() {
    let form = $(this).closest('.form');
    let pattern = /[0-9]/g;
    let result = $(this).val().match(pattern);

    changeInput(form, result)
});

function changeInput(form, result) {
    $('.phone').on('change', function() {
        if (result.length < 11) {
            $('.label-error').removeClass('hidden');
            $('.label-error').text('Заполните пожалуйста номер телефона');
            $('.form__submit', $(form)).attr('disabled', 'disabled');
        } else {
            $('.label-error').addClass('hidden');
            $('.label-error').text('');
            $('.form__submit', $(form)).removeAttr('disabled');
        }
    })
}

$(".form").submit(function (e) {
    e.preventDefault();
    let $this = $(this);
    let form_data = $(this).serialize();
    $.ajax({
        type: "POST",
        url: "send.php",
        data: form_data,
        success: function(response) {
            $this.html(response);
        } 
    });
});

$('.text--effect').each(function() {
    $(this).addClass('text--effect-active');
});