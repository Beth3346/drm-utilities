import elrUtils from './elr-utilities';

const $ = require('jquery');
let elr = elrUtils();

const elrAccordion = function(params) {
    const self = {};
    const spec = params || {};
    const containerClass = spec.containerClass || 'elr-accordion';
    const labelClass = spec.labelClass || 'elr-accordion-label';
    const contentHolderClass = spec.contentHolderClass || 'elr-accordion-content';
    const showButtons = (typeof spec.showButtons === 'undefined') ? true : spec.showButtons;
    const $container = $(`.${containerClass}`);

    const toggle = function($openContent, $openLabel) {
        // toggle active classes on accordion label and content
        const $that = $(this);
        const $nextContent = $that.next();

        if (!$nextContent.hasClass('active')) {
            $that.addClass('active');
            $nextContent.addClass('active');
        }

        $openLabel.removeClass('active');
        $openContent.removeClass('active');
    };

    const createButton = function(button, message, className, $container) {
        return elr.createElement('button', {
            text: message,
            'class': className
        }).prependTo($container);
    };

    const addButtons = function($container) {
        return {
            'showButton': createButton('showButton', 'Show All', 'elr-show-all elr-button elr-button-primary', $container),
            'hideButton': createButton('hideButton', 'Hide All', 'elr-hide-all elr-button elr-button-primary', $container),
        };
    };

    const showAll = function($content, $label) {
        $content.addClass('active');
        $label.addClass('active');
    };

    const hideAll = function($content, $label) {
        $content.removeClass('active');
        $label.removeClass('active');
    };

    if ( $container.length ) {
        const $label = $container.find(`.${labelClass}`);
        const $content = $container.find(`.${contentHolderClass}`);

        if (showButtons) {
            const $buttons = addButtons($container);

            $buttons.showButton.on('click', function() {
                showAll($content, $label);
            });

            $buttons.hideButton.on('click', function() {
                hideAll($content, $label);
            });
        }

        // showDefaultContent($expandedContent, $content);

        $label.on('click', function(e) {
            e.stopPropagation();
            const $openContent = $content.filter('.active');
            const $openLabel = $label.filter('.active');

            toggle.call(this, $openContent, $openLabel);
        });
    }

    return self;
};

export default elrAccordion;