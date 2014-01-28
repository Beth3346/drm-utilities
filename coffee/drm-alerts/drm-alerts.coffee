###############################################################################
# Displays removable alerts for web apps
###############################################################################

$ = jQuery
win = $ window
alert = $ '.drm-dismissable-alert'
close = alert.find 'button.close'

close.click ->
	that = $ this
	that.parent().fadeOut()