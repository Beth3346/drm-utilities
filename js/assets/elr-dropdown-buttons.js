const $ = require('jquery');

const elrDropdownButton = function(params) {
    const self = {};
    const spec = params || {};
    const containerClass = spec.containerClass || 'elr-dropdown-solid-btn-holder';
    const speed = spec.speed || 300;
    const button = spec.button || 'button';
    const activeClass = spec.activeClass || 'clicked';
    const $container = $(`.${containerClass}`);

    if ( $container.length ) {
        $container.on('click', button, function(e) {
            const $that = $(this);
            const $menu = $that.next('ul');
            const $openButtons = $container.find('ul').not(':hidden').prev('button');

            $menu.slideDown(speed);
            $that.addClass(activeClass);

            if ( $openButtons.length ) {
                $openButtons.removeClass(activeClass);
                $openButtons.next('ul').slideUp(speed);
            }

            e.preventDefault();
            e.stopPropagation();
        });

        $('body').on('click', function(e) {
            const $openButtons = $container.find('ul').not(':hidden').prev('button');

            if ( $openButtons.length ) {
                $openButtons.removeClass(activeClass);
                $openButtons.next('ul').slideUp(speed);
            }

            e.stopPropagation();
        });
    }

    return self;
};

export default elrDropdownButton;