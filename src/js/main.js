'use strict';
(function() {
  var mainNavToggle = document.querySelector(".main-nav__toggle");
  var mainNav       = document.querySelector(".main-nav__list");
  
  //навигация
  mainNavToggle.addEventListener("click", function() {

    mainNav.classList.toggle("main-nav__list--show");

  });
  var priceItem = document.querySelectorAll(".price__item");

  function autoHeight(collection) {
    var maxHeight = 0;
    var maxCol = [];
    for (var i = 0; i < collection.length; i++) {
      if (maxHeight > getComputedStyle(collection[i]).height) {
        continue;
        } else {
         maxHeight = getComputedStyle(collection[i]).height;
         maxCol = collection[i];
        };
      }

     for (var i = 0; i < collection.length; i++) {
      // console.log(maxHeight);     
      console.log(maxCol.offsetHeight);
      if(collection[i].height < maxCol.offsetHeight) {
        console.log(collection[i]);
      };
      // collection[i].style.minHeight = maxHeight;
     }

  };
    autoHeight(priceItem);

  window.onresize = function() {
    autoHeight(priceItem);
  }
})();

  function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
  r(function(){
    if (!document.getElementsByClassName) {
        // Поддержка IE8
        var getElementsByClassName = function(node, classname) {
            var a = [];
            var re = new RegExp('(^| )'+classname+'( |$)');
            var els = node.getElementsByTagName("*");
            for(var i=0,j=els.length; i<j; i++)
                if(re.test(els[i].className))a.push(els[i]);
            return a;
        }
        var videos = getElementsByClassName(document.body,"youtube");
    } else {
        var videos = document.getElementsByClassName("youtube");
    }

    var nb_videos = videos.length;
    for (var i=0; i<nb_videos; i++) {
        // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
        videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';

        // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
        var play = document.createElement("div");
        play.setAttribute("class","play");
        videos[i].appendChild(play);

        videos[i].onclick = function() {
            // создаем iframe со включенной опцией autoplay
            var iframe = document.createElement("iframe");
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
            iframe.setAttribute("src",iframe_url);
            iframe.setAttribute("frameborder",'0');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            iframe.style.width  = this.style.width;
            iframe.style.height = this.style.height;

            // Заменяем миниатюру плеером с YouTube
            this.parentNode.replaceChild(iframe, this);
        }
    }
});

  $(window).load(function(){
    $(".feedback__row").slick({
      slidesToShow: 2,
      slidesToScroll: 2,
      dots: true,
      responsive: [    
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]//responsive
    });
  });