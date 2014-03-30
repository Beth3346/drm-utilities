###############################################################################
# Toggles hiding and showing content with an accordion efffect
###############################################################################
"use strict"

( ($) ->
    class window.DrmAccordion
        constructor: (@speed = 300, @container = $('.drm-accordion'), @buttons = yes) ->
            self = @
            self.label = ".#{self.container.children().first().attr 'class'}"
            self.contentHolder = ".#{$(self.label).next().attr 'class'}"
            self.content = self.container.find self.contentHolder
            state = self.container.data 'state'
            expandedContent = $ "#{self.contentHolder}[data-state=expanded]"

            if self.buttons
                self.showButton = self.addButton 'showButton', 'Show All', 'drm-show-all drm-button-inline'
                self.hideButton = self.addButton 'hideButton', 'Hide All', 'drm-hide-all drm-button-inline'

                self.showButton.on 'click', self.showAll
                self.hideButton.on 'click', self.hideAll

            if self.state is 'expanded' then self.content.show() else self.content.hide()

            if expandedContent.length > 0
                expandedContent.show()              

            self.container.on 'click', self.label, -> self.toggle.call @, self.speed, self.contentHolder

        addButton: (button, message, className) ->
            button = $ '<button></button>',
                text: message
                class: className

            button.prependTo @container

            button

        toggle: (speed, content) ->
            nextContent = $(@).next()
            if nextContent.is(':hidden') then nextContent.slideDown(speed).siblings(content).slideUp speed else nextContent.slideUp speed

        showAll: =>
            @content.slideDown @speed

        hideAll: =>
            @content.slideUp @speed
    
    new DrmAccordion()

) jQuery