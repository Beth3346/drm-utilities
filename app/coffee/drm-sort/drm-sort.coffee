###############################################################################
# Easy list sorting
###############################################################################
"use strict"

$ = jQuery
# all items in the list should be the same data type

class @DrmSort
    constructor: (@lists = $('.drm-sortable'), @autoSort = yes) ->
        self = @
        @ignoreWords = [
            'a'
            'the'
        ]

        if self.autoSort
            $.each self.lists,  ->
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

    sortValues: (values, direction) =>
        _patterns =
            number: new RegExp "^(?:\\-?\\d+|\\d*)(?:\\.?\\d+|\\d)"
            alpha: new RegExp '^[a-z ,.\\-]*','i'
            # mm/dd/yyyy
            monthDayYear: new RegExp '^(?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])(?:[-\/.][0-9]{4})'
            # 00:00pm
            time: new RegExp '^(?:[12][012]|[0]?[0-9]):[012345][0-9](?:am|pm)', 'i'

        _getDataType = (values) =>
            self = @
            types = []

            _isDate = (value) ->
                return if _patterns.monthDayYear.test(value) then true else false

            _isNumber = (value) ->
                return if _patterns.number.test(value) then true else false

            _isAlpha = (value) ->
                return if _patterns.alpha.test(value) then true else false

            _isTime = (value) ->
                return if _patterns.time.test(value) then true else false

            $.each values, ->
                if _isDate.call self, @
                    types.push 'date'
                else if _isTime.call self, @
                    types.push 'time'
                else if _isNumber.call self, @
                    types.push 'number'
                else if _isAlpha.call self, @
                    types.push 'alpha'
                else
                    types.push null

            return if $.inArray('alpha', types) isnt -1 then 'alpha' else types[0]

        type = _getDataType values

        if !type
            return null

        else if type is 'date'
            _sortAsc = (a, b) ->
                _a = new Date _patterns.monthDayYear.exec(a)
                _b = new Date _patterns.monthDayYear.exec(b)
                return _a - _b

            _sortDesc = (a, b) ->
                _a = new Date _patterns.monthDayYear.exec(a)
                _b = new Date _patterns.monthDayYear.exec(b)
                return _b - _a

            return if direction is 'ascending' then values.sort _sortAsc else values.sort _sortDesc    

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
                _a = _parseTime _patterns.time.exec(a)
                _b = _parseTime _patterns.time.exec(b)
                
                return new Date("04-22-2014 #{_a}") - new Date("04-22-2014 #{_b}")

            _sortDesc = (a, b) ->
                _a = _parseTime _patterns.time.exec(a)
                _b = _parseTime _patterns.time.exec(b)
                
                return new Date("04-22-2014 #{_b}") - new Date("04-22-2014 #{_a}")

            return if direction is 'ascending' then values.sort _sortAsc else values.sort _sortDesc

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
                _a = _cleanAlpha(a).toLowerCase()
                _b = _cleanAlpha(b).toLowerCase()

                if _a < _b
                    return -1
                else if _a > _b
                    return 1
                else if _a is _b
                    return 0

            _sortDesc = (a, b) ->
                # use clean alpha to remove leading 'the' or 'a' then convert to lowercase for case insensitive sort
                _a = _cleanAlpha(a).toLowerCase()
                _b = _cleanAlpha(b).toLowerCase()

                if _a < _b
                    return 1
                else if _a > _b
                    return -1
                else if _a is _b
                    return 0

            return if direction is 'ascending' then values.sort _sortAsc else values.sort _sortDesc

        else if type is 'number'
            _sortAsc = (a, b) ->
                return parseFloat(a) - parseFloat(b)

            _sortDesc = (a, b) ->
                return parseFloat(b) - parseFloat(a)

            return if direction is 'ascending' then values.sort _sortAsc else values.sort _sortDesc

    renderSort: (values, direction, list) =>
        values = @sortValues values, direction
        listHtml = ''

        if values?
            $.each values, (key, value) ->
                listHtml += "<li>#{value}</li>"

            list.html listHtml

        return

new DrmSort()