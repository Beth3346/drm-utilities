###############################################################################
# Toggles hiding and showing content with an accordion efffect
###############################################################################

( ($) ->
    class @DrmAccordion
        constructor: (@speed, @state, @container, @buttons) ->
            @label = ".#{@container.children().first().attr 'class'}"
            @contentHolder = ".#{$(@label).next().attr 'class'}"
            @content = @container.find @contentHolder
            self = @

            if @buttons
                @showButton = @addButton 'showButton', 'Show All', 'drm-show-all drm-button-inline'
                @hideButton = @addButton 'hideButton', 'Hide All', 'drm-hide-all drm-button-inline'

                @showButton.on 'click', @showAll
                @hideButton.on 'click', @hideAll

            # if no defaultState value is supplied, hide content
            if @state == 'expanded' then @content.show() else @content.hide()

            toggleContent = ->
                self.toggle.call @, self.speed, self.contentHolder

            @container.on 'click', @label, toggleContent

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