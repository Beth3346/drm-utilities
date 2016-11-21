import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

const elrLightbox = function(params) {
    const self = {};
    const spec = params || {};
    const $images = spec.images || $('ul.elr-lightbox-thumbnails');
    const speed = spec.speed || 300;

    const createThumbnails = function(list) {
        const $links = list.find('a');
        let thumbnailList = [];
        let thumbnails = '';

        $links.each(function() {
            thumbnailList.push($(this).attr('href'));
        });

        $.each(thumbnailList, function(k, v) {
            thumbnails += `<li><a href=${v}><img src=${v}></a></li>`;
        });

        return thumbnails;
    };

    const createLightbox = function(thumbnails, speed) {
        const img = $(this).attr('href');

        const $imgVisible = elr.createElement('img', {
            class: 'img-visible',
            src: img,
            alt: 'thumbnail'
        });

        const $close = elr.createElement('button', {
            class: 'close',
            text: 'x'
        });

        const $thumbnails = elr.createElement('ul', {
            class: 'thumbnail-list',
            html: thumbnails
        });

        const $nav = elr.createElement('div', {
            class: 'lightbox-nav',
            html: '<button class="prev" data-dir="prev"><i class="fa fa-caret-left"></i></button><button class="next" data-dir="next"><i class="fa fa-caret-right"></i></button>'
        });

        const $lightbox = elr.createElement('div', {
            class: 'elr-blackout'
        });

        $lightbox.hide().appendTo('body').fadeIn(speed, function() {
            $close.appendTo($lightbox);
            $imgVisible.appendTo($lightbox);
            $nav.appendTo($lightbox);
            $thumbnails.appendTo($lightbox);
        });
    };

    const advanceImage = function(direction) {
        const $list = $('.thumbnail-list');
        const $currentImg = $('div.elr-blackout img.img-visible');
        const currentImgSrc = $currentImg.attr('src');
        const $currentThumb = $list.find(`img[src$="${currentImgSrc}"]`).closest('li').index();
        const len = $list.find('li').length - 1;
        // let $nextImg;
        let nextImgIndex;

        if (direction === 'prev') {
            nextImgIndex = ($currentThumb === 0) ? len : $currentThumb - 1;
        } else {
            nextImgIndex = ($currentThumb === len) ? 0 : $currentThumb + 1;
        }

        const $nextImg = $list.find('li').eq(nextImgIndex).find('img').attr('src');
        $currentImg.fadeOut(speed, function() {
            $(this).attr('src', $nextImg).fadeIn(speed);
        });
    };

    const changeImage = function() {
        const img = $(this).attr('href');
        const $oldImg = $('div.elr-blackout img.img-visible');
        const oldImgSrc = $oldImg.attr('src');

        if (oldImgSrc !== img) {
            $oldImg.fadeOut(speed, function() {
                $(this).attr('src', img).fadeIn(speed);
            });
        }
    };

    const removeLightbox = function() {
        $('div.elr-blackout').fadeOut(speed, function() {
            $(this).remove();
        });
    };

    if ($images.length) {
        const thumbnails = createThumbnails($images);
        const $body = $('body');

        $images.on('click', 'a', function(e) {
            e.preventDefault();
            createLightbox.call(this, thumbnails, speed);
        });

        $body.on('click', 'div.elr-blackout button.close', removeLightbox);
        $body.on('click', 'div.elr-blackout', function(e) {
            e.stopPropagation();
            removeLightbox();
        });

        $body.on('click', 'div.elr-blackout ul.thumbnail-list a', function(e) {
            e.preventDefault();
            e.stopPropagation();
            changeImage.call(this);
        });

        elr.killEvent($body, 'click', 'div.elr-blackout .img-visible');
        elr.killEvent($body, 'click', 'div.elr-blackout .lightbox-nav button');

        $body.on('click', 'div.elr-blackout .lightbox-nav button', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const direction = $(this).data('dir');

            advanceImage(direction);
        });

        $body.on('keydown', function(e) {
            if (e.which === 37) {
                advanceImage('prev');
            } else if (e.which === 39) {
                advanceImage('next');
            }
        });

        $body.on('keydown', function(e) {
            if (e.which === 27) {
                removeLightbox();
            }
        });
    }

    return self;
};

export default elrLightbox;