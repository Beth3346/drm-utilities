###############################################################################
# Toggles hiding and showing content with an accordion efffect
###############################################################################

( ($) ->

	drmAccordion = {
		container: $ '.drm-accordion'
		content: $ '.drm-accordion-inner'
		state: $('.drm-accordion').data 'state'

		init: ->
			# if no defaultState value is supplied, hide content
			if @.state == 'expanded' then @.content.show() else @.content.hide()
			
			$('<button></button>', {
				text: 'Show All',
				class: 'drm-show-all drm-button-inline'
			}).prependTo(@.container).on 'click', @.showAll

			$('<button></button>', {
				text: 'Hide All',
				class: 'drm-hide-all drm-button-inline'
			}).prependTo(@.container).on 'click', @.hideAll

			@.container.on 'click', '.drm-accordion-label', @.toggle

		toggle: ->
			$(@).next().slideToggle(200).siblings('.drm-accordion-inner').slideUp 200

		showAll: ->		
			drmAccordion.content.slideDown 200

		hideAll: ->
			drmAccordion.content.slideUp 200
	}	

	drmAccordion.init()
		
) jQuery							