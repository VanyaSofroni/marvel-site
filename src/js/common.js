// Jquery
$(document).ready(function(){
    // Gallery Fancybox
    $(".fancybox")
      .fancybox({
          padding : 0
      });


    // Ajax form-contact
    $("#form-contact").submit(function() {
      var th = $(this);
      jQuery.ajax({
        type: "POST",
        url: "src/mail.php", //change
        data: th.serialize()
      }).done(function() {
        setTimeout(function() {
          th.find("input").val("");
          th.trigger("reset");

          // $('.popup-overlay').addClass('popup-overlay--show');
          // $('.product-popup-content-thank').addClass('product-popup-content-thank--show');
        }, 1000);
      }); 
      return false;
    }); 


    // Меню прилипает в верху
    var headerTop = $(".main-nav").offset().top;

    $(window).scroll(function(){
        if( $(window).scrollTop() > headerTop ) {
          $(".main-nav").css({position: "fixed", top: "0px", width: "100%"});
        } else {
          $(".main-nav").css({position: "static"});
        }
    });


    // Плавный скрол при нажатии на пункт меню + подсветка активного элемента
    $(document).on("scroll", onScroll);

    $("a[href^='#']").on("click", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $("a").each(function () {
        $(this).removeClass("main-nav__item--active");
      })
      $(this).addClass("main-nav__item--active");

      // закрытие контейнера Меню при нажатии на кнопку 
      $(".main-nav").addClass("main-nav--closed");
      $(".main-nav").removeClass("main-nav--opened");

      var hash = $(this).attr("href");
      var target = $(hash);
      $("html, body").animate({
          scrollTop: target.offset().top
      }, 700, function(){
        window.location.hash = hash;
        $(document).on("scroll", onScroll);
      });
    });

    function onScroll(event){
      var scrollPosition = $(document).scrollTop();
      $(".main-nav__container a").each(function () {
        var currentLink = $(this);
        var refElement = $(currentLink.attr("href"));
        if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
          $(".main-nav__container ul li a").removeClass("main-nav__item--active");
          currentLink.addClass("main-nav__item--active");
        }
        else{
          currentLink.removeClass("main-nav__item--active");
        }
      });
    }
});


// Yandex-Map
ymaps.ready(init);
var myMap, 
    myPlacemark;

var placemarks = [
  {
    latitude: 47.21257656,
    longitude: 38.92030514,
    hintContent: [
        '<div class="map__hint">',
          '<img class="map__logo"  src="../img/content/logo-map.png"  width="33"  height="33"  alt="Logo Marvel"/>',
          '<span>Marvel Company</span>',
        '</div>'
      ],
    balloonContent: [
        '<div class="map__balloon">',
          '<img class="map__logo"  src="../img/content/logo-map.png"  width="33"  height="33"  alt="Logo Marvel"/>',
          '<span>Marvel Company ул.Чехова 106</span>',
        '</div>'
      ]
  },

  {
    latitude: 47.21958960,
    longitude: 38.92044167,
    hintContent: [
        '<div class="map__hint">',
          '<img class="map__logo"  src="../img/content/logo-map.png"  width="33"  height="33"  alt="Logo Marvel"/>',
          '<span>Marvel Company</span>',
        '</div>'
      ],
    balloonContent: [
        '<div class="map__balloon">',
          '<img class="map__logo"  src="../img/content/logo-map.png"  width="33"  height="33"  alt="Logo Marvel"/>',
          '<span>Marvel Company пер.Гоголевский 11</span>',
        '</div>'
      ]
  },

  {
    latitude: 47.20880149,
    longitude: 38.93966424,
    hintContent: [
        '<div class="map__hint">',
          '<img class="map__logo"  src="../img/content/logo-map.png"  width="33"  height="33"  alt="Logo Marvel"/>',
          '<span>Marvel Company</span>',
        '</div>'
      ],
    balloonContent: [
        '<div class="map__balloon">',
          '<img class="map__logo"  src="../img/content/logo-map.png"  width="33"  height="33"  alt="Logo Marvel"/>',
          '<span>Marvel Company ул.Петровская 36</span>',
        '</div>'
      ]
  }
];

function init(){ 
    myMap = new ymaps.Map("map", {
        center: [47.20748477, 38.92291807],
        zoom: 13,
        behaviors: ["drag"]
    }); 

    placemarks.forEach(function(obj) {
      var placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
            hintContent: obj.hintContent.join(''),
            balloonContent: obj.balloonContent.join('')
        }, {
            // preset: 'islands#redIcon'
            preset: "islands#blackDotIcon"
        });
      
      myMap.geoObjects.add(placemark);
    });
}


// Accordion 
var mapCaption = document.querySelector(".map__caption");
var mapContent = document.querySelector(".map__content");

mapCaption.addEventListener("click", function(event) {
  event.preventDefault();
  if (mapCaption.classList.contains("map__caption--active")) {
    mapCaption.classList.remove("map__caption--active");
    mapContent.style.display="none";
  } else {
    mapCaption.classList.add("map__caption--active");
    mapContent.style.display="block";
  }
});


// Открытие-закрытие меню
var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");

navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});


// Mixitup
var containerEl = document.querySelector(".container");
var mixer = mixitup(containerEl);


// Slider
var currentSlide = 0;
var slides = document.querySelectorAll(".slider__item");
var dot = document.querySelectorAll(".slider__dot");
// var controls = document.querySelectorAll('.slider__button');

setInterval(nextSlide, 3000);

function nextSlide() {
  goToSlide( currentSlide + 1 );
}

function previousSlide() {
  goToSlide( currentSlide - 1 );
}

function goToSlide(n) {
  slides[currentSlide].className = "page-header__slide-item  slider__item";
  currentSlide = ( n + slides.length ) % slides.length;
  slides[currentSlide].className = "page-header__slide-item  slider__item  slider__item--current";

  for( i = 0; i < dot.length; i++ ){
    dot[i].className = dot[i].className.replace("slider__dot--current", "");
  }

  dot[currentSlide].className = "slider__dot  slider__dot--current";
};

var next = document.getElementById( "next" );
var previous = document.getElementById( "previous" );

next.onclick = function() {
  nextSlide();
};

previous.onclick = function() {
  previousSlide();
};