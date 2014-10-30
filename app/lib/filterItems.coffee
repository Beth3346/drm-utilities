filterItems: =>
    self = @
    # check other inputs
    inputs = self.table.find('th').find ".#{self.searchInput}"
    filterValues = []

    # get all input values and add them to filterValues array
    $.each inputs, (key, value) ->
        that = $ value

        if $.trim(that.val()).length isnt 0 then filterValues.push value
    
    # get filtered rows
    if filterValues.length is 0
        rows = self.fullRows
    else
        $.each filterValues, (key, value) ->
            that = $ value
            input = $.trim(that.val()).toLowerCase()
            columnNum = that.closest('th').index()

            if filterValues.length is 1
                rows = self.fullRows.has "td:eq(#{columnNum}):containsNC(#{input})"
            else if key is 0
                rows = self.fullRows.has "td:eq(#{columnNum}):containsNC(#{input})"
            else
                rows = rows.has "td:eq(#{columnNum}):containsNC(#{input})"
            rows
    rows