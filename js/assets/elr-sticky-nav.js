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

    const affixElement = function($el, top) {
        const $win = $(window);
        const winHeight = $win.height();
        const scroll = $(document).scrollTop();
        const position = $el.data('position');
        const elementHeight = $el.height();
        const contentHeight = $content.height();

        if (scroll > (top + contentHeight)) {
            $el.removeClass(`sticky-${position}`);
        } else if (scroll > (top - 50) && elementHeight < winHeight) {
            $el.addClass(`sticky-${position}`);
        } else {
            $el.removeClass(`sticky-${position}`);
        }
    };

    const gotoSection = function(offset) {
        const $target = $(`#${$(this).attr('href').slice(1)}`);
        const $content = $('body, html');

        $content.stop().animate({
            'scrollTop': $target.position().top - offset
        });

        return false;
    };

    if ($nav.length) {
        const $win = $(window);
        const $links = $nav.find('a[href^="#"]');
        const hash = window.location.hash;
        const navPositionTop = $nav.offset().top;
        const navPositionLeft = $nav.offset().left;

        // if (hash) {
        //     const $hashLink = $nav.find("a[href='" + hash + "']");

        //     $hashLink.addClass(activeClass);
        //     $hashLink.trigger('click');
        //     $nav.on('click', `a[href='${hash}']`, function() {
        //         gotoSection.call(this, activeClass);
        //     });
        // } else {
            // $links.first().addClass(activeClass);
        // }

        $win.on('scroll', function() {
            affixElement($nav, navPositionTop);
        });

        // $win.on('resize', function() {
        //     positionNav();
        // });

        if (spy) {
            $win.on('scroll', function() {
                elr.scrollSpy($nav, $content, sectionEl, activeClass);
            });
        }

        $nav.on('click', 'a[href^="#"]', function(e) {
            e.preventDefault();
            $links.removeClass(activeClass);
            $(this).addClass(activeClass);
            gotoSection.call(this, 70);
        });
    }

    return self;
};

export default elrStickyNav;