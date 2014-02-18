###############################################################################
# Toggles hiding and showing content with an accordion efffect
###############################################################################

( ($) ->

	accordion = $ '.drm-accordion'
	content = $ '.drm-accordion-inner'
	defaultState = accordion.data 'state'

	# Initialize

	# if no defaultState value is supplied, hide content

	if defaultState == 'expanded' then content.show() else content.hide()

	# Toggle Accordion State

	accordion.on 'click', '.drm-accordion-label', ->
		$(@).next().slideToggle(200).siblings('.drm-accordion-inner').slideUp 200

	$('button.drm-show-all').on 'click', ->
		content.slideDown 200

	$('button.drm-hide-all').on 'click', ->
		content.slideUp 200
		
) jQuery							