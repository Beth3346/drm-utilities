###############################################################################
# Displays popovers on hover
###############################################################################
"use strict"

( ($) ->
    drmPopover =
        holders: $ 'div.popover-holder'

        init: ->
            buttons = @holders.find 'button'
            popovers = @holders.find 'div.drm-popover'

            buttons.on 'click', @togglePopover

            $('html').click ->
                popovers.hide() 

        togglePopover: (e) ->
            popoverId = $(@).data 'popover'
            popover = $("div##{popoverId}")

            popover.fadeToggle()
            e.stopPropagation()

            drmPopover.checkPosition.call popover

        checkPosition: ->
            that = $ @
            positionLeft = that.position().left
            offsetLeft = that.offset().left
            positionTop = that.position().top
            offsetTop = that.offset().top
            popoverHeight = that.height()

            if offsetLeft < 0               
                that.css('left': (Math.abs(offsetLeft) + 10) + positionLeft)
            else if offsetTop < 0
                that.css('bottom': (Math.abs(positionTop) - popoverHeight) - Math.abs(offsetTop))

    drmPopover.init()   

) jQuery