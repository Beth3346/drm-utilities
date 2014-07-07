###############################################################################
# Sort Tabular Data
###############################################################################
"use strict"
# TODO: merge with drm-sort to create a single sorting library that will sort any elements
# major difference is the use of columnNum to find data to be sorted
$ = jQuery
class @DrmTableSorter
    constructor: (@list = $('.drm-sortable-table'), @buttonClass = 'drm-sortable-table-button', @activeClass = 'active') ->
        self = @        
        @rows = @list.find 'tbody tr'

        @list.on 'click', ".#{@buttonClass}", ->
            _that = $ @
            columnNum = _that.closest('th').index()
            self.toggleActiveClass.call @, self.activeClass, 'tr'
            sortedRows = self.sortList _that.data('dir'), columnNum, self.rows
            self.renderTable sortedRows

    toggleActiveClass: (className, parent) ->
        $(@).closest(parent).find(".#{className}").removeClass(className).end().end().addClass className

    sortList: (direction, columnNum, listItems) =>
        patterns =
            number: new RegExp "^(?:\\-?\\d+|\\d*)(?:\\.?\\d+|\\d)"
            alpha: new RegExp '^[a-z ,.\\-]*','i'
            # mm/dd/yyyy
            monthDayYear: new RegExp '^(?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])(?:[-\/.][0-9]{4})'
            # 00:00pm
            time: new RegExp '^(?:[12][012]|[0]?[0-9]):[012345][0-9](?:am|pm)', 'i'
            hour: new RegExp '^(\\d+)'
            minute: new RegExp ':(\\d+)'
            ampm: new RegExp '(am|pm|AM|PM)$'
        
        sortUtilities =
            getValues: (listItems, columnNum) ->
                # creates an array of values from list items
                values = []

                listItems.each ->
                    value = $(@).find('td').eq(columnNum).text()
                    values.push $.trim(value)

                return values
            
            parseTime: (time) ->
                _hour = parseInt(patterns.hour.exec(time)[1], 10)
                _minutes = patterns.minute.exec(time)[1]
                _ampm = patterns.ampm.exec(time)[1].toLowerCase()

                if _ampm is 'am'
                    _hour = _hour.toString()
                    
                    if _hour is '12'
                        _hour = '0'
                    else if _hour.length is 1
                        _hour = "0#{_hour}"
                        
                    return "#{_hour}:#{_minutes}"

                else if _ampm is 'pm'
                    return "#{_hour + 12}:#{_minutes}"
            
            cleanAlpha: (str, ignoreWords = ['a', 'the']) ->
                # removes leading 'the' or 'a'
                $.each ignoreWords, ->
                    re = new RegExp "^#{@}\\s", 'i'
                    str = str.replace re, ''
                    return str

                return str

            sortValues: (a, b, direction = 'ascending') ->
                # test for alpha values and perform alpha sort
                if patterns.alpha.test(a)
                    if a < b
                        return if direction is 'ascending' then -1 else 1
                    else if a > b
                        return if direction is 'ascending' then 1 else -1
                    else if a is b
                        return 0
                # if values are not alpha perform an numeric sort
                else
                    return if direction is 'ascending' then a - b else b - a
        
            getDataTypes: (listItems, columnNum) =>
                self = @
                values = sortUtilities.getValues listItems, columnNum
                types = []

                $.each values, ->
                    if dataTypeChecks.isDate.call self, @
                        types.push 'date'
                    else if dataTypeChecks.isTime.call self, @
                        types.push 'time'
                    else if dataTypeChecks.isNumber.call self, @
                        types.push 'number'
                    else if dataTypeChecks.isAlpha.call self, @
                        types.push 'alpha'
                    else
                        types.push null

                return $.unique types

            sortSimpleList: (type, listItems, direction, columnNum) ->
                # sort simple list
                switch type
                    when null then return null
                    when 'date' then return comparators.sortDate listItems, direction, columnNum
                    when 'time' then return comparators.sortTime listItems, direction, columnNum
                    when 'alpha' then return comparators.sortAlpha listItems, direction, columnNum
                    when 'number' then return comparators.sortNumber listItems, direction, columnNum

            sortComplexList: (listItems, direction, columnNum) ->
                # sort complex list with two or more data types
                # group data types together
                dates = []
                times = []
                alphas = []
                numbers = []

                $.each listItems, ->
                    value = $.trim $(@).text()
                    
                    if dataTypeChecks.isDate.call self, value
                        dates.push @
                    else if dataTypeChecks.isTime.call self, value
                        times.push @
                    else if dataTypeChecks.isAlpha.call self, value
                        alphas.push @
                    else if dataTypeChecks.isNumber.call self, value
                        numbers.push @

                # sort lists individually then merge them
                comparators.sortDate dates, direction, columnNum
                comparators.sortTime times, direction, columnNum
                comparators.sortAlpha alphas, direction, columnNum
                comparators.sortNumber numbers, direction, columnNum

                return alphas.concat dates, times, numbers

        dataTypeChecks =
            isDate: (value) -> return if patterns.monthDayYear.test(value) then true else false
            isNumber: (value) -> return if patterns.number.test(value) then true else false
            isAlpha: (value) -> return if patterns.alpha.test(value) then true else false
            isTime: (value) -> return if patterns.time.test(value) then true else false
        
        comparators = 
            sortDate: (listItems, direction, columnNum) ->
                # need support for various date and time formats
                _sort = (a, b) ->
                    if dataTypeChecks.isDate($.trim($(a).find('td').eq(columnNum).text())) and dataTypeChecks.isDate($.trim($(b).find('td').eq(columnNum).text()))
                        a = new Date patterns.monthDayYear.exec($.trim($(a).find('td').eq(columnNum).text()))
                        b = new Date patterns.monthDayYear.exec($.trim($(b).find('td').eq(columnNum).text()))

                    return sortUtilities.sortValues a, b, direction

                return listItems.sort _sort 

            sortTime: (listItems, direction, columnNum) ->
                # need support for various date and time formats                
                _sort = (a, b) ->
                    if dataTypeChecks.isTime($.trim($(a).find('td').eq(columnNum).text())) and dataTypeChecks.isTime($.trim($(b).find('td').eq(columnNum).text()))
                        a = new Date "04-22-2014 #{sortUtilities.parseTime(patterns.time.exec($.trim($(a).find('td').eq(columnNum).text())))}"
                        b = new Date "04-22-2014 #{sortUtilities.parseTime(patterns.time.exec($.trim($(b).find('td').eq(columnNum).text())))}"

                    return sortUtilities.sortValues a, b, direction

                return listItems.sort _sort

            sortAlpha: (listItems, direction, columnNum) ->
                _sort = (a, b) ->
                    a = sortUtilities.cleanAlpha($.trim($(a).find('td').eq(columnNum).text())).toLowerCase()
                    b = sortUtilities.cleanAlpha($.trim($(b).find('td').eq(columnNum).text())).toLowerCase()

                    return sortUtilities.sortValues a, b, direction

                return listItems.sort _sort

            sortNumber: (listItems, direction, columnNum) ->
                _sort = (a, b) ->
                    a = parseFloat($.trim($(a).find('td').eq(columnNum).text()))
                    b = parseFloat($.trim($(b).find('td').eq(columnNum).text()))

                    return sortUtilities.sortValues a, b, direction

                return listItems.sort _sort

        types = sortUtilities.getDataTypes listItems, columnNum

        if types.length is 1
            sortUtilities.sortSimpleList types[0], listItems, direction, columnNum
        else
            sortUtilities.sortComplexList listItems, direction, columnNum

    renderTable: (sortedRows) =>
        tableBody = @list.find('tbody').empty()
        $.each sortedRows, -> tableBody.append @

new DrmTableSorter()