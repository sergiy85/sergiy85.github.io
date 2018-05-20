// ============= main-menu + overlay ===================

$(function() {
  let btn     = $('#menu-btn');
  let menu    = $('.nav__list');
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


// slider1-banner

$(function() {
    
    new Slider({
        images: '.banner__list .banner__item img',
        btnPrev: '#btn-prev',
        btnNext: '#btn-next',
        auto: false
    });
    
  new Slider({
        images: '.banner__list-2 .banner__item img',
        btnNext: '#btn-next_2',
        auto: false,
        rate: 2000
    });
});


function Slider(obj) {
    
  this.images = $(obj.images);  
  this.auto = obj.auto;
  this.btnPrev = obj.btnPrev;
  this.btnNext = obj.btnNext;
  this.rate = obj.rate || 1000;
  
  let i = 0;
  let slider = this;

  this.prev = function () {
    slider.images.eq(i).removeClass('showed');
    i--;

    if (i < 0) {
      i = slider.images.length - 1;
    }

    slider.images.eq(i).addClass('showed');
  }

  this.next = function () {
    slider.images.eq(i).removeClass('showed');
    i++;

    if (i >= slider.images.length) {
      i = 0;
    }

    slider.images.eq(i).addClass('showed');
  }
  
    $(slider.btnPrev).on('click', function(){ slider.prev();});
    $(slider.btnNext).on('click', function(){ slider.next();});
    
  if(slider.auto) {
        setInterval(slider.next, slider.rate);
    }
};


// slider 2

$(document).ready(function(){
  function htmSlider(){

    let slideWrap = $('.slide-wrap');
    let nextLink = $('.next-slide');
    let prevLink = $('.prev-slide');
    let playLink = $('.auto');
    let is_animate = false;
    let slideWidth = $('.slider__item').outerWidth();
    let newLeftPos = slideWrap.position().left - slideWidth;
    
    nextLink.click(function(){
      if(!slideWrap.is(':animated')) {
  
        slideWrap.animate({left: newLeftPos}, 500, function(){
          slideWrap
            .find('.slider__item:first')
            .appendTo(slideWrap)
            .parent()
            .css({'left': 0});
        });

      }
    });

    prevLink.click(function(){
      if(!slideWrap.is(':animated')) {
      
        slideWrap
          .css({'left': newLeftPos})
          .find('.slider__item:last')
          .prependTo(slideWrap)
          .parent()
          .animate({left: 0}, 500);

      }
    });
    
    
    function autoplay(){
      if(!is_animate){
        is_animate = true;
        slideWrap.animate({left: newLeftPos}, 500, function(){
          slideWrap
            .find('.slider__item:first')
            .appendTo(slideWrap)
            .parent()
            .css({'left': 0});
          is_animate = false;
        });
      }
    }
    
    playLink.click(function(){
      if(playLink.hasClass('play')){
        playLink.removeClass('play').addClass('pause');
        jQuery('.navy').addClass('disable');
        timer = setInterval(autoplay, 1000);
      } else {
        playLink.removeClass('pause').addClass('play');
        jQuery('.navy').removeClass('disable');
        clearInterval(timer);
      }
    });

  }
  
  htmSlider();
});


// ACCORDION

$(function(){
	$('.accordion__item').click(function(){
			$(this).toggleClass('active');
			$(this).find('.accordion__title--wrap').next().stop().slideToggle(200);
	}).find('.accordion__title--wrap').next().stop().hide();
});


