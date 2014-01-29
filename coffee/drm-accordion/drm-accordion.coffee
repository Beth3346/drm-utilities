###############################################################################
# Toggles hiding and showing content with an accordion efffect
###############################################################################

( ($) ->

	accordion = $ '.drm-accordion'
	label = $ '.drm-accordion-label'
	content = $ '.drm-accordion-inner'
	defaultState = accordion.data 'state'
	hideButton = $ 'button.drm-hide-all'
	showButton = $ 'button.drm-show-all'

	# Initialize

	# if no defaultState value is supplied, hide content

	if defaultState == 'expanded' then content.show() else content.hide()

	# Toggle Accordion State

	label.click ->
		that = $ @
		that.next().slideToggle()

	showButton.click ->
		content.show()

	hideButton.click ->
		content.hide()
		
) jQuery							