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
                values = self.getValues.call @
                console.log values
                self.getDataType values

        getValues: ->
            that = $ @
            direction = that.data 'sort'
            listId = that.data 'list'
            list = $ "ul##{listId}"
            listItems = list.find 'li'
            values = []

            listItems.each ->
                that = $ @
                values.push $.trim(that.text())

            values

        getDataType: (values) =>
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

    new DrmSort()

) jQuery