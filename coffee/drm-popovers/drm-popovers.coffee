###############################################################################
# Displays popovers on hover
###############################################################################

( ($) ->
	
	holders = $ '.popover-holder'
	buttons = holders.find 'button'
	popovers = holders.find '.drm-popover'
	html = $ 'html'

	buttons.click () ->
		that = $ @
		popoverId = that.data('popover')

		$("##{popoverId}").toggle()	
		

	html.click () ->
		popovers.hide()

	buttons.click (e) ->
		e.stopPropagation()	

) jQuery