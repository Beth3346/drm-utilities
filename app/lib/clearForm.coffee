clearForm: (fields) ->
    $.each fields, (key, value) ->
        $(@).val ''