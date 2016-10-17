const $ = require('jquery');

const elrModalAlerts = function(params) {
    const self = {};
    const spec = params || {};

    self.alertClass = spec.alertClass || 'elr-modal-alert';
    self.speed = spec.speed || 300;

    const $alerts = $(`.${self.alertClass}`);

    self.showAlert = function(type, message, holder) {
        const className = `elr-${type}-modal-alert${self.alertClass}`;

        const $newAlert = $('<div></div>', {
            text: message,
            'class': className
        });

        const $close = $('<button></button>', {
            text: 'x',
            'class': 'close'
        });

        $newAlert.prependTo(holder);
        $close.prependTo(newAlert);
    };

    self.clearAlert = (speed) => {
        $(this).parent().fadeOut(speed, function() {
            $(this).remove();
        });
    };

    $('body').on('click', `.${self.alertClass} ${button.close}`, function(e) {
        e.preventDefault();
        self.clearAlert(self.speed);
    });

    return self;
};

export default elrModalAlerts;