(function($) {
    window.drmAccordion = function(params) {
        var self = {};
        var spec = params || {};
        var containerClass = spec.containerClass || 'drm-accordion';
        var labelClass = spec.labelClass || 'drm-accordion-label';
        var contentHolderClass = spec.contentHolderClass || 'drm-accordion-inner';
        var showButtons = (typeof spec.showButtons === 'undefined') ? true : spec.showButtons;
        var speed = spec.speed || 300;
        var expandIconClass = spec.expandIconClass  || 'fa-plus';
        var collapseIconClass = spec.collapseIconClass  || 'fa-minus';
        var iconClass = spec.iconClass || 'drm-accordion-icon';
        var $container = $('.' + containerClass);

        var showDefaultContent = function($expandedContent, $content) {
            $content.hide();
            $expandedContent.show();
        };

        var toggle = function(speed, $openContent) {
            var $that = $(this);
            var $nextContent = $that.next();

            $openContent.slideUp(speed);
            
            if ( $($nextContent).is(':hidden') ) {
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

        var createButton = function(button, message, className, $container) {
            return $('<button></button>', {text: message, 'class': className}).prependTo($container);
        };
        
        var addButtons = function($container) {
            return {
                'showButton': createButton('showButton', 'Show All', 'drm-show-all drm-button-inline', $container),
                'hideButton': createButton('hideButton', 'Hide All', 'drm-hide-all drm-button-inline', $container),
            };
        };

        var showAll = function(speed, $content) {
            $content.slideDown(speed);
        };

        var hideAll = function(speed, $content) {
            $content.slideUp(speed);
        };

        if ( $container.length ) {
            var $label = $container.find('.' + labelClass);
            var $content = $container.find('.' + contentHolderClass);
            var $icons = $label.find('.' + iconClass);
            var $expandedContent = $container.find('.' + contentHolderClass + '[data-state=expanded]');

            if ( showButtons ) {
                var $buttons = addButtons($container);

                $buttons.showButton.on('click', function() {
                    showAll(speed, $content);
                    $icons.removeClass(expandIconClass).addClass(collapseIconClass);
                });

                $buttons.hideButton.on('click', function() {
                    hideAll(speed, $content);
                    $icons.removeClass(collapseIconClass).addClass(expandIconClass);
                });
            }

            showDefaultContent($expandedContent, $content);

            $label.on('click', function(e) {
                var $openContent = $($content).not(':hidden');
                
                replaceIcons.call(this, $openContent, iconClass, expandIconClass, collapseIconClass);
                toggle.call(this, speed, $openContent);
                e.stopPropagation();
            });
        }

        return self;
    };
})(jQuery);