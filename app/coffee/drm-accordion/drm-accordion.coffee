###############################################################################
# Toggles hiding and showing content with an accordion efffect
###############################################################################

$ = jQuery

class @DrmAccordion
    constructor: (@speed = 300, @containerClass = 'drm-accordion') ->
        @container = $ '.' + @containerClass

        unless @container.length is 0
            @label = '.drm-accordion-label'
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

class @DrmAccordionNav extends DrmAccordion
    constructor: (@speed = 300, @containerClass = 'drm-accordion-nav') ->
        @container = $ '.' + @containerClass

        unless @container.length is 0
            @state = @container.data 'state'
            @containerClass = '.' + @container.prop('class').split(' ')[0]
            @label = '.' + @container.children('ul').children('li').children('a').prop('class').split(' ')[0]
            @contentHolder = @containerClass + ' .' + $("#{@label}").next('ul').prop('class').split(' ')[0]
            @content = $ @contentHolder

            @showDefaultContent()
            @addEvents()

# new DrmAccordionContent()
# new DrmAccordionNav()