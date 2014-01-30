###############################################################################
# Allows a button to display a dropdown when clicked
###############################################################################

( ($) ->
	
	buttonHolder = $ '.drm-dropdown-solid-btn-holder'
	button = buttonHolder.find('button')
	splitButtonHolder = $ '.drm-dropdown-split-btn-holder'
	menuButton = splitButtonHolder.find('button:last()')

	button.click () ->
		that = $ @
		that.toggleClass('clicked').next('ul').slideToggle()

	menuButton.click () ->
		that = $ @
		that.toggleClass('clicked').next('ul').slideToggle()	

) jQuery