$(document).ready(function() {
	// sticky header and letters list in authors
	var stickyHead = $('.js-sticky-head'),
		stickyHeadUnder = $('.js-header-under'),
		whenStickyVisible = $('.js-sticky'),
		whenStickyHidden = $('.js-no-sticky'),
		stickyLetters = $('.js-letters-wrap'),
		detectLettersStick = $('.js-detect-letter-stick'),
		stickyHeadHeight = 0,
		stickyHeadUnderHeight = 0,
		firstCalcFinish = false

	var enableLettersStick = stickyLetters.length?true:false

	function stickHead() {
		whenStickyVisible.show(0)
		whenStickyHidden.hide(0)
		stickyHead.addClass('fixed')
		$(window).trigger('setRandomIcon')

		stickyHeadHeight = stickyHead.outerHeight()
	}
	function unstickHead() {
		whenStickyHidden.show(0)
		whenStickyVisible.hide(0)
		stickyHead.removeClass('fixed')

		stickyHeadHeight = 0
	}
	function stickLetters() {
		stickyLetters
			.addClass('fixed')
			.css({'top': 125})
		detectLettersStick
			.css({'height': stickyLetters.outerHeight()})
	}
	function unstickLetters() {
		stickyLetters
			.removeClass('fixed')
			.css({'top': 0})
		detectLettersStick
			.css({'height': 0})
	}
	function setHeaderUnderHeight() {
		stickyHeadUnderHeight = stickyHead.outerHeight()
		stickyHeadUnder.height(stickyHeadUnderHeight);
		console.log(stickyHeadUnderHeight)
	}
	function detectStickyElements() {
		if($(document).scrollTop() > stickyHeadUnderHeight - 125 && firstCalcFinish) {
			stickHead()
		} else {
			unstickHead()
		}
		if(enableLettersStick) {
			if($(document).scrollTop() + stickyHeadHeight > detectLettersStick.offset().top) {
				stickLetters()
			} else {
				unstickLetters()
			}
		}
	}
	$(window).load(function() {
		setHeaderUnderHeight();
		firstCalcFinish = true;
		detectStickyElements();
	})
	$(window).scroll(function() {
		console.log('scroll')
		detectStickyElements();
	})

	function onResizeFunction() {
		firstCalcFinish = false;
		unstickHead();
		setHeaderUnderHeight();
		firstCalcFinish = true;
		detectStickyElements();
	}
	var resizeTimeout
	$(window).resize(function() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(onResizeFunction,200)

	})
});
