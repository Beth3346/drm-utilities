###############################################################################
# Displays removable alerts for web apps
###############################################################################

( ($) ->
	
	alert = $ '.drm-dismissable-alert'

	alert.on 'click', '.close', ->
		$(@).parent().fadeOut 300
		
) jQuery	