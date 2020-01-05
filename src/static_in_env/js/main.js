// Get the url of the page
var path = window.location.pathname.split('/');

// Fireup the plugins
$(document).ready(function(){

	// Menu toggle
	$('#menu_toggle').on('click', function(e){
		var not_toggled = ($('header nav')).css('left') == (window.innerWidth * 1.04).toString() + "px";
		e.preventDefault(e);
		if(not_toggled){
			($(this)[0]).innerHTML = "<i class='fas fa-times'></i>";
			$('header nav').animate({left: "4%"}, 150);
		} else {
			($(this)[0]).innerHTML = "<i class='fas fa-bars'></i>";
			$('header nav').animate({left: "104%"}, 150);
		}
		toggled = true;
	});

	// initialise  slideshow
	$('.flexslider').flexslider({
		animation: "slide",
		start: function(slider){
			$('body').removeClass('loading');
		}
	});

	// Get the element to focus
	function findNavLink(name){
		var link = $(".navlink[data-name='"+name+"']");
		return (link.length == 0 ? false : link);
	}
	var el = findNavLink(path[1]);
	if(el){
		el.addClass('focus');
		el.next().addClass('dropit')
	} else {
		findNavLink('home').addClass('focus');
		findNavLink('home').next().addClass('dropit');
	}

	// Scroll event
	$(window).scroll(function() {
		if ($(window).scrollTop() >= 500) {
			$("#goTop").css({
				'visibility':'visible',
				'opacity':'1'
			});
		} else {
			$("#goTop").css({
				'opacity':'0',
				'visibility':'hidden'
			});
		}
	});

	// GoTop Event scroll
	$('#goTop').click(function() {
		$("html, body").animate({ scrollTop: 0 }, '500');
		return false;
	});

	$('.navlink').on('click', function(e) {
		e.preventDefault();
		// $('.dropit').removeClass('dropit');
		var element = $(this).next();
		if (element.hasClass('dropit')) {
			element.removeClass('dropit');
		} else {
			element.addClass('dropit');
		}
	});

});
/**
 * Handles toggling the navigation menu for small screens.
 */
 // ( function() {
 // 	var button = document.getElementById( 'topnav' ).getElementsByTagName( 'div' )[0],
 // 	menu   = document.getElementById( 'topnav' ).getElementsByTagName( 'ul' )[0];

 // 	if ( undefined === button )
 // 		return false;

	// // Hide button if menu is missing or empty.
	// if ( undefined === menu || ! menu.childNodes.length ) {
	// 	button.style.display = 'none';
	// 	return false;
	// }

	// button.onclick = function() {
	// 	if ( -1 == menu.className.indexOf( 'srt-menu' ) )
	// 		menu.className = 'srt-menu';

	// 	if ( -1 != button.className.indexOf( 'toggled-on' ) ) {
	// 		button.className = button.className.replace( ' toggled-on', '' );
	// 		menu.className = menu.className.replace( ' toggled-on', '' );
	// 	} else {
	// 		button.className += ' toggled-on';
	// 		menu.className += ' toggled-on';
	// 	}
	// };
// } )();
