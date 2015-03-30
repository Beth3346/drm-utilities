(function($) {
    window.drmPopovers = function(params) {
        var self = {},
            spec = params || {},
            holderClass = spec.holder || 'popover-holder',
            holder = $('.' + holderClass);
        
        self.popoverClass = spec.popoverClass || 'drm-popover';

        self.togglePopover = function() {
            var that = $(this),
                popoverId = that.data('popover'),
                popover = $('#' + popoverId);
            
            // fade out any visible popovers
            $('.' + self.popoverClass).not('#' + popoverId).not(':hidden').fadeOut();
            popover.fadeToggle();

            checkPosition = function() {
                // reposition popover if its too close to the edge of the browser window
                var that = $(this),
                    positionLeft = that.position().left,
                    offsetLeft = that.offset().left,
                    positionTop = that.position().top,
                    offsetTop = that.offset().top,
                    popoverHeight = that.height();

                if ( offsetLeft < 0 ) {
                    that.css('left', (Math.abs(offsetLeft) + 10) + positionLeft);
                } else if ( offsetTop < 0 ) {
                    that.css('bottom', (Math.abs(positionTop) - popoverHeight) - Math.abs(offsetTop));
                }
            };

            checkPosition.call(popover);
        };

        if ( holder.length > 0 ) {
            buttons = holder.find('button');
            $('body').on('click', '.' + holderClass + ' button', function(e) {
                self.togglePopover.call(this);
                e.stopPropagation();
                e.preventDefault();
            });

            $('body').on('click', function() {
                holder.find('.' + self.popoverClass).fadeOut();
            });
        }

        return self;
    };
})(jQuery);