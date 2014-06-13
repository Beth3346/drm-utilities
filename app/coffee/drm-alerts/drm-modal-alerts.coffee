###############################################################################
# Displays removable modal style alerts for web apps
###############################################################################
"use strict"

class @DrmModalAlert
    constructor: (@alertClass = "drm-modal-alert", @speed = 300) ->
        self = @

        $('html').on 'click', "div.#{@alertClass} button.close", -> self.clearAlert.call @, self.speed

    showAlert: (type, message, holder) ->
        className = "drm-#{type}-alert #{@alertClass}"
        newAlert = $ '<div></div>',
            text: message,
            class: className

        close = $ '<button></button>',
            text: 'x'
            class: 'close'

        newAlert.prependTo holder
        close.prependTo newAlert

    clearAlert: (speed) -> 
        $(@).parent().fadeOut speed, ->
            $(@).remove()

new DrmModalAlert()