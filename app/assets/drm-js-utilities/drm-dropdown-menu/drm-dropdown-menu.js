(function($) {
    window.drmDropdownMenu = function(params) {
        var self = {};
        var spec = params || {};
        var menuClass = spec.menuClass || 'drm-dropdown-nav';
        var speed = spec.speed || 1000;
        var $menu = $('.' + menuClass);

        var showMenu = function() {
            $(this).children('ul').stop().fadeIn(300);
        };

        var hideMenu = function(speed) {
            $(this).children('ul').stop().fadeOut(speed);
        };

        if ( $menu.length ) {
            $listItem = $menu.find('li:has(ul)');

            $listItem.on('mouseenter', showMenu);

            $listItem.on('mouseleave', function() {
                hideMenu.call(this, speed);
            });

            $listItem.children('a').on('click', function(e) {
                e.preventDefault();
            });
        }

        return self;
    };
})(jQuery);