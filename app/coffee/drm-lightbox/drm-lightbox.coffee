###############################################################################
# Displays a lightbox
###############################################################################

( ($) ->
	body = $ 'body'
	images = $ '.drm-lightbox-thumbnails'
	links = images.find 'a'
	thumbnailList = []
	speed = 1000

	## populate imgList array

	links.each( ->
		that = $ @
		thumbnailList.push that.attr 'href'
	)

	## show lightbox when a thumbnail is clicked

	images.on 'click', 'a', (e) ->
		lightbox = $ '.drm-blackout'
		img = $(@).attr 'href'
		thumbnails = ''

		## create html for thumbnail-list

		$.each(thumbnailList, (index, value) ->
			thumbnails += "<li><a href='#{value}'><img src='#{value}' /></a><li>"
		)

		## html for the actual lightbox

		lightboxHtml = "<div class='drm-blackout'><button class='close'>x</button><img src='#{img}' alt='thumbnail' class='img-visible'><ul class='thumbnail-list'>#{thumbnails}</div>"			

		## if the lightbox isn't already showing, append it to body and fade it into view	

		if lightbox.length == 0
			$(lightboxHtml).hide().appendTo(body).fadeIn speed

		e.preventDefault()		

	body.on 'click', '.drm-blackout .close', () ->
		$(@).parent().fadeOut(speed).remove()

	body.on 'click', '.drm-blackout .thumbnail-list a', (e) ->
		that = $ @
		img = that.attr 'href'
		oldImg = $ '.drm-blackout .img-visible'
		oldImgSrc = oldImg.attr 'src'

		e.preventDefault()

		if oldImgSrc != img
			
			oldImg.fadeOut speed, -> 
				that = $ @
				that.attr('src', img).fadeIn speed
		e.stopPropagation()		

	body.on 'click', '.drm-blackout', () ->
		$(@).fadeOut(speed).remove()	    

	body.on 'click', '.drm-blackout .img-visible', (e) ->
	    e.stopPropagation()

) jQuery