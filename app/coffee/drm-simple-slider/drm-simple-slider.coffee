###############################################################################
# A simple jQuery slider
###############################################################################

( ($) ->

	drmSimpleSlider = {
		slider: $ '.drm-slider'
		slideHolder: $ '.drm-slide-holder'
		nextButton: $ '.next-img'
		prevButton: $ '.prev-img'

		config: {
			autoplay: 5000
			play: 5000
			speed: 2000
		}

		init: (config) ->
			$.extend @.config, config	
			slides = @.slideHolder.find '.drm-slide'
			current = 0
			firstSlide = slides.first()
			lastSlide = slides.last()
			length = slides.length
			last = length - 1	

			## Initialize

			slides.hide()
			firstSlide.show()
			if length > 1
				@.nextButton.show()
				@.prevButton.show()		

			$(window).load ->
				if length > 1 
					startShow()

			prevButton.click ->
				prevImage()
				stopShow()

			nextButton.click ->
				nextImage()
				stopShow()

			slides.hover(
				->
					stopShow()
				->
					if length > 1
						startShow()
			)

		prevImage: ->
			speed = drmSimpleSlider.config.speed

			slides.fadeOut speed

			if current == 0
				lastSlide.fadeIn speed
				current = last
			else
				current = current - 1
				slides.eq(current).fadeIn speed
			return		

		nextImage: ->
			speed = drmSimpleSlider.config.speed

			slides.fadeOut speed	

			if current == last
				firstSlide.fadeIn speed
				current = 0
			else
				current = current + 1
				slides.eq(current).fadeIn speed	
			return

		startShow: ->
			clearInterval drmSimpleSlider.config.play
			play = setInterval ->
				nextImage()
			, autoplay		
			return

		stopShow: ->
			clearInterval drmSimpleSlider.config.play	
	}

	drmSimpleSlider.init()

) jQuery