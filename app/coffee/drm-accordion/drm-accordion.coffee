###############################################################################
# Toggles hiding and showing content with an accordion efffect
###############################################################################
"use strict"

( ($) ->
    class window.DrmAccordion
        constructor: (@speed = 300, @container = $('.drm-accordion')) ->
            @label = '.' + @container.children().first().attr 'class'
            @contentHolder = '.' + $("#{@label}").next().attr 'class'
            @state = @container.data 'state'
            @content = @container.find @contentHolder

            @showDefaultContent()
            @addEvents()

        showDefaultContent: =>
            expandedContent = $ "#{@contentHolder}[data-state=expanded]"

            if @state is 'expanded' then @content.show() else @content.hide()

            if expandedContent.length > 0
                expandedContent.show()

        addEvents: =>
            self = @

            self.container.on 'click', self.label, -> self.toggle.call @, self.speed, self.contentHolder

        toggle: (speed, content) ->
            nextContent = $(@).next()
            if nextContent.is(':hidden')
                $(content).not(':hidden').slideUp speed
                nextContent.slideDown speed
            else nextContent.slideUp speed

            return false

    class window.DrmAccordionContent extends DrmAccordion
        constructor: (@speed = 300, @container = $('.drm-accordion'), @showButtons = yes) ->
            @label = '.' + @container.children().first().attr 'class'
            @contentHolder = '.' + $("#{@label}").next().attr 'class'
            @state = @container.data 'state'
            @content = @container.find @contentHolder

            if @showButtons
                @buttons = @addButtons()

            @showDefaultContent()
            @addEvents()

        addEvents: =>
            self = @
            super()

            if self.buttons?
                self.buttons.showButton.on 'click', self.showAll
                self.buttons.hideButton.on 'click', self.hideAll

        addButtons: =>
            buttons =
                showButton: @createButton 'showButton', 'Show All', 'drm-show-all drm-button-inline'
                hideButton: @createButton 'hideButton', 'Hide All', 'drm-hide-all drm-button-inline'

            buttons

        createButton: (button, message, className) =>
            button = $ '<button></button>',
                text: message
                class: className

            button.prependTo @container

            button

        showAll: =>
            @content.slideDown @speed

        hideAll: =>
            @content.slideUp @speed

    class window.DrmAccordionNav extends DrmAccordion
        constructor: (@speed = 300, @container = $('.drm-accordion-nav')) ->
            @state = @container.data 'state'
            @label = '.' + @container.children('ul').children('li').children('a').attr 'class'
            @contentHolder = '.' + $("#{@label}").next('ul').attr 'class'
            @content = @container.find @contentHolder

            @showDefaultContent()
            @addEvents()
    
    new DrmAccordionContent()
    new DrmAccordionNav()

) jQuery