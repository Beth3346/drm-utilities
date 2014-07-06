###############################################################################
# Sort Tabular Data
###############################################################################
"use strict"

$ = jQuery
class @DrmTableSorter
    constructor: (@tableClass = 'drm-sortable-table', @activeClass = 'active', @ignoreWords = ['a','the']) ->
        self = @
        @table = $ ".#{@tableClass}"
        @buttonClass = 'drm-sortable-table-button'

        self.table.on 'click', ".#{@buttonClass}", ->
            _that = $ @
            columnNum = _that.closest('th').index()
            self.toggleActiveClass.call @, self.activeClass
            self.renderTable _that.data('dir'), columnNum

    toggleActiveClass: (className) ->
        _that = $ @
        _that.closest('tr').find(".#{className}").removeClass className
        _that.addClass className

        return

    getData: (columnNum) =>
        values = []
        _rows = @table.find 'tbody tr'

        $.each _rows, (key, value) ->
            text = $.trim $(value).find('td').eq(columnNum).text()
            if text.length > 0 then values.push text

        return values

    sortRows: (direction, columnNum) =>
        self = @
        _rows = self.table.find 'tbody tr'

        _patterns =
            number: new RegExp "^(?:\\-?\\d+|\\d*)(?:\\.?\\d+|\\d)"
            alpha: new RegExp '^[a-z ,.\\-]*','i'
            # mm/dd/yyyy
            monthDayYear: new RegExp '^(?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])(?:[-\/.][0-9]{4})'
            # 00:00pm
            time: new RegExp '^(?:[12][012]|[0]?[0-9]):[012345][0-9](?:am|pm)', 'i'

        _getDataType = (columnNum) ->
            types = []
            _values = self.getData columnNum

            _isDate = (value) ->
                return if _patterns.monthDayYear.test(value) then true else false

            _isNumber = (value) ->
                return if _patterns.number.test(value) then true else false

            _isAlpha = (value) ->
                return if _patterns.alpha.test(value) then true else false

            _isTime = (value) ->
                return if _patterns.time.test(value) then true else false

            $.each _values, (key, value) ->
                if _isDate.call self, value
                    types.push 'date'
                else if _isTime.call self, value
                    types.push 'time'
                else if _isNumber.call self, value
                    types.push 'number'
                else if _isAlpha.call self, value
                    types.push 'alpha'
                else
                    types.push null

            return if $.inArray('alpha', types) isnt -1 then 'alpha' else types[0]

        type = _getDataType columnNum
        
        if !type
            null

        else if type is 'date'
            _sortAsc = (a, b) ->
                _a = new Date _patterns.monthDayYear.exec($.trim($(a).find('td').eq(columnNum).text()))
                _b = new Date _patterns.monthDayYear.exec($.trim($(b).find('td').eq(columnNum).text()))
                return _a - _b

            _sortDesc = (a, b) ->
                _a = new Date _patterns.monthDayYear.exec($.trim($(a).find('td').eq(columnNum).text()))
                _b = new Date _patterns.monthDayYear.exec($.trim($(b).find('td').eq(columnNum).text()))
                return _b - _a

            return if direction is 'ascending' then _rows.sort _sortAsc else _rows.sort _sortDesc

        else if type is 'time'
            _parseTime = (time) ->
                _hour = parseInt(/^(\d+)/.exec(time)[1], 10)
                _minutes = /:(\d+)/.exec(time)[1]
                _ampm = /(am|pm|AM|PM)$/.exec(time)[1].toLowerCase()

                if _ampm is 'am'
                    _hour = _hour.toString()
                    
                    if _hour is '12'
                        _hour = '0'
                    else if _hour.length is 1
                        _hour = "0#{_hour}"
                        
                    return "#{_hour}:#{_minutes}"

                else if _ampm is 'pm'
                    return "#{_hour + 12}:#{_minutes}"

            _sortAsc = (a, b) ->
                _a = _parseTime _patterns.time.exec($.trim($(a).find('td').eq(columnNum).text()))
                _b = _parseTime _patterns.time.exec($.trim($(b).find('td').eq(columnNum).text()))
                return new Date("04-22-2014 #{_a}") - new Date("04-22-2014 #{_b}")

            _sortDesc = (a, b) ->
                _a = _parseTime _patterns.time.exec($.trim($(a).find('td').eq(columnNum).text()))
                _b = _parseTime _patterns.time.exec($.trim($(b).find('td').eq(columnNum).text()))
                return new Date("04-22-2014 #{_b}") - new Date("04-22-2014 #{_a}")

            return if direction is 'ascending' then _rows.sort _sortAsc else _rows.sort _sortDesc

        else if type is 'alpha'
            _cleanAlpha = (str) =>
                # removes leading 'the' or 'a'
                $.each @ignoreWords, ->
                    re = new RegExp "^#{@}\\s", 'i'
                    str = str.replace re, ''
                    return str

                return str

            _sortAsc = (a, b) ->
                # use clean alpha to remove leading 'the' or 'a' then convert to lowercase for case insensitive sort
                _a = _cleanAlpha($.trim($(a).find('td').eq(columnNum).text())).toLowerCase()
                _b = _cleanAlpha($.trim($(b).find('td').eq(columnNum).text())).toLowerCase()

                if _a < _b
                    return -1
                else if _a > _b
                    return 1
                else if _a is _b
                    return 0

            _sortDesc = (a, b) ->
                # use clean alpha to remove leading 'the' or 'a' then convert to lowercase for case insensitive sort
                _a = _cleanAlpha($.trim($(a).find('td').eq(columnNum).text())).toLowerCase()
                _b = _cleanAlpha($.trim($(b).find('td').eq(columnNum).text())).toLowerCase()

                if _a < _b
                    return 1
                else if _a > _b
                    return -1
                else if _a is _b
                    return 0

            if direction is 'ascending' then _rows.sort _sortAsc else _rows.sort _sortDesc

        else if type is 'number'
            _sortAsc = (a, b) ->
                return parseFloat($.trim($(a).find('td').eq(columnNum).text())) - parseFloat($.trim($(b).find('td').eq(columnNum).text()))

            _sortDesc = (a, b) ->
                return parseFloat($.trim($(b).find('td').eq(columnNum).text())) - parseFloat($.trim($(a).find('td').eq(columnNum).text()))

            return if direction is 'ascending' then _rows.sort _sortAsc else _rows.sort _sortDesc

    renderTable: (direction, columnNum) =>
        _sortedRows = @sortRows direction, columnNum
        tableBody = @table.find('tbody').empty()

        $.each _sortedRows, (key, value) ->
            tableBody.append value

new DrmTableSorter()