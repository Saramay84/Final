$(function() {

	$('.js-filter').magnificPopup({
		items: {
			src: '.aside--filter-popup',
			type: 'inline'
		},
		closeBtnInside: true
	});

	$('.circletype').each(function(){
		new CircleType(this).radius(180);
	});

	$('.home__about h3, .home__menu h3, .home__visit h3, .home__order h3').each(function(){
		new CircleType(this).radius(270);
	});

	var masonryOptions = {
		itemSelector: '.c-menu__item'
	}
	var masonry = $('.c-menu__items').masonry( masonryOptions );
/*
	var masonry;
	var masonryActive = false;

	var initMasonry = function() {
		console.log('resizing');
		if (masonryActive) {
			// masonry is active, destroy it if select breakpoint
			if ($(window).width() < 1090) {
				masonry.masonry('destroy');
				masonryActive = false;
			}
		} else {
			// masonry is active, enable it if select breakpoint
			if ($(window).width() >= 1090) {
				masonry = $('.section--menu ul').masonry( masonryOptions );
				masonryActive = true;
			}
		}
	}
*/
/*

	$(window).on('resize', initMasonry).trigger('resize');
*/

	$('.navigation__content').css({ display: 'flex', visibility: 'visible' });
	$('.navigation__content--menu').css({ display: 'flex', visibility: 'visible' })

	var $navigationTrigger = $('.hamburger'),
		$body = $('body');

	/*
		OVERLY ENGINEERED NAVIGATION ANIMATION
		3 STAGES:
		- Elements fade out
		- Nave goes wide
		- Elements fade back in..
		Uses a fake JS element to cleanly keep track of the timeline/
	*/
	var counter = 0;
	var $timings = $('<div />').addClass('js--transition-timer').appendTo('body');
	var openNavigation = function() {
		if ( counter < 3 ) {
			console.log('hm ' + counter);
			$('body').addClass('js--animate-nav-' + counter);
			$timings.one('transitionend', openNavigation);
			counter++;
		} else {
			console.log('FINISHED OPENING!');
			$body.removeClass('nav-animating');
		}
	};
	var closeNavigation = function() {
		if ( counter > 0 ) {
			counter--;
			console.log('hm ' + counter);
			$('body').removeClass('js--animate-nav-' + counter);
			$timings.one('transitionend', closeNavigation);
		} else {
			console.log('FINISHED CLOSING!');
			$body.removeClass('nav-animating');
		}
	};

	$navigationTrigger.on('click', function(e){
		e.preventDefault();
		// don't do anything if already animating..
		if ( !$body.hasClass('nav-animating') ) {
			$body.addClass('nav-animating');
			console.log(counter);
			if ( counter == 3 ) {
				closeNavigation();
			} else {
				openNavigation();
			}
		}
	});

	$('.js-link-menus').on('click', function(e) {

		// if(window.matchMedia('(min-width:768px)').matches){
		if ($(window).width() < 1024) { // @TODO: change this if to check via breakpoint

			e.preventDefault();

			$body.toggleClass('nav-menus-visible');

		}

	});

	$('.accordion__title').on('click', function() {
		$(this).toggleClass('active').next('.accordion__copy').slideToggle();
// 		$(this).parent().siblings().children().next().slideUp();
		return false;
	})

$('.js--scroll').on('click', function(event) {
	event.preventDefault();

	var offset = 0;
	if ($(window).width() < 1024) { // @TODO: change this if to check via breakpoint
		// @TODO: get actual height of nav
		offset = 80;
	}

	var target = $(this).data('scroll') ? $(this).data('scroll') : $(this).attr('href');
	$('html, body').animate({
		scrollTop: $(target).offset().top - offset
	}, 1000);
});


// GF Select 2
$('.gfield_select').css('width', '100%').select2({
	placeholder: 'Please select'
});

if ($('.carousel--careers').length) {
var mainTicker = new Flickity('.carousel--careers', {
	wrapAround: true,
	prevNextButtons: false,
	pageDots: false,
	percentPosition: true,
	draggable: false
});

// Set initial position to be 0
mainTicker.x = 0;

// Start the marquee animation
play();

// Main function that 'plays' the marquee.
function play() {
	// Set the decrement of position x
	mainTicker.x = mainTicker.x - 1.5;

	// Settle position into the slider
	mainTicker.settle(mainTicker.x);

	// Set the requestId to the local variable
	requestId = window.requestAnimationFrame(play);
}
}

});
