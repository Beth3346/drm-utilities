(function($) {
    'use strict';
    
    window.elrModal = function(params) {
        var self = {};
        var spec = params || {};
        var modalClass = spec.modalClass || 'elr-modal';
        var lightboxClass = spec.lightboxClass || 'elr-blackout';
        var closeClass = spec.closeClass || 'elr-modal-close';
        var buttonClass = spec.buttonClass || 'elr-modal-open';
        var speed = spec.speed || 300;
        var $modals = $('.' + modalClass);

        var createLightbox = function(speed, $modal) {
            var $close = $('<button></button>', {
                    'class': 'close',
                    text: 'x'
            });
                
            var $lightbox = $('<div></div>', {
                    'class': lightboxClass
            });

            $lightbox.hide().appendTo('body').fadeIn(speed, function() {
                $close.appendTo($lightbox);
                $modal.appendTo($lightbox).show();
            });
        };

        var showModal = function(speed) {
            var modalId = $(this).data('modal');
            var $modal = $('#' + modalId);

            createLightbox(speed, $modal);
        };

        var hideModal = function(speed) {
            var $lightbox = $('.' + lightboxClass);
            var $modal = $lightbox.find('.' + modalClass);

            $lightbox.fadeOut(speed, function() {
                $modal.hide().appendTo('body');
                $(this).remove();
            });
        }; 

        if ( $modals.length ) {
            var $body = $('body');
            
            $modals.hide().appendTo('body');

            $body.on('click', '.' + buttonClass, function(e) {
                e.preventDefault();
                e.stopPropagation();
                showModal.call(this, speed);
            });

            $('.' + closeClass).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                hideModal();
            });

            $body.on('click', '.' + lightboxClass + ' .close', function(e) {
                e.preventDefault();
                e.stopPropagation();
                hideModal();
            });

            $body.on('click', function() {
                hideModal();
            });

            $modals.on('click', function(e) {
                e.stopPropagation();
            });
        }

        return self;
    };
})(jQuery);