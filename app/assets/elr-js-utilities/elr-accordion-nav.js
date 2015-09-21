(function($) {
    'use strict';
    
    // TODO: add feature that leaves accordion open to show current page link so that visitors
    // don't need to keep opeing the content to click to a page in the same ul
    window.elrAccordionNav = function(params) {
        var self = {};
        var spec = params || {};
        var speed = spec.speed || 300;
        var containerClass = spec.containerClass || 'elr-accordion-nav';
        var expandIconClass = spec.expandIconClass  || 'fa-plus';
        var collapseIconClass = spec.collapseIconClass  || 'fa-minus';
        var iconClass = spec.iconClass || 'elr-accordion-icon';
        var contentHolderClass = contentHolderClass || 'elr-accordion-nav-inner';
        var $container = $('.' + containerClass);

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

        var getCurrent = function() {
            var location = window.location.pathname;
            var hash = window.location.hash;
            var currentPage;
            var $target;
            var $currentList;
            var startIndex;

            if ( hash ) {
                startIndex = location.lastIndexOf('/') + 1;
                currentPage = location.slice(startIndex) + hash;
            } else if ( location.slice(0,1) === '/' ) {
                startIndex = location.lastIndexOf('/') + 1;
                currentPage = location.slice(startIndex);
            } else {
                currentPage = location;
            }

            $target = $container.find('a[href="' + currentPage + '"]').addClass('active');

            if ( $target.length ) {
                $currentList = $target.closest('ul').parent('li');

                return $currentList;
            } else {
                return false;
            }
        };

        var showCurrent = function($currentList) {
            $currentList.find('ul').show();
            $currentList.find('.' + iconClass).removeClass(expandIconClass).addClass(collapseIconClass);
        };

        if ( $container.length ) {
            var $label = $container.children('ul').children('li').children('a');
            var $content = $label.next('ul');
            var $expandedContent = $container.find('.' + contentHolderClass +'[data-state=expanded]');
            var $currentList = getCurrent();
            var $icons = $label.find('.' + iconClass);

            if ( !$currentList ) {
                showDefaultContent($expandedContent, $content);
            } else {
                $content.hide();
                $icons.removeClass(collapseIconClass).addClass(expandIconClass);
                showCurrent($currentList);
            }

            $(window).on('hashchange', function(e){
                e.preventDefault();

                $container.find('a.active').removeClass('active');
                $currentList = getCurrent();
                $content.hide();
                $icons.removeClass(collapseIconClass).addClass(expandIconClass);
                showCurrent($currentList);
            });

            $label.on('click', function(e) {
                var $openContent = $($content).not(':hidden');
                e.stopPropagation();
                e.preventDefault();
                
                toggle.call(this, speed, $openContent);
                replaceIcons.call(this, $openContent, iconClass, expandIconClass, collapseIconClass);
            });
        }

        return self;
    };
})(jQuery);