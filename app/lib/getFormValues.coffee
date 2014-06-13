getFormValues: (fields) ->
    formValues = []
    $.each fields, (key, value) ->
        formValues.push $.trim($(value).val()
    formValues