const $ = require('jquery');

const elrDropdownMenu = function({
    menuClass = 'elr-dropdown-nav',
    speed = 500
} = {}) {
    // const self = {};
    const $menu = $(`.${menuClass}`);

    const showMenu = function() {
        $(this).children('ul').stop().fadeIn(300);
    };

    const hideMenu = function(speed) {
        $(this).children('ul').stop().fadeOut(speed);
    };

    if ( $menu.length ) {
        const $listItem = $menu.find('li:has(ul)');

        $listItem.on('mouseenter', showMenu);

        $listItem.on('mouseleave', function() {
            hideMenu.call(this, speed);
        });

        $listItem.children('a').on('click', function(e) {
            e.preventDefault();
        });
    }

    // return self;
};

export default elrDropdownMenu;