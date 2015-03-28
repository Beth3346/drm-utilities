(function($) {
    window.drmSimpleSlider = function(args) {
        var self = {},
            spec = args || {};

        var sliderClass = spec.sliderClass || 'drm-simple-slider',
            interval = spec.interval || 5000,
            speed = spec.speed || 500,
            animate = spec.animate || false,
            slider = $('.' + sliderClass);
        
        self.slideClass = spec.slideClass || 'drm-simple-slide',
        self.slideHolderClass = spec.slideHolderClass || 'drm-simple-slide-holder';
        self.effect = spec.effect || 'fade';
        self.navClass = spec.navClass || 'drm-simple-slider-nav';
        self.slideListClass = spec.slideListClass || 'drm-simple-slider-list';
        
        self.createSlideList = function(slides) {
            var li = '';

            $.each(slides, function(index) {
                if ( index === 0 ) {
                    li += '<li><button class="active" data-item-num="' + index + '"></button></li>';
                } else {
                    li += '<li><button data-item-num="' + index + '"></button></li>';
                }
            });

            return $('<ul></ul>', {
                'class': self.slideListClass,
                html: li
            });
        };

        self.getCurrent= function(slideHolder) {
            var slides = slideHolder.find('.' + self.slideClass);

            if ( self.effect === 'fade' ) {
                return slides.not(':hidden').index();                
            } else if ( self.effect === 'slide-left' ) {
                return (Math.abs(slideHolder.position().left) / parseInt(slides.first().width(), 10));
            }
        };

        self.goToSlide = function(current, slideNum, slides) {
            if ( self.effect === 'fade' ) {
                slides.eq(current).fadeOut();
                slides.eq(slideNum).fadeIn();
            } else {
                var slideWidth = parseInt(slides.first().width(), 10),
                    slideHolder = slides.closest('.' + self.slideHolderClass),
                    pos = slideHolder.position().left,
                    slideDiff,
                    newPos;

                if ( current < slideNum ) {
                    slideDiff = current - slideNum;
                    newPos = pos + (slideWidth * slideDiff);
                } else if ( current > slideNum ) {
                    slideDiff = -(current - slideNum);
                    newPos = pos - (slideWidth * slideDiff);
                }
                
                slideHolder.animate({
                    left: newPos
                });
            }
        };

        self.fadeSlide = function(current, dir, slides) {
            var lastSlide = slides.length - 1,
                nextSlide;

            slides.eq(current).fadeOut();

            if ( dir === 'next' && current === lastSlide ) {
                slides.first().fadeIn();
                nextSlide = 0;
            } else if ( dir === 'next' ) {
                slides.eq(current + 1).fadeIn();
                nextSlide = current + 1;
            } else if ( dir === 'prev' && current === 0 ) {
                slides.eq(lastSlide).fadeIn();
                nextSlide = lastSlide;
            } else {
                slides.eq(current - 1).fadeIn();
                nextSlide = current - 1;
            }

            return nextSlide;
        };

        self.slideLeft = function(current, dir, slides, slideHolder) {
            var lastSlide = slides.length - 1,
                slideWidth = parseInt(slides.first().width(), 10),
                pos = slideHolder.position().left,
                newPos,
                nextSlide;

            if ( dir === 'next' && current === lastSlide ) {
                var oldSlides = slides,
                    newSlides = slides.clone(),
                    numSlides = slides.length;
                
                slideHolder.css('width', slideWidth * (numSlides * 2));
                slideHolder.append(newSlides);
                newPos = pos - slideWidth;
                
                slideHolder.animate({
                    left: newPos
                }, 300, 'linear', function() {
                    slideHolder.css({
                        'width': slideWidth * numSlides,
                        'left': 0
                    });
                    oldSlides.remove();
                });

                nextSlide = 0;
            } else if ( dir === 'next' ) {
                newPos = pos - slideWidth,
                nextSlide = (Math.abs(newPos) / slideWidth);
                
                slideHolder.animate({
                    left: newPos
                });
            } else if ( dir === 'prev' && current === 0 ) {
                var oldSlides = slides,
                    newSlides = slides.clone(),
                    numSlides = slides.length,
                    width = slideWidth * numSlides;
                
                slideHolder.css('width', width * 2);
                slideHolder.prepend(newSlides);
                slideHolder.css('left', -width);
                newPos = -width + slideWidth;
                
                slideHolder.animate({
                    left: newPos
                }, 300, 'linear', function() {
                    slideHolder.css({
                        'width': width,
                        'left': -(width - slideWidth)
                    });
                    oldSlides.remove();
                });

                nextSlide = numSlides - 1;
            } else {
                newPos = pos + slideWidth,
                nextSlide = (Math.abs(newPos) / slideWidth);
                
                slideHolder.animate({
                    left: newPos
                });
            }
            
            return nextSlide;
        };

        self.advanceSlide = function(current, dir, slideHolder) {
            var slides = slideHolder.find('.' + self.slideClass);

            if ( self.effect === 'fade' ) {
                var nextSlide = self.fadeSlide(current, dir, slides);
            } else if ( self.effect === 'slide-left' ) {
                var nextSlide = self.slideLeft(current, dir, slides, slideHolder);
            }
            
            return nextSlide;
        };

        self.startShow = function(interval, slides, nextControl) {
            return setInterval(function() {
                nextControl.trigger('click');
            }, interval);
        };

        self.pauseShow = function(start) {
            clearInterval(start);
            console.log('slider paused');
        };

        if ( slider.length > 0 ) {

            $.each(slider, function() {
                var slider = $(this),
                    slideHolder = slider.find('.' + self.slideHolderClass),
                    slides = slideHolder.find('.' + self.slideClass),
                    sliderControls = slider.find('.' + self.navClass).find('button'),
                    nextControl = slider.find('.' + self.navClass).find("button[data-dir='next']"),
                    slideList,
                    begin;

                if ( self.effect === 'slide-left' ) {
                    var slideWidth = slides.first().width(),
                        numSlides = slides.length;

                    slider.addClass('slide-left');
                    slideHolder.css('width', slideWidth * numSlides);
                } else if ( self.effect === 'fade' ) {
                    slides.hide().first().show();
                }

                slideList = self.createSlideList(slides).appendTo(slider);

                if ( animate === true ) {
                    begin = self.startShow(interval, slides, nextControl);

                    slides.on('mouseover', function() {
                        self.pauseShow(begin);
                    });

                    slides.on('mouseout', function() {
                        begin = self.startShow(interval, slides, nextControl); 
                    });
                }

                sliderControls.on('click', function(e) {
                    var dir = $(this).data('dir'),
                        current = self.getCurrent(slideHolder),
                        nextSlide;

                    nextSlide = self.advanceSlide(current, dir, slideHolder);

                    slideList.find('button').removeClass('active');
                    slideList.find('li').eq(nextSlide).find('button').addClass('active');

                    e.preventDefault();
                    e.stopPropagation();
                });

                slider.on('click', '.' + self.slideListClass + ' button', function(e) {
                    var that = $(this),
                        current = self.getCurrent(slideHolder),
                        slideNum = that.data('item-num');

                    slideList.find('button').removeClass('active');
                    that.addClass('active');

                    self.goToSlide(current, slideNum, slides);

                    e.preventDefault();
                    e.stopPropagation();                    
                });
            });
        }

        return self;
    };
})(jQuery);