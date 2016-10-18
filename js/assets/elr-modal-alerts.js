import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

const elrModalAlerts = function(params) {
    const self = {};
    const spec = params || {};

    self.alertClass = spec.alertClass || 'elr-modal-alert';
    self.speed = spec.speed || 300;

    const $alerts = $(`.${self.alertClass}`);

    self.showAlert = function(config = {}) {
        const type = config.type || 'info';
        const title = config.title || 'An Alert';
        const text = config.text || 'This is some info about the alert.';
        const closeOnClick = config.closeOnClick || true;

        const buttons = config.buttons || {
            infoButton: {
                type: 'info',
                text: 'Dismiss',
                class: 'elr-button elr-button-info'
            },
            // cancelButton: {
            //     type: 'cancel',
            //     text: 'Cancel',
            //     class: 'elr-button elr-button-danger',
            //     onClick: function() {
            //         console.log('cancel');
            //         self.clearAlert.call(this);
            //     }
            // }
        }

        const $body = $('body');
        const className = `${self.alertClass} elr-${type}-modal-alert`;
        let iconClass = null;

        if (type === 'success') {
            iconClass = 'fa fa-check';
        } else if (type === 'info') {
            iconClass = 'fa fa-info';
        }

        const addButtons = function(buttons, $el) {
            elr.each(buttons, function() {
                const $button = $('<button></button>', {
                    class: this.class,
                    text: this.text
                }).appendTo($el);

                if (this.onClick) {
                    $button.on('click', this.onClick)
                } else {
                    $button.on('click', function() {
                        self.clearAlert.call(this);
                    });
                }
            });
        };

        const $newAlert = elr.createElement('div', {
            class: className
        });

        const $alertHeader = elr.createElement('div', {
            html: `<p class="elr-modal-alert-heading"><i class="${iconClass}"></i> ${title}</p>`,
            class: 'elr-header'
        });

        const $alertBody = elr.createElement('div', {
            html: `<p>${text}</p>`,
            class: 'elr-body'
        });

        const $alertFooter = elr.createElement('div', {
            class: 'elr-footer'
        });

        const $close = elr.createElement('button', {
            text: 'x',
            class: 'close'
        });

        const $lightbox = elr.createElement('div', {
            class: 'elr-blackout'
        });

        $lightbox.hide().appendTo('body').fadeIn(self.speed, function() {
            $close.appendTo($lightbox);
            $newAlert.appendTo($lightbox);
            $alertHeader.appendTo($newAlert);
            $alertBody.appendTo($newAlert);
            $alertFooter.hide().appendTo($newAlert).fadeIn(0, function() {
                const $that = $(this);

                if (Object.keys(buttons).length === 1) {
                    $that.addClass('single-action');
                }

                addButtons(buttons, $that);
            });

            if (closeOnClick) {
                $('.elr-blackout').on('click', function() {
                    $(this).find($(`.${self.alertClass}`)).fadeOut(self.speed, function() {
                        $('.elr-blackout').fadeOut(100, function() {
                            $(this).remove();
                        });

                        $(this).remove();
                    });
                });

                $(`.${self.alertClass}`).on('click', function(e) {
                    e.stopPropagation();
                });
            }
        });
    };

    self.clearAlert = function(speed, cb = null) {
        $(this).closest(`.${self.alertClass}`).fadeOut(speed, function() {
            $('.elr-blackout').fadeOut(100, function() {
                $(this).remove();
            });

            $(this).remove();

            if (cb) {
                cb();
            }
        });
    };

    $('body').on('click', `.${self.alertClass} button.close`, function(e) {
        e.preventDefault();
        self.clearAlert(self.speed);
    });

    return self;
};

export default elrModalAlerts;