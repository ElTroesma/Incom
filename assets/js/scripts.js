String.prototype.replaceAll = function(search, replace) {
	return this.toString().split(search).join(replace);
}

$(document).on('ready', function() {
	showScrollUpCommand();
	setZebraBackgrounds();
	centerColumnsWhenLessThan3();

	if(document.location.hash != '') {
		setTimeout(function() {
			// reseteo el scroll top
			$('html, body').scrollTop(0);
			// Lo envio al hash que viene por url
			$('html, body').animate({
				scrollTop: $('#pre_' + document.location.hash.replace('#', '')).offset().top - (document.location.hash != '#inicio' ? 72 : 120)
			}, 500);
		}, 50);
	}

	$('body').on('click', 'a[href]', function(e) {
		e.preventDefault();
		var $this = $(this);
		if($this.attr('href') == '#') return false;

		try {
			var $element = $('#pre_' + $this.attr('href').replace('#', ''));
			if ($element.length == 0) { 
				document.location = $this.attr('href');
				return false;
			}
		} catch(e) {
			if($this.attr('target')) {
				window.open($this.attr('href'), $this.attr('target'));
			} else {
				document.location.href = $this.attr('href');
			}
			return false;
		}


		$('html, body').animate({
			scrollTop: $('#pre_' + $this.attr('href').replace('#', '')).offset().top - ($this.attr('href') != '#inicio')
		}, 500, function() {
			if($this.attr('href') == '#nosotros') {
				if($this.data('type') && $this.data('type') == 'solicitud') {
					$('.contacto').find('form > input[name=nombre]').focus();
					$('.contacto').find('form > textarea[name=mensaje]').val($this.data('message').replaceAll('#BR#', "\n"));
				}
			}
		});

		document.location.hash = $this.attr('href');
		return false;
	});


	// Actualizar paginación del slideshow
	function updatePagination() {
		var carouselIndex         = $('#slider-banner').jcarousel('visible').index();
		var $carouselPageSelected = $('.ctrl-paginacion').find('li.selected');
		var $carouselNewPage      = $('.ctrl-paginacion').find('li:eq(' + carouselIndex + ')');
		
		$carouselPageSelected.removeClass('selected');
		$carouselNewPage.addClass('selected');
	}
});

$(window).on('scroll', function(e) {
	showScrollUpCommand();
});

function showScrollUpCommand() {
	if($(window).scrollTop() > 50) {
		$('a.scroll-up').fadeIn();
	} else {
		$('a.scroll-up').fadeOut();
	}
}

function setZebraBackgrounds() {
	$('.contenido-principal').each(function(index, item) {
		if(index % 2 > 0) {
			$(item).addClass('fondo-gris');
		}
	});
}

function fixHeights() {
	$(".contenido-principal").height(function() {
		return $(window).outerHeight() - $('header').outerHeight() + 3
	});

	$(".contenido-principal:first").height(function() {
		return $(window).outerHeight() - $('header').outerHeight()
	});

	$(".contenido-principal:last").height(function() {
		return $(window).outerHeight() - $('header').outerHeight() - $('footer').outerHeight() - 60 + 3
	});

	$(".contenido-principal").find('.center').wrap('<div class="inner-overflow" />');
}

function centerColumnsWhenLessThan3() {
	var _clientes_ = $('.contenido-principal.clientes').find('.columna-30');

	if(_clientes_.length < 3) {
		var _clientes_width = 0;

		_clientes_.each(function () {
			var margin_right = parseFloat($(this).css('margin-right').replace('px', ''));
			var margin_left = parseFloat($(this).css('margin-left').replace('px', ''));

			_clientes_width += $(this).outerWidth() + margin_right + margin_left;
		});

		_clientes_.first().css({
			'padding-left': function () {
				return (_clientes_.parent().innerWidth() - _clientes_width) / 2;
			}
		});
	}
}