###############################################################################
# Displays removable alerts for web apps
###############################################################################
"use strict"

( ($) ->
    class window.DrmAlert
        constructor: (@alertClass = "drm-dismissable-alert", @speed = 300) ->
            self = @                

            $('html').on 'click', "div.#{@alertClass} button.close", -> self.clearAlert.call @, self.speed

        showAlert: (type, message, holder) ->
            className = "#{type}-alert #{@alertClass}"
            newAlert = $ '<div></div>',
                text: message,
                class: className

            close = $ '<button></button>',
                text: 'x'
                class: 'close'

            newAlert.prependTo holder
            close.prependTo newAlert

            newAlert

        clearAlert: (speed) -> 
            $(@).parent().fadeOut speed, ->
                $(@).remove()

    new DrmAlert()

) jQuery	