###############################################################################
# Allows a button to display a dropdown when clicked
###############################################################################

( ($) ->
	
	buttonHolder = $ '.drm-dropdown-solid-btn-holder'
	button = buttonHolder.find('button')
	splitButtonHolder = $ '.drm-dropdown-split-btn-holder'
	menuButton = splitButtonHolder.find('button:last()')
	html = $ 'html'

	button.click () ->
		that = $ @
		that.toggleClass('clicked').next('ul').slideToggle()

	html.click () ->
		button.removeClass('clicked').next('ul').slideUp()
		menuButton.removeClass('clicked').next('ul').slideUp()

	button.click (e) ->
	    e.stopPropagation()

	menuButton.click () ->
		that = $ @
		that.toggleClass('clicked').next('ul').slideToggle()	

	menuButton.click (e) ->
	    e.stopPropagation()

) jQuery