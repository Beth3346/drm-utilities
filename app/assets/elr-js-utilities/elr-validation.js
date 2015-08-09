(function($) {
    'use strict';
    
    window.elrValidation = function(params) {
        var self = {};
        var spec = params || {};
        var $body = $('body');

        var validateField = function(value, validate) {
            // var speed;

            // if (validate.message) {
            //     self.issueNotice.call(this, validate, speed);
            // } else {
            //     self.removeNotice.call(this, validate.issuer, speed);
            // }

            // self.removeValidationClass.call(this, validate.status);
            // self.applyValidationClass.call(this, validate.status);
            console.log(value);
            console.log(validate);
        };

        var trackLength = function(value) {
            var $that = $(this);
            var validate = {
                status: null,
                message: null,
                issuer: 'length-notice'
            };

            if ( value ) {
                var length = value.length;

                validate.status = length;

                if ( length === 1 ) {
                    validate.message = length + ' character';
                } else {
                    validate.message = length + ' characters';
                }
            }

            return validate;
        };

        var addNotice = function($item) {
            var $noticeHolder;

            if ( $that.css('float') !== 'none' ) {
                $noticeHolder = $that.parent('div.form-notice-holder');
            } else {
                $item.hide().insertAfter($that);
            }
        };

        var issueNotice = function(validate, speed) {
            var $that = $(this);
            var $lengthNotice = $that.nextUntil(':input', 'p.form-length-notice');
        };

        $body.on('click', ':disabled', function(e) {
            e.preventDefault();
        });

        $body.on('keyup', ':input[type=text], :input[type=url], :input[type=email], :input[type=password], :input[type=tel], textarea', function() {
            var value = elr.getValue($(this));
            var validate = trackLength.call(this, value);

            console.log(validate.status);
        });

        $body.on('keyup', ':input.elr-valid-integer', function() {
            var value = elr.getValue($(this));
            var validate = elrVal.integer(value);

            if ( validate ) {
                validateField(value, validate);
            }
        });

        return self;
    };
})(jQuery);