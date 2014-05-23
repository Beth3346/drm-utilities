###############################################################################
# Easy list sorting
###############################################################################
"use strict"

# all items should be the same data type
( ($) ->
    class window.DrmSort
        constructor: (@lists = $('.drm-sortable')) ->
            self = @

            $('.drm-sort-list').on 'click', ->
                that = $ @
                listId = that.data 'list'
                list = $ "ul##{listId}"
                values = self.getValues.call @, list
                direction = $(@).data 'sort'
                self.renderSort values, direction, list

        getValues: (list) ->
            that = $ @
            listItems = list.find 'li'
            values = []

            listItems.each ->
                that = $ @
                values.push $.trim(that.text())

            values

        getDataType: (values) =>
            type = null
            _patterns =
                # an integer can be negative or positive and can include one comma separator followed by exactly 3 numbers
                integer: new RegExp "^\\-?\\d*"
                number: new RegExp "^\\-?\\d*\\.?\\d*"
                alpha: new RegExp '^[a-z ]*','i'
                # mm/dd/yyyy
                monthDayYear: new RegExp '^(?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4}$'
                # 00:00pm
                time: new RegExp '^(?:[12][012]|[0]?[0-9]):[012345][0-9](?:am|pm)$', 'i'

            _isDate = (value) ->
                result = $.trim _patterns.monthDayYear.exec(value)
                if value is result then true else false

            _isInteger = (value) ->
                result = $.trim _patterns.integer.exec(value)
                if value is result then true else false

            _isNumber = (value) ->
                result = $.trim _patterns.number.exec(value)
                if value is result then true else false

            _isAlpha = (value) ->
                result = $.trim _patterns.alpha.exec(value)
                if value is result then true else false

            _isTime = (value) ->
                result = $.trim _patterns.time.exec(value)
                if value is result then true else false

            $.each values, (key, value) ->
                if _isDate value
                    type = 'date'
                else if _isInteger value
                    type = 'integer'
                else if _isNumber value
                    type = 'number'
                else if _isAlpha value
                    type = 'alpha'
                else if _isTime value
                    type = 'time'
                else
                    type = 'unknown'

            type

        sortValues: (values, direction) =>
            type = @getDataType values

            if type is 'alpha'

                _sortAsc = (a, b) ->
                    a = a.toLowerCase()
                    b = b.toLowerCase()
                    if (a < b)
                        -1
                    else if (a > b)
                        1
                    else if a is b
                        0

                _sortDesc = (a, b) ->
                    a = a.toLowerCase()
                    b = b.toLowerCase()
                    if (a < b)
                        1
                    else if (a > b)
                        -1
                    else if a is b
                        0

                values = if direction is 'ascending' then values.sort _sortAsc else values.sort _sortDesc

            else if type is 'integer'

                _sortAsc = (a, b) ->
                    parseInt(a, 10) - parseInt(b, 10)

                _sortDesc = (a, b) ->
                    parseInt(b, 10) - parseInt(a, 10)

                values = if direction is 'ascending' then values.sort _sortAsc else values.sort _sortDesc

            else if type is 'number'

                _sortAsc = (a, b) ->
                    parseFloat(a) - parseFloat(b)

                _sortDesc = (a, b) ->
                    parseFloat(b) - parseFloat(a)

                values = if direction is 'ascending' then values.sort _sortAsc else values.sort _sortDesc

            else if type is 'date'

                _sortAsc = (a, b) ->
                    a = new Date a
                    b = new Date b
                    a - b

                _sortDesc = (a, b) ->
                    a = new Date a
                    b = new Date b
                    b - a

                values = if direction is 'ascending' then values.sort _sortAsc else values.sort _sortDesc

            else if type is 'time'
                _parseTime = (time) ->
                    hour = parseInt(/^(\d+)/.exec(time)[1], 10)
                    minutes = /:(\d+)/.exec(time)[1]
                    ampm = /(am|pm|AM|PM)$/.exec(time)[1].toLowerCase()

                    if ampm is 'am'
                        hour = hour.toString()
                        
                        if hour is '12'
                            hour = '0'
                        else if hour.length is 1
                            hour = "0#{hour}"
                            
                        time24 = "#{hour}:#{minutes}"

                    else if ampm is 'pm'
                        time24 = "#{hour + 12}:#{minutes}"

                _sortAsc = (a, b) ->
                    a = _parseTime(a)
                    b = _parseTime(b)
                    new Date("04-22-2014 #{a}") - new Date("04-22-2014 #{b}")

                _sortDesc = (a, b) ->
                    a = _parseTime(a)
                    b = _parseTime(b)
                    new Date("04-22-2014 #{b}") - new Date("04-22-2014 #{a}")

                values = if direction is 'ascending' then values.sort _sortAsc else values.sort _sortDesc

        renderSort: (values, direction, list) =>
            values = @sortValues values, direction
            listHtml = ''

            $.each values, (key, value) ->
                listHtml += "<li>#{value}</li>"

            list.html listHtml

    new DrmSort()

) jQuery