$(document).ready(function() {
	// делим авторов на 4 колонки
	$('.js-letters-cols-wrap').each(function() {
		var elems = $(this).find('.letter-item'),
			length = elems.length,
			div = Math.floor(length / 4),
			mod = length % 4
		// console.log(length +'||'+div+'||'+mod)
		var j = 0,
			i = 0,
			devPoint = [0]
		while(j <= length) {
			i++
			j++
			if(i % div == 0) {
				if(mod) {
					j++
					devPoint.push(j)
					mod -= 1
				} else {
					devPoint.push(j)
				}
			}
			if(div == 0) {
				devPoint.push(j)
			}
		}
		// console.log(devPoint)
		for(i = 0; i < (devPoint.length - 1);i++) {
			elems.slice(devPoint[i],devPoint[i+1]).wrapAll('<div class="letter-col"></div>')
		}
	})

	// author letter scroll
	// helper function
	function counter() {
		var i = 1;
		return function() {
			return i++;
		}
	}
	var idCounter = counter();

	var enableLetters = [];
	var letterHeads = $('.letter-head');
	var letterTriggers = $('.js-letter-triggers a');
	letterHeads.each(function() {
		var _this = $(this);
		enableLetters.push(_this.html().toLowerCase());
	});
	letterTriggers.each(function() {
		var _this = $(this);
		var letter = _this.html().toLowerCase();
		var letterIndex = returnIndex(letter);
		if(letterIndex == -1) {
			_this.hide();
		} else {
			var currentId = idCounter();
			_this.data('letterid', currentId);
			letterHeads.eq(letterIndex).addClass('js-letterid-' + currentId);
		}
	});
	function returnIndex(letter) {
		var result = -1;
		for(var i = 0; i < enableLetters.length; i++) {
			if(letter == enableLetters[i]) return i;
		}
		return result;
	}

	var stickyHead = $('.js-sticky-head');
	var stickyLetters = $('.js-letters-wrap');
	letterTriggers.click(function(e) {
		e.preventDefault();
		var destinateLetter = $('.js-letterid-'+$(this).data('letterid') );

		var offset = calcOffset();
		$.scrollTo(offset, 300, function() {
			$.scrollTo(calcOffset(), 150);
		});
		function calcOffset() {
			return destinateLetter.offset().top - stickyHead.outerHeight() - stickyLetters.outerHeight();
		}
	});
	

});

