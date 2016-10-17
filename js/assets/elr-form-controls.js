const $ = require('jquery');

const elrFormControls = function(params) {
    const self = {};
    const spec = params || {};

    self.select = function() {
        const that = this;

        that.selectClass = spec.selectOptions.selectClass || 'elr-select';
        that.action = spec.selectOptions.fn || null;
        that.control = $(`.${that.selectClass}`);

        that.changeOption = () => {
            const $that = $(this);
            const option = $that.data('option');
            const text = $that.text();
            const dropdownText = $that.closest(`.${that.selectClass}`).find('.dropdown-text');

            dropdownText.html(text);
            $that.parent('ul').fadeOut();

            return option;
        };

        if ( that.control.length ) {
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
                const $that = $(this);
                const option = that.changeOption();

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

export default elrFormControls;