$ = jQuery

images = $('.post-normal').find 'img'

images.wrap '<figure class="post-image-holder"></figure>'

images.each( ->
	that = $(this)
	theImage = new Image()
	theImage.src = that.attr "src"
	trueWidth = theImage.width
	trueHeight = theImage.height
	imageWidth = that.width()

	if trueWidth > trueHeight
		imageRatio = trueHeight / trueWidth
	else
		imageRatio = trueWidth / trueHeight	

	imageHeight = imageWidth * imageRatio
	imageHolder = that.parent()

	that.animate(
		height: imageHeight
		width: imageWidth
		, 'fast').fadeIn('slow', ->
			imageHolder.animate(
				height: imageHeight
				width: imageWidth
				, 'fast').fadeIn('slow')
			return
	)
	return
)