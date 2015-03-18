(function($) {
    window.drmDropdownMenu = function(spec) {
        var self = {};

        self.menuClass = spec.menuClass || 'drm-dropdown-nav';
        self.speed = spec.speed || 1000;
        self.menu = $('.' + self.menuClass);

        self.showMenu = function() {
            $(this).children('ul').stop().fadeIn(300);
        };

        self.hideMenu = function(speed) {
            $(this).children('ul').stop().fadeOut(speed);
        };

        if (self.menu.length > 0) {
            self.listItem = self.menu.find('li:has(ul)');

            self.listItem.on('mouseenter', self.showMenu);

            self.listItem.on('mouseleave', function() {
                self.hideMenu.call(this, self.speed);
            });

            self.listItem.children('a').on('click', function(e) {
                e.preventDefault();
            });
        }

        return self;
    };
})(jQuery);