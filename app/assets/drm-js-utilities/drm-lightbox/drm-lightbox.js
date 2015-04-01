(function($) {
    window.drmLightbox = function(params) {
        var self = {};
        var spec = params || {};
        var $images = spec.images || $('ul.drm-lightbox-thumbnails');
        var speed = spec.speed || 300;

        var createThumbnails = function(list) {
            var $links = list.find('a');
            var thumbnailList = [];
            var thumbnails = '';

            $links.each(function() {
                thumbnailList.push($(this).attr('href'));
            });

            $.each(thumbnailList, function(k, v) {
                thumbnails += '<li><a href=' + v + '><img src=' + v + ' /></a></li>';
            });

            return thumbnails;
        };

        var createLightbox = function(thumbnails, speed) {
            var img = $(this).attr('href');
            
            var $imgVisible = drm.createElement('img', {
                'class': 'img-visible',
                'src': img,
                'alt': 'thumbnail'
            });

            var $close = drm.createElement('button', {
                'class': 'close',
                text: 'x'
            });

            var $thumbnails = drm.createElement('ul', {
                'class': 'thumbnail-list',
                html: thumbnails
            });

            var $nav = drm.createElement('div', {
                'class': 'lightbox-nav',
                html: '<button class="prev" data-dir="prev"><i class="fa fa-caret-left"></i></button><button class="next" data-dir="next"><i class="fa fa-caret-right"></i></button>'
            });

            var $lightbox = drm.createElement('div', {
                'class': 'drm-blackout'
            });
            
            $lightbox.hide().appendTo('body').fadeIn(speed, function() {
                $close.appendTo($lightbox);
                $imgVisible.appendTo($lightbox);
                $nav.appendTo($lightbox);
                $thumbnails.appendTo($lightbox);
            });
        };

        var advanceImage = function(direction) {
            var $list = $('.thumbnail-list');
            var $currentImg = $('div.drm-blackout img.img-visible');
            var currentImgSrc = $currentImg.attr('src');
            var $currentThumb = $list.find('img[src$="' + currentImgSrc + '"]').closest('li').index();
            var len = $list.find('li').length - 1;
            var $nextImg;
            var nextImgIndex;

            if ( direction === 'prev' ) {
                nextImgIndex = ($currentThumb === 0) ? len : $currentThumb - 1;
            } else {
                nextImgIndex = ($currentThumb === len) ? 0 : $currentThumb + 1;
            }

            $nextImg = $list.find('li').eq(nextImgIndex).find('img').attr('src');
            $currentImg.fadeOut(speed, function() {
                $(this).attr('src', $nextImg).fadeIn(speed);
            });
        };

        var changeImage = function() {
            var img = $(this).attr('href');
            var $oldImg = $('div.drm-blackout img.img-visible');
            var oldImgSrc = $oldImg.attr('src');

            if ( oldImgSrc !== img ) {
                $oldImg.fadeOut(speed, function() {
                    $(this).attr('src', img).fadeIn(speed);
                });
            }
        };

        var removeLightbox = function() {
            $('div.drm-blackout').fadeOut(speed, function() {
                $(this).remove();
            });
        };

        if ( $images.length ) {
            var thumbnails = createThumbnails($images);
            var $body = $('body');

            $images.on('click', 'a', function(e) {
                e.preventDefault();
                createLightbox.call(this, thumbnails, speed);
            });

            $body.on('click', 'div.drm-blackout button.close', removeLightbox);
            $body.on('click', 'div.drm-blackout', function(e) {
                removeLightbox();
                e.stopPropagation();
            });

            $body.on('click', 'div.drm-blackout ul.thumbnail-list a', function(e) {
                e.preventDefault();
                e.stopPropagation();
                changeImage.call(this);
            });

            drm.killEvent($body, 'click', 'div.drm-blackout .img-visible');
            drm.killEvent($body, 'click', 'div.drm-blackout .lightbox-nav');

            $body.on('click', 'div.drm-blackout .lightbox-nav button', function(e) {
                var direction = $(this).data('dir');

                e.preventDefault();
                e.stopPropagation();
                advanceImage(direction);
            });

            $body.on('keydown', function(e) {
                if (e.which === 37) {   
                    advanceImage('prev');
                } else if (e.which === 39) {
                    advanceImage('next');
                } 
            });
        }

        return self;
    };
})(jQuery);