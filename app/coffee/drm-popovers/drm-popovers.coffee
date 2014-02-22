###############################################################################
# Displays popovers on hover
###############################################################################

( ($) ->

	drmPopover = {
		
	}
	
	holders = $ '.popover-holder'
	buttons = holders.find 'button'
	popovers = holders.find '.drm-popover'
	html = $ 'html'

	buttons.on 'click', (e) ->
		popoverId = $(@).data 'popover'
		popover = $("##{popoverId}")

		popover.toggle()
		e.stopPropagation()
		
		if popover.offset().left < 0
			position = popover.position().left
			popover.css('left': (Math.abs(popover.offset().left) + 10) + position)

	html.click ->
		popovers.hide()	

) jQuery