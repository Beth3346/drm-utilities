###############################################################################
# A simple jQuery slider
###############################################################################

( ($) ->

	slider = $ '.drm-slider'
	slideHolder = $ '.drm-slide-holder'
	autoplay = 5000
	nextButton = $ '.next-img'
	prevButton = $ '.prev-img'
	slides = slideHolder.find '.drm-slide'
	current = 0
	firstSlide = slides.first()
	lastSlide = slides.last()
	play = 5000
	speed = 2000
	length = slides.length
	last = length - 1	

	## Initialize

	slides.hide()
	firstSlide.show()
	if length > 1
		nextButton.show()
		prevButton.show()

	prevImage = ->
		slides.fadeOut speed

		if current == 0
			lastSlide.fadeIn speed
			current = last
		else
			current = current - 1
			slides.eq(current).fadeIn speed
		return	

	nextImage = ->	
		slides.fadeOut speed	

		if current == last
			firstSlide.fadeIn speed
			current = 0
		else
			current = current + 1
			slides.eq(current).fadeIn speed	
		return

	startShow = ->
		clearInterval play
		play = setInterval ->
			nextImage()
		, autoplay		
		return

	stopShow = ->
		clearInterval play

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
) jQuery