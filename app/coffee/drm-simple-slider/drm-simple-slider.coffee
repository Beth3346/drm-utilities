###############################################################################
# A simple jQuery slider
###############################################################################

( ($) ->

    drmSimpleSlider = {
        slider: $ '.drm-simple-slider'
        slideHolder: $ '.drm-simple-slide-holder'
        nextButton: $ '.drm-simple-slide-next '
        prevButton: $ '.drm-simple-slide-prev'

        config: {
            play: 10000
            speed: 1000
        }

        init: (config) ->
            $.extend @.config, config
            slides = @.slideHolder.find '.drm-simple-slide'
            current = 0
            firstSlide = slides.first()

            ## Initialize

            slides.hide()
            firstSlide.show()
            
            if length > 1
                @.nextButton.show()
                @.prevButton.show()     

            $(window).on 'load', @.startShow

            @.prevButton.on 'click', @.prevImage

            @.nextButton.on 'click', @.nextImage

            slides.on 'mouseover', @.stopShow
            slides.on 'mouseout', @.startShow

        getCurrent: ->            
            slides = drmSimpleSlider.slideHolder.find '.drm-simple-slide'
            currentSlide = slides.not ':hidden'
            current = slides.index currentSlide

            return current

        prevImage: ->
            speed = drmSimpleSlider.config.speed
            slides = drmSimpleSlider.slideHolder.find '.drm-simple-slide'
            lastSlide = slides.last()
            last = slides.length - 1
            current = drmSimpleSlider.getCurrent()

            slides.eq(current).fadeOut speed, ->
                if current == 0
                    current = last
                    lastSlide.fadeIn speed
                else
                    current -= 1
                    slides.eq(current).fadeIn speed

        nextImage: ->
            speed = drmSimpleSlider.config.speed
            slides = drmSimpleSlider.slideHolder.find '.drm-simple-slide'
            firstSlide = slides.first()
            last = slides.length - 1
            current = drmSimpleSlider.getCurrent()

            slides.eq(current).fadeOut speed, ->
                if current == last
                    firstSlide.fadeIn speed
                else
                    current += 1
                    slides.eq(current).fadeIn speed

        startShow: ->
            slides = drmSimpleSlider.slideHolder.find '.drm-simple-slide'
            console.log "starting slideshow"

            if slides.length > 1
                window.setInterval ->
                    drmSimpleSlider.nextImage()
                , drmSimpleSlider.config.play      
                return

        stopShow: ->
            console.log "stop show"
    }

    drmSimpleSlider.init()

) jQuery