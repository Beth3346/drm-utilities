const $ = require('jquery');

const elrDropdownButton = function(params = {}) {
    const self = {};
    // const containerClass = params.containerClass || 'elr-dropdown-solid-btn-holder';
    // const speed = params.speed || 300;
    const buttonClass = params.buttonClass || 'elr-dropdown-button';
    const activeClass = params.activeClass || 'clicked';
    // const $container = $(`.${containerClass}`);
    const $button = $(`.${buttonClass}`);
    const activeListClass = params.activeListClass || 'active-list';

    // const toggleMenu = function() {
    //     const $button = $(this);
    //     const $menu = $button.next('ul');

    //     console.log($button);
    //     console.log($menu);

    //     if (!$button.hasClass(activeClass)) {
    //         $button.addClass('clicked');
    //         $menu.addClass('active-list');
    //     } else {
    //         $button.removeClass(activeClass);
    //         $menu.removeClass(activeListClass);
    //     }
    // };

    if ( $button.length ) {
        $button.on('click', function(e) {
            e.preventDefault();
            // e.stopPropagation();
            const $openButtons = $(`ul.elr-dropdown-list.${activeListClass}`).prev('button');
            const $button = $(this);
            const $menu = $button.next('ul');

            console.log($button);
            console.log($menu);

            if (!$button.hasClass(activeClass)) {
                $button.addClass('clicked');
                $menu.addClass('active-list');
            } else {
                $button.removeClass(activeClass);
                $menu.removeClass(activeListClass);
            }

            // if ( $openButtons.length ) {
            //     $openButtons.removeClass(activeClass);
            //     $openButtons.next('ul').removeClass(activeListClass);
            // }
        });

        // $('body').on('click', function(e) {
        //     e.stopPropagation();
        //     const $openButtons = $container.find('ul').not(':hidden').prev('button');

        //     if ( $openButtons.length ) {
        //         $openButtons.removeClass(activeClass);
        //     }
        // });
    }

    return self;
};

export default elrDropdownButton;