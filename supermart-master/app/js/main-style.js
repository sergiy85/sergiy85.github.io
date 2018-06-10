(function($){

	$( document ).ready( function() {
		///// menu_state_open////////////
		$( '.main-menu__icon' ).on( 'click', function() {
			var $this = $( this ),
				$parent = $this.parent( '.main-menu' );

			$parent.toggleClass( 'menu_state_open' );
		});
		///// menu_state_open////////////
		
 

		////////////togle menu
		var o = $('.toggle');
			$(document).ready(function () {
				$('.toggle').click(function (e) {
					e.preventDefault(); 
					var tmp = $(this);
					o.each(function () {
						if ($(this).hasClass('active') && !$(this).is(tmp)) {
							$(this).parent().find('.toggle_cont').slideToggle();
							$(this).removeClass('active');
						}
					});
					$(this).toggleClass('active');
					$(this).parent().find('.toggle_cont').slideToggle();
		});
		$(document).on('click touchstart', function (e) {
			var container = $(".toggle-wrap");
			var removeBtnWrap = $('#cart .btn-remove-wrap');
			if (!container.is(e.target) && container.has(e.target).length === 0 && container.find('.toggle').hasClass('active')) { 
				container.find('.active').toggleClass('active').parent().find('.toggle_cont').slideToggle();
				if (removeBtnWrap.length > 0 ) {
					removeBtnWrap.fadeOut();
					}
				}
			});
		});
		///////////////////////


		////////LANGUAGE MENU/////////////
		$('.language-menu-list').click(function(){
			$(this).toggleClass('open');
		})

		$('.language-menu-list .language-menu__item').click(function(){
			var setLang = $('.language-menu-list').data('location'),
		    	dataLangSelect = $(this).data('lang')
					$('.language-menu-list').data('location', dataLangSelect);
					$('.language-menu-list .language-menu__item').removeClass('active');
					$(this).toggleClass('active');
		})

		////////LANGUAGE MENU/////////////



		////////////////currensy menu///////////
		$.fn.currensy = function() {
			// начальные параметры
			// задаем стандартную высоту div'a. 
			var selectDefaultHeight = $('#currensy').height();
			// угол поворота изображения в div'e 
			var rotateDefault = "rotate(0deg)";

			// после нажатия кнопки срабатывает функция, в которой 
			// вычисляется исходная высота нашего div'a. 
			// очень удобно для сравнения с входящими параметрами (то, что задается в начале скрипта) 
			$('#currensy > .currensy-tag').click(function() {
			// вычисление высоты объекта методом height() 
			var currentHeight = $('#currensy').height();
			// проверка условия на совпадение/не совпадение с заданной высотой вначале,
			// чтобы понять. что делать дальше. 
			if (currentHeight < 100 || currentHeight == selectDefaultHeight) {
			// если высота блока не менялась и равна высоте, заданной по умолчанию,
			// тогда мы открываем список и выбираем нужный элемент.
			$('#currensy').height("150px");  // «точка остановки анимации»
			// здесь стилизуем нашу стрелку и делаем анимацию средствами CSS3 
			$('.currensy__icon').css({borderRadius: "1000px", transition: ".2s", transform: "rotate(180deg)"});
			}
			// иначе если список развернут (высота больше или равна 250 пикселям), 
			// то при нажатии на абзац с классом valueTag, сворачиваем наш список и
			// и присваиваем блоку первоначальную высоту + поворот стрелки в начальное положение
			if (currentHeight >= 100) {
			$('#currensy').height(selectDefaultHeight);
			$('.currensy__icon').css({transform: rotateDefault});
			}
			});

			// так же сворачиваем список при выборе нужного элемента 
			// и меняем текст абзаца на текст элемента в списке
			$('li.option').click(function() {
			$('#currensy').height(selectDefaultHeight);
			$('img.arrow').css({transform: rotateDefault});
			$('.currensy-tag').text($(this).text());
			});
		};
		$('selector').currensy();


		////////////////currensy menu///////////

		/////////MODAL OKNO/////////////
		$('.popup-content').magnificPopup({
        	type: 'inline'
    	});
		/////////MODAL OKNO/////////////



		//////slider swiper////////////
	 	var swiper = new Swiper('.swiper-container', {
			spaceBetween: 30,
			loop: true,                  
			loopFillGroupWithBlank: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
	      	},
	    });

 		var swiper2 = new Swiper('.slideshow-container', {
			slidesPerView: 3,
			breakpoints: {
				993: {
					slidesPerView: 3
				},
				769: {
					slidesPerView: 2
				},
				577: {
					slidesPerView: 1
				}
			},
			spaceBetween: 0,
			slidesPerGroup: 1,
			loop: true,
			loopFillGroupWithBlank: true,
			pagination: {
			
			clickable: true,
			},
			navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
			},
		});
	 	

	 	var swiper3 = new Swiper('.mega-slideshow-container', {
			slidesPerView: 2,
			breakpoints: {
				993: {
					slidesPerView: 2
				},
				769: {
					slidesPerView: 1
				},
				577: {
					slidesPerView: 1
				}
			},
			spaceBetween: 0,
			slidesPerGroup: 1,
			loop: true,
			loopFillGroupWithBlank: true,
			pagination: {
			
			clickable: true,
			},
			navigation: {
			nextEl: '.swiper-button-next1',
			prevEl: '.swiper-button-prev1',
			},
		});


	 	var swiperFeatured = new Swiper('.featured-slideshow-container', {
			slidesPerView: 3,
			breakpoints: {
				993: {
					slidesPerView: 3
				},
				769: {
					slidesPerView: 2
				},
				577: {
					slidesPerView: 1
				}
			},
			spaceBetween: 0,
			slidesPerGroup: 1,
			loop: true,
			loopFillGroupWithBlank: true,
			pagination: {
			
			clickable: true,
			},
			navigation: {
			nextEl: '.swiper-button-next2',
			prevEl: '.swiper-button-prev2',
			},
		});

		/////////////slider pgwslideshow/////
		$('.pgwSlideshow').pgwSlideshow({
			autoSlide: true,
			maxHeight: 800,
			displayControls: false
		});

		// owl-Slider-sidebar


        $('#slider-1').owlCarousel({
            items:1,
            nav:true,
            loop:true,
        });
        $('#slider-2').owlCarousel({
            items:1,
            lazyLoad:true,
            loop:true,
        });
        $('#brandSlider').owlCarousel({
            items:6,
            nav:true,
            lazyLoad:true,
            loop:true,
        }); 
    

		/////////////slider pgwslideshow/////
	});// end ready

})( jQuery );
    