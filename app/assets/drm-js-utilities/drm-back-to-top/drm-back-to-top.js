// Adds a button for user to scroll to top immediately

(function($) {
    window.drmBackToTop = function(params) {
        var self = {};
        var spec = params || {};
        var content = spec.content || $('body');
        var speed = spec.speed || 300;
        var scrollSpeed = spec.scrollSpeed || 900;

        self.addButton = function() {
            var button = drm.createElement('button', 'back-to-top', null, '&#9652;');
            
            return button.appendTo('body').hide();
        };

        self.showButton = function() {
            scroll = $('body').scrollTop();
            height = $(window).height();

            if (scroll > height) {
                self.backToTop.fadeIn(speed);
            } else if (scroll < height) {
                self.backToTop.fadeOut(speed);
            }
        };

        if ( content.length ) {
            self.backToTop = self.addButton();
            $(window).on('scroll', self.showButton);
            self.backToTop.on('click', function() {
                drm.toTop(content, scrollSpeed);
            });
        }

        return self;
    };
})(jQuery);