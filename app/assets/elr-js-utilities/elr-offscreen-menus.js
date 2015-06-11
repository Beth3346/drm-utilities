(function($) {
    'use strict';
    
    window.elrOffscreenMenu = function(params) {
        var self = {};
        var spec = params || {};
        var menuClass = spec.menuClass || 'elr-offscreen-menu';
        var buttonClass = spec.buttonClass || 'elr-menu-button';
        var contentClass = spec.contentClass || 'elr-offscreen-content';
        var state = spec.state || 'hide';
        var $menu = $('.' + menuClass);

        var toggleMenu = function(menuWidth, $menu, $holder) {
            var menuPos = $menu.css('left');

            if ( menuPos === '0px' ) {
                hideMenu(menuWidth, $menu);
            } else {
                showMenu($menu, $holder);
            }
        };

        var showMenu = function($menu, $holder) {
            $menu.animate({'left': '0'});
            addScroll($menu, $holder);
        };

        var hideMenu = function(menuWidth, $menu) {
            $menu.animate({'left': '-' + menuWidth});
        };

        var addScroll = function($menu, $holder) {
            var menuHeight = parseInt($menu.find('ul').css('height'), 10),
                contentHeight = parseInt($holder.css('height'), 10);

            if ( menuHeight > contentHeight ) {
                $menu.css({'overflow-y': 'scroll'});
            }
        };

        if ( $menu.length ) {
            var $content = $('.' + contentClass);
            var $button = $('.' + buttonClass);
            var menuWidth = $menu.css('width');
            var menuPos = $menu.css('left');

            if ( state === 'hide' && menuPos === '0px' ) {
                hideMenu(menuWidth, $menu);
                addScroll($menu, $content);
            }

            $content.on('click', function(e) {
                hideMenu(menuWidth, $menu);
                e.stopPropagation();
            });

            $button.on('click', function(e) {
                toggleMenu(menuWidth, $menu, $content);
                e.preventDefault();
                e.stopPropagation();
            });
        }

        return self;
    };
})(jQuery);