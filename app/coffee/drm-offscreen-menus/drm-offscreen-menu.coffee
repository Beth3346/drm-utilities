###############################################################################
# Displays an offscreen menu that slides into view
###############################################################################

( ($) ->
	
	menu = $ '.drm-offscreen-menu'
	button = $ '.drm-menu-button'
	content = $ '.drm-offscreen-content'
	holder = $ '.drm-content-holder'
	menuWidth = parseInt(menu.css('width'), 10)
	holderWidth = parseInt(holder.css('width'), 10)

	# calculate menuWidth as a percentage of container
	menuWidth = (menuWidth / holderWidth) * 100

	menu.css {'left': "-#{menuWidth}%"}
	content.css {'left': '0', 'width': '100%'}

	button.on 'click', () ->
		menuPos = menu.css 'left'
		contentWidth = 100 - menuWidth

		if menuPos == '0px'
			menu.animate {
				'left': "-#{menuWidth}%"}
			content.animate {
				'left': '0', 'width': '100%'}					
		else
			menu.animate {
				'left': '0'}
			content.animate {
				'left': "#{menuWidth}%", 'width': "#{contentWidth}%"}

			menuHeight = parseInt((menu.find('ul').css 'height'), 10)
			contentHeight = parseInt((content.css 'height'), 10)

			if menuHeight > contentHeight
				menu.css {'overflow-y': 'scroll'}	

) jQuery