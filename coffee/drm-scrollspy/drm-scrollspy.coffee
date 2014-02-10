###############################################################################
# Scollspy
###############################################################################

( ($) ->
	
	holder = $ '.drm-scrollspy'
	content = holder.find '.drm-scroll-content'
	nav = holder.find '.drm-scroll-nav'
	sections = content.find 'section'
	links = nav.find 'a[href^="#"]'
	hash = window.location.hash
	
	if hash
		nav.find("a[href='#{hash}']").addClass 'active'
	else	
		links.first().addClass 'active'		

	links.click (e) ->
		that = $ @
		target = that.attr 'href'
		section = $ target
		contentHeight = content.height()
		scroll = content.scrollTop()
		position = section.position().top
		currentLink = $ 'a.active'
		offset = ->
			if position < scroll
				position + scroll
			else if position > scroll
				position - scroll
			else if position == 0
				0
			else	
				contentHeight

		currentLink.removeClass 'active'		
		that.addClass 'active'

		e.preventDefault()

		content.stop().animate({
				'scrollTop': offset()	
		}, 900, 'swing', ->
			window.location.hash = target
			return
		)

	content.scroll( ->
		that = $ @
		scroll = that.scrollTop()
		return
	)

	return		

) jQuery