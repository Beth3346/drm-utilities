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

            body.on 'keyup', '.drm-valid-integer', @validateInteger
            body.on 'keyup', '.drm-valid-number', @validateNumber
            body.on 'keyup', '.drm-valid-url', @validateURL
            body.on 'keyup', '.drm-valid-phone', @validatePhone
            body.on 'keyup', '.drm-valid-email', @validateEmail
            body.on 'keyup', '.drm-valid-full-name', @validateFullName
            body.on 'keyup', '.drm-valid-alpha', @validateAlpha
            body.on 'keyup', '.drm-valid-alphanum', @validateAlphaNum
            body.on 'keyup', '.drm-valid-alphadash', @validateAlphaNumDash
            body.on 'keyup', '.drm-valid-alpha-num-underscore', @validateAlphaNumUnderscore
            body.on 'keyup', '.drm-valid-no-spaces', @validateNoSpaces
            body.on 'keyup', '[required]', @validateRequired

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
            notices = $ ".form-#{status}-notice"
            notices.remove()
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

        validateRequired: ->
            that = $ @
            status = null
            value = $.trim(that.val())

            if value.length == 0
                status = 'danger'
                message = 'this field is required'
                drmForms.issueNotice.call(that, status, message)

            drmForms.applyValidationClass.call(that, status)

        validate: (re, type) ->
            that = $ @
            status = null
            value = $.trim(that.val())
            # an integer can be negative or positive and can include one comma separator followed by exactly 3 numbers
            re = new RegExp "^\\-?\\d*"

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please enter a valid integer'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            drmForms.applyValidationClass.call(that, status)

        validateInteger: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            # an integer can be negative or positive and can include one comma separator followed by exactly 3 numbers
            re = new RegExp "^\\-?\\d*"

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please enter a valid integer'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            drmForms.applyValidationClass.call(that, status)

        validateNumber: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp "^\\-?\\d*\\.?\\d*"

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

            drmForms.applyValidationClass.call(that, status)

        validateURL: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp('^https?:\\/\\/[\\da-z\\.\\-]+[\\.a-z]{2,6}[\\/\\w/.\\-]*\\/?$','gi')

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

            drmForms.applyValidationClass.call(that, status)

        validateEmail: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp('^[a-z][a-z\\-\\_\\.\\d]*@[a-z\\-\\_\\.\\d]*\\.[a-z]{2,6}$','gi')

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please enter a valid email address'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            drmForms.applyValidationClass.call(that, status)

        validatePhone: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp('^\\(?\\d{3}[\\)\\-\\.]?\\d{3}[\\-\\.]?\\d{4}(?:[xX]\\d+)?$','gi')

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please enter a valid phone number'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            drmForms.applyValidationClass.call(that, status)

        validateFullName: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp('^[a-z]+ [a-z\\.\\- ]+$','gi')

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please enter your first and last name'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            drmForms.applyValidationClass.call(that, status)

        validateAlpha: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp('^[a-z]*','gi')

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please use alpha characters only'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            drmForms.applyValidationClass.call(that, status)

        validateAlphaNum: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp('^[a-z\\d]*$','gi')

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please use alphanumeric characters only'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            drmForms.applyValidationClass.call(that, status)

        validateNoSpaces: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp('^\\S*$','gi')

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'no spaces'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            drmForms.applyValidationClass.call(that, status)

        validateAlphaNumDash: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp('^[a-z\\d-]*$','gi')

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please use alphanumeric and dashes only'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            drmForms.applyValidationClass.call(that, status)

        validateAlphaNumUnderscore: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp('^[a-z\\d_]*$','gi')

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'please use alphanumeric and underscores only'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            console.log "Status: #{status}"
            console.log "Value: #{value}"
            console.log "Result: #{result}"

            drmForms.applyValidationClass.call(that, status)

        validateNoTags: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp('<[a-z]+.*>.*<\/[a-z]+>','gi')

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else
                    status = 'danger'
                    message = 'no html tags allowed'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)

            console.log "Status: #{status}"
            console.log "Value: #{value}"
            console.log "Result: #{result}"

            drmForms.applyValidationClass.call(that, status)
    }

    drmForms.init()    
		
) jQuery