(function($) {
    window.drmAccordion = function(args) {
        var self = {},
            spec = args || {};

        self.speed = spec.speed || 300;
        self.containerClass = spec.containerClass || 'drm-accordion';
        self.showButtons = (typeof spec.showButtons === 'undefined') ? true : spec.showButtons;
        self.expandIconClass = spec.expandIconClass  || 'fa-plus';
        self.collapseIconClass = spec.collapseIconClass  || 'fa-minus';

        self.showDefaultContent = function() {
            var expandedContent = $(self.container).find(self.contentHolder +'[data-state=expanded]');

            self.content.hide();
            expandedContent.show();
        };

        self.toggle = function(speed, content) {
            var that = $(this),
                nextContent = that.next(),
                icon = that.find(self.icon),
                openContent = $(content).not(':hidden');
                openContentIcons = openContent.prev().find(self.icon);

                openContent.slideUp(speed);
                
                if (icon.hasClass(self.expandIconClass)) {
                    icon.removeClass(self.expandIconClass).addClass(self.collapseIconClass);
                    nextContent.slideDown(speed);
                } else {
                    icon.removeClass(self.collapseIconClass).addClass(self.expandIconClass);
                    nextContent.slideUp(speed);
                }

                openContentIcons.removeClass(self.collapseIconClass).addClass(self.expandIconClass);
        };

        self.createButton = function(button, message, className) {
            return $('<button></button>', {text: message, 'class': className}).prependTo(self.container);
        };
        
        self.addButtons = function() {
            return {
                'showButton': self.createButton('showButton', 'Show All', 'drm-show-all drm-button-inline'),
                'hideButton': self.createButton('hideButton', 'Hide All', 'drm-hide-all drm-button-inline'),
            };
        };

        self.showAll = function() {
            var icons = self.label.find(self.icon);

            icons.removeClass(self.expandIconClass).addClass(self.collapseIconClass);
            self.content.slideDown(self.speed);
        };

        self.hideAll = function() {
            var icons = self.label.find(self.icon);

            icons.removeClass(self.collapseIconClass).addClass(self.expandIconClass);
            self.content.slideUp(self.speed);
        };

        self.container = $('.' + self.containerClass);

        if ( self.container.length >= 1 ) {
            self.icon = '.drm-accordion-icon';
            self.label = $(self.container).find('.drm-accordion-label');
            self.contentHolder = '.drm-accordion-inner';
            self.content = $(self.container).find(self.contentHolder);

            if (self.showButtons === true) {
                self.buttons = self.addButtons();
                $(self.buttons.showButton).on('click', self.showAll);
                $(self.buttons.hideButton).on('click', self.hideAll);
            }

            self.showDefaultContent();

            self.label.on('click', function(e) {
                self.toggle.call(this, self.speed, self.contentHolder);
                e.stopPropagation();
            });
        }

        return self;
    };
})(jQuery);