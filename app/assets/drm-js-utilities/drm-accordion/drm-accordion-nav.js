(function($) {

    window.drmAccordionNav = function(params) {
        var self = {},
            spec = params || {};

        self.speed = spec.speed || 300;
        self.containerClass = spec.containerClass || 'drm-accordion-nav';
        self.expandIconClass = spec.expandIconClass  || 'fa-plus';
        self.collapseIconClass = spec.collapseIconClass  || 'fa-minus';
        self.container = $('.' + self.containerClass);

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
                
                if (nextContent.is(':hidden')) {
                    icon.removeClass(self.expandIconClass).addClass(self.collapseIconClass);
                    nextContent.slideDown(speed);
                } else {
                    icon.removeClass(self.collapseIconClass).addClass(self.expandIconClass);
                    nextContent.slideUp(speed);
                }

                openContentIcons.removeClass(self.collapseIconClass).addClass(self.expandIconClass);
        };

        if (self.container.length >= 1 ) {
            self.icon = '.drm-accordion-icon';
            self.contentHolder = '.drm-accordion-nav-inner';
            self.label = self.container.children('ul').children('li').children('a');
            self.content = self.label.next('ul');

            self.showDefaultContent();

            self.label.on('click', function(e) {
                self.toggle.call(this, self.speed, self.content);
                e.stopPropagation();
                e.preventDefault();
            });
        }

        return self;
    };
})(jQuery);