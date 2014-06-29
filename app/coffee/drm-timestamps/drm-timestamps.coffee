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
            longDate: new RegExp '^(?:[a-z]*[\\.,]?\\s)?[a-z]*\\.?\\s(?:[3][01],?\\s|[012][1-9],?\\s|[1-9],?\\s)[0-9]{4}$', 'i'
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
            _that = $ @
            item = _that.text()
            date = self.parseDate item
            prettyDate = self.prettifyDate date
            
            _that.text prettyDate
            
        $.each self.timestamps, ->
            _that = $ @
            item = _that.text()
            date = self.parseDate item
            elapse = self.elapseTime date
            
            _that.text elapse

        setInterval ->
            self.now = new Date()
            self.today =
                month: self.now.getMonth()
                day: self.now.getDay()
                date: self.now.getDate()
                year: self.now.getFullYear()
                hour: self.now.getHours()
                minute: self.now.getMinutes()
                second: self.now.getSeconds()            
            prettyNow = self.prettifyDate self.now
            
            $('.drm-now').text prettyNow
        , 1000

        # $.each @prettyDate, ->
        #     _that = $ @
        #     item = _that.text()

        #     setInterval ->
        #         date = self.parseDate item
        #         prettyDate = self.prettifyDate date
        #         _that.text prettyDate
        #     , 1000
            
        # $.each self.timestamps, ->
        #     _that = $ @
        #     item = _that.text()

        #     setInterval ->
        #         date = self.parseDate item
        #         prettyDate = self.prettifyDate date
        #         _that.text prettyDate
        #     , 1000

        # testDate = new Date 2014, 5, 24, 23, 41, 0
        # testDate2 = new Date 2014, 5, 27, 23, 41, 0
        # testDate3 = new Date 2014, 3, 27, 23, 41, 0
        # testDate4 = new Date 2014, 7, 27, 23, 41, 0
        # testDate5 = new Date 1914, 3, 27, 23, 41, 0
        # testDate6 = new Date 2016, 7, 27, 23, 41, 0
        # testDate7 = new Date 2014, 5, 26, 23, 41, 32
        # testDate8 = new Date 2014, 5, 27, 16, 37, 32
        # console.log self.elapseTime(testDate)
        # console.log self.elapseTime(testDate2)
        # console.log self.elapseTime(testDate3)
        # console.log self.elapseTime(testDate4)
        # console.log self.elapseTime(testDate5)
        # console.log self.elapseTime(testDate6)
        # console.log self.elapseTime(testDate7)
        # console.log self.elapseTime(testDate8)

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
            else if item.search(/^(?:[a-z]*[\.,]?\s)?[a-z]*\.?\s(?:[3][01],?\s|[012][1-9],?\s|[1-9],?\s)[0-9]{4}$/i) isnt -1
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
                    date.month = $.inArray(date.month, _months)
                else if date.month in _shortMonths
                    date.month = $.inArray(date.month, _shortMonths)

                date.date = item.match /\s(?:([3][01]),?\s|([012][1-9]),?\s|([1-9]),?\s)/
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

        _parseTime = (item) ->
            _fullTime = item.match /((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\:[012345][0-9])?(?:am|pm)?)/i
       
            if _fullTime?
                time = {}
                _fullTime = _fullTime[0]
                _ampm = _fullTime.match /(am|pm)$/i
                _ampm = _ampm[1]

                time.hour = _fullTime.match /^(?:([12][012]):|([0]?[0-9]):)/
                time.hour = if time.hour[1]? then parseInt(time.hour[1], 10) else parseInt(time.hour[2], 10)
                
                if _ampm is 'am' and time.hour is 12
                    time.hour = 0
                else if _ampm is 'pm' and time.hour < 12
                    time.hour = time.hour + 12
                
                time.minute = _fullTime.match /\:([012345][0-9])/
                time.minute = parseInt(time.minute[1], 10)
                
                time.second = _fullTime.match /\:(?:[012345][0-9])\:([012345][0-9])/
                time.second = if time.second? then parseInt(time.second[1], 10) else 0

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

    prettifyDate: (date, dateFormat = 'dddd, MMMM DD yyyy, hh:mm:ss a') =>
        # format date and time
        
        _getHours = (date) ->
            if date.getHours() is 0
                _hrs = 12
            else if date.getHours() > 12
                _hrs = date.getHours() - 12 
            else 
                _hrs = date.getHours()
            
            return _hrs.toString()

        format = {}
        
        # get day format options
        if dateFormat.match /dddd/
            format.dddd = "#{@days[date.getDay()]}" # long day name
        else if dateFormat.match /ddd/
            format.ddd = "#{@shortDays[date.getDay()]}" # short day name

        # get month format options
        if dateFormat.match /MMMM/
            format.MMMM = "#{@months[date.getMonth()]}" # long month name
        else if dateFormat.match /MMM/
            format.MMM = "#{@shortMonths[date.getMonth()]}" # short month name
        else if dateFormat.match /MM/
            format.MM = if date.getMonth().toString().length is 1 then "0#{date.getMonth().toString()}" else date.getMonth() # two digit month
        else if dateFormat.match /M/
            format.M = date.getMonth() # one digit month

        # get date format options        
        if dateFormat.match /DD/    
            format.DD = if date.getDate().toString().length is 1 then "0#{date.getDate().toString()}" else date.getDate() # two digit date
        else if dateFormat.match /D/
            format.D = date.getDate() # one digit date

        # get year format options        
        if dateFormat.match /yyyy/
            format.yyyy = date.getFullYear() # four digit year
        else if dateFormat.match /yy/
            format.yy = date.getFullYear().toString().slice -2 # two digit year

        # get hour format options        
        if dateFormat.match /hh/    
            format.hh =  if _getHours(date).length is 1 then "0#{_getHours(date)}" else _getHours(date) # two digit hours
        else if dateFormat.match /h/
            format.h = _getHours(date) # one digit hours

        # get minute format options
        if dateFormat.match /mm/
            format.mm = if date.getMinutes().toString().length is 1 then "0#{date.getMinutes().toString()}" else date.getMinutes() # two digit minutes
        else if dateFormat.match /m/
            format.m = date.getMinutes() # one digit minutes

        # get second format options        
        if dateFormat.match /ss/    
            format.ss = if date.getSeconds().toString().length is 1 then "0#{date.getSeconds().toString()}" else date.getSeconds().toString() # two digit seconds
        else if dateFormat.match /s/
            format.s = date.getSeconds() # one digit seconds            

        # get ampm format options        
        if dateFormat.match /a/    
            format.a = if date.getHours() >= 12 then 'pm' else 'am' # ampm
        else if dateFormat.match /A/
            format.A = if date.getHours() >= 12 then 'PM' else 'AM' # AMPM
        
        return "#{format.dddd}, #{format.MMMM} #{format.DD}, #{format.yyyy}, #{format.hh}:#{format.mm}:#{format.ss} #{format.a}"

    elapseTime: (date) =>
        # display an approximate date and time relative to now ex. 2 hours ago or 6 months ago
        # always rounds to a whole number ex. 1.5 months is 1 months
        # will return the largest unit of time. ex. 1 week instead of 8 days, 58 minutes instead of 1 hour
        # months do not account for variations in length
        # years do not account for leap years
        
        now = new Date()
        # now = new Date 2014, 5, 26, 23, 41, 0
        # console.log @prettifyDate(now)
        # console.log @prettifyDate(date)
        diff = now.getTime() - date.getTime()
        seconds = if (diff/100) >= 0 then Math.floor((diff/100)) else Math.ceil((diff/100))
        minutes = if (seconds/600) >= 0 then Math.floor((seconds/600)) else Math.ceil((seconds/600))
        hours = if (minutes/60) >= 0 then Math.floor((minutes/60)) else Math.ceil((minutes/60))
        days = if (hours/24) >= 0 then Math.floor((hours/24)) else Math.ceil((hours/24))
        weeks = if (days/7) >= 0 then Math.floor((days/7)) else Math.ceil((days/7))
        years = if (days/365) >= 0 then Math.floor((days/365)) else Math.ceil((days/365))

        # 52 weeks / 12 months about 4.33333
        months = weeks/(13/3)
        
        if Math.abs(months) >= 1
            # round months up to account for number of weeks estimated weirdness
            months = if months >= 0 then Math.ceil(months) else Math.floor(months)
        else
            months = 0

        if Math.abs(years) >= 1
            return if years >= 0 then "#{years} years ago" else "in #{Math.abs(years)} years"
        else if Math.abs(months) >= 1
            return if months >= 0 then "#{months} months ago" else "in #{Math.abs(months)} months"
        else if Math.abs(days) >= 2
            return if days >= 0 then "#{days} days ago" else "in #{Math.abs(days)} days"
        else if Math.abs(hours) >= 2
            return if hours >= 0 then "#{hours}hr ago" else "in #{Math.abs(hours)}hr"
        else if Math.abs(minutes) >= 1
            return if minutes >= 0 then "#{minutes}m ago" else "in #{Math.abs(minutes)}m"
        else
            return 'Just Now'

    countdownTo: (date) ->
        # display a running countdown
        console.log date

    calendarTime: (date) ->
        # display a date and time relative to now using calendar date format
        # ex. Next Tuesday at 2:24pm
        console.log date

new DrmTimeStamps()