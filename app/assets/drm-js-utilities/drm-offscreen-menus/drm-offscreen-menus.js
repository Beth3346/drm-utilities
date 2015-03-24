(function($) {
    window.drmOffscreenMenu = function(args) {
        var self = {},
            spec = args || {},
            menuClass = spec.menuClass || 'drm-offscreen-menu',
            buttonClass = spec.buttonClass || 'drm-menu-button',
            contentClass = spec.contentClass || 'drm-offscreen-content',
            state = spec.state || 'hide';

        self.toggleMenu = function(menuWidth, menu, holder) {
            var menuPos = menu.css('left');

            if ( menuPos === '0px' ) {
                self.hideMenu(menuWidth, menu);
            } else {
                self.showMenu(menu, holder);
            }
        };

        self.showMenu = function(menu, holder) {
            menu.animate({'left': '0'});
            self.addScroll(menu, holder);
        };

        self.hideMenu = function(menuWidth, menu) {
            menu.animate({'left': '-' + menuWidth});
        };

        self.addScroll = function(menu, holder) {
            var menuHeight = parseInt(menu.find('ul').css('height'), 10),
                contentHeight = parseInt(holder.css('height'), 10);

            if ( menuHeight > contentHeight ) {
                menu.css({'overflow-y': 'scroll'});
            }
        };

        var menu = $('.' + menuClass),
            menuPos = menu.css('left');

        if ( menu.length > 0 ) {
            var content = $('.' + contentClass),
                button = $('.' + buttonClass),
                menuWidth = menu.css('width');

            if ( state === 'hide' && menuPos === '0px' ) {
                self.hideMenu(menuWidth, menu);
                self.addScroll(menu, content);
            }

            content.on('click', function(e) {
                self.hideMenu(menuWidth, menu);
                e.stopPropagation();
            });

            button.on('click', function(e) {
                self.toggleMenu(menuWidth, menu, content);
                e.preventDefault();
                e.stopPropagation();
            });
        }

        return self;
    };
})(jQuery);