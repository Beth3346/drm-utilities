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

        unitTokens = {
            ms: 'millisecond'
            s: 'second'
            m: 'minute'
            h: 'hour'
            d: 'day'
            D: 'date'
            w: 'week'
            M: 'month'
            Q: 'quarter'
            y: 'year'
            DDD: 'dayOfYear'
            a: 'ampm'
        }

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

        @minDays = [
            'Sun'
            'Mon'
            'Tue'
            'Wed'
            'Thu'
            'Fri'
            'Sat'
        ]

        $.each @prettyDate, ->
            _that = $ @
            item = _that.text()
            date = self.parseDate item
            prettyDate = self.prettifyDate date, 'dddd, MMMM DD, yyyy, hh:mm:ssa'
            
            _that.text prettyDate
            
        $.each self.timestamps, ->
            _that = $ @
            item = _that.text()
            date = self.parseDate item
            duration = self.getDuration date
            duration = self.formatDuration duration
            
            _that.text duration

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
            prettyNow = self.prettifyDate self.now, 'dddd, MMMM DD, yyyy, hh:mm:ssa'
            
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
        #         duration = self.getDuration date
        #         duration = self.formatDuration duration
        #         _that.text duration
        #     , 1000

    isLeapYear: (year) ->
        # The above expression evaluates whether or not the given date falls within a leap year 
        # using the three following Gregorian calendar rules:
        # Most years divisible by 4 are Leap Years (i.e. 1996)
        # However, most years divisible by 100 are not (i.e. 1900)
        # Unless they are also divisible by 400, in which case they are leap years (i.e. 2000)
        
        return (year % 4 is 0 and year % 100 isnt 0) or year % 400 is 0

    daysInYear: (year) =>
        return if @isLeapYear(year) then 366 else 365

    getDaysInMonth: (month, year) ->
        # returns the number of days in a month
        _month = month + 1
        new Date(year, _month, 0).getDate()

    parseDate: (item) =>
        # check for Yesterday, Today, Tomorrow strings and look for time
        item = item.toLowerCase()

        _parseDate = (item) =>
            date = {}
            # look for date keywords yesterday, today, tomorrow
            if item.search(/^(yesterday|today|tomorrow)/) isnt -1
                _fullDate = item.match /^(yesterday|today|tomorrow)/i
                _fullDate = _fullDate[0]
                _lastMonth = if @today.month is 0 then 11 else @today.month - 1
                _nextMonth = if @today.month is 11 then 0 else @today.month + 1

                _lastDateInMonth = @getDaysInMonth @today.month, @today.year
                _lastDateInLastMonth = @getDaysInMonth _lastMonth, @today.year

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
            # add noon and midnight keywords
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
            return new Date date.year, date.month, date.date, 0, 0, 0
        else if !date and time?
            return new Date @today.year, @today.month, @today.date, time.hour, time.minute, time.second

    prettifyDate: (date, dateFormat = 'dddd, MMMM DD, yyyy, hh:mm:ss a') =>
        # format date and time

        _getHours = (date) ->
            if date.getHours() is 0
                _hrs = 12
            else if date.getHours() > 12
                _hrs = date.getHours() - 12 
            else 
                _hrs = date.getHours()
            
            return _hrs.toString()

        if dateFormat?
            format = {}
            
            # get day format options
            if dateFormat.match /dddd/
                format.dddd = "#{@days[date.getDay()]}" # long day name
            else if dateFormat.match /ddd/
                format.ddd = "#{@shortDays[date.getDay()]}" # short day name
            else if dateFormat.match /dd/
                format.dd = "#{@minDays[date.getDay()]}" # three letter day abbr

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
            else if dateFormat.match /HH/
                format.HH = if date.getHours().toString().length is 1 then "0#{date.getHours().toString()}" else date.getHours() # two digit 24hr format
            else if dateFormat.match /H/
                format.H = date.getHours() # one digit 24hr format

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
            
            # parse dateFormat string and replace tokens with date information
            $.each format, (key) ->
                tmp = new RegExp "#{key}"
                dateFormat = dateFormat.replace tmp, "{{#{key}}}"
                return dateFormat

            # render template
            prettyDate = dateFormat
            $.each format, (key, value) ->
                re = new RegExp "{{#{key}}}"
                prettyDate = prettyDate.replace re, value
                return prettyDate

            return prettyDate
        else
            return

    getDuration: (date) =>
        # display an approximate date and time relative to now ex. 2 hours ago or 6 months ago
        # always rounds to a whole number ex. 1.5 months is 1 months
        # will return the largest unit of time. ex. 1 week instead of 8 days, 58 minutes instead of 1 hour
        # months do not account for variations in length
        
        duration = {}

        _getYearsToDays = (years) ->
            return (years * 146097) / 400

        _getDaysToYears = (days) ->
            return (days * 400) / 146097

        factors =
            ms: 1
            seconds: 1e3
            minutes: 6e4
            hours: 36e5
            days: 864e5
            weeks: 6048e5
            months: 2592e6
            years: 31556952e3

        now = new Date()

        _convertMsToSeconds = (ms) -> return ms/factors.seconds

        _convertMsToMinutes = (ms) -> return ms/factors.minutes

        _convertMsToHours = (ms) -> return ms/factors.hours

        _convertMsToDays = (ms) -> return ms/factors.days

        _convertMsToWeeks = (ms) -> return ms/factors.weeks

        _convertMsToMonths = (ms) -> return ms/factors.months

        _convertMsToYears = (ms) ->
            _days = _convertMsToDays ms
            _days = if (ms/factors.days) >= 0 then Math.floor(ms/factors.days) else Math.ceil(ms/factors.days)
            
            return _getDaysToYears _days

        _getMsDuration = (now, date) -> return (now.getTime() - date.getTime()) / factors.ms

        _getSecondsDuration = (now, date) ->
            _ms = _getMsDuration now, date
            _seconds = _convertMsToSeconds _ms

            return if _seconds >= 0 then Math.floor _seconds else Math.ceil _seconds

        _getMinutesDuration = (now, date) ->
            _ms = _getMsDuration now, date
            _minutes = _convertMsToMinutes _ms

            return if _minutes >= 0 then Math.floor _minutes else Math.ceil _minutes

        _getHoursDuration = (now, date) ->
            _ms = _getMsDuration now, date
            _hours = _convertMsToHours _ms

            return if _hours >= 0 then Math.floor _hours else Math.ceil _hours

        _getDaysDuration = (now, date) ->
            _ms = _getMsDuration now, date
            _days = _convertMsToDays _ms

            return if _days >= 0 then Math.floor _days else Math.ceil _days

        _getWeeksDuration = (now, date) ->
            _ms = _getMsDuration now, date
            _weeks = _convertMsToWeeks _ms

            return if _weeks >= 0 then Math.floor _weeks else Math.ceil _weeks

        _getMonthsDuration = (now, date) ->
            _ms = _getMsDuration now, date
            _months = _convertMsToMonths _ms
            
            if Math.abs(_months) >= 1
                # round months up to account for number of weeks estimated weirdness
                return if _months >= 0 then Math.ceil(_months) else Math.floor(_months)
            else
                return 0

        _getYearsDuration = (now, date) ->
            _ms = _getMsDuration now, date            
            _years =  _convertMsToYears _ms
            
            return if _years >= 0 then Math.floor _years else Math.ceil _years

        _getRemainingSeconds = (now, date) ->
            _ms = _getMsDuration now, date

            if ((_ms % factors.minutes)/factors.seconds) >= 0
                return Math.floor(((_ms % factors.minutes)/factors.seconds))
            else
                return Math.ceil(((_ms % factors.minutes)/factors.seconds))

        _getRemainingMinutes = (now, date) ->
            _ms = _getMsDuration now, date

            if ((_ms % factors.hours)/factors.minutes) >= 0
                return Math.floor(((_ms % factors.hours)/factors.minutes))
            else
                return Math.ceil(((_ms % factors.hours)/factors.minutes))

        _getRemainingHours = (now, date) ->
            _ms = _getMsDuration now, date

            # doesn't work correctly durations under 100 years
            if ((_ms % factors.days)/factors.hours) >= 0
                return Math.floor(((_ms % factors.days)/factors.hours))
            else
                return Math.ceil(((_ms % factors.days)/factors.hours))

        _getRemainingDays = (now, date) ->
            _ms = _getMsDuration now, date

            if ((_ms % factors.weeks)/factors.days) >= 0
                return Math.floor((_ms % factors.weeks)/factors.days)
            else
                return Math.ceil((_ms % factors.weeks)/factors.days)

        _getRemainingDaysInYear = (now, date) =>
            # doesn't work correctly durations under 100 years
            _days = _getDaysDuration now, date
            _years = _getYearsDuration now, date

            if @isLeapYear(date.getFullYear()) then _days = _days + 1

            if (_days - _getYearsToDays(_years)) >= 0
                return Math.floor(_days - _getYearsToDays(_years))
            else
                return Math.ceil(_days - _getYearsToDays(_years))

        duration.ms = _getMsDuration now, date
        duration.seconds = _getSecondsDuration now, date
        duration.minutes = _getMinutesDuration now, date
        duration.hours = _getHoursDuration now, date
        duration.days = _getDaysDuration now, date
        duration.weeks = _getWeeksDuration now, date
        duration.months = _getMonthsDuration now, date
        duration.years = _getYearsDuration now, date
        duration.remainingSeconds = _getRemainingSeconds now, date        
        duration.remainingMinutes = _getRemainingMinutes now, date        
        duration.remainingHours = _getRemainingHours now, date
        duration.remainingDays = _getRemainingDays now, date
        duration.remainingDaysInYear = _getRemainingDaysInYear now, date

        duration

    formatDuration: (duration) ->
        if Math.abs(duration.years) >= 1
            if duration.years >= 0
                return "#{duration.years} years,
                    #{duration.remainingDaysInYear} days,
                    and #{duration.remainingHours} hours,
                    #{duration.remainingMinutes} minutes,
                    #{duration.remainingSeconds} seconds ago"
            else
                return "in #{Math.abs(duration.years)} years,
                    #{Math.abs(duration.remainingDaysInYear)} days,
                    #{Math.abs(duration.remainingHours)} hours,
                    #{Math.abs(duration.remainingMinutes)} minutes,
                    #{Math.abs(duration.remainingSeconds)} seconds"
        
        else if Math.abs(duration.months) >= 1
            if duration.months >= 0
                return "#{duration.months} months,
                    #{duration.remainingDays} days,
                    and #{duration.remainingHours} hours,
                    #{duration.remainingMinutes} minutes,
                    #{duration.remainingSeconds} seconds ago"
            else
                return "in #{Math.abs(duration.months)} months,
                    #{Math.abs(duration.remainingDays)} days,
                    and #{Math.abs(duration.remainingHours)} hours,
                    #{Math.abs(duration.remainingMinutes)} minutes,
                    #{Math.abs(duration.remainingSeconds)} seconds"
        
        else if Math.abs(duration.weeks) >= 1
            if duration.weeks >= 0
                return "#{duration.weeks} weeks,
                    #{duration.remainingDays} days,
                    and #{duration.remainingHours} hours,
                    #{duration.remainingMinutes} minutes,
                    #{duration.remainingSeconds} seconds ago"
            else
                return "in #{Math.abs(duration.weeks)} weeks,
                    #{Math.abs(duration.remainingDays)} days,
                    and #{Math.abs(duration.remainingHours)} hours,
                    #{Math.abs(duration.remainingMinutes)} minutes,
                    #{Math.abs(duration.remainingSeconds)} seconds"
        
        else if Math.abs(duration.days) >= 1
            if duration.days >= 0
                return "#{duration.days} days,
                    #{duration.remainingHours} hours,
                    #{duration.remainingMinutes} minutes,
                    #{duration.remainingSeconds} seconds ago"
            else
                return "in #{Math.abs(duration.days)} days,
                    #{Math.abs(duration.remainingHours)} hours,
                    #{Math.abs(duration.remainingMinutes)} minutes,
                    #{Math.abs(duration.remainingSeconds)} seconds"
        
        else if Math.abs(duration.hours) >= 1
            if duration.hours >= 0
                return "#{duration.hours}hr,
                    #{duration.remainingMinutes} minutes,
                    #{duration.remainingSeconds} seconds ago"
            else
                return "in #{Math.abs(duration.hours)}hr,
                    #{Math.abs(duration.remainingMinutes)} minutes,
                    #{Math.abs(duration.remainingSeconds)} seconds"
        
        else if Math.abs(duration.minutes) >= 1
            if duration.minutes >= 0
                return "#{duration.minutes}m,
                    #{duration.remainingSeconds} seconds ago"
            else
                return "in #{Math.abs(duration.minutes)}m,
                    #{Math.abs(duration.remainingSeconds)} seconds"
        
        else
            # less than 1 minute ago
            return 'Just Now'

    countdownTo: (date) ->
        # display a running countdown
        console.log date

    calendarTime: (date) ->
        # display a date and time relative to now using calendar date format
        # ex. Next Tuesday at 2:24pm
        console.log date

new DrmTimeStamps()