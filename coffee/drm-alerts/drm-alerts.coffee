###############################################################################
# Displays removable alerts for web apps
###############################################################################

( ($) ->
	
	alert = $ '.drm-dismissable-alert'
	close = alert.find 'button.close'

	close.click ->
		that = $ @
		that.parent().fadeOut()
		
) jQuery	