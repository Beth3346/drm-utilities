(function($) {
    'use strict';

    window.elrStickyNav = function(params) {
        var self = {};
        var spec = params || {};
        var $nav = spec.nav || $('nav.elr-sticky-nav');
        var activeClass = spec.activeClass || 'active';
        var $content = spec.content || $('div.sticky-nav-content');
        var sectionEl = spec.sectionEl || 'section';
        var spy = spec.spy || false;

        var affixNav = function(top, navPositionLeft) {
            var scroll = $('body').scrollTop();
            var position = $nav.data('position');
            var winHeight = $(window).height();
            var navHeight = $nav.height();
            var navWidth = $nav.outerWidth();
            var winWidth = $(window).width();
            var contentHeight = $content.height();

            if ( scroll > ( top + contentHeight ) ) {
                $nav.removeClass('sticky-' + position);
            } else if ( ( scroll > (top - 50) ) && ( navHeight < winHeight ) ) {
                // positionRight(winWidth - (navPositionLeft + navWidth));
                $nav.addClass('sticky-' + position);
            } else {
                $nav.removeClass('sticky-' + position);
            }
        };

        var positionRight = function(navPositionLeft) {
            var position = $nav.data('position');

            if ( position !== 'top' ) {
                $nav.css({'right': navPositionLeft, 'left': 'auto'});
            } else {
                $nav.css({'left': 0});
            }
        };

        var gotoSection = function(activeClass) {
            var $that = $(this);
            var target = $that.attr('href');
            var $content = $('body');
            var $target = $(target);

            $('a.active').removeClass(activeClass);
            $that.addClass(activeClass);

            $content.stop().animate({
                'scrollTop': ($target.position().top - 50)
            });

            return false;
        };

        if ( $nav.length ) {
            var $win = $(window);
            var navPositionTop = $nav.position().top;
            var $links = $nav.find('a[href^="#"]');
            var hash = window.location.hash;
            var navPositionLeft = $nav.offset().left;

            if ( hash ) {
                var $hashLink = $nav.find("a[href='" + hash + "']");

                $hashLink.addClass(activeClass);
                $hashLink.trigger('click');
                $nav.on('click', "a[href='" + hash + "']", function() {
                    gotoSection.call(this, activeClass);
                });
            } else {
                $links.first().addClass(activeClass);
            }

            $win.on('scroll', function() {
                affixNav(navPositionTop, navPositionLeft);
            });

            if ( spy ) {
                $win.on('scroll', function() {
                    elr.scrollSpy($nav, $content, sectionEl, activeClass );
                });
            }

            $nav.on('click', 'a[href^="#"]', function() {
                gotoSection.call(this, activeClass);
            });
        }

        return self;
    };
})(jQuery);