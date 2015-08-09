// Adds a button for user to scroll to top immediately

(function($) {
    'use strict';
    
    window.elrBackToTop = function(params) {
        var self = {};
        var spec = params || {};
        var scrollSpeed = spec.scrollSpeed || 900;
        var $content = spec.content || $('body, html');

        if ( $content.length ) {
            var $backToTop = elr.createElement('button', {
                'class': 'back-to-top fa fa-caret-up'
            }).appendTo('body').hide();
            
            $(window).on('scroll', function() {
                elr.scrollToView($backToTop);
            });
            
            $backToTop.on('click', function() {
                elr.toTop($content, scrollSpeed);
            });
        }

        return self;
    };
})(jQuery);