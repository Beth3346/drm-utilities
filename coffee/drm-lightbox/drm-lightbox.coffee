###############################################################################
# Displays a lightbox
###############################################################################

( ($) ->
	body = $ 'body'
	thumbnailList = $ '.drm-lightbox-thumbnails'
	links = thumbnailList.find 'a'

	links.click (e) ->
		lightbox = $ '.drm-blackout'
		img = $(@).attr('href')
		console.log img
		lightboxHtml = '<div class="drm-blackout"><button class="close">x</button><img src="' + img + '" alt="thumbnail"></div>'

		e.preventDefault()

		if lightbox.length == 0
			$(lightboxHtml).hide().appendTo(body).fadeIn(1000)

	body.on('click', '.drm-blackout .close' , ->
		$(@).parent().fadeOut().remove()
	)		

) jQuery