###############################################################################
# Creates timestamps relative to current time
###############################################################################
"use strict"

$ = jQuery
class @DrmTimeStamps
    constructor: (@timestamps = $('.drm-timestamp')) ->
        self = @
        @now = new Date()
        @today =
            month: @now.getMonth()
            day: @now.getDay()
            date: @now.getDate()
            year: @now.getFullYear()
            hour: @now.getHours()
            minute: @now.getMinutes()
            second: @now.getSeconds()
        @prettyDate = $ '.drm-pretty-date'
        @patterns =
            longDate: new RegExp '^(?:[a-z]*[\\.,]?\\s)?[a-z]*\\.?\\s(?:[3][01]\\s|[012][1-9]\\s|[1-9]\\s)[0-9]{4}$', 'i'
            shortDate: new RegExp '((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})'
            longTime: new RegExp '((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\\:[012345][0-9])?(?:am|pm)?)', 'i'

        @months = [
            'January'
            'February'
            'March'
            'April'
            'May'
            'June'
            'July'
            'August'
            'September'
            'October'
            'November'
            'December'
        ]

        @shortMonths = [
            'Jan'
            'Feb'
            'Mar'
            'Apr'
            'May'
            'Jun'
            'Jul'
            'Aug'
            'Sep'
            'Oct'
            'Nov'
            'Dec'
        ]

        @days = [
            'Sunday'
            'Monday'
            'Tuesday'
            'Wednesday'
            'Thursday'
            'Friday'
            'Saturday'
        ]

        @shortDays = [
            'Sun'
            'Mon'
            'Tues'
            'Wed'
            'Thurs'
            'Fri'
            'Sat'
        ]

        $.each @prettyDate, ->
            item = $(@).text()
            date = self.parseDate item
            self.prettifyDate date

        setInterval =>
            self = @
            @now = new Date()
            @today =
                month: @now.getMonth()
                day: @now.getDay()
                date: @now.getDate()
                year: @now.getFullYear()
                hour: @now.getHours()
                minute: @now.getMinutes()
                second: @now.getSeconds()
            
            prettyNow = @prettifyDate @now
            $('.drm-now').text prettyNow
            
            $.each @timestamps, ->
                item = $(@).text()
                date = self.parseDate item
                return
        , 1000

    capitalize: (str) ->
        str.toLowerCase().replace /^.|\s\S/g, (a) ->
            a.toUpperCase()

    now: ->
        return new Date()

    parseDate: (item) =>
        # check for Yesterday, Today, Tomorrow strings and look for time
        item = item.toLowerCase()

        _getDaysInMonth = (month, year) ->
            # returns the number of days in a month
            _month = month + 1
            new Date(year, _month, 0).getDate()

        _parseDate = (item) =>
            date = {}
            # look for date keywords yesterday, today, tomorrow
            if item.search(/^(yesterday|today|tomorrow)/) isnt -1
                _fullDate = item.match /^(yesterday|today|tomorrow)/i
                _fullDate = _fullDate[0]
                _lastMonth = if @today.month is 0 then 11 else @today.month - 1
                _nextMonth = if @today.month is 11 then 0 else @today.month + 1

                _lastDateInMonth = _getDaysInMonth @today.month, @today.year
                _lastDateInLastMonth = _getDaysInMonth _lastMonth, @today.year

                if _fullDate is 'yesterday'
                    date.date = if @today.date is 1 then _lastDateInLastMonth else @today.date - 1
                    date.month = if @today.date is 1 then _lastMonth else @today.month
                    date.year = if (@today.month is 0) and (@today.date is 1) then @today.year - 1 else @today.year
                else if _fullDate is 'today'
                    date.date = @today.date
                    date.month = @today.month
                    date.year = @today.year
                else if _fullDate is 'tomorrow'
                    date.date = if @today.date is _lastDateInMonth then 1 else @today.date + 1
                    date.month = if @today.date is _lastDateInMonth then _nextMonth else @today.month
                    date.year = if (@today.month is 11) and (@today.date is _lastDateInMonth) then @today.year + 1 else @today.year

                return date
                
            # look for month names
            else if item.search(/^(?:[a-z]*[\.,]?\s)?[a-z]*\.?\s(?:[3][01]\s|[012][1-9]\s|[1-9]\s)[0-9]{4}$/i) isnt -1
                # month or day of the week
                _dayMonth = item.match /^(?:[a-z]*[\.,]?\s)?[a-z]*/
                _dayMonth = $.trim _dayMonth[0]
                _dayMonth = _dayMonth.replace /[\.,]/, ''
                
                if _dayMonth.search(/\s/) isnt -1
                    _dayMonth = _dayMonth.split(' ')
                    date.month = _dayMonth[1]
                else
                    date.month = _dayMonth

                _months = $.map @months, (item) ->
                    item.toLowerCase()

                _shortMonths = $.map @shortMonths, (item) ->
                    item.toLowerCase()

                if date.month in _months
                    date.month = $.inArray(date.month, @months)
                else if date.month in _shortMonths
                    date.month = $.inArray(date.month, @shortMonths)

                date.date = item.match /\s(?:([3][01])\s|([012][1-9])\s|([1-9])\s)/
                if date.date[1]?
                    date.date = parseInt(date.date[1], 10)
                else if date.date[2]?
                    date.date = parseInt(date.date[2], 10)
                else if date.date[3]?
                    date.date = parseInt(date.date[3], 10)

                date.year = item.match /([0-9]{4})$/
                date.year = parseInt(date.year[1], 10)

                return date

            else if item.search(/((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})/) isnt -1
                _fullDate = item.match /((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})/
                _fullDate = _fullDate[0]

                date.month = _fullDate.match /^([0]?[1-9]|[1][012]|[1-9])/
                date.month = parseInt(date.month[0], 10) - 1

                date.date = _fullDate.match /[\.\/\-]([012]?[0-9])[\.\/\-]/
                date.date = parseInt(date.date[1], 10)

                date.year = _fullDate.match /([0-9]{4})/
                date.year = parseInt(date.year[0], 10)

                return date

            else
                return

        _parseTime = (item) =>
            _fullTime = item.match /((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\:[012345][0-9])?(?:am|pm)?)/i
       
            if _fullTime?
                time = {}
                _fullTime = _fullTime[0]
                _ampm = _fullTime.match /(am|pm)/i
                _ampm = _ampm[1]

                time.hour = _fullTime.match /^(?:([12][012]):|([0]?[0-9]):)/
                time.hour = if time.hour[1]? then parseInt(time.hour[1], 10) else parseInt(time.hour[2], 10)

                time.hour = if _ampm is 'pm' and time.hour < 12 then time.hour + 12 else time.hour
                
                time.minute = _fullTime.match /\:([012345][0-9])/
                time.minute = parseInt(time.minute[1], 10)
                
                time.second = _fullTime.match /\:(?:[012345][0-9])\:([012345][0-9])/
                time.second = if time.second? then parseInt(time.second[1], 10) else @today.second

                return time
            else
                return

        date = _parseDate item
        time = _parseTime item
        
        if date? and time?
            return new Date date.year, date.month, date.date, time.hour, time.minute, time.second
        else if date? and !time
            return new Date date.year, date.month, date.date, @today.hour, @today.minute, @today.second
        else if !date and time?
            return new Date @today.year, @today.month, @today.date, time.hour, time.minute, time.second

    prettifyDate: (date, format = 'dddd, mmmm dd yyyy, hh:mm:ss') =>
        # format date and time
        pretty = {}
        pretty.day = date.getDay()
        pretty.month = date.getMonth()
        pretty.date = date.getDate().toString()
        pretty.year = date.getFullYear().toString()
        pretty.hour = if date.getHours() > 12 then date.getHours() - 12 else date.getHours()
        pretty.hour = pretty.hour.toString()
        pretty.minute = date.getMinutes().toString()
        pretty.minute = if pretty.minute.length is 1 then "0#{pretty.minute}" else pretty.minute
        pretty.second = date.getSeconds().toString()
        pretty.second = if pretty.second.length is 1 then "0#{pretty.second}" else pretty.second
        pretty.ampm = if date.getHours() > 12 then 'pm' else 'am'
        
        return "#{@days[pretty.day]}, #{@months[pretty.month]} #{pretty.date} #{pretty.year}, #{pretty.hour}:#{pretty.minute}:#{pretty.second} #{pretty.ampm}"

    elapseTime: (date) ->
        # display a date and time relative to now ex. 2 hours ago
        console.log date

    countdownTo: (date) ->
        # display a running countdown
        console.log date

    calendarTime: (date) ->
        # display a date and time relative to now using calendar date format
        # ex. Next Tuesday at 2:24pm
        console.log date

new DrmTimeStamps()