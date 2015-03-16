(function($) {
    window.drmModalAlerts = function(spec) {
        var self = {};

        self.alertClass = spec.alertClass || 'drm-modal-alert';
        self.speed = spec.speed || 300;
        self.alerts = $('.' + self.alertClass);

        self.showAlert = function(type, message, holder) {
            var className = 'drm-' + type + '-modal-alert ' + self.alertClass,
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