getFormInput = (form) ->
    # get form data and return an object
    # need to remove dashes from ids
    formInput = {}
    fields = form.find(':input').not('button').not ':checkbox'
    checkboxes = form.find 'input:checked'

    if checkboxes.length isnt 0
        boxIds = []

        checkboxes.each ->
            boxIds.push $(@).attr 'id'

        boxIds = $.unique boxIds

        $.each boxIds, ->
            checkboxValues = []
            boxes = form.find "input:checked##{@}"

            boxes.each ->
                checkboxValues.push $.trim($(@).val())

            formInput["#{@}"] = checkboxValues
            return

    $.each fields, ->
        that = $ @
        id = that.attr 'id'

        input = if $.trim(that.val()) is '' then null else $.trim(that.val())

        if input? then formInput["#{id}"] = input
        return

    formInput