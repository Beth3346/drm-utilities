###############################################################################
# Interactive JS Calendar
###############################################################################
"use strict"

( ($) ->
    class window.DrmCalendar
        constructor: (@calendarClass = 'drm-calendar') ->
            self = @
            self.today = new Date()
            self.currentMonth = self.today.getMonth()
            self.currentYear = self.today.getFullYear()
            self.currentDay = @today.getDate()
            self.calendarInnerClass = 'drm-calendar-inner'
            self.calendar = $ ".#{self.calendarClass}"
            self.calendarNav = $ '.drm-calendar-nav'
            self.calendarSelect = $ '.drm-calendar-select'
            self.calendarSelectButton = self.calendarSelect.find 'button[type=submit]'
            self.classes =
                weekend: 'drm-cal-weekend'
                muted: 'drm-cal-muted'
                holiday: 'drm-cal-holiday'
                today: 'drm-cal-today'

            self.months = [             
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
                'December']

            self.days = [
                'Sunday'
                'Monday'
                'Tuesday'
                'Wednesday'
                'Thursday'
                'Friday'
                'Saturday']

            self.weekend = [
                $.inArray('Sunday', self.days)
                $.inArray('Saturday', self.days)
            ]

            self.holidays =
                january_1: "New Year's Day"
                february_14: "Valentine's Day"
                march_17: "St. Patrick's Day"
                april_01: "April Fool's Day"
                july_4: "Independence Day"
                october_31: "Halloween"
                december_24: "Christmas Eve"
                december_25: "Christmas"
                december_31: "New Year's Eve"

            self.createCalendar self.currentMonth, self.currentYear

            self.calendarNav.on 'click', '.drm-calendar-prev, .drm-calendar-next', ->
                direction = $(@).data 'dir'
                self.advanceMonth.call @, direction

            self.calendarNav.on 'click', '.drm-calendar-current', ->
                self.changeCalendar.call @, self.currentMonth, self.currentYear

            self.calendarSelectButton.on 'click', (e) ->
                that = $ @
                month = that.parent().find('#month').val()
                year = that.parent().find('#year').val()

                month = parseInt month, 10
                year = parseInt year, 10

                e.preventDefault()

                self.changeCalendar.call self, month, year

        getDaysInMonth: (month, year) ->
            days = new Date(year, month, 0).getDate()
            days

        getDayOfWeek: (month, year, day) ->
            day = new Date year, month, day
            day.getDay()

        toTitleCase: (str) ->
            str.replace /\w\S*/g, (txt) ->
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()

        createDaysInMonth: =>
            self = @
            numberDays = []
            $.each @months, (key, value) ->
                numberDays.push self.getDaysInMonth (key + 1), self.currentYear
            numberDays

        highlightCurrentDay: =>
            calendarInner = @calendar.find "div.#{@calendarInnerClass}"
            month = calendarInner.data 'month'
            year = calendarInner.data 'year'

            if month is @currentMonth and year is @currentYear
                calendarInner.find("[data-date=#{@currentDay}]").addClass @classes.today

        highlightHolidays: =>
            self = @
            calendarInner = self.calendar.find "div.#{@calendarInnerClass}"
            currentMonth = calendarInner.data 'month'

            $.each @holidays, (key, value) ->
                dateArr = key.split '_'
                month = $.inArray self.toTitleCase(dateArr[0]), self.months
                date = parseInt dateArr[1], 10

                if currentMonth is month
                    holiday = calendarInner.find("[data-date=#{date}]").addClass self.classes.holiday
                    eventList = $ '<ul></ul>',
                        class: 'events'
                        html: "<li>#{value}</li>"

                    eventList.appendTo holiday

        highlightWeekends: =>
            self = @
            weeks = @calendar.find("div.#{@calendarInnerClass}").find 'tr'

            $.each weeks, ->
                dates = $(@).find "td"
                $.each self.weekend, (key, value) ->
                    dates.eq(value).not(".#{self.classes.muted}, .#{self.classes.today}, .#{self.classes.holiday}").addClass self.classes.weekend

        advanceMonth: (direction) =>
            calendarInner = @calendar.find "div.#{@calendarInnerClass}"
            
            if direction is 'prev'
                month = if calendarInner.data('month') - 1 >= 0 then calendarInner.data('month') - 1 else 11
                year = if calendarInner.data('month') - 1 >= 0 then calendarInner.data('year') else calendarInner.data('year') - 1
            else if direction is 'next'
                month = if calendarInner.data('month') + 1 < 12 then calendarInner.data('month') + 1 else 0
                year = if calendarInner.data('month') + 1 < 12 then calendarInner.data('year') else calendarInner.data('year') + 1

            @changeCalendar month, year

        changeCalendar: (month, year) =>
            self = @
            calendarInner = @calendar.find "div.#{@calendarInnerClass}"
            calendarInner.fadeOut 300, ->
                @remove()
                self.createCalendar month, year

        createCalendar: (month, year) =>
            self = @
            daysPerWeek = 7
            numberDays = self.getDaysInMonth (month + 1), year
            prevMonthNumberDays = self.getDaysInMonth month, year
            firstDay = self.getDayOfWeek month, year, 1
            dayShift = if firstDay is 7 then 0 else firstDay
            numberWeeks = Math.ceil (numberDays + dayShift) / 7

            # console.log "Days Per Week: #{daysPerWeek}"
            # console.log "Number of Days: #{numberDays}"
            # console.log "Prev Month Number Days: #{prevMonthNumberDays}"
            # console.log "First Day: #{firstDay}"
            # console.log "Day Shift: #{dayShift}"
            # console.log "Number Weeks: #{numberWeeks}"

            weekdays = '<table><thead><tr>'
            $.each @days, (key, value) ->
                weekdays += "<th>#{value}</th>"
            weekdays += '</tr></thead>'

            weeks = '<tbody>'
            i = 1
            date = 1
            l = 1
            prevDays = (prevMonthNumberDays - dayShift) + 1
            nextDates = 1

            while i <= numberWeeks
                j = 1
                weeks += '<tr>'
                # if we are in week 1 we need to shift to the correct day of the week
                if i is 1 and firstDay isnt 0
                    # add cells for the previous month until we get to the first day
                    while l <= dayShift
                        weeks += "<td class='#{self.classes.muted}'>#{prevDays}</td>"
                        prevDays += 1
                        l += 1
                        j += 1
                    # start adding cells for the current month
                    while j < 8
                        weeks += "<td data-month='#{month}' data-date='#{date}' data-year'#{year}'>#{date}</td>"
                        j += 1
                        date += 1
                # if we are in the last week of the month we need to add blank cells for next month
                else if i is numberWeeks
                    while j < 8
                        # finish adding cells for the current month
                        if date <= numberDays
                            weeks += "<td data-date=#{date}>#{date}</td>"
                        # start adding cells for next month
                        else
                            weeks += "<td class='#{self.classes.muted}'>#{nextDates}</td>"
                            nextDates += 1
                        j += 1
                        date += 1
                else
                    # if we are in the middle of the month add cells for the current month
                    while j < 8
                        weeks += "<td data-month='#{month}' data-date='#{date}' data-year'#{year}'>#{date}</td>"
                        j += 1
                        date += 1
                weeks += '</tr>'
                i += 1
            weeks += '</tbody></table>'

            calendar = $ '<div></div>',
                class: self.calendarInnerClass
                html: weekdays + weeks
                'data-month': month
                'data-year': year

            heading = $ '<h1></h1>',
                text: "#{@months[month]} #{year}"
            
            calendar.appendTo ".#{self.calendarClass}"
            heading.prependTo ".#{self.calendarInnerClass}"

            self.highlightCurrentDay()
            self.highlightWeekends()
            self.highlightHolidays()

    new DrmCalendar()

) jQuery