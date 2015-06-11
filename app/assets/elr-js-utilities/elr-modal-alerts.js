(function($) {
    'use strict';
    
    window.elrModalAlerts = function(params) {
        var self = {},
            spec = params || {};

        self.alertClass = spec.alertClass || 'elr-modal-alert';
        self.speed = spec.speed || 300;
        self.alerts = $('.' + self.alertClass);

        self.showAlert = function(type, message, holder) {
            var className = 'elr-' + type + '-modal-alert ' + self.alertClass,
                newAlert = $('<div></div>', {
                    text: message,
                    'class': className
                }),

                close = $('<button></button>', {
                    text: 'x',
                    'class': 'close'
                });

            newAlert.prependTo(holder);
            close.prependTo(newAlert);
        };

        self.clearAlert = function(speed) {
            $(this).parent().fadeOut(speed, function() {
                $(this).remove();
            });
        };

        $('body').on('click', '.' + self.alertClass + ' button.close', function(e) {
            e.preventDefault();
            self.clearAlert.call(this, self.speed);
        });

        return self;
    };
})(jQuery);