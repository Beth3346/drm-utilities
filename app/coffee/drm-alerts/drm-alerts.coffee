###############################################################################
# Displays removable alerts for web apps
###############################################################################

( ($) ->

	$('.drm-dismissable-alert').on 'click', 'button.close', ->
		$(@).parent().fadeOut 300
		
) jQuery	