const $ = require('jquery');

const elrDropdownButton = function({
    buttonClass = 'elr-dropdown-button',
    activeClass = 'clicked',
    activeListClass = 'active-list'
} = {}) {
    // const self = {};
    const $button = $(`.${buttonClass}`);

    if ( $button.length ) {
        $button.on('click', function(e) {
            e.preventDefault();

            const $openButtons = $(`ul.elr-dropdown-list.${activeListClass}`).prev('button');
            const $button = $(this);
            const $menu = $button.next('ul');

            if (!$button.hasClass(activeClass)) {
                $button.addClass(activeClass);
                $menu.addClass(activeListClass);
            } else {
                $button.removeClass(activeClass);
                $menu.removeClass(activeListClass);
            }
        });
    }

    // return self;
};

export default elrDropdownButton;