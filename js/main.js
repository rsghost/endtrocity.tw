$(document).ready(function () {
  var $body = $('html, body');
  var $navbar = $('.navbar-collapse');
  var slides = ['#home', '#info', '#merch', '#video', '#music'];
  var slideDOM = {};

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

  var parallaxBackground = function () {
    if (!this.enable) {
      this.enable = 1;
      $('#info').css({
        background: 'transparent'
      });

      $('#music').css({
        background: 'transparent'
      });

      $('.home-logo').css({
        position: 'absolute',
        'background-attachment': 'fixed'
      });
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

  $(".parallax-slider").on("load", function () {
    parallaxBackground();
  });
});
