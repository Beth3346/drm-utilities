###############################################################################
# Easy list sorting
###############################################################################
"use strict"

$ = jQuery
# all items in the list should be the same data type
# need to update sort methods for lists that contain more than one data type eg. dates and alpha for DrmCalendar

class @DrmSort
    constructor: (@lists = $('.drm-sortable'), @autoSort = yes) ->
        self = @
        @ignoreWords = [
            'a'
            'the'
        ]

        if self.autoSort
            $.each @lists,  ->
                _that = $ @
                values = self.getValues _that
                self.renderSort values, 'ascending', _that

        $('body').on 'click', '.drm-sort-list', ->
            _that = $ @
            _listId = _that.data 'list'
            list = $ "ul##{_listId}"
            values = self.getValues.call @, list
            direction = $(@).data 'sort'
            self.renderSort values, direction, list

    getValues: (list) ->
        _that = $ @
        _listItems = list.find 'li'
        values = []

        _listItems.each ->
            _that = $ @
            values.push $.trim(_that.text())

        return values

    sortList: (values, direction, list) =>
        _listItems = list.find 'li'
        _patterns =
            number: new RegExp "^(?:\\-?\\d+|\\d*)(?:\\.?\\d+|\\d)"
            alpha: new RegExp '^[a-z ,.\\-]*','i'
            # mm/dd/yyyy
            monthDayYear: new RegExp '^(?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])(?:[-\/.][0-9]{4})'
            # 00:00pm
            time: new RegExp '^(?:[12][012]|[0]?[0-9]):[012345][0-9](?:am|pm)', 'i'

        dataTypeChecks =
            isDate: (value) -> return if _patterns.monthDayYear.test(value) then true else false
            isNumber: (value) -> return if _patterns.number.test(value) then true else false
            isAlpha: (value) -> return if _patterns.alpha.test(value) then true else false
            isTime: (value) -> return if _patterns.time.test(value) then true else false
        
        _getDataType = (values) =>
            self = @
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

            return $.unique(types)

        sortItems = 
            sortDate: (list) ->
                _sort = (a, b) ->
                    if dataTypeChecks.isDate($.trim($(a).text())) and dataTypeChecks.isDate($.trim($(b).text()))
                        _a = new Date _patterns.monthDayYear.exec($.trim($(a).text()))
                        _b = new Date _patterns.monthDayYear.exec($.trim($(b).text()))

                    if direction is 'ascending' then return _a - _b else return _b - _a

                return list.sort _sort 

            sortTime: (list) ->
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
                
                _sort = (a, b) ->
                    if dataTypeChecks.isTime($.trim($(a).text())) and dataTypeChecks.isTime($.trim($(b).text()))
                        _a = _parseTime _patterns.time.exec($.trim($(a).text()))
                        _b = _parseTime _patterns.time.exec($.trim($(b).text()))

                    if direction is 'ascending'
                        return new Date("04-22-2014 #{_a}") - new Date("04-22-2014 #{_b}") 
                    else
                        new Date("04-22-2014 #{_b}") - new Date("04-22-2014 #{_a}")

                return list.sort _sort

            sortAlpha: (list) =>
                _cleanAlpha = (str) =>
                    # removes leading 'the' or 'a'
                    $.each @ignoreWords, ->
                        re = new RegExp "^#{@}\\s", 'i'
                        str = str.replace re, ''
                        return str

                    return str
                
                _sort = (a, b) ->
                    _a = _cleanAlpha($.trim($(a).text())).toLowerCase()
                    _b = _cleanAlpha($.trim($(b).text())).toLowerCase()

                    if direction is 'ascending'
                        if _a < _b
                            return -1
                        else if _a > _b
                            return 1
                        else if _a is _b
                            return 0
                    else 
                        if _a < _b
                            return 1
                        else if _a > _b
                            return -1
                        else if _a is _b
                            return 0

                return list.sort _sort

            sortNumber: (list) ->
                _sort = (a, b) ->
                    if direction is 'ascending'
                        return parseFloat($.trim($(a).text())) - parseFloat($.trim($(b).text()))
                    else 
                        return parseFloat($.trim($(b).text())) - parseFloat($.trim($(a).text()))

                return list.sort _sort

        types = _getDataType values

        if types.length is 1
            type = types[0]
            switch type
                when null then return null
                when 'date' then return sortItems.sortDate(_listItems)
                when 'time' then return sortItems.sortTime(_listItems)
                when 'alpha' then return sortItems.sortAlpha(_listItems)
                when 'number' then return sortItems.sortNumber(_listItems)
        else
            # group data types together
            # sort lists individually then merge them
            dates = []
            times = []
            alphas = []
            numbers = []

            $.each _listItems, ->
                value = $.trim $(@).text()
                
                if dataTypeChecks.isDate.call self, value
                    dates.push @
                else if dataTypeChecks.isTime.call self, value
                    times.push @
                else if dataTypeChecks.isAlpha.call self, value
                    alphas.push @
                else if dataTypeChecks.isNumber.call self, value
                    numbers.push @

            sortItems.sortDate dates
            sortItems.sortTime times
            sortItems.sortAlpha alphas
            sortItems.sortNumber numbers

            return alphas.concat dates, times, numbers

    renderSort: (values, direction, list) =>
        _sortedList = @sortList values, direction, list

        if _sortedList?
            list.empty()
            $.each _sortedList, ->
                list.append @

new DrmSort()