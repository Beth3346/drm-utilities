import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

const elrAlerts = function(params) {
    const self = {};
    const spec = params || {};
    const speed = spec.speed || 300;
    const alertClass = spec.alertClass || 'js-dismissible-alert';

    self.showAlert = function(type, message, $holder) {
        const className = `elr-alert elr-${type}-alert ${alertClass}`;
        const $newAlert = $('<div></div>', {
            text: message,
            'class': className
        });

        const $close = $('<button></button>', {
            text: 'x',
            'class': 'close'
        });

        $newAlert.prependTo($holder);
        $close.prependTo($newAlert);
    };

    $('body').on('click', `.${alertClass} button.close`, function(e) {
        e.preventDefault();
        const $alert = $(this).parent();

        elr.clearElement($alert, speed);
    });

    return self;
};

export default elrAlerts;