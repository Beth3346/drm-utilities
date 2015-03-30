(function($) {
    window.drmFormControls = function(params) {
        var self = {},
            spec = params || {};

        self.select = function() {
            var that = this;

            that.selectClass = spec.selectOptions.selectClass || 'drm-select';
            that.action = spec.selectOptions.fn || null;
            that.control = $('.' + that.selectClass);

            that.changeOption = function() {
                var _that = $(this),
                    option = _that.data('option'),
                    text = _that.text(),
                    dropdownText = _that.closest('.' + that.selectClass).find('.dropdown-text');

                dropdownText.html(text);
                _that.parent('ul').fadeOut();

                return option;
            };

            if ( that.control.length > 0 ) {
                that.dropdownText = that.control.find('.dropdown-text');
                that.button = that.control.find('.dropdown-button');
                that.list = that.control.find('ul').hide();

                that.button.on('click', function(e) {
                    that.list.fadeToggle();
                    e.preventDefault();
                    e.stopPropagation();
                });

                $('body').on('click', function(e) {
                    that.list.fadeOut();
                    e.stopPropagation();
                });

                that.list.on('click', 'li', function(e) {
                    var _that = $(this),
                        option = that.changeOption.call(_that);

                    if ( self.action !== null ) {
                        self.action(option);
                    }

                    e.preventDefault();
                    e.stopPropagation();
                });
            }
        };

        return self;
    };
})(jQuery);