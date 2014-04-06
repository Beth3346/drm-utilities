###############################################################################
# Interactive JS Calendar
###############################################################################

"use strict"

( ($) ->
    class window.DrmCalendar
        constructor: (@calendarClass = 'drm-calendar', @daysPerWeek = 7) ->
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
                newYearsDay:
                    name: "New Year's Day"
                    month: "January"
                    holidayDate: 1
                mlkBirthday:
                    name: "Martin Luther King's Birthday"
                    month: "January"
                    day: "Monday"
                    dayNum: 3
                groundhogDay:
                    name: "Groundhog Day"
                    month: "February"
                    holidayDate: 2
                valentinesDay:
                    name: "Valentine's Day"
                    month: "February"
                    holidayDate: 14
                presidentsDay:
                    name: "President's Day"
                    month: "February"
                    day: "Monday"
                    dayNum: 3
                stPatricksDay:
                    name: "St. Patrick's Day"
                    month: "March"
                    holidayDate: 17
                aprilFools:
                    name: "April Fool's Day"
                    month: "April"
                    holidayDate: 1
                earthDay:
                    name: "Earth Day"
                    month: "April"
                    holidayDate: 22
                arborDay:
                    name: "Arbor Day"
                    month: "April"
                    day: "Friday"
                    dayNum: "last"
                mayDay:
                    name: "May Day"
                    month: "May"
                    holidayDate: 1
                cincoDeMayo:
                    name: "Cinco De Mayo"
                    month: "May"
                    holidayDate: 5
                mothersDay:
                    name: "Mother's Day"
                    month: "May"
                    day: "Sunday"
                    dayNum: 2
                memorialDay:
                    name: "Memorial Day"
                    month: "May"
                    day: "Monday"
                    dayNum: "last"
                flagDay:
                    name: "Flag Day"
                    month: "June"
                    holidayDate: 14
                fathersDay:
                    name: "Father's Day"
                    month: "June"
                    day: "Sunday"
                    dayNum: 3
                independenceDay:
                    name: "Independence Day"
                    month: "July"
                    holidayDate: 4
                laborDay:
                    name: "Labor Day"
                    month: "September"
                    day: "Monday"
                    dayNum: 1
                patroitDay:
                    name: "Patroit Day"
                    month: "September"
                    holidayDate: 11
                columbusDay:
                    name: "Columbus Day"
                    month: "October"
                    day: "Monday"
                    dayNum: 2
                halloween:
                    name: "Halloween"
                    month: "October"
                    holidayDate: 31
                veteransDay:
                    name: "Veteran's Day"
                    month: "November"
                    holidayDate: 11
                thanksgiving:
                    name: "Thanksgiving"
                    month: "November"
                    day: "Thursday"
                    dayNum: 4
                pearlHarborDay:
                    name: "Pearl Harbor Day"
                    month: "December"
                    holidayDate: 7
                festivus:
                    name: "Festivus"
                    month: "December"
                    holidayDate: 23
                christmasEve:
                    name: "Christmas Eve"
                    month: "December"
                    holidayDate: 24
                christmas:
                    name: "Christmas"
                    month: "December"
                    holidayDate: 25
                boxingDay:
                    name: "Boxing Day"
                    month: "December"
                    holidayDate: 26
                newYearsEve:
                    name: "New Year's Eve"
                    month: "December"
                    holidayDate: 31

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

        getWeeksInMonth: (numberDays, dayShift) =>
            Math.ceil (numberDays + dayShift) / @daysPerWeek

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

        addNewCalendarEvent: (eventName, calendarItem) ->
            eventClass = 'events'
            eventList = calendarItem.find "ul.#{eventClass}"
            length = eventList.length

            if length > 0
                item = $ '<li></li>',
                    text: eventName

                item.appendTo eventList

            else if length is 0
                eventList = $ '<ul></ul>',
                    class: eventClass
                    html: "<li>#{eventName}</li>"

                eventList.appendTo calendarItem

        addHolidays: (numberDays, dayShift) =>
            self = @
            calendarInner = self.calendar.find "div.#{@calendarInnerClass}"
            currentMonth = calendarInner.data 'month'
            weeks = calendarInner.find 'tr'

            $.each self.holidays, (key, value) ->
                month = $.inArray value.month, self.months
                numberWeeks = self.getWeeksInMonth(numberDays, dayShift)
                lastWeekLength = weeks.eq(numberWeeks).length

                if value.day
                    day = $.inArray value.day, self.days

                    if value.dayNum is 'last' and dayShift <= day
                        weekNum = if lastWeekLength < day then (numberWeeks - 1) else numberWeeks
                    else if value.dayNum is 'last' and dayShift > day
                        weekNum = (numberWeeks - 1)
                    else
                        weekNum = parseInt value.dayNum, 10

                    if currentMonth is month
                        holidayWeek = if dayShift <= day then holidayWeek = weeks.eq weekNum else holidayWeek = weeks.eq weekNum + 1
                        holidayDate = holidayWeek.find('td').eq(day).data 'date'
                else
                    holidayDate = value.holidayDate

                if currentMonth is month
                    holiday = calendarInner.find("[data-date=#{holidayDate}]").addClass self.classes.holiday
                    self.addNewCalendarEvent value.name, holiday

        highlightWeekends: =>
            self = @
            weeks = self.calendar.find("div.#{@calendarInnerClass}").find 'tr'

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
            numberDays = self.getDaysInMonth (month + 1), year
            prevMonthNumberDays = self.getDaysInMonth month, year
            firstDay = self.getDayOfWeek month, year, 1
            dayShift = if firstDay is self.daysPerWeek then 0 else firstDay
            numberWeeks = self.getWeeksInMonth numberDays, dayShift

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
                    while j <= self.daysPerWeek
                        weeks += "<td data-month='#{month}' data-date='#{date}' data-year'#{year}'>#{date}</td>"
                        j += 1
                        date += 1
                # if we are in the last week of the month we need to add blank cells for next month
                else if i is numberWeeks
                    while j <= self.daysPerWeek
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
                    while j <= self.daysPerWeek
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
            self.addHolidays numberDays, dayShift

    new DrmCalendar()

) jQuery