// ============= main-menu + overlay ===================

$(function() {
  let btn 		= $('#menu-btn');
  let	menu 		= $('.nav__list');
  let nav = $('nav');
  let overlay = $('.overlay');

  btn.on('click', function(e) {
    e.preventDefault();
    nav.addClass('nav--active');
    overlay.addClass('overlay--active');
    $('body').addClass('body-fixed');

    $(this).attr('disabled', true);
  });
  overlay.on('click', function () {
      nav.removeClass('nav--active');
      overlay.removeClass('overlay--active');
      $('body').removeClass('body-fixed');

      btn.removeAttr('disabled');
  })
});

// =============================================
