
window.addEventListener('DOMContentLoaded', init);

// import $ from 'jquery';

import ToggleVisibility from './toggle'

function init () {

  const menu = {
    btn: document.getElementById('menu-btn'),
    layout: document.getElementById('main-menu'),
    activeClassLayout: 'main-menu--active',
    activeClassButton: 'menu-btn--active',
  };
  new ToggleVisibility(menu);

  const db = [
        { title: 'Red Seat', url: 'google.com', imgPath: 'img/redSeat.png'},
        { title: 'Dark Seat', url: 'amazon.com', imgPath: 'img/darkSeat.png'},
        { title: 'Green Seat', url: 'yahoo.com', imgPath: '#'},
        { title: 'Hi there', url: 'linkedin.com', imgPath: '#'},
    ];

    function nano(template, data) {
        return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
            var keys = key.split("."), v = data[keys.shift()];
            for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
            return (typeof v !== "undefined" && v !== null) ? v : "";
        });
    }


    let preloader = document.getElementById('preloader');

     function preloaderShow() {
        preloader.classList.add('preloader--active');
    }
    function preloaderHide() {
        preloader.classList.remove('preloader--active');
    }

    function Search () {
        const textField = document.getElementById('search');
        const resetBtn = document.getElementById('form-reset');
        const list = document.querySelector('.trade-list');
        const count = document.querySelector('.count');

        let locker = false;

        const getData = function(request, callback){
            if (request === ''){
                callback([]);
                return;
            }
            preloaderShow();
            setTimeout(()=>{
                preloaderHide();
                let result = db.filter(item => {
                    return item.title.toLowerCase().indexOf(request.toLowerCase()) > -1
                });
                callback(result);
            },1500);

        };

        const initLayout = data =>{
            while (list.firstChild){
                list.removeChild(list.firstChild);
            }

            let ln = data.length;
            count.textContent = ln;

            document.querySelector('.result-count').classList.add('result-count--active');
            if(ln < 1 &&  textField.value === ''){
                document.querySelector('.result-count').classList.remove('result-count--active');
            }

            document.querySelector('.search-form__reset').classList.add('search-form__reset--active');
            if (ln < 1 &&  textField.value === '' ){
                document.querySelector('.search-form__reset').classList.remove('search-form__reset--active');
            }

            data.forEach(item => {
                let li = document.createElement('li');
                li.classList.add('trade__item');
                const linkTemplate =" <a href=\"{url}\" class=\"trade__link\">\n" +
                    "<img src=\"{imgPath}\" alt=\"\" class=\"trade__img\">\n" +
                    "<span class=\"trade__deskr\">{title}</span>\n" +
                    "</a>";
                let resultItem = nano(linkTemplate, item);
                list.appendChild(li);
                li.innerHTML=resultItem;
            });
        };

        resetBtn.addEventListener('click', ev => {
            textField.value = '';
            initLayout([]);
        });

        textField.addEventListener("keyup", ev => {
            let val = ev.target.value.trim();
            getData(val, initLayout);
        });
    }
    if (document.getElementById('search') !== null ) Search();



    const PRODUCTS_DB = [
        { cardTitle: 'Read Seat 100', cardUrl: 'google.com', cardImgPath: 'img/darkSeat.png', cardDescr: 'sadasdas', cardPrice: '$35', cardClass: 'medium'},
        { cardTitle: 'Blue Seat 200', cardUrl: 'google.com', cardImgPath: 'img/redSeat.png', cardDescr: 'sadasdas', cardPrice: '$35', cardClass: 'small'},
        { cardTitle: 'green Seat 300', cardUrl: 'google.com', cardImgPath: 'img/red.jpg', cardDescr: 'sadasdas', cardPrice: '$35', cardClass: 'small'},
        { cardTitle: 'rebecca Seat 1', cardUrl: 'google.com', cardImgPath: 'img/darkSeat.png', cardDescr: 'sadasdas', cardPrice: '$35', cardClass: 'large'},
        { cardTitle: 'rebecca Seat 2', cardUrl: 'google.com', cardImgPath: 'img/redSeat.png', cardDescr: 'sadasdas', cardPrice: '$35', cardClass: 'small'},
        { cardTitle: 'rebecca Seat 3', cardUrl: 'google.com', cardImgPath: 'img/red.jpg', cardDescr: 'sadasdas', cardPrice: '$35', cardClass: 'medium'},
        { cardTitle: 'rebecca Seat 4', cardUrl: 'google.com', cardImgPath: 'img/darkSeat.png', cardDescr: 'sadasdas', cardPrice: '$35', cardClass: 'medium'},
    ];
    const dbLength = PRODUCTS_DB.length;


    const container = document.querySelector('.products__grid-wrap');
    const loadMore = document.querySelector('.products__load-more');
    let download = 0;

      loadMore.addEventListener('click', ev => {
        let currentProductNumber = 0;
        const maxDownloadPerClick = 2;

        for (let i = download; i < PRODUCTS_DB.length; i++) {

            let content = '';
            if (currentProductNumber < maxDownloadPerClick && download < dbLength) {
              let card = PRODUCTS_DB[i];
              content = nunjucks.render('./templates/'+card['cardClass']+'-card.njk', card);
              currentProductNumber++;
              download++;

            }
            preloaderShow();
            setTimeout(()=>{
                preloaderHide();
                container.innerHTML += content;
            },1500);

            if( download == dbLength) {
                $('.products__load-more').hide(500)
            }
        }
      });
}

// SLIDER + PAGINATION

$(document).ready(function() {
 $(".slider").each(function () { // обрабатываем каждый слайдер
  let obj = $(this);
  $(obj).append("<div class='nav'></div>");
  $(obj).find("li").each(function () {
   $(obj).find(".nav").append("<span rel='"+$(this).index()+"'></span>"); // добавляем блок навигации
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
$(document).on("click", ".slider .nav span", function() { // slider click navigate
 let sl = $(this).closest(".slider"); // находим, в каком блоке был клик
 $(sl).find("span").removeClass("on"); // убираем активный элемент
 $(this).addClass("on"); // делаем активным текущий
 let obj = $(this).attr("rel"); // узнаем его номер
 sliderJS(obj, sl); // слайдим
 return false;
});
