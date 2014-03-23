###############################################################################
# A simple jQuery slider
###############################################################################
"use strict"

( ($) ->
    class window.DrmSimpleSlider
        constructor: (@slider = $('div.drm-simple-slider'), @slideHolder = $('div.drm-simple-slide-holder'), @slideList = $('ul.drm-simple-slider-list'), @play = 10000, @speed = 300, @animate = yes) ->
            self = @
            slides = self.slideHolder.find 'div.drm-simple-slide'
            current = 0
            sliderControls = $('div.drm-simple-slider-nav').find 'button'

            advanceImage = ->
                slides = self.slideHolder.find '.drm-simple-slide'
                last = slides.length - 1
                current = self.getCurrent()
                dir = $(@).data 'dir'

                nextImage = (current) ->
                    if current is last then next = 0 else next = current + 1
                    next

                prevImage = (current) ->
                    if current is 0 then next = last else next = current - 1
                    next

                next = if dir is 'prev' then prevImage(current) else nextImage(current)

                self.replaceImage(current, next)

            ## Initialize
            
            if slides.length > 1
                sliderControls.show()
                self.slideList.show()
                self.slideList.find('button').first().addClass 'active'
                slides.hide()
                slides.first().show()
            else
                sliderControls.hide()
                self.slideList.hide()
                slides.first().show()

            unless self.animate is no
                begin = self.startShow()
                pause = -> self.pauseShow begin
                $(window).on 'load', $.proxy begin
                self.slideHolder.on 'mouseenter', pause

            sliderControls.on 'click', advanceImage
            self.slideList.on 'click', 'button', ->
                current = self.getCurrent()
                next = $(@).data 'item-num'
                self.replaceImage(current, next)

        getCurrent: ->            
            slides = @slideHolder.find '.drm-simple-slide'
            currentSlide = slides.not ':hidden'
            current = slides.index currentSlide

            current

        replaceImage: (current, next) ->
            links = @slideList.find 'button'
            speed = @speed
            slides = @slideHolder.find '.drm-simple-slide'

            slides.eq(current).fadeOut speed, ->
                slides.eq(next).fadeIn speed
                links.removeClass 'active'
                links.eq(next).addClass 'active'

        startShow: ->
            slides = @slideHolder.find '.drm-simple-slide'
            nextControl = $('.drm-simple-slider-nav').find "button[data-dir='next']"

            unless slides.length is 0            
                start = setInterval ->
                    nextControl.trigger 'click'
                , @play
            start

        pauseShow: (start) ->
            clearInterval start

    return

) jQuery