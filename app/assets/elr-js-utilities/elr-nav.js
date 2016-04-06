(function($) {
    'use strict';

    window.elrNav = function(params) {
        var self = {};
        var spec = params || {};

        self.speed = speed || 300;
        self.easing = easing || 'swing';

        var hideMenu = function($menu) {
            var style = {
                'display': 'none'
            };

            $menu.animate({
                'opacity': 0,
                'left': '-200px'
            }, speed, easing, function() {
                $(this).css(style);
            });
        };

        var showMenu = function($menu) {
            $menu.css({
                'display': 'block'
            });
            $menu.animate({
                'opacity': 1,
                'left': 0
            }, speed, easing);
        };

        var hideTempMenu = function($menu) {
            $menu.animate({
                'opacity': 0,
                'left': '200px'
            }, speed, easing, function() {
                $(this).remove();
            });
        };

        var createTempMenu = function($menu, $temp, prevText) {
            var $subMenu = $temp.clone().addClass('child-menu');
            var $prevMenu = $('<li></li>', {
                'class': 'previous-menu',
                'text': prevText
            });

            $menu.after($subMenu);
            $subMenu.prepend($prevMenu);

            return $subMenu;
        };

        var $parentLinks = $('.js-main-nav').find('li.menu-item-has-children > a');
        var $mainNav = $('.main-nav');
        var $mainMenu = $mainNav.find('ul.main-menu');

        $parentLinks.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $that = $(this);
            var $menu = $that.parent('li').parent('ul.main-menu');
            var $sub = $that.parent('li').children('.sub-menu');

            var $subMenu = createTempMenu($menu, $sub, 'Previous');
            hideMenu($menu);
            showMenu($subMenu);
        });

        $('.main-nav').on('click', '.previous-menu', function(e) {
            e.stopPropagation();
            var $that = $(this);
            var $childMenu = $that.parent('ul.child-menu');

            hideTempMenu($childMenu);
            showMenu($mainMenu);
        });

        $('.js-main-menu-toggle').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var childMenu = $('ul.child-menu').length;

            if($mainMenu.is(':visible')) {
                $mainMenu.slideUp(speed);
            } else if (childMenu === 0) {
                $mainMenu.animate({
                    'left': 0,
                    'opacity': 1,
                }, 0, 'swing', function() {
                    $(this).slideDown(speed);
                });
            }

            if ($('.js-main-nav').find('.child-menu').is(':visible')) {
                $('.js-main-nav').find('.child-menu').slideUp(speed, function() {
                    $(this).remove();
                });
            }
        });

        $('document, body').on('click', function(e) {
            e.stopPropagation();

            $mainMenu.slideUp(speed);

            $('.js-main-nav').find('.child-menu').slideUp(speed, function() {
                $(this).remove();
            });
        });

        $('document, body').on('click', function(e) {
            e.stopPropagation();
        });

        return self;
    };
})(jQuery);