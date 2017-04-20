loadCSS('css/lib/bootstrap.min.css');
loadCSS('css/lib/bootstrap-theme.min.css');
loadCSS('css/lib/font-awesome.min.css');
loadCSS('//fonts.googleapis.com/css?family=Dosis:400,600%7COpen+Sans:600');
loadCSS('css/main.min.css');

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

    // enable slideshow
    $('.carousel').carousel({
      keyboard: false
    })

    var url = '//www.youtube.com/embed/WfN_BOLdpH4?cc_load_policy=1&cc_lang_pref=en&list=PL_-drv7dK6kadAr_8E5zxkt6BtQiHA33T&html5=1&controls=1&showinfo='

    // mobile
    if (md.mobile()) {
      // enable youtuble player without info
      $('.youtube-player').attr('src', url + '0');
    } else {
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

      $('#music, #info').css({ background: 'transparent' });

      // enable youtube player
      $('.youtube-player').attr('src', url + '1');

      // enbale soundcloud widget
      $('.soundcloud-player').attr('src', '//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/68157237&color=1e1e1e&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&visual=true').addClass('show');

      // remove soundcloud btn
      $('.mobile-item').addClass('hide');
      $('.more-btn').addClass('soundcloud-loaded');
    };

    // remove loading animate
    $('.iframe-loading').hide();

    setTimeout(function () {
      $('.page-loading').hide();
    }, 5000);

    requirejs(['ga']);
    requirejs(['songkick']);
  });
});
