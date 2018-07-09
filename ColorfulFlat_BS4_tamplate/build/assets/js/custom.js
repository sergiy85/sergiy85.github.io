'use strict';

//==================== SLIDER + PAGINATION =================

$(document).ready(function() {
$(".slider").each(function () { // обрабатываем каждый слайдер
let obj = $(this);
$(obj).append("<div class='nav-slider'></div>");
$(obj).find("li").each(function () {
 $(obj).find(".nav-slider").append("<span rel='"+$(this).index()+"'></span>"); // добавляем блок навигации
 $(this).addClass("slider"+$(this).index());
});
$(obj).find("span").first().addClass("on"); // делаем активным первый элемент меню
});
});
function sliderJS (obj, sl) { // slider function
let ul = $(sl).find("ul"); // находим блок
let bl = $(sl).find("li.slider"+obj); // находим любой из элементов блока
let step = $(bl).width(); // ширина объекта
$(ul).animate({marginLeft: "-"+step*obj}, 500); // 500 это скорость перемотки
}
$(document).on("click", ".slider .nav-slider span", function() { // slider click navigate
let sl = $(this).closest(".slider"); // находим, в каком блоке был клик
$(sl).find("span").removeClass("on"); // убираем активный элемент
$(this).addClass("on"); // делаем активным текущий
let obj = $(this).attr("rel"); // узнаем его номер
sliderJS(obj, sl); // слайдим
return false;
});

// ==================== ACCORDION =======================

var $uiAccordion = $('.js-ui-accordion');

$uiAccordion.accordion({
  collapsible: true,
  heightStyle: 'content',

  activate: function activate(event, ui) {
    var newHeaderId = ui.newHeader.attr('id');

    if (newHeaderId) {
      history.pushState(null, null, '#' + newHeaderId);
    }
  },

  create: function create(event, ui) {
    var $this = $(event.target);
    var $activeAccordion = $(window.location.hash);

    if ($this.find($activeAccordion).length) {
      $this.accordion('option', 'active', $this.find($this.accordion('option', 'header')).index($activeAccordion));
    }
  }
});

$(window).on('hashchange', function (event) {
  var $activeAccordion = $(window.location.hash);
  var $parentAccordion = $activeAccordion.parents('.js-ui-accordion');

  if ($activeAccordion.length) {
    $parentAccordion.accordion('option', 'active', $parentAccordion.find($uiAccordion.accordion('option', 'header')).index($activeAccordion));
  }
});

// ================ SCROLLING TO SECTIONS ============================

$(function(){
   let navHeight = $('nav').outerHeight();
   let sections = $('.section');

   $('.nav__link[href^="#"]').on('click', function(ev){
   ev.preventDefault();

   let id = $(this).attr('href');
    //теперь надо получить высоту элемента относительно страницы(top). для этого
   let offsetTop = ($(id).offset().top > 0) ? $(id).offset().top - navHeight : $(id).offset().top;
   // console.log(offsetTop);

   // $('.nav__link').removeClass('nav__link--active');
   // $(this).addClass('nav__link--active');


   //проскролить страницу на несколько пикселовю буде скролить и html и body (для кроссбраузерности).
   //чтобы плавно animate

   $('html, body').animate({
      scrollTop: offsetTop
   }, 500);


   });

   //задаем событие скролл для документа (чтобы при скроллинге перемещался и активный класс)

   $(document).on('scroll', function(){
      let scrollPoint = $(this).scrollTop();// сколько мы проскролили

      sections.each(function () {
      let offsetTop = ($(this).offset().top > 0) ? $(this).offset().top - navHeight - 1 : $(this).offset().top; // позицию секции относительно верха документа
      if (scrollPoint > offsetTop) { // проскролили ли мы больше, чем позиция секции

        let id = $(this).attr('id'); // получаем id этой секции

        $('.nav__link').removeClass('nav__link--active'); // забрали у всех классы
        $(`.nav__link[href="#${id}"]`).addClass('nav__link--active'); // даем активный класс ссылке, у которой в href лежит id секции
      }
    });

   });


   //возвращаем активный класс при перезагрузке страницы

   $(document).ready(function() {
       let active = window.location.hash;
       active = $('.nav__link--active').click();
   });
 });
//обработка/прокрутка кнопок

   $(document).ready(function(){
      $("#btn--up").click(function(){
      let scrollPath = $(document).scrollTop();
      let scrollTime = scrollPath/2.00;
      $("body,html").animate({
         "scrollTop":0},scrollTime);
      });

   $("#btn--down").click(function(){
      let scrollPath = $(document).scrollTop();
      let height = $("body").height();
      let scrollTime = (height - scrollPath)/2.00;
      $("body,html").animate({
         "scrollTop":height},scrollTime);
      });
   });

   //скрываем/показываем кнопки при прокрутке

   $(window).scroll(function() {
      if ($(window).scrollTop() > 1300)  {
          $('#btn--down').css('display', 'none');
         }
      else {
         $('#btn--down').css('display', '');
        }
   });

   $(window).scroll(function() {
      if ($(window).scrollTop() === 0)  {
          $('#btn--up').css('display', 'none');
         }
      else {
         $('#btn--up').css('display', '');
        }
   });
