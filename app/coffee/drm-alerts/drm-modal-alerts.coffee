###############################################################################
# Displays removable modal style alerts for web apps
###############################################################################
"use strict"

$ = jQuery
class @DrmModalAlert
    constructor: (@alertClass = "drm-modal-alert", @speed = 300) ->
        self = @

        $('html').on 'click', "div.#{@alertClass} button.close", -> self.clearAlert.call @, self.speed

    showAlert: (type, message, holder) ->
        _className = "drm-#{type}-alert #{@alertClass}"
        _newAlert = $ '<div></div>',
            text: message,
            class: className

        _close = $ '<button></button>',
            text: 'x'
            class: 'close'

        _newAlert.prependTo holder
        _close.prependTo _newAlert

    clearAlert: (speed) -> 
        $(@).parent().fadeOut speed, ->
            $(@).remove()

new DrmModalAlert()