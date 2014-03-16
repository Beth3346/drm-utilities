###############################################################################
# Displays removable alerts for web apps
###############################################################################

( ($) ->
    class @DrmAlert
        constructor: (@alertClass, @speed) ->
            @alert = $ ".#{alertClass}"

        showAlert: (type, message, holder) ->
            className = "#{type}-alert #{@alertClass}"
            newAlert = $('<div></div>', {
                text: message,
                class: className
            }).prependTo holder

            close = $('<button></button>', {
                text: 'x'
                class: 'close'
            }).prependTo newAlert

            return newAlert

        clearAlert: ->
            $(@).parent().fadeOut @speed, ->
                $(@).remove()
    return
) jQuery	