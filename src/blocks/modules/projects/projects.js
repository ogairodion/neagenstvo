import $ from "jquery";

$('.projects__item').each(function(i) {
    if (!$(this).hasClass('project__item--page')) {
        if (i > 3) {
            $(this).addClass('hidden');
        }
    }
})

$('.projects .btn--more').on('click', function(e) {
    e.preventDefault();
    $('.projects__item').removeClass('hidden');
    $(this).addClass('hidden');
});