(function($) {
    'use strict';
    // full screen pager

    window.elrNav = function(params) {
        var self = {};
        var spec = params || {};

        self.speed = speed || 300;
        self.easing = easing || 'swing';

        var $links = $('.js-main-nav').find('li.menu-item-has-children > a');
        var $mainNav = $('.main-nav');
        var $mainMenu = $mainNav.find('ul.main-menu');

        $links.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $that = $(this);
            var $menu = $that.parent('li').parent('ul.main-menu');
            var $sub = $that.parent('li').children('.sub-menu');
            var $subMenu = $sub.clone().addClass('child-menu');
            var $prevMenu = $('<li></li>', {
                'class': 'previous-menu',
                'text': 'Previous'
            });

            $menu.after($subMenu);
            $subMenu.prepend($prevMenu);

            $menu.animate({
                'opacity': 0,
                'left': '-200px'
            }, speed, easing, function() {
                $(this).css({
                    'left': 0,
                    'opacity': 1,
                    'display': 'none'
                });
            });

            $subMenu.animate({
                'opacity': 1,
                'left': 0
            }, speed, easing);
        });

        $('.main-nav').on('click', '.previous-menu', function(e) {
            e.stopPropagation();
            var $that = $(this);
            var $childMenu = $that.parent('ul.child-menu');

            $childMenu.animate({
                'opacity': 0,
                'left': '200px'
            }, speed, easing, function() {
                $(this).remove();
            });

            $mainMenu.animate({
                'opacity': 1,
                'left': 0
            }, speed, easing);
        });

        $('.js-main-menu-toggle').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var windowWidth = $(window).width();

            if (windowWidth > 786) {
                $mainMenu.slideToggle(speed);
            } else {
                $('.js-mobile-nav').slideToggle();
            }

            // close meta menu if its open

            if ($('.js-main-nav').find('.child-menu').is(':visible')) {
                $('.js-main-nav').find('.child-menu').slideUp(speed, function() {
                    $(this).remove();
                });
            }

            if ($('.js-meta-nav').is(':visible')) {
                $('.js-meta-nav').hide();
            }
        });

        $('document, body').on('click', function(e) {
            e.stopPropagation();
            var windowWidth = $(window).width();

            if (windowWidth > 786) {
                $mainMenu.slideUp(speed);
                $('.js-main-nav').find('.child-menu').slideUp(speed, function() {
                    $(this).remove();
                });
            } else {
                $('.js-mobile-nav').slideUp();
            }
        });

        $('.js-meta-menu-toggle').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            $('.js-meta-nav').slideToggle();

            // close main menu if its open

            if ($('.js-mobile-nav').is(':visible')) {
                $('.js-mobile-nav').hide();
            }
        });

        $('document, body').on('click', function(e) {
            e.stopPropagation();
            $('.js-meta-nav').slideUp();
        });

        return self;
    };
})(jQuery);