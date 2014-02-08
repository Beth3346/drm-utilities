###############################################################################
# Displays an offscreen menu that slides into view
###############################################################################

( ($) ->
	
	menu = $ '.drm-offscreen-menu'
	button = $ '.drm-menu-button'
	content = $ '.drm-offscreen-content'

	menu.css {'left': '-15%'}
	content.css {'left': '0', 'width': '100%'}

	button.click () ->
		menuPos = menu.css 'left'

		console.log menuPos

		if menuPos == '0px'
			menu.animate {
				'left': '-15%'}
			content.animate {
				'left': '0', 'width': '100%'}
		else
			menu.animate {
				'left': '0'}
			content.animate {
				'left': '15%', 'width': '85%'}	

) jQuery