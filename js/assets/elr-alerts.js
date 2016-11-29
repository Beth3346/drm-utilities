import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

const elrAlerts = function({
    speed = 300,
    alertClass = 'js-dismissible-alert'
} = {}) {
    const self = {
        showAlert(type, message, $holder) {
            const className = `elr-alert elr-${type}-alert ${alertClass}`;
            const $newAlert = elr.createElement('div', {
                text: message,
                'class': className
            });

            const $close = $('<button></button>', {
                text: 'x',
                'class': 'close'
            });

            $newAlert.prependTo($holder);
            $close.prependTo($newAlert);
        }
    };

    $('body').on('click', `.${alertClass} button.close`, function(e) {
        e.preventDefault();
        elr.clearElement($(this).parent(), speed);
    });

    return self;
};

export default elrAlerts;