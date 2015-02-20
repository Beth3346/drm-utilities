###############################################################################
# Toggles hiding and showing content with an accordion efffect
###############################################################################

$ = jQuery
class @DrmAccordion
    constructor: (@speed = 300, @container = $('.drm-accordion')) ->
        @label = '.drm-accordion-label'
        @containerClass = '.drm-accordion'
        @contentHolder = '.drm-accordion-content'
        @state = @container.data 'state'
        @content = $ @contentHolder

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

        false

class @DrmAccordionContent extends DrmAccordion
    constructor: (@speed = 300, @container = $('.drm-accordion'), @showButtons = yes) ->
        @state = @container.data 'state'
        @containerClass = '.drm-accordion'
        @label = '.drm-accordion-label'
        @contentHolder = '.drm-accordion-inner'
        @content = $ @contentHolder

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
        return {
            showButton: @createButton 'showButton', 'Show All', 'drm-show-all drm-button-inline'
            hideButton: @createButton 'hideButton', 'Hide All', 'drm-hide-all drm-button-inline'
        }

    createButton: (button, message, className) =>
        $('<button></button>',
            text: message
            class: className).prependTo @container

    showAll: =>
        @content.slideDown @speed

    hideAll: =>
        @content.slideUp @speed

class @DrmAccordionNav extends DrmAccordion
    constructor: (@speed = 300, @container = $('.drm-accordion-nav')) ->
        @state = @container.data 'state'
        @containerClass = '.' + @container.prop('class').split(' ')[0]
        @label = '.' + @container.children('ul').children('li').children('a').prop('class').split(' ')[0]
        @contentHolder = @containerClass + ' .' + $("#{@label}").next('ul').prop('class').split(' ')[0]
        @content = $ @contentHolder

        @showDefaultContent()
        @addEvents()

# new DrmAccordionContent()
# new DrmAccordionNav()