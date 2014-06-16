clearForm = (fields) ->
    fields.each ->
        that = $ @
        if that.attr('type') is 'checkbox' then that.prop 'checked', false else that.val ''