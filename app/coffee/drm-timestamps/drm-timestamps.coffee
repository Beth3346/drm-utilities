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
            month: self.now.getMonth()
            day: self.now.getDay()
            date: self.now.getDate()
            year: self.now.getFullYear()
            hour: self.now.getHours()
            minute: self.now.getMinutes()
            second: self.now.getSeconds()

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

        @days = [
            'Sunday'
            'Monday'
            'Tuesday'
            'Wednesday'
            'Thursday'
            'Friday'
            'Saturday'
        ]

        $('.drm-now').text "#{@days[@today.day]}, #{@months[@today.month]} #{@today.date} #{@today.year} #{@today.hour}:#{@today.minute}:#{@today.second}"

        $.each @timestamps, ->
            item = $(@).text()
            date = self.parseDate item
            console.log date

    parseDate: (item) ->
        # check for Yesterday, Today, Tomorrow strings and look for time
        item = item.toLowerCase()

        _getDaysInMonth = (month, year) ->
            # returns the number of days in a month
            month = month + 1
            new Date(year, month, 0).getDate()

        if item.search(/^(yesterday|today|tomorrow)/) isnt -1
            fullDate = item.match /^(yesterday|today|tomorrow)/i
            fullDate = fullDate[0]
            lastMonth = if @today.month is 0 then 11 else @today.month - 1
            nextMonth = if @today.month is 11 then 0 else @today.month + 1

            lastDateInMonth = _getDaysInMonth @today.month, @today.year
            lastDateInLastMonth = _getDaysInMonth lastMonth, @today.year

            if fullDate is 'yesterday'
                date = if @today.date is 1 then lastDateInLastMonth else @today.date - 1
                month = if @today.date is 1 then lastMonth else @today.month
                year = if (@today.month is 0) and (@today.date is 1) then @today.year - 1 else @today.year
            else if fullDate is 'today'
                date = @today.date
                month = @today.month
                year = @today.year
            else if fullDate is 'tomorrow'
                date = if @today.date is lastDateInMonth then 1 else @today.date + 1
                month = if @today.date is lastDateInMonth then nextMonth else @today.month
                year = if (@today.month is 11) and (@today.date is lastDateInMonth) then @today.year + 1 else @today.year

        else
            fullDate = item.match /((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})/
            fullDate = fullDate[0]

            month = fullDate.match /^([0]?[1-9]|[1][012]|[1-9])/
            month = parseInt(month[0], 10)

            date = fullDate.match /[\.\/\-]([012]?[0-9])[\.\/\-]/
            date = parseInt(date[1], 10)

            year = fullDate.match /([0-9]{4})/
            year = parseInt(year[0], 10)

        time = item.match /((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\:[012345][0-9])?(?:am|pm)?)/i
   
        if time?
            time = time[0]
            ampm = time.match /(am|pm)/i
            ampm = ampm[1]

            hour = time.match /^(?:([12][012]):|([0]?[0-9]):)/
            hour = if hour[1]? then parseInt(hour[1], 10) else parseInt(hour[2], 10)

            hour = if ampm is 'pm' then hour + 12 else hour
            
            minute = time.match /\:([012345][0-9])/
            minute = parseInt(minute[1], 10)
            
            second = time.match /\:(?:[012345][0-9])\:([012345][0-9])/
            second = if second? then parseInt(second[1], 10) else @today.second
        else
            hour = @today.hour
            minute = @today.minute            
            second = @today.second

        return new Date year, month, date, hour, minute, second

new DrmTimeStamps()