const $ = require('jquery');

const elrPopovers = function(params) {
    const self = {};
    const spec = params || {};
    const holderClass = spec.holder || 'popover-holder';
    const $holder = $(`.${holderClass}`);
    const popoverClass = spec.popoverClass || 'elr-popover';

    const togglePopover = function() {
        const $that = $(this);
        const popoverId = $that.data('popover');
        const $popover = $(`#${popoverId}`);

        // fade out any visible popovers
        $(`.${popoverClass}`).not(`#${popoverId}`).not(':hidden').fadeOut();
        $popover.fadeToggle();

        const checkPosition = function() {
            // reposition popover if its too close to the edge of the browser window
            const $that = $(this);
            const positionLeft = $that.position().left;
            const offsetLeft = $that.offset().left;
            const positionTop = $that.position().top;
            const offsetTop = $that.offset().top;
            const popoverHeight = $that.height();

            if ( offsetLeft < 0 ) {
                $that.css('left', (Math.abs(offsetLeft) + 10) + positionLeft);
            } else if ( offsetTop < 0 ) {
                $that.css('bottom', (Math.abs(positionTop) - popoverHeight) - Math.abs(offsetTop));
            }
        };

        checkPosition.call($popover);
    };

    if ( $holder.length ) {
        const $buttons = $holder.find('button');

        $('body').on('click', `.${holderClass} button`, function(e) {
            e.stopPropagation();
            e.preventDefault();

            togglePopover.call(this);
        });

        $('body').on('click', function() {
            $holder.find(`.${popoverClass}`).fadeOut();
        });
    }

    return self;
};

export default elrPopovers;