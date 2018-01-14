$(function() {

	var isMobile = {
		Android:        function() { return navigator.userAgent.match(/Android/i) ? true : false; },
		BlackBerry:     function() { return navigator.userAgent.match(/BlackBerry/i) ? true : false; },
		iOS:            function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false; },
		Windows:        function() { return navigator.userAgent.match(/IEMobile/i) ? true : false; },
		any:            function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());  }
	};

	if ( !isMobile.any() ) {
    // Код не для телефонов
		var tl = new TimelineMax();
		tl
			.fromTo('.header-ellipses__main', 3, {rotation: 180, opacity: 0}, {rotation: 0, opacity: 1, onComplete: completeHandler}, 1)
			.fromTo('.header-ellipses__thin', 2, {rotation: -180, opacity: 0}, {rotation: 0, opacity: 1}, 0)
			.from('.header-title', 2, {right: '30%', opacity: 0}, '-=3');
 	
 		function completeHandler() {
			var $headerVideo = $('#bgndVideo').YTPlayer({
				quality: 'hd720',
				anchor: 'top, top',
				mobileFallbackImage: '../img/header-bg.jpg'
			});
			$headerVideo.on("YTPStart",function(e){
				var currentTime = e.time;
				setTimeout(function() {
					$headerVideo.YTPPause();

				}, 18000);

				console.log('time' + currentTime);
			});
 		}

  }


	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".menu").stop(true, true).toggleClass('bigEntrance');
		return false;
	});

	var menuLinks = $('.menu__link');
	menuLinks.click(function(e){
		e.preventDefault();
				var location = $(this).attr('href'), //секция с id, равным href текущей ссылки
				sectionCoord = $(location).find('h2').offset().top;
				$('html, body').animate({scrollTop: sectionCoord - 100}, 800);
			});
	$('.header-bottom__mouse').click(function(e) {
		$('html, body').animate({scrollTop: $('#ten').offset().top}, 800);
	});

	$('.gallery-slide').hover(function(e) {
		var $th = $(this),
		 	addingWidth = $th.width(),
		 	addingHeight = $th.height(),
		 	coordY = $th.offset().top,
		 	coordX = $th.offset().left;

		 console.log(coordX);
		 console.log('putin');

		 var $pseudoSlide = $('<div>', {
		 	class: 'pseudo-slide'
		 });
		 $pseudoSlide.width(addingWidth);
		 $pseudoSlide.height(addingHeight);

		 e.stopPropagation();
	},
	 function(e) {

	});
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

	
	

	


	// waypoint
	$('section, footer').each(function(index, elem) {
		var $th = $(elem);

		var $waypoints = $th.waypoint({
			handler: function(direction) {
				console.log(this.element.className + ' hit');
				// console.log(direction);
				if(direction == "down"){
					// var tlSect = new TimelineMax();
					// tl.fromTo($(this.element), 1.5, {y: '50%', opacity: 0}, {y: '0%', opacity: 1});

					$(this.element).removeClass('hidden');
				}
			},
			offset:200
		});
	});
	// end of waypoint
	// Owl
		$('.gallery-slider').owlCarousel({
			items: 6,
			loop: true,
			center: true,
			nav: true,
			margin: 19,
			navText: [],
			responsiveClass: true,
			responsive:{
				0:{
					items:1,
					nav:true,
					
				},
				480:{
					items:2,
					nav:true
					
				},
				600:{
					items:2,
					nav:true
					
				},
				// 768:{
				// 	items:2,
				// 	// nav:true
				// },

				900:{
					items:3,
					center:true
					// nav:true,
					
				},
				1200:{
					items:4,
					center: true
				},
				1400:{
					items:5,
					center:true
					// nav:true,
					
				}
			}
		});

		// Owl
		var $reviewsSlider = $('.reviews-slider').owlCarousel({
			items: 1,
			loop: true,
			nav: true,
			margin: 20,
			// center: true,
			navText: [],
			responsiveClass: true,
			onTranslated: translated,
			onInitialized: initialized,
			onInitialize: initialize
		});

		function initialized(e) {
			reviewBorders();
			console.log('active items ' + $('.reviews-slider .owl-item.active').length);
			
		}
		function initialize(e) {

			$('.overal').html($('.reviews-item').length);
		}

		function translated(e) {
			$('.reviews-controls__current').html(e.page.index + 1);
			reviewBorders();
		}

		function reviewBorders(){
			$('.reviews-slider .owl-item')
				.not('.active')
				.find('.reviews-item__portrait')
				.removeClass('active');

			$('.reviews-slider .owl-item.active .reviews-item__portrait')
				.addClass('active');
		}
	
	// end of Owl
	$('.reviews-controls__arrow--prev').click(function(e) {

		$reviewsSlider.trigger('prev.owl.carousel', [300]);
	});

	$('.reviews-controls__arrow--next').click(function(e) {

		$reviewsSlider.trigger('next.owl.carousel', [300]);
	});

	$('.gallery-slide').magnificPopup({
		type: 'image',
		preloader: true,
		focus: '#name',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
		// titleSrc: function(item) {
		// 	return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
		// }
	},

	zoom: {
		enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
		
	});

	$('.popup-link').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});

	$('.header-play__button, .header-location').magnificPopup({
		disableOn: 480,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: true,

		fixedContentPos: false
	});


});
	// Google Map
	var map;
	var	main_color = '#220B2F',
		saturation_value= 0,
		brightness_value= 0;
     var gmapStyles = [ 
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				// {saturation: saturation_value},
				{visibility: "off"},
				{color: 'gray'}
			]
		},  
	    {	//poi stands for point of interest - don't show these lables on the map 
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show highways lables on the map
	        featureType: 'road.highway',
	        elementType: 'labels',
	        stylers: [
	            {visibility: "on"}
	        ]
	    }, 
		{ 	
			//don't show local road lables on the map
			featureType: "road.local", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "on"} 
			] 
		},
		{ 
			//don't show arterial road lables on the map
			featureType: "road.arterial", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"}
			] 
		},
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "on"},
				{color: '#36114C'}
				
			]
		}, 
		//style different elements on the map
		{ 
			featureType: "transit", 
			elementType: "geometry.fill", 
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ color: main_color },
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "off" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "off" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ color: main_color },
				{ visibility: "off" }, /*все главным цветом*/
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "off" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "off" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "off" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "off" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "landscape.man_made",
			elementType: 'geometry.stroke',
			stylers: [
				{ visibility: "on" }, /*ландшафт*/
				{ color: '#36114C' },
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
			
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, /*ландшафт*/
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
			
		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				// { hue: '#36114C' },
				{ visibility: "on" }, 
				{ color: '#36114C' }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				// { hue: '#36114C' },
				{ visibility: "on" }, 
				{ color: '#36114C'  }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}
	];

	function initMap() {
      map = new google.maps.Map(document.getElementById('footer-map'), {
        center: {lat: 45.055931, lng: 38.977417},
        zoom: 18,
        disableDefaultUI: true, //отмена всех дефолтных элементов управления
       
       // добавление необходимых элементов управления вручную
        zoomControl: true,
        mapTypeControl: true,
        fullscreenControl: true,
        styles: gmapStyles
        // gestureHandling: 'none' //запрет на прокручивание карты
      });

      	var image = {
      		url: 'img/icons/map-marker.png',
      	};
      	var marker = new google.maps.Marker({
      		position: {lat: 45.055931, lng: 38.977417},
			    title: 'Вне зоны доступа', // "Хинт"
			    icon: image
			});

      	var infowindow = new google.maps.InfoWindow({
			  	content: ['<h5 class="google-info__title">Квест-компания "Вне зоны доступа"</h5>',
			  	'<div class="google-info__text">ул. Брянская, 6</div>'].join('') 
			  });

      	marker.addListener('click', function() {
				  	infowindow.open(map, marker);
				  });
      	marker.setMap(map);
    }	
	// end of Google Map
