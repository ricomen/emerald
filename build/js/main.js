
(function() {

  //главная навигация
  $(".main-nav__toggle").on("click", function() {
    $(this).siblings('.main-nav__list').toggleClass("main-nav__list--show");
  });

  //slider
  $(".feedback__row").slick({
      slidesToShow: 2,
      slidesToScroll: 2,
      dots: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            arrows: false
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,            
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]//responsive
    });

    //.mPageScroll2id - плавная прокрутка по ссылкам
    $("a[rel='m_PageScroll2id']").mPageScroll2id();   

    //кнопка навигации при прокрутке
    var fixNav = false;
    jQuery(document).scroll(function(){
      if ((jQuery(this).scrollTop()) > jQuery(".page-header").height() && fixNav == false ) {
        fixNav = true;
        $(".main-nav").addClass("main-nav--fixed");
      } else if ((jQuery(this).scrollTop()) < jQuery(".page-header").height()) {
        fixNav = false;
        $(".main-nav").removeClass("main-nav--fixed");
      }      
    });

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