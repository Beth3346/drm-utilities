###############################################################################
# Displays a modal window
###############################################################################

( ($) ->
	modalButtons = $ '.drm-modal-open'
	lightboxes = $ '.drm-modal-lightbox'
	modals = lightboxes.find '.drm-modal'
	close = modals.find '.drm-modal-close'

	modalButtons.on 'click', () ->
		modalId = $(@).data 'modal'

		$("##{modalId}").fadeIn()

	close.on 'click', (e) ->
		lightboxes.fadeOut()
		e.preventDefault()

	lightboxes.on 'click', () ->
		lightboxes.fadeOut()

	modals.on 'click', (e) ->
	    e.stopPropagation()

) jQuery