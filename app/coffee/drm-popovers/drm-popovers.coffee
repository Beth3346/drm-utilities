###############################################################################
# Displays popovers on hover
###############################################################################

( ($) ->
	
	holders = $ '.popover-holder'
	buttons = holders.find 'button'
	popovers = holders.find '.drm-popover'
	html = $ 'html'

	buttons.on 'click', (e) ->
		popoverId = $(@).data 'popover'

		$("##{popoverId}").toggle()
		e.stopPropagation()		

	html.click () ->
		popovers.hide()	

) jQuery