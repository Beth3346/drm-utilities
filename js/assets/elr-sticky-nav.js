import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

const elrStickyNav = function(params) {
    const self = {};
    const spec = params || {};
    const $nav = spec.nav || $('nav.elr-sticky-nav');
    const activeClass = spec.activeClass || 'active';
    const $content = spec.content || $('div.sticky-nav-content');
    const sectionEl = spec.sectionEl || 'section';
    const spy = spec.spy || false;

    const affixNav = function(top, navPositionLeft) {
        const scroll = $('body').scrollTop();
        const position = $nav.data('position');
        const winHeight = $(window).height();
        const navHeight = $nav.height();
        const navWidth = $nav.outerWidth();
        const winWidth = $(window).width();
        const contentHeight = $content.height();

        if (scroll > (top + contentHeight)) {
            $nav.removeClass(`sticky-${position}`);

            if (position === 'left' || position === 'right') {
                $nav.css({'right': ''});
            }
        } else if ((scroll > (top - 50)) && (navHeight < winHeight)) {
            if (position === 'left' || position === 'right') {
                $nav.animate({
                    'right': winWidth - (navPositionLeft + navWidth)
                }, 0, function() {
                    $nav.addClass(`sticky-${position}`);
                });
            } else {
                $nav.addClass(`sticky-${position}`);
            }
        } else {
            $nav.removeClass(`sticky-${position}`);

            if (position === 'left' || position === 'right') {
                $nav.css({'right': ''});
            }
        }
    };

    const gotoSection = function(activeClass) {
        const $that = $(this);
        const target = $that.attr('href');
        const $content = $('body');
        const $target = $(target);

        $('a.active').removeClass(activeClass);
        $that.addClass(activeClass);

        $content.stop().animate({
            'scrollTop': ($target.position().top - 50)
        });

        return false;
    };

    if ($nav.length) {
        const $win = $(window);
        const $links = $nav.find('a[href^="#"]');
        const hash = window.location.hash;
        const navPositionTop = $nav.offset().top;
        const navPositionLeft = $nav.offset().left;

        if (hash) {
            const $hashLink = $nav.find("a[href='" + hash + "']");

            $hashLink.addClass(activeClass);
            $hashLink.trigger('click');
            $nav.on('click', `a[href='${hash}']`, function() {
                gotoSection.call(this, activeClass);
            });
        } else {
            $links.first().addClass(activeClass);
        }

        $win.on('scroll', function() {
            affixNav(navPositionTop, navPositionLeft);
        });

        // $win.on('resize', function() {
        //     positionNav();
        // });

        if (spy) {
            $win.on('scroll', function() {
                elr.scrollSpy($nav, $content, sectionEl, activeClass);
            });
        }

        $nav.on('click', 'a[href^="#"]', () => {
            gotoSection(activeClass);
        });
    }

    return self;
};

export default elrStickyNav;