;(function( $ ) {
    // methods
    var methods = {
        init: function(options) {
            // settings
            var defOptions = {
                activeClass: 'active',
                removeActive: false,
                group: false,
                isCheckbox: false,
                isRadio: false,
                onSwitchOn: function(eventElement) {
                },
                onSwitchOff: function(eventElement) {
                }
            }
            var settings = $.extend({},defOptions, options);

            if(settings.group) {
                this.each(function() {
                    var _this = $(this)
                    _this.addClass('flrSwitcher-' + _this.data('switchgroup'))
                })
            }
            this.click(function() {
                var _this = $(this)
                if(!_this.hasClass(settings.activeClass)) {
                    if(settings.group) {
                        if(settings.isCheckbox) {
                            $('.flrSwitcher-'+ _this.data('switchgroup'))
                                .removeClass(settings.activeClass)
                                .find('input[type="checkbox"]')
                                .prop('checked', false)
                        } else {
                            $('.flrSwitcher-'+ _this.data('switchgroup'))
                                .removeClass(settings.activeClass)
                        }
                    }
                    if(settings.isCheckbox) {
                        _this
                            .find('input[type="checkbox"]')
                            .prop('checked', true)
                    }
                    if(settings.isRadio) {
                        _this
                            .find('input[type="radio"]')
                            .prop('checked', true)
                    }
                    _this.addClass(settings.activeClass)
                    settings.onSwitchOn(_this);
                } else if(settings.removeActive){
                    _this.removeClass(settings.activeClass)
                    if(settings.isCheckbox) {
                        _this
                            .find('input[type="checkbox"]')
                            .prop('checked', false)
                    }
                    settings.onSwitchOff(_this);
                }
            })
        }
    }
    $.fn.customSwitcher = function(method) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.customSwitcher' );
        }
    };
})(jQuery);