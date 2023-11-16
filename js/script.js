$('[data-tab]').on('click', function () {
    var tabId = $(this).attr('data-tab');
    $('.tab, [data-tab]').removeClass('active');
    $(this).addClass('active')
    $('[data-tab-content=' + tabId + ']').addClass('active');
});

$('.dropdown').on('click', function () {
    $(this).toggleClass('dropdown-show');
    $('.dropdown-show').not(this).removeClass('dropdown-show');
    var rect = this.getBoundingClientRect();
    var xPosition = rect.left;
    var dropdownMenu = $(this).find('ul');
    dropdownMenu.css('left', xPosition < 50 ? '-10px' : 'auto');
});

function showModal(id) {
    $(id).fadeIn(300);
    $('body').addClass('active');
}

$(document).on('click', function (e) {
    if (!(
        ($(e.target).parents('.card').length) ||
        ($(e.target).parents('.card-share').length) ||
        ($(e.target).hasClass('card-share')) ||
        ($(e.target).hasClass('dropdown')) ||
        ($(e.target).hasClass('card')) ||
        ($(e.target).hasClass('modal-content'))
    )) {
        hideModals();
    }
});
var slickActive = false;

$('.showHidden').on('click', function () {
    var cardsParent = $(this).parents('.tab');
    var cardsWrap = cardsParent.find('.wrap').not('.hidden');
    var cardsHidden = cardsParent.find('.wrap.hidden');
    var cardsHiddenItems = $(cardsHidden[0]).find('.card');

    for (let index = 0; index < cardsHiddenItems.length; index++) {
        const element = cardsHiddenItems[index];
        $(cardsWrap).append(element.cloneNode(true));
    }
    $(cardsHidden[0]).remove();
    console.log(cardsHidden.length);
    cardsHidden.length <= 1 ? $(this).remove() : false;

});

$(document).on('click', '.card', function (e) {
    console.log(this);
    var cardItems = $(this).parents('.wrap').find('.card-modal');
    var modal = document.getElementById('modal');
    $(modal).empty();

    for (let index = 0; index < cardItems.length; index++) {
        const element = cardItems[index];
        modal.prepend(element.cloneNode(true));
    }

    $('.modal-content').slick({
        arrows: false,
        infinite: false,
        speed: 600,
        slidesToShow: 1,
        centerPadding: '0px',
        centerMode: true,
    });
    slickActive = true;
    $('.modal-content').slick('slickGoTo', $(this).index());
    showModal($('#modalParent'));
});

function hideModals() {
    $('.modal').fadeOut();
    $('body').removeClass('active');
    $('.dropdown-show').removeClass('dropdown-show');
    slickActive ? $('.modal-content').slick('unslick') : false;
    $('.modal-content').empty();
}
