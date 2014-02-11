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
	positions = []
	contentHeight = content.height()
	
	if hash
		nav.find("a[href='#{hash}']").addClass 'active'
	else	
		links.first().addClass 'active'	

	# populate positions array with the position of the top of each section element	

	sections.each( (index) ->
		that = $ @
		length = sections.length

		# the first element's position should always be 0
		if index == 0
			position = 0
		# subtract the bottom container's full height so final scroll value is equivalent 
		# to last container's position	
		else if index == length - 1
			if that.height() > 200
				position = that.position().top - (that.height() / 2)
			else	
				position = that.position().top - that.height()
		# for all other elements correct position by only subtracting half of its height 
		# from its top position
		else
			position = that.position().top - (that.height() / 2)

		# correct for any elements that may have a negative position value	
		if position < 0 then positions.push 0 else positions.push position
	)

	links.click (e) ->
		that = $ @
		target = that.attr 'href'
		section = $ target
		scroll = content.scrollTop()
		position = section.position().top
		offset = ->
			if position < scroll
				position + scroll
			else if position > scroll
				position - scroll
			else if position == 0
				0
			else	
				contentHeight

		$('a.active').removeClass 'active'		
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

		# find out which section position corresponds with scroll
		# if scroll is less than the next position highlight the link with the same index

		$.each(positions, (index, value) ->
			if scroll == 0
				$('a.active').removeClass 'active'	
				links.eq(0).addClass 'active'
			else if value < scroll
				$('a.active').removeClass 'active'	
				links.eq(index).addClass 'active'
		)

		return
	)

	return		

) jQuery