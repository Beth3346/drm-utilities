(function($) {
    window.drmModal = function(params) {
        var self = {},
            spec = params || {};
        
        self.modalClass = spec.modalClass || 'drm-modal';
        self.lightboxClass = spec.lightboxClass || 'drm-blackout';
        self.closeClass = spec.closeClass || 'drm-modal-close';

        var buttonClass = spec.buttonClass || 'drm-modal-open',
            speed = spec.speed || 300,
            modals = $('.' + self.modalClass);

        self.createLightbox = function(speed, modal) {
            var close = $('<button></button>', {
                    'class': 'close',
                    text: 'x'
                }),
                lightboxHtml = $('<div></div>', {
                    'class': self.lightboxClass
                });

            lightboxHtml.hide().appendTo('body').fadeIn(speed, function() {
                console.log('showing lightbox');
                close.appendTo(lightboxHtml);
                modal.appendTo(lightboxHtml).show();
            });
        };

        self.showModal = function(speed) {
            var modalId = $(this).data('modal'),
                modal = $('#' + modalId);

            self.createLightbox(speed, modal);
        };

        self.hideModal = function(speed) {
            var lightbox = $('.' + self.lightboxClass),
                modal = lightbox.find('.' + self.modalClass);

            lightbox.fadeOut(speed, function() {
                modal.hide().appendTo('body');
                $(this).remove();
            });
        }; 

        if (modals.length > 0) {
            var body = $('body');
            
            modals.hide().appendTo('body');

            body.on('click', '.' + buttonClass, function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.showModal.call(this, speed);
            });

            $('.' + self.closeClass).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.hideModal();
            });

            body.on('click', '.' + self.lightboxClass + ' .close', function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.hideModal();
            });

            body.on('click', function() {
                self.hideModal();
            });

            modals.on('click', function(e) {
                e.stopPropagation();
            });
        }

        return self;
    };
})(jQuery);