const $ = require('jquery');

const elrOffscreenMenu = function(params) {
    const self = {};
    const spec = params || {};
    const menuClass = spec.menuClass || 'elr-offscreen-menu';
    const buttonClass = spec.buttonClass || 'elr-menu-button';
    const contentClass = spec.contentClass || 'elr-offscreen-content';
    const state = spec.state || 'hide';
    const $menu = $(`.${menuClass}`);

    const toggleMenu = function(menuWidth, $menu, $holder) {
        const menuPos = $menu.css('left');

        if (menuPos === '0px') {
            hideMenu(menuWidth, $menu);
        } else {
            showMenu($menu, $holder);
        }
    };

    const showMenu = function($menu, $holder) {
        $menu.animate({'left': '0'});
        addScroll($menu, $holder);
    };

    const hideMenu = function(menuWidth, $menu) {
        $menu.animate({
            'left': `-${menuWidth}`
        });
    };

    const addScroll = function($menu, $holder) {
        const menuHeight = parseInt($menu.find('ul').css('height'), 10);
        const contentHeight = parseInt($holder.css('height'), 10);

        // if (menuHeight > contentHeight) {
        //     $menu.css({'overflow-y': 'scroll'});
        // }
    };

    if ($menu.length) {
        const $content = $(`.${contentClass}`);
        const $button = $(`.${buttonClass}`);
        const menuWidth = $menu.css('width');
        const menuPos = $menu.css('left');

        if (state === 'hide' && menuPos === '0px') {
            hideMenu(menuWidth, $menu);
            addScroll($menu, $content);
        }

        $content.on('click', function(e) {
            hideMenu(menuWidth, $menu);
            e.stopPropagation();
        });

        $button.on('click', function(e) {
            e.stopPropagation();

            $(this).find('div').toggleClass('active');
            toggleMenu(menuWidth, $menu, $content);
        });
    }

    return self;
};

export default elrOffscreenMenu;