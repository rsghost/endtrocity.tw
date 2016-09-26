$(document).ready(function () {
  var $body = $('html, body');
  var $navbar = $('.navbar-collapse');
  var slides = ['#home', '#info', '#merch', '#video', '#music'];
  var slideDOM = {};
  var parallaxStatus = 0;

  for (var i = 0; i < slides.length; i++) {
    slideDOM[slides[i]] = $(slides[i]);
  };

  var moveSlide = function (target) {
    var top = slideDOM[target].offset().top;

    if (window.scrollY !== top) {
      history.pushState({}, '', target);
      $body.animate({
        scrollTop: top
      }, 500, 'easeInOutExpo');
    };
  };

  // menu events
  $('.menu-font').each(function () {
    var href = $(this).attr('href');
    $(this).click(function (e) {
      if (!e.shiftKey && !e.ctrlKey && e.button === 0) {
        $navbar.collapse('hide');
        moveSlide(href);
        e.preventDefault();
        e.stopPropagation();
      };
    });
  });

  // enable parallax scrolling
  $('#info').parallax({
    imageSrc: 'img/info_bg.jpg',
    overScrollFix: true
  });

  $('#music').parallax({
    imageSrc: 'img/music_bg.jpg',
    overScrollFix: true
  });

  $('.parallax-slider').on('load', function (e) {
    if (!parallaxStatus) {
      parallaxStatus++;
      $('#music, #info').css({ background: 'transparent' });

      $('.youtube-player').attr('src', 'https://www.youtube.com/embed/YlaIXE3FvQg?cc_load_policy=1&cc_lang_pref=en&list=PL_-drv7dK6kadAr_8E5zxkt6BtQiHA33T&html5=1&controls=1&showinfo=1');
    };
  });
});
