(function($) {
    window.elrAccordionNav = function(params) {
        var self = {};
        var spec = params || {};
        var speed = spec.speed || 300;
        var containerClass = spec.containerClass || 'elr-accordion-nav';
        var expandIconClass = spec.expandIconClass  || 'fa-plus';
        var collapseIconClass = spec.collapseIconClass  || 'fa-minus';
        var iconClass = spec.iconClass || 'elr-accordion-icon';
        var contentHolderClass = contentHolderClass || 'elr-accordion-nav-inner';
        var container = $('.' + containerClass);

        var showDefaultContent = function($expandedContent, $content) {
            $content.hide();
            $expandedContent.show();
        };

        var toggle = function(speed, $openContent) {
            var $that = $(this);
            var $nextContent = $that.next();

                $openContent.slideUp(speed);
                
                if ($nextContent.is(':hidden')) {
                    $nextContent.slideDown(speed);
                } else {
                    $nextContent.slideUp(speed);
                }
        };

        var replaceIcons = function($openContent, iconClass, expandIconClass, collapseIconClass) {
            var $that = $(this);
            var $icon = $that.find('.' + iconClass);
            var $openContentIcons = $openContent.prev().find('.' + iconClass);
            
            if ( $icon.hasClass(expandIconClass) ) {
                $icon.removeClass(expandIconClass).addClass(collapseIconClass);
            } else {
                $icon.removeClass(collapseIconClass).addClass(expandIconClass);
            }

            $openContentIcons.removeClass(collapseIconClass).addClass(expandIconClass);
        };

        if ( container.length ) {
            var $label = container.children('ul').children('li').children('a');
            var $content = $label.next('ul');
            var $expandedContent = container.find('.' + contentHolderClass +'[data-state=expanded]');

            showDefaultContent($expandedContent, $content);

            $label.on('click', function(e) {
                var $openContent = $($content).not(':hidden');
                
                toggle.call(this, speed, $openContent);
                replaceIcons.call(this, $openContent, iconClass, expandIconClass, collapseIconClass);
                e.stopPropagation();
                e.preventDefault();
            });
        }

        return self;
    };
})(jQuery);