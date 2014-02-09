###############################################################################
# Displays an offscreen menu that slides into view
###############################################################################

( ($) ->
	
	menu = $ '.drm-offscreen-menu'
	button = $ '.drm-menu-button'
	content = $ '.drm-offscreen-content'
	menuWidth = menu.css 'width'

	menu.css {'left': "-#{menuWidth}"}
	content.css {'left': '0', 'width': '100%'}

	button.click () ->
		menuPos = menu.css 'left'
		contentWidth = content.css 'width'
		contentWidth = parseInt(contentWidth, 10) - parseInt(menuWidth, 10)

		if menuPos == '0px'
			menu.animate {
				'left': "-#{menuWidth}"}
			content.animate {
				'left': '0', 'width': '100%'}
		else
			menu.animate {
				'left': '0'}
			content.animate {
				'left': menuWidth, 'width': contentWidth}	

) jQuery