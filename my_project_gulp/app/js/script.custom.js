$(function () {
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
    
})