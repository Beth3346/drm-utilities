###############################################################################
# Displays a modal window
###############################################################################

( ($) ->
	modalButtons = $ '.drm-modal-open'
	lightboxes = $ '.drm-modal-lightbox'
	modals = lightboxes.find '.drm-modal'
	close = modals.find '.drm-modal-close'

	modalButtons.click () ->
		that = $ @
		modalId = that.data 'modal'

		$("##{modalId}").fadeIn()

	close.click (e) ->
		lightboxes.fadeOut()

		e.preventDefault()

	lightboxes.click () ->
		lightboxes.fadeOut()

	modals.click (e) ->
	    e.stopPropagation()

) jQuery