###############################################################################
# Toggles hiding and showing content with an accordion efffect
###############################################################################
"use strict"

( ($) ->
    class window.DrmAccordion
        constructor: (@speed = 300, @container = $('.drm-accordion'), @buttons = yes) ->
            self = @
            label = '.' + self.container.children().first().attr 'class'
            contentHolder = '.' + $("#{label}").next().attr 'class'
            state = self.container.data 'state'
            expandedContent = $ "#{contentHolder}[data-state=expanded]"

            self.content = self.container.find contentHolder

            if self.buttons
                showButton = self.addButton 'showButton', 'Show All', 'drm-show-all drm-button-inline'
                hideButton = self.addButton 'hideButton', 'Hide All', 'drm-hide-all drm-button-inline'

                showButton.on 'click', self.showAll
                hideButton.on 'click', self.hideAll

            if state is 'expanded' then self.content.show() else self.content.hide()

            if expandedContent.length > 0
                expandedContent.show()

            self.container.on 'click', label, -> self.toggle.call @, self.speed, contentHolder

        addButton: (button, message, className) ->
            button = $ '<button></button>',
                text: message
                class: className

            button.prependTo @container

            button

        toggle: (speed, content) ->
            nextContent = $(@).next()
            if nextContent.is(':hidden')
                $(content).not(':hidden').slideUp speed
                nextContent.slideDown speed
            else nextContent.slideUp speed

            return false

        showAll: =>
            @content.slideDown @speed

        hideAll: =>
            @content.slideUp @speed
    
    new DrmAccordion()

    class window.DrmAccordionNav extends DrmAccordion
        constructor: (@speed = 300, @container = $('.drm-accordion-nav')) ->
            self = @
            label = '.' + self.container.children('ul').children('li').children('a').attr 'class'
            contentHolder = '.' + $("#{label}").next('ul').attr 'class'
            state = self.container.data 'state'
            expandedContent = $ "#{contentHolder}[data-state=expanded]"

            self.content = self.container.find contentHolder

            if state is 'expanded' then self.content.show() else self.content.hide()

            if expandedContent.length > 0
                expandedContent.show()           

            self.container.on 'click', label, -> self.toggle.call @, self.speed, contentHolder

    new DrmAccordionNav()

) jQuery