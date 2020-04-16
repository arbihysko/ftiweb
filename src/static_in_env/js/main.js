// Get the url of the page
var path = window.location.pathname.split('/');

// Image preloader call it with an array of image links preloadImages(imgLink)
function preloadImages(array) {
	if (!preloadImages.list) {
		preloadImages.list = [];
	}
	var list = preloadImages.list;
	for (var i = 0; i < array.length; i++) {
		var img = new Image();
		img.onload = function() {
			var index = list.indexOf(this);
			if (index !== -1) {
				list.splice(index, 1);
			}
		}
		list.push(img);
		img.src = array[i];
	}
}

// Fireup the plugins
$(document).ready(function(){

	// Menu toggle
	$('#menu_toggle').on('click', function(e){
		e.preventDefault();
		if(!$(this).hasClass('toggled')){
			$(this).addClass("toggled");
			($(this)[0]).innerHTML = "<i class='fas fa-times'></i>";
			$('header nav').addClass('nav_toggled');
			if (window.innerWidth > 481)
				$('.wrapper').addClass('wrapper_toggled');
		} else {
			$(this).removeClass("toggled");
			($(this)[0]).innerHTML = "<i class='fas fa-bars'></i>";
			$('header nav').removeClass('nav_toggled');
			$('.wrapper').removeClass('wrapper_toggled');
		}
	});

	$('nav>ul>li>a').on('click', function(e){
		e.preventDefault();
	});

	$('.search').on('mouseover', function(){
		setTimeout(function() {$('.search-popup input').focus()}, 200);
	});

	$('.search_tog').on('click', function(e){
		e.preventDefault();
		$('.menu_toggle').animate({opacity:0}, 200);
		setTimeout(function(){$('.search-popup').addClass('searchPop'),200});
		setTimeout(function() {$('.search-popup input').focus()}, 400);
	});
	$('.search-popup i').on('click', function() {
		$('.search-popup').removeClass('searchPop');
		setTimeout(function(){$('.menu_toggle').animate({opacity:1}, 200),200});
	});

	if (window.innerWidth <= 1024) {
		$('.navlink').on('click', function(e) {
			e.preventDefault();
			var element = $(this).next();
			if (element.hasClass('dropit')) {
				element.removeClass('dropit');
			} else {
				element.addClass('dropit');
			}
		});
	}

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
