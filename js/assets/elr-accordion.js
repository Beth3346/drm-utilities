import elrUtils from './elr-utilities';

const $ = require('jquery');
let elr = elrUtils();

const elrAccordion = function({
    containerClass = 'elr-accordion',
    labelClass = 'elr-accordion-label',
    contentHolderClass = 'elr-accordion-content',
    showButtons = true
} = {}) {
    const self = {
        $container: $(`.${containerClass}`),
        toggle($content, $label) {
            // toggle active classes on accordion label and content
            // collapse any open content so only one panel is open at a time
            const $that = $(this);
            const $openContent = $content.filter('.active');
            const $openLabel = $label.filter('.active');
            const $nextContent = $that.next();

            if (!$nextContent.hasClass('active')) {
                $that.addClass('active');
                $nextContent.addClass('active');
            }

            $openLabel.removeClass('active');
            $openContent.removeClass('active');
        },
        showAll($content, $label) {
            $content.addClass('active');
            $label.addClass('active');
        },
        hideAll($content, $label) {
            $content.removeClass('active');
            $label.removeClass('active');
        }
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

    if ( self.$container.length ) {
        const $label = self.$container.find(`.${labelClass}`);
        const $content = self.$container.find(`.${contentHolderClass}`);

        if (showButtons) {
            const $buttons = addButtons(self.$container);

            $buttons.showButton.on('click', function() {
                self.showAll($content, $label);
            });

            $buttons.hideButton.on('click', function() {
                self.hideAll($content, $label);
            });
        }

        // showDefaultContent($expandedContent, $content);

        $label.on('click', function(e) {
            e.preventDefault();

            self.toggle.call(this, $content, $label);
        });
    }

    return self;
};

export default elrAccordion;