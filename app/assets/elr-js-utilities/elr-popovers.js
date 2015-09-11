(function($) {
    'use strict';
    
    window.elrPopovers = function(params) {
        var self = {};
        var spec = params || {};
        var holderClass = spec.holder || 'popover-holder';
        var $holder = $('.' + holderClass);
        var popoverClass = spec.popoverClass || 'elr-popover';

        var togglePopover = function() {
            var $that = $(this);
            var popoverId = $that.data('popover');
            var $popover = $('#' + popoverId);
            
            // fade out any visible popovers
            $('.' + popoverClass).not('#' + popoverId).not(':hidden').fadeOut();
            $popover.fadeToggle();

            var checkPosition = function() {
                // reposition popover if its too close to the edge of the browser window
                var $that = $(this);
                var positionLeft = $that.position().left;
                var offsetLeft = $that.offset().left;
                var positionTop = $that.position().top;
                var offsetTop = $that.offset().top;
                var popoverHeight = $that.height();

                if ( offsetLeft < 0 ) {
                    $that.css('left', (Math.abs(offsetLeft) + 10) + positionLeft);
                } else if ( offsetTop < 0 ) {
                    $that.css('bottom', (Math.abs(positionTop) - popoverHeight) - Math.abs(offsetTop));
                }
            };

            checkPosition.call($popover);
        };

        if ( $holder.length ) {
            var $buttons = $holder.find('button');

            $('body').on('click', '.' + holderClass + ' button', function(e) {
                togglePopover.call(this);
                e.stopPropagation();
                e.preventDefault();
            });

            $('body').on('click', function() {
                $holder.find('.' + popoverClass).fadeOut();
            });
        }

        return self;
    };
})(jQuery);