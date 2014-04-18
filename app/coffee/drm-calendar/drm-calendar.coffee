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
            self.addEventForm = self.calendar.find 'form.drm-calendar-new-event'
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

            self.events =
                newYearsDay:
                    name: "New Year's Day"
                    month: "January"
                    year: null
                    eventDate: 1
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                mlkBirthday:
                    name: "Martin Luther King's Birthday"
                    month: "January"
                    year: null
                    eventDate: null
                    day: "Monday"
                    dayNum: 3
                    type: 'holiday'
                    notes: null
                groundhogDay:
                    name: "Groundhog Day"
                    month: "February"
                    year: null
                    eventDate: 2
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                valentinesDay:
                    name: "Valentine's Day"
                    month: "February"
                    year: null
                    eventDate: 14
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                presidentsDay:
                    name: "President's Day"
                    month: "February"
                    year: null
                    eventDate: null
                    day: "Monday"
                    dayNum: 3
                    type: 'holiday'
                    notes: null
                stPatricksDay:
                    name: "St. Patrick's Day"
                    month: "March"
                    year: null
                    eventDate: 17
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                aprilFools:
                    name: "April Fool's Day"
                    month: "April"
                    year: null
                    eventDate: 1
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                earthDay:
                    name: "Earth Day"
                    month: "April"
                    year: null
                    eventDate: 22
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                arborDay:
                    name: "Arbor Day"
                    month: "April"
                    year: null
                    eventDate: null
                    day: "Friday"
                    dayNum: "last"
                    type: 'holiday'
                    notes: null
                mayDay:
                    name: "May Day"
                    month: "May"
                    year: null
                    eventDate: 1
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                cincoDeMayo:
                    name: "Cinco De Mayo"
                    month: "May"
                    year: null
                    eventDate: 5
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                mothersDay:
                    name: "Mother's Day"
                    month: "May"
                    year: null
                    eventDate: null
                    day: "Sunday"
                    dayNum: 2
                    type: 'holiday'
                    notes: null
                memorialDay:
                    name: "Memorial Day"
                    month: "May"
                    year: null
                    eventDate: null
                    day: "Monday"
                    dayNum: "last"
                    type: 'holiday'
                    notes: null
                flagDay:
                    name: "Flag Day"
                    month: "June"
                    year: null
                    eventDate: 14
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                fathersDay:
                    name: "Father's Day"
                    month: "June"
                    year: null
                    eventDate: null
                    day: "Sunday"
                    type: 'holiday'
                    notes: null
                    dayNum: 3
                independenceDay:
                    name: "Independence Day"
                    month: "July"
                    year: null
                    eventDate: 4
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                laborDay:
                    name: "Labor Day"
                    month: "September"
                    year: null
                    eventDate: null
                    day: "Monday"
                    dayNum: 1
                    type: 'holiday'
                    notes: null
                patroitDay:
                    name: "Patroit Day"
                    month: "September"
                    year: null
                    eventDate: 11
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                columbusDay:
                    name: "Columbus Day"
                    month: "October"
                    year: null
                    eventDate: null
                    day: "Monday"
                    dayNum: 2
                    type: 'holiday'
                    notes: null
                halloween:
                    name: "Halloween"
                    month: "October"
                    year: null
                    eventDate: 31
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                veteransDay:
                    name: "Veteran's Day"
                    month: "November"
                    year: null
                    eventDate: 11
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                thanksgiving:
                    name: "Thanksgiving"
                    month: "November"
                    year: null
                    eventDate: null
                    day: "Thursday"
                    dayNum: 4
                    type: 'holiday'
                    notes: null
                pearlHarborDay:
                    name: "Pearl Harbor Day"
                    month: "December"
                    year: null
                    eventDate: 7
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                festivus:
                    name: "Festivus"
                    month: "December"
                    year: null
                    eventDate: 23
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                christmasEve:
                    name: "Christmas Eve"
                    month: "December"
                    year: null
                    eventDate: 24
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                christmas:
                    name: "Christmas"
                    month: "December"
                    year: null
                    eventDate: 25
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                boxingDay:
                    name: "Boxing Day"
                    month: "December"
                    year: null
                    eventDate: 26
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                newYearsEve:
                    name: "New Year's Eve"
                    month: "December"
                    year: null
                    eventDate: 31
                    day: null
                    dayNum: null
                    type: 'holiday'
                    notes: null
                mybirthday:
                    name: "My Birthday"
                    month: "March"
                    year: null
                    eventDate: 24
                    day: null
                    dayNum: null
                    type: 'birthday'
                    notes: "Here are some notes"

            self.createCalendar self.currentMonth, self.currentYear

            self.calendarNav.on 'click', '.drm-calendar-month-prev, .drm-calendar-month-next', ->
                direction = $(@).data 'dir'
                self.advanceMonth.call @, direction

            self.calendarNav.on 'click', '.drm-calendar-year-prev, .drm-calendar-year-next', ->
                direction = $(@).data 'dir'
                self.advanceYear.call @, direction

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

            self.addEventForm.on 'click', 'button.addEvent', (e) ->                
                e.preventDefault()
                newEvent =
                    name: self.addEventForm.find('#event-name').val()
                    month: self.addEventForm.find('#month').val()
                    year: self.addEventForm.find('#year').val()
                    eventDate: self.addEventForm.find('#event-date').val()
                    day: self.addEventForm.find('#day').val()
                    dayNum: self.addEventForm.find('#day-num').val()
                    type: self.addEventForm.find('#event-type').val().toLowerCase()
                    notes: self.addEventForm.find('#event-notes').val()
                self.createEvent newEvent.name, newEvent.month, newEvent.year, newEvent.eventDate, newEvent.day, newEvent.dayNum, newEvent.type, newEvent.notes
                newMonth = $.inArray newEvent.month, self.months
                self.changeCalendar.call @, newMonth, self.currentYear

        getDaysInMonth: (month, year) ->
            new Date(year, month, 0).getDate()

        getDayOfWeek: (month, year, day) ->
            day = new Date year, month, day
            day.getDay()

        getWeeksInMonth: (numberDays, dayShift) =>
            Math.ceil (numberDays + dayShift) / @daysPerWeek

        createDaysInMonth: =>
            self = @
            numberDays = []
            $.each @months, (key, value) ->
                numberDays.push self.getDaysInMonth (key + 1), self.currentYear

        highlightCurrentDay: =>
            calendarInner = @calendar.find "div.#{@calendarInnerClass}"
            month = calendarInner.data 'month'
            year = calendarInner.data 'year'

            if month is @currentMonth and year is @currentYear
                calendarInner.find("[data-date=#{@currentDay}]").addClass @classes.today

        createEvent: (name, month, year, eventDate, day, dayNum, type, notes) =>
            obj = @events
            # eventCount = $.map(@events, (n, i) ->
            #     i ).length

            eventName = do ->
                key = $.trim(name).toLowerCase()
                key.replace /\W+/g, ''
            obj[eventName] =
                name: name
                month: month
                year: year
                eventDate: eventDate
                day: day
                dayNum: dayNum
                type: type.toLowerCase()
                notes: notes
            console.log obj[eventName]
            $(@events).add obj[eventName]
            console.log @events

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

        addEvents: (numberDays, dayShift) =>
            self = @
            calendarInner = self.calendar.find "div.#{@calendarInnerClass}"
            currentMonth = calendarInner.data 'month'
            weeks = calendarInner.find 'tr'

            getWeekNum = (dayNum, day, numberDays, dayShift) ->
                numberWeeks = self.getWeeksInMonth(numberDays, dayShift)
                lastWeekLength = weeks.eq(numberWeeks).length

                if dayNum is 'last' and dayShift <= day
                    if lastWeekLength < day then (numberWeeks - 1) else numberWeeks
                else if dayNum is 'last' and dayShift > day
                    numberWeeks - 1
                else
                    parseInt dayNum, 10

            $.each self.events, (key, value) ->
                month = $.inArray value.month, self.months

                if value.day
                    day = $.inArray value.day, self.days
                    weekNum = getWeekNum value.dayNum, day, numberDays, dayShift

                    if currentMonth is month
                        eventWeek = if dayShift <= day then eventWeek = weeks.eq weekNum else eventWeek = weeks.eq weekNum + 1
                        eventDate = eventWeek.find('td').eq(day).data 'date'
                else
                    eventDate = value.eventDate

                if currentMonth is month
                    eventDay = calendarInner.find "[data-date=#{eventDate}]"
                    if value.type is 'holiday' then eventDay.addClass self.classes.holiday
                    self.addNewCalendarEvent value.name, eventDay

        highlightWeekends: =>
            self = @
            weeks = self.calendar.find("div.#{@calendarInnerClass}").find 'tr'

            $.each weeks, ->
                dates = $(@).find "td"
                $.each self.weekend, (key, value) ->
                    dates.eq(value).not(".#{self.classes.muted}, .#{self.classes.today}, .#{self.classes.holiday}").addClass self.classes.weekend

        advanceMonth: (direction) =>
            calendarInner = @calendar.find "div.#{@calendarInnerClass}"
            month = calendarInner.data 'month'
            year = calendarInner.data 'year'
            
            if direction is 'prev'
                month = if month - 1 >= 0 then month - 1 else 11
                year = if month - 1 >= 0 then year else year - 1
            else if direction is 'next'
                month = if month + 1 < 12 then month + 1 else 0
                year = if month + 1 < 12 then year else year + 1

            @changeCalendar month, year

        advanceYear: (direction) =>
            calendarInner = @calendar.find "div.#{@calendarInnerClass}"
            month = calendarInner.data 'month'
            year = calendarInner.data 'year'
            
            if direction is 'prev' then year = year - 1 else year = year + 1
            
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
            nextYear = year + 1
            lastYear = year - 1
            nextMonth = if @months[month] is 11 then @months[0] else @months[month + 1]
            lastMonth = if @months[month] is 0 then @months[11] else @months[month - 1]

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
                class: 'drm-calendar-header'
                text: "#{@months[month]} #{year}"
            
            calendar.appendTo ".#{self.calendarClass}"
            heading.prependTo ".#{self.calendarInnerClass}"

            self.highlightCurrentDay()
            self.highlightWeekends()
            self.createEvent "Dad's Birthday", "April", null, 9, null, null, "birthday", "some notes"
            self.createEvent "Foby's Birthday", "November", null, 23, null, null, "birthday", "some notes"
            self.addEvents numberDays, dayShift
            $('.drm-calendar-year-prev').text lastYear
            $('.drm-calendar-year-next').text nextYear

            $('.drm-calendar-month-prev').text lastMonth
            $('.drm-calendar-month-next').text nextMonth

    drmCalendar = new DrmCalendar()

) jQuery