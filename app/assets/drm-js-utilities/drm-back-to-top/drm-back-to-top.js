// Adds a button for user to scroll to top immediately

(function($) {
    window.drmBackToTop = function(spec) {
        var self = {};

        self.content = spec.content || $('body');
        self.speed = spec.speed || 300;
        self.scrollSpeed = spec.scrollSpeed || 900;

        self.addButton = function() {
            return $('<button></button>', {
                'class': 'back-to-top',
                html: '&#9652;'
            }).appendTo('body').hide();
        };

        self.showButton = function() {
            scroll = $('body').scrollTop();
            height = $(window).height();

            if (scroll > height) {
                self.backToTop.fadeIn(self.speed);
            } else if (scroll < height) {
                self.backToTop.fadeOut(self.speed);
            }
        };

        self.toTop = function() {
            self.content.stop().animate({
                'scrollTop': self.content.position().top
            }, self.scrollSpeed, 'swing');
        };

        if ( self.content.length > 0 ) {
            self.backToTop = self.addButton();
            $(window).on('scroll', self.showButton);
            self.backToTop.on('click', self.toTop);
        }

        return self;
    };
})(jQuery);