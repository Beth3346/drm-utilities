###############################################################################
# Toggles hiding and showing content with an accordion efffect
###############################################################################

( ($) ->
	class @DrmAccordion
		constructor: (@speed, @state, @container) ->
			@label = ".#{@container.children().first().attr 'class'}"
			@contentHolder = ".#{$(@label).next().attr 'class'}"
			@content = @container.find @contentHolder
			@showButton = @addButton('showButton', 'Show All', 'drm-show-all drm-button-inline')
			@hideButton = @addButton('hideButton', 'Hide All', 'drm-hide-all drm-button-inline')

			# if no defaultState value is supplied, hide content
			if @state == 'expanded' then @content.show() else @content.hide()

		addButton: (button, message, className) ->
			button = $('<button></button>', {
				text: message,
				class: className
			}).prependTo @container

			return button

		toggle: (speed, content) ->
			nextContent = $(@).next()
			if nextContent.is(':hidden') then nextContent.slideDown(speed).siblings(content).slideUp speed else nextContent.slideUp speed

		showAll: =>
			@content.slideDown @speed

		hideAll: =>
			@content.slideUp @speed

	return

) jQuery