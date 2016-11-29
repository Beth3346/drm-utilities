const $ = require('jquery');

const elrOffscreenMenu = function({
    menuClass = 'elr-offscreen-menu',
    buttonClass = 'elr-menu-button',
    contentClass = 'elr-offscreen-content',
    state = 'hide'
} = {}) {
    const $menu = $(`.${menuClass}`);
    const self = {
        toggleMenu(menuWidth, $menu, $holder) {
            const menuPos = $menu.css('left');

            if (menuPos === '0px') {
                this.hideMenu(menuWidth, $menu);
            } else {
                this.showMenu($menu, $holder);
            }
        },
        showMenu($menu, $holder) {
            $menu.animate({'left': '0'});
        },
        hideMenu(menuWidth, $menu) {
            $menu.animate({
                'left': `-${menuWidth}`
            });
        }
    };

    if ($menu.length) {
        const $content = $(`.${contentClass}`);
        const $button = $(`.${buttonClass}`);
        const menuWidth = $menu.css('width');
        const menuPos = $menu.css('left');

        if (state === 'hide' && menuPos === '0px') {
            self.hideMenu(menuWidth, $menu);
        }

        $content.on('click', function(e) {
            self.hideMenu(menuWidth, $menu);
            e.stopPropagation();
        });

        $button.on('click', function(e) {
            e.stopPropagation();

            $(this).find('div').toggleClass('active');
            self.toggleMenu(menuWidth, $menu, $content);
        });
    }

    return self;
};

export default elrOffscreenMenu;