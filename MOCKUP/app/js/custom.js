$(function () {

    /**
     * 
     * Animation Modal Window
     * 
     */

    $('a#go').click( function(event){ 
		event.preventDefault(); 
		$('#overlay').fadeIn(400,
		 	function(){ 
				$('#modal_form') 
					.css('display', 'block') 
					.animate({opacity: 1, top: '50%'}, 200); 
		});
	});
	
	$('#modal_close, #overlay').click( function(){ 
		$('#modal_form')
			.animate({opacity: 0, top: '45%'}, 200,  
				function(){ 
					$(this).css('display', 'none'); 
					$('#overlay').fadeOut(400); 
				}
			);
    });
    
    /**
     * 
     * Navigation anchors
     * 
     */

    $('.nav a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        let $anchor = $(this).attr('href');
        let $offsetTop = $($anchor).offset().top;

        $('body, html').animate({
            scrollTop: $offsetTop,
        }, 500)
    });

    /**
     * 
     * Fixed header background
     * 
     */

    (function fixedHeader () {
        let $heroHeight = $('.hero').innerHeight();
        let $header = $('.header');
       
        
        const isScroll = function (e) {
            if($(this).scrollTop() + $header.innerHeight() > $heroHeight) {
                $header.addClass('header--active-color');
            } else {
                $header.removeClass('header--active-color');
            }
        }

        $(document).on('scroll', function (e) {
            isScroll();
        })

        $(document).ready(function () {
            isScroll();
        })
    })();

    (function responsiveNav () {
        let btn = $('#menu-btn');
        let nav = $('nav');
        let overlay = $('.overlay');

        btn.on('click', function () {
            nav.addClass('nav--active');
            overlay.addClass('overlay--active');
            $('body').addClass('body-fixed');

            // $(this).attr('disabled', true);
        });

        overlay.on('click', function () {
            nav.removeClass('nav--active');
            overlay.removeClass('overlay--active');
            $('body').removeClass('body-fixed');

            // btn.removeAttr('disabled');
        })
    })();
    
    /*
    *** SLIDER
    */ 
    new Slider({
        images: '.slider-img',
        btnPrev: '.slider .buttons .prev',
        btnNext: '.slider .buttons .next',
        auto: true,
        rate: 2000
    });
})
/* ============================================ */ 
/* Slider settings */
 
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
    $(slider.btnPrev).onclick = slider.prev;
    $(slider.btnNext).onclick = slider.next;
        
    if(slider.auto)	{
        setInterval(slider.next, slider.rate);
    }
}