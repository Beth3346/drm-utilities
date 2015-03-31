(function($) {
    window.drmAlerts = function(params) {
        var self = {};
        var spec = params || {};
        var speed = spec.speed || 300;
        var alertClass = spec.alertClass || 'drm-dismissible-alert';

        self.showAlert = function(type, message, $holder) {
            var className = 'drm-' + type + '-alert ' + alertClass,
                $newAlert = $('<div></div>', {
                    text: message,
                    'class': className
                }),

                $close = $('<button></button>', {
                    text: 'x',
                    'class': 'close'
                });

            $newAlert.prependTo($holder);
            $close.prependTo($newAlert);
        };

        $('body').on('click', '.' + alertClass + ' button.close', function(e) {
            var $alert = $(this).parent();
            
            drm.clearElement($alert, speed);
            e.preventDefault();
        });

        return self;
    };
})(jQuery);