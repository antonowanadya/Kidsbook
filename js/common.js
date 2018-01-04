var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
$(window).load(function() {
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({'overflow':'visible'});
});
$(document).ready(function() {
	// test os
	jQuery.os =  { name: (/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase()) || [u])[0].replace('sunos', 'solaris') };
	$('html').addClass('os-' + jQuery.os.name);

	// validates
	$('.js-validate-rules-1').validate({
        rules: {
            email: "required",
            city: "required"
        },
        messages : {
            name: false,
            phone: false
       },
        submitHandler: function(form) {
            form.submit();
        },
        invalidHandler: function(event, validator) {
        },
        highlight: function(element, errorClass) {
            $(element)
                .addClass(errorClass)
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element)
                .removeClass(errorClass)
        }

    });
    $('.js-validate-rules-2').validate({
        rules: {
            email: "required"
        },
        messages : {
            name: false,
            phone: false
        },
        submitHandler: function(form) {
            form.submit();
        },
        invalidHandler: function(event, validator) {
        },
        highlight: function(element, errorClass) {
            $(element)
                .addClass(errorClass)
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element)
                .removeClass(errorClass)
        }

    });

	// search
	var searchStripe = $('.js-search-stripe'),
		searchContent = $('.js-search-content'),
		searchHelper = $('.js-search-helper'),
		searchInput = $('.js-stripe-input')
	function openSearch() {
		searchHelper.animate({'height':49},200)
		searchStripe
			.show()
			.animate({'right': -15, 'left': 45}, 300, function() {
				searchContent.fadeIn(200,function() {
					searchInput.focus()
				})
				
			})
	}
	function closeSearch() {
		searchHelper.animate({'height':0},200)
		searchContent.fadeOut(200)
		searchStripe
			.animate({'right': 0, 'left': '100%'}, 300, function() {
				searchStripe.hide()
			})
	}
	$('.js-open-search').click(function() {
		openSearch()
	})
	$('.js-close-search').click(function() {
		closeSearch()
	})

	// nav side
	var navOverlay = $('.js-body-overlay'),
		navSide = $('.js-nav-side')
	
	function openNavSide() {
		navOverlay.fadeIn(300)
		navSide
			.fadeIn(300)
			.animate({'left': 0},300)
	}
	function closeNavSide() {
		navOverlay.fadeOut(300)
		navSide
			.animate({'left': -200},300, function() {
				navSide.hide()
			})
	}
	$('.js-nav-burger').click(function() {
		openNavSide()
	})
	navOverlay.click(function() {
		closeNavSide()
	})

	// random icon
	var randIcons = $('.js-rand-icon'),
		randIconsLength = randIcons.length
		$(window).on('setRandomIcon', function() {
			setRandomIcon()
		})
	function setRandomIcon() {
		randIcons.hide()
		randIcons.eq( Math.floor(Math.random() * randIconsLength ) ).show()
	}
	// start functions
	setRandomIcon();


	// sticky header and letters list in authors
	var stickyHead = $('.js-sticky-head'),
		stickyHeadUnder = $('.js-header-under'),
		whenStickyVisible = $('.js-sticky'),
		whenStickyHidden = $('.js-no-sticky'),
		stickyLetters = $('.js-letters-wrap'),
		detectLettersStick = $('.js-detect-letter-stick'),
		stickyHeadHeight = 0,
		stickyHeadUnderHeight = 0,
		firstCalcFinish = false;
		
	var enableLettersStick = stickyLetters.length?true:false


	// $(document).on('stickHead',function() {
	// 	stickHead();
	// 	console.log('stickhead');
	// });
	function stickHead() {
		whenStickyVisible.show(0);
		whenStickyHidden.hide(0);
		stickyHead.addClass('fixed');
		$(window).trigger('setRandomIcon');

		stickyHeadHeight = stickyHead.outerHeight();
		$(document).trigger('stickHead');
	}
	function unstickHead() {
		whenStickyHidden.show(0)
		whenStickyVisible.hide(0)
		stickyHead.removeClass('fixed')

		stickyHeadHeight = 0
		$(document).trigger('unstickHead');
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
		// var t = new Date();
		// $('.js-test-text2').html('new under ' + stickyHeadUnderHeight + ' '+ t.getMilliseconds())
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
		// var t = new Date();
		// $('.js-test-text1').html('new load ' + stickyHeadUnderHeight + ' '+ t.getMilliseconds())
	})
	$(window).scroll(function() {
		detectStickyElements();
	})

	// for mobile
	$(window).on('touchmove', function() {
		detectStickyElements();
	})

	function onResizeFunction() {
		var t = new Date();
		$('.js-test-text1').html('new resize ' + stickyHeadUnderHeight + ' '+ t.getMilliseconds())

		firstCalcFinish = false;
		unstickHead();
		setHeaderUnderHeight();
		firstCalcFinish = true;
		detectStickyElements();
	}
	var resizeTimeout
	$(window).resize(function() {
		if(!isMobile.any()) {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(onResizeFunction,200)
		}
	})
	$(window).on('orientationchange',function() {
		onResizeFunction();
	});


	// scrolling to books item
	$(document).on('click', '.js-goto-anchor', function(e) {
		e.preventDefault();
		var stickyHeight = $('.js-sticky-head').outerHeight();
		var scrollToElem = $('.' + $(this).data('goto'));
		if(scrollToElem.length) {
			$.scrollTo( scrollToElem.offset().top - stickyHeight - 30, 200);
		}
	});
	// $(window).on('touchmove',function() {
	// 	var t = new Date();
	// 	$('.js-test-text2').html('new touchmove ' +  t.getMilliseconds())
	// });

	// test mobile events
	// $(window).on('scrollstart',function() {
	// });
	// $(window).on('scrollstop',function() {
	// });
	// $(window).on('orientationchange',function() {
	// 	var t = new Date();
	// 	$('.js-test-text2').html('orient ' + t.getMilliseconds())
	// });
});

