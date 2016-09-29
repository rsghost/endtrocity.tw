requirejs.config({
  'baseUrl': 'js/lib',
  'paths': {
    'jquery': '//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min',
    'bootstrap': 'bootstrap.min',
    'parallax': 'parallax.min',
    'easing': 'jquery.easing.min',
    'md': 'mobile-detect.min',
    'songkick': 'songkick.widget',
    'loadCSS': 'loadCSS.min'
  },
  'shim': {
    'bootstrap': ['jquery'],
    'parallax': ['jquery'],
    'easing': ['jquery']
  }
});

requirejs(['loadCSS'], function () {
  loadCSS('css/lib/bootstrap.min.css');
  loadCSS('css/lib/bootstrap-theme.min.css');
  loadCSS('css/lib/font-awesome.min.css');
  loadCSS('//fonts.googleapis.com/css?family=Dosis:400,600%7COpen+Sans:600');
  loadCSS('css/main.min.css');
});

requirejs(['jquery', 'md', 'bootstrap', 'easing', 'parallax'], function ($, MobileDetect) {
  $(document).ready(function () {
    var md = new MobileDetect(window.navigator.userAgent),
        $body = $('html, body'),
        $navbar = $('.navbar-collapse'),
        slides = ['#home', '#info', '#merch', '#video', '#music'],
        slideDOM = {};

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

    // enable slideshow
    $('.carousel').carousel({
      keyboard: false
    })

    // enable parallax scrolling
    $('#info').parallax({
      imageSrc: 'img/info_bg.jpg',
      overScrollFix: true
    });

    $('#music').parallax({
      imageSrc: 'img/music_bg.jpg',
      overScrollFix: true
    });


    // mobile
    if (md.mobile()) {
      $('.youtube-player').attr('src', '//www.youtube.com/embed/vjwL55__F48?cc_load_policy=1&cc_lang_pref=en&list=PL_-drv7dK6kadAr_8E5zxkt6BtQiHA33T&html5=1&controls=1&showinfo=0');
    } else {
      $('#music, #info').css({ background: 'transparent' });

      // $('.youtube-player').attr('src', '//www.youtube.com/embed/videoseries?cc_load_policy=1&cc_lang_pref=en&list=PL_-drv7dK6kadAr_8E5zxkt6BtQiHA33T&html5=1&controls=1&showinfo=1');
      $('.youtube-player').attr('src', '//www.youtube.com/embed/vjwL55__F48?cc_load_policy=1&cc_lang_pref=en&list=PL_-drv7dK6kadAr_8E5zxkt6BtQiHA33T&html5=1&controls=1&showinfo=1');

      $('.soundcloud-player').attr('src', '//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/68157237&color=1e1e1e&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&visual=true').addClass('show');

      $('.more-btn').addClass('soundcloud-loaded');

      $('.mobile-item').addClass('hide');
    };

    // remove loading animate
    $('.loading').hide();

    requirejs(['ga']);
    requirejs(['songkick']);
  });
});
