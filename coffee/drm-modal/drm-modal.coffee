###############################################################################
# Displays a modal window
###############################################################################

( ($) ->
	body = $ 'body'
	modalButtons = $ '.drm-modal-open'
	modals = $ '.drm-modal-lightbox'
	close = modals.find '.drm-modal-close'

	modalButtons.click () ->
		that = $ @
		modalId = that.data 'modal'

		$("##{modalId}").fadeIn()

	close.click (e) ->
		that = $ @
		that.closest(modals).fadeOut()

		e.preventDefault()

		console.log 'default prevented'

) jQuery