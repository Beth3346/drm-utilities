// Adds a button for user to scroll to top immediately

(function($) {
    window.drmBackToTop = function(params) {
        var self = {};
        var spec = params || {};
        var scrollSpeed = spec.scrollSpeed || 900;
        var $content = spec.content || $('body');

        if ( $content.length ) {
            var $backToTop = drm.createElement('button', {
                'class': 'back-to-top fa fa-caret-up'
            }).appendTo('body').hide();
            
            $(window).on('scroll', function() {
                drm.scrollToView($backToTop);
            });
            
            $backToTop.on('click', function() {
                drm.toTop($content, scrollSpeed);
            });
        }

        return self;
    };
})(jQuery);