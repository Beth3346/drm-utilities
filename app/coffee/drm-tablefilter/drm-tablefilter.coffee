###############################################################################
# Filter Tabular Data
###############################################################################
"use strict"

( ($) ->
    class window.DrmTableFilter
        constructor: (@tableClass = 'drm-searchable-table') ->
            self = @
            self.table = $ ".#{@tableClass}"
            self.searchInput = 'drm-search-table'
            # cache full table
            self.fullRows = @table.find 'tbody tr'

            self.table.on 'keyup', "input.#{@searchInput}", ->
                that = $ @
                input = $.trim(that.val())
                columnNum = that.closest('th').index()
                self.renderTable columnNum, input

        filterRows: (columnNum, input) =>
            rows = if input.length is 0 then @fullRows else @fullRows.has "td:eq(#{columnNum}):contains(#{input})"
    
        renderTable: (columnNum, input) =>
            filteredRows = @filterRows columnNum, input
            tableBody = @table.find('tbody').empty()

            $.each filteredRows, (key, value) ->
                tableBody.append value

    new DrmTableFilter()

) jQuery