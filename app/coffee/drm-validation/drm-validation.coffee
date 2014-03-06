###############################################################################
# Client-side form validation
###############################################################################

( ($) ->

    drmForms = {

        config: {

        }

        init: (config) ->
            $.extend @.config, config
            body = $ 'body'

            body.on 'click', ':disabled', (e) ->
                e.preventDefault()

            body.on 'blur', '.drm-valid-integer', @validateInteger
            body.on 'blur', '.drm-valid-number', @validateNumber

        success: ->
            that = $ @
            that.removeClass 'drm-form-danger'
            that.removeClass 'drm-form-warning'
            that.addClass 'drm-form-success'

        warning: ->
            that = $ @
            that.removeClass 'drm-form-sucess'
            that.removeClass 'drm-form-danger'
            that.addClass 'drm-form-warning'

        danger: ->
            that = $ @
            that.removeClass 'drm-form-sucess'
            that.removeClass 'drm-form-warning'
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

        validateInteger: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp("[0-9]*", 'g')

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

            drmForms.applyValidationClass.call(that, status)
            that.val result

        validateNumber: ->
            that = $ @
            status = null
            value = $.trim(that.val())
            re = new RegExp("([0-9,.]*", 'g')

            evaluate = (result, value) ->
                if result and value == result
                    status = 'success'
                else if result and value != result
                    status = 'warning'
                    message = 'acceptable characters: 0-9 , .'
                    drmForms.issueNotice.call(that, status, message)
                else
                    status = 'danger'
                    message = 'please enter a valid number'
                    drmForms.issueNotice.call(that, status, message)
                return status

            if value
                result = $.trim(re.exec value)
                status = evaluate(result, value)            

            drmForms.applyValidationClass.call(that, status)
            that.val result

        applyValidationClass: (status) ->
            that = $ @
            switch status
                when 'danger' then drmForms.danger.call that
                when 'warning' then drmForms.warning.call that
                when 'success' then drmForms.success.call that
    }

    drmForms.init()    
		
) jQuery