###############################################################################
# Client-side form validation
###############################################################################

( ($) ->

    drmForms = {

        config: {
            speed: 300
        }

        init: (config) ->
            $.extend @.config, config
            body = $ 'body'

            body.on 'click', ':disabled', (e) ->
                e.preventDefault()

            body.on 'blur', '.drm-valid-integer', @validateInteger
            body.on 'blur', '.drm-valid-number', @validateNumber
            body.on 'blur', '.drm-valid-url', @validateURL

        success: ->
            that = $ @
            drmForms.removeValidationClass.call that
            that.addClass 'drm-form-success'

        warning: ->
            that = $ @
            drmForms.removeValidationClass.call that
            that.addClass 'drm-form-warning'

        danger: ->
            that = $ @
            drmForms.removeValidationClass.call that
            that.addClass 'drm-form-danger'

        issueNotice: (status, message) ->
            that = $ @
            notice = $ '<p></p>', {
                text: message,
                class: "form-#{status}-notice"
            }
            notice.hide().insertAfter(that).slideDown 300
            removeNotice = ->
                notice.slideUp 300, -> 
                    $(@).remove()
            setTimeout(removeNotice, 3000)

        applyValidationClass: (status) ->
            that = $ @
            switch status
                when 'danger' then drmForms.danger.call that
                when 'warning' then drmForms.warning.call that
                when 'success' then drmForms.success.call that

        removeValidationClass: ->
            that = $ @
            that.removeClass 'drm-form-danger'
            that.removeClass 'drm-form-warning'
            that.removeClass 'drm-form-success'

        validateInteger: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            # an integer can be negative or positive and can include one comma separator followed by exactly 3 numbers
            re = new RegExp "^-?\\d*"

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else if result and value != result
                    status = 'warning'
                    message = 'please use integers only'
                    drmForms.issueNotice.call(that, status, message)
                else
                    status = 'danger'
                    message = 'please enter a valid integer'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            console.log "Status: #{status}"
            console.log "Value: #{value}"
            console.log "Result: #{result}"

            drmForms.applyValidationClass.call(that, status)
            that.val result

        validateNumber: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp "^-?\\d*\\.?\\d*"

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please enter a valid number'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            console.log "Status: #{status}"
            console.log "Value: #{value}"
            console.log "Result: #{result}"          

            drmForms.applyValidationClass.call(that, status)
            that.val result

        validateURL: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp "^https?:\\/\\/[\\da-z\\.-]+[\\.a-z\\.]{2,6}[\\/\\w\\.-]*\\/?$"

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please enter a valid url'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            console.log "Status: #{status}"
            console.log "Value: #{value}"
            console.log "Result: #{result}"          

            drmForms.applyValidationClass.call(that, status)
            that.val result

        validateEmail: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp ""

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please enter a valid number'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            console.log "Status: #{status}"
            console.log "Value: #{value}"
            console.log "Result: #{result}"

            drmForms.applyValidationClass.call(that, status)
            that.val result

        validateAlpha: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp ""

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please enter a valid number'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            console.log "Status: #{status}"
            console.log "Value: #{value}"
            console.log "Result: #{result}"

            drmForms.applyValidationClass.call(that, status)
            that.val result

        validateAlphaDash: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp ""

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please enter a valid number'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            console.log "Status: #{status}"
            console.log "Value: #{value}"
            console.log "Result: #{result}"

            drmForms.applyValidationClass.call(that, status)
            that.val result
    }

    drmForms.init()    
		
) jQuery