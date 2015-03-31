// Adds a button for user to scroll to top immediately

(function($) {
    window.drmBackToTop = function(params) {
        var self = {};
        var spec = params || {};
        var content = spec.content || $('body');
        var scrollSpeed = spec.scrollSpeed || 900;

        addButton = function() {
            var button = drm.createElement('button', 'back-to-top fa fa-caret-up');
            
            return button.appendTo('body').hide();
        };

        if ( content.length ) {
            var backToTop = addButton();
            
            $(window).on('scroll', function() {
                drm.scrollToView(backToTop);
            });
            
            backToTop.on('click', function() {
                drm.toTop(content, scrollSpeed);
            });
        }

        return self;
    };
})(jQuery);