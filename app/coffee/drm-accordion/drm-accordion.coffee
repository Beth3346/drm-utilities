###############################################################################
# Toggles hiding and showing content with an accordion efffect
###############################################################################

( ($) ->

	drmAccordion = {
		container: $ '.drm-accordion'
		content: $ '.drm-accordion-inner'		

		config: {
			speed: 200,
			state: $('.drm-accordion').data 'state'
		}

		init: (config) ->
			$.extend @.config, config
			# if no defaultState value is supplied, hide content
			if drmAccordion.config.state == 'expanded' then @.content.show() else @.content.hide()

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
			content = $(@).next()
			speed = drmAccordion.config.speed
			if ( content.is(':hidden') )
				content.slideDown(speed).siblings('.drm-accordion-inner').slideUp speed
			else
				content.slideUp speed

		showAll: ->		
			drmAccordion.content.slideDown drmAccordion.config.speed

		hideAll: ->
			drmAccordion.content.slideUp drmAccordion.config.speed
	}

	drmAccordion.init()
		
) jQuery							