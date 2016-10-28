const $ = require('jquery');

const elrAccordion = function(params) {
    const self = {};
    const spec = params || {};
    const containerClass = spec.containerClass || 'elr-accordion';
    const labelClass = spec.labelClass || 'elr-accordion-label';
    const contentHolderClass = spec.contentHolderClass || 'elr-accordion-inner';
    const showButtons = (typeof spec.showButtons === 'undefined') ? true : spec.showButtons;
    const speed = spec.speed || 300;
    const expandIconClass = spec.expandIconClass  || 'fa-plus';
    const collapseIconClass = spec.collapseIconClass  || 'fa-minus';
    const iconClass = spec.iconClass || 'elr-accordion-icon';
    const $container = $(`.${containerClass}`);

    const showDefaultContent = function($expandedContent, $content) {
        $content.hide();
        $expandedContent.show();
    };

    const toggle = function(speed, $openContent) {
        const $that = $(this);
        const $nextContent = $that.next();

        $openContent.slideUp(speed);

        if ( $($nextContent).is(':hidden') ) {
            $nextContent.slideDown(speed);
        } else {
            $nextContent.slideUp(speed);
        }
    };

    const replaceIcons = function($openContent, iconClass, expandIconClass, collapseIconClass) {
        const $that = $(this);
        const $icon = $that.find(`.${iconClass}`);
        const $openContentIcons = $openContent.prev().find(`.${iconClass}`);

        if ( $icon.hasClass(expandIconClass) ) {
            $icon.removeClass(expandIconClass).addClass(collapseIconClass);
        } else {
            $icon.removeClass(collapseIconClass).addClass(expandIconClass);
        }

        $openContentIcons.removeClass(collapseIconClass).addClass(expandIconClass);
    };

    const createButton = function(button, message, className, $container) {
        return $('<button></button>', {text: message, 'class': className}).prependTo($container);
    };

    const addButtons = function($container) {
        return {
            'showButton': createButton('showButton', 'Show All', 'elr-show-all elr-button elr-button-primary', $container),
            'hideButton': createButton('hideButton', 'Hide All', 'elr-hide-all elr-button elr-button-primary', $container),
        };
    };

    const showAll = function(speed, $content) {
        $content.slideDown(speed);
    };

    const hideAll = function(speed, $content) {
        $content.slideUp(speed);
    };

    if ( $container.length ) {
        const $label = $container.find(`.${labelClass}`);
        const $content = $container.find(`.${contentHolderClass}`);
        const $icons = $label.find(`.${iconClass}`);
        const $expandedContent = $container.find(`.${contentHolderClass}[data-state=expanded]`);

        if ( showButtons ) {
            const $buttons = addButtons($container);

            $buttons.showButton.on('click', function() {
                showAll(speed, $content);
                $icons.removeClass(expandIconClass).addClass(collapseIconClass);
            });

            $buttons.hideButton.on('click', function() {
                hideAll(speed, $content);
                $icons.removeClass(collapseIconClass).addClass(expandIconClass);
            });
        }

        showDefaultContent($expandedContent, $content);

        $label.on('click', function(e) {
            const $openContent = $($content).not(':hidden');

            replaceIcons.call(this, $openContent, iconClass, expandIconClass, collapseIconClass);
            toggle.call(this, speed, $openContent);
            e.stopPropagation();
        });
    }

    return self;
};

export default elrAccordion;