(function($) {
    window.drmDropdownButton = function(spec) {
        var self = {};

        self.containerClass = spec.containerClass || 'drm-dropdown-solid-btn-holder'
        self.speed = spec.speed || 300;
        self.button = spec.button || 'button';
        self.activeClass = spec.activeClass || 'clicked';

        self.container = $('.' + self.containerClass);

        if (self.container.length > 0) {
            self.container.on('click', self.button, function(e) {
                var that = $(this),
                    menu = that.next('ul'),
                    openButtons = self.container.find('ul').not(':hidden').prev('button');

                menu.slideDown(self.speed);
                that.addClass(self.activeClass);

                if (openButtons.length > 0) {
                    openButtons.removeClass(self.activeClass);
                    openButtons.next('ul').slideUp(self.speed);
                }
                
                e.preventDefault();
                e.stopPropagation();
            });

            $('body').on('click', function(e) {
                var openButtons = self.container.find('ul').not(':hidden').prev('button');

                if (openButtons.length > 0) {
                    openButtons.removeClass(self.activeClass);
                    openButtons.next('ul').slideUp(self.speed);
                }

                e.stopPropagation();
            });
        }

        return self;
    };
})(jQuery);