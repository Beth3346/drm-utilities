###############################################################################
# Displays popovers on hover
###############################################################################
"use strict"

( ($) ->
    class window.DrmPopover
        constructor: (@holder = $('div.popover-holder')) ->
            buttons = @holder.find 'button'
            popovers = @holder.find 'div.drm-popover'

            buttons.on 'click', @togglePopover
            $('html').click -> popovers.hide() 

        togglePopover: (e) ->
            popoverId = $(@).data 'popover'
            popover = $("div##{popoverId}").fadeToggle()
            
            e.stopPropagation()

            checkPosition = ->
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

            checkPosition.call popover

    return 

) jQuery