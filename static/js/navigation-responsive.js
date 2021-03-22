// Nav Animation
console.log($('.tablet-burger'))
$('.tablet-burger').click(function() {
    $('.pop-up-nav').show('slow').css('display', 'flex');
    // showDialog();
});

$('.mobile-burger').click(function() {
    $('.pop-up-nav-mobile').show('slow').css('display', 'flex');
});


//resizing window function, helper on media query on css
$(window).resize(function() {
    if (window.innerWidth > 1220) {
        $('.pop').hide();
    }

});

$('.pop').click(function(e) {
    if ((e.target.classList.contains('pop'))) {
        console.log('hi');
        $('.pop-up-nav').hide('slow');
        $('.pop-up-nav-mobile').hide('slow');
    }
});