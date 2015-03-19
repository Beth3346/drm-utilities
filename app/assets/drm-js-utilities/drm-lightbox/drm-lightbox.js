(function($) {
    window.drmLightbox = function(spec) {
        var self = {};

        self.images = spec.images || $('ul.drm-lightbox-thumbnails');
        self.speed = spec.speed || 300;

        self.createThumbnails = function(list) {
            var links = list.find('a'),
                thumbnailList = [],
                thumbnails = '';

            links.each(function() {
                thumbnailList.push($(this).attr('href'));
            });

            $.each(thumbnailList, function(k, v) {
                thumbnails += '<li><a href=' + v + '><img src=' + v + ' /></a></li>';
            });

            return thumbnails;
        };

        self.createLightbox = function(thumbnails) {
            var img = $(this).attr('href'),
                imgVisible = $('<img></img>', {
                    'class': 'img-visible',
                    src: img,
                    alt: 'thumbnail'
                }),
                close = $('<button></button>', {
                    'class': 'close',
                    text: 'x'
                }),
                thumbnailHtml = $('<ul></ul>', {
                    'class': 'thumbnail-list',
                    html: thumbnails
                }),
                lightboxHtml = $('<div></div>', {
                    'class': 'drm-blackout'
                });

            lightboxHtml.hide().appendTo('body').fadeIn(300, function() {
                close.appendTo(lightboxHtml);
                imgVisible.appendTo(lightboxHtml);
                thumbnailHtml.appendTo(lightboxHtml);
            });
        };

        self.changeImage = function() {
            var img = $(this).attr('href'),
                oldImg = $('div.drm-blackout img.img-visible'),
                oldImgSrc = oldImg.attr('src');

            if (oldImgSrc !== img) {
                oldImg.fadeOut(self.speed, function() {
                    $(this).attr('src', img).fadeIn(self.speed);
                });
            }
        };

        self.removeLightbox = function() {
            $('div.drm-blackout').fadeOut(self.speed, function() {
                $(this).remove();
            });
        };

        if ( self.images.length > 0 ) {
            var thumbnails = self.createThumbnails(self.images);
                body = $('body');

            body.on('click', 'div.drm-backout img.img-visible', function(e) {
                e.stopPropagation();
            });

            self.images.on('click', 'a', function(e) {
                e.preventDefault();
                self.createLightbox.call(this, thumbnails);
            })

            body.on('click', 'div.drm-blackout button.close', self.removeLightbox);
            body.on('click', 'div.drm-blackout', self.removeLightbox);
            body.on('click', 'div.drm-blackout ul.thumbnail-list a', function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.changeImage.call(this);
            });
        }

        return self;
    };
})(jQuery);