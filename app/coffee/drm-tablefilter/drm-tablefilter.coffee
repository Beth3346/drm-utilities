###############################################################################
# Filter Tabular Data
###############################################################################
"use strict"

# adds case insensitive contains to jQuery

$.extend $.expr[":"], {
    "containsNC": (elem, i, match, array) ->
        (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0
}

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
                input = $.trim(that.val()).toLowerCase()
                columnNum = that.closest('th').index()
                self.renderTable columnNum, input

        filterRows: (columnNum, input) =>
            rows = if input.length is 0 then @fullRows else @fullRows.has "td:eq(#{columnNum}):containsNC(#{input})"
    
        renderTable: (columnNum, input) =>
            tableBody = @table.find('tbody').empty()
            filteredRows = @filterRows columnNum, input

            $.each filteredRows, (key, value) ->
                tableBody.append value

    new DrmTableFilter()

) jQuery