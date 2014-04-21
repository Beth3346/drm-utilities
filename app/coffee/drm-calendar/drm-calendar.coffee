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
            self.addEventForm = self.calendar.find('form.drm-calendar-new-event').hide()
            self.showEventFormButton = self.calendar.find 'button.drm-show-event-form'
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
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                mlkBirthday:
                    name: "Martin Luther King's Birthday"
                    month: "January"
                    year: null
                    eventDate: null
                    day: "Monday"
                    dayNum: 3
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                groundhogDay:
                    name: "Groundhog Day"
                    month: "February"
                    year: null
                    eventDate: 2
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                valentinesDay:
                    name: "Valentine's Day"
                    month: "February"
                    year: null
                    eventDate: 14
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                presidentsDay:
                    name: "President's Day"
                    month: "February"
                    year: null
                    eventDate: null
                    day: "Monday"
                    dayNum: 3
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                stPatricksDay:
                    name: "St. Patrick's Day"
                    month: "March"
                    year: null
                    eventDate: 17
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                aprilFools:
                    name: "April Fool's Day"
                    month: "April"
                    year: null
                    eventDate: 1
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                earthDay:
                    name: "Earth Day"
                    month: "April"
                    year: null
                    eventDate: 22
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                arborDay:
                    name: "Arbor Day"
                    month: "April"
                    year: null
                    eventDate: null
                    day: "Friday"
                    dayNum: "last"
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                mayDay:
                    name: "May Day"
                    month: "May"
                    year: null
                    eventDate: 1
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                cincoDeMayo:
                    name: "Cinco De Mayo"
                    month: "May"
                    year: null
                    eventDate: 5
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                mothersDay:
                    name: "Mother's Day"
                    month: "May"
                    year: null
                    eventDate: null
                    day: "Sunday"
                    dayNum: 2
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                memorialDay:
                    name: "Memorial Day"
                    month: "May"
                    year: null
                    eventDate: null
                    day: "Monday"
                    dayNum: "last"
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                flagDay:
                    name: "Flag Day"
                    month: "June"
                    year: null
                    eventDate: 14
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                fathersDay:
                    name: "Father's Day"
                    month: "June"
                    year: null
                    eventDate: null
                    day: "Sunday"
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                    dayNum: 3
                independenceDay:
                    name: "Independence Day"
                    month: "July"
                    year: null
                    eventDate: 4
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                laborDay:
                    name: "Labor Day"
                    month: "September"
                    year: null
                    eventDate: null
                    day: "Monday"
                    dayNum: 1
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                patroitDay:
                    name: "Patroit Day"
                    month: "September"
                    year: null
                    eventDate: 11
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                columbusDay:
                    name: "Columbus Day"
                    month: "October"
                    year: null
                    eventDate: null
                    day: "Monday"
                    dayNum: 2
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                halloween:
                    name: "Halloween"
                    month: "October"
                    year: null
                    eventDate: 31
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                veteransDay:
                    name: "Veteran's Day"
                    month: "November"
                    year: null
                    eventDate: 11
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                thanksgiving:
                    name: "Thanksgiving"
                    month: "November"
                    year: null
                    eventDate: null
                    day: "Thursday"
                    dayNum: 4
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                pearlHarborDay:
                    name: "Pearl Harbor Day"
                    month: "December"
                    year: null
                    eventDate: 7
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                festivus:
                    name: "Festivus"
                    month: "December"
                    year: null
                    eventDate: 23
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                christmasEve:
                    name: "Christmas Eve"
                    month: "December"
                    year: null
                    eventDate: 24
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                christmas:
                    name: "Christmas"
                    month: "December"
                    year: null
                    eventDate: 25
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                boxingDay:
                    name: "Boxing Day"
                    month: "December"
                    year: null
                    eventDate: 26
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                newYearsEve:
                    name: "New Year's Eve"
                    month: "December"
                    year: null
                    eventDate: 31
                    day: null
                    dayNum: null
                    type: "holiday"
                    recurrance: "yearly"
                    notes: null
                mybirthday:
                    name: "My Birthday"
                    month: "March"
                    year: null
                    eventDate: 24
                    day: null
                    dayNum: null
                    type: "birthday"
                    recurrance: "yearly"
                    notes: "Here are some notes"
                rabbitRabbitDay:
                    name: "Rabbit Rabbit Day"
                    month: null
                    year: null
                    eventDate: 1
                    day: null
                    dayNum: null
                    type: "fun day"
                    recurrance: "monthly"
                    notes: "Say Rabbit Rabbit for good luck this month"
                firstMonday:
                    name: "First Monday"
                    month: null
                    year: null
                    eventDate: null
                    day: "Monday"
                    dayNum : 1
                    type: "test"
                    recurrance: "monthly"
                    notes: "This is the first Monday of the month"
                # lawnDay:
                #     name: "Lawn Day"
                #     month: "April"
                #     year: null
                #     eventDate: 17
                #     day: "Thursday"
                #     dayNum: null
                #     type: "test"
                #     recurrance: "biweekly"
                #     notes: "Every other Thursday"
                wednesdays:
                    name: "Wednesdays"
                    month: null
                    year: null
                    eventDate: null
                    day: "Wednesday"
                    dayNum: null
                    type: "test"
                    recurrance: "weekly"
                    notes: "Every single Wednesday"
                wakeup:
                    name: "Wake Up"
                    month: null
                    year: null
                    eventDate: null
                    day: null
                    dayNum: null
                    type: "test"
                    recurrance: "daily"
                    note: "Wake Up Every Day"
                oneTimeEvent:
                    name: "One Time Event"
                    month: "April"
                    year: 2014
                    eventDate: 21
                    day: null
                    dayNum: null
                    type: "test"
                    recurrance: "none"
                    note: "do this once"

            self.createCalendar self.currentMonth, self.currentYear

            self.calendar.on 'click', '.drm-calendar-month-prev, .drm-calendar-month-next', ->
                direction = $(@).data 'dir'
                self.advanceMonth.call @, direction

            self.calendar.on 'click', '.drm-calendar-year-prev, .drm-calendar-year-next', ->
                direction = $(@).data 'dir'
                self.advanceYear.call @, direction

            self.calendar.on 'click', '.drm-calendar-current', ->
                self.changeCalendar.call @, self.currentMonth, self.currentYear

            self.calendar.on 'click', '.drm-calendar-select button[type=submit]', (e) ->
                e.preventDefault()
                that = $ @
                month = that.parent().find('#month').val()
                year = that.parent().find('#year').val()

                that.parent().find('#month').val ''
                that.parent().find('#year').val ''

                month = parseInt month, 10
                year = parseInt year, 10

                self.changeCalendar.call self, month, year

            self.calendar.on 'click', 'button.drm-show-event-form', ->
                that = $ @
                if self.addEventForm.is(':hidden')
                    self.addEventForm.slideDown()
                    that.text 'Hide Form'
                else
                    self.addEventForm.slideUp()
                    that.text 'Add New Event'

            self.calendar.on 'click', 'form.drm-calendar-new-event button.addEvent', (e) ->                
                e.preventDefault()
                newEvent =
                    name: self.addEventForm.find('#event-name').val()
                    recurrance: self.addEventForm.find('#recurrance').val()
                    month: self.addEventForm.find('#month').val()
                    year: self.addEventForm.find('#year').val()
                    eventDate: self.addEventForm.find('#event-date').val()
                    day: self.addEventForm.find('#day').val()
                    dayNum: self.addEventForm.find('#day-num').val()
                    type: self.addEventForm.find('#event-type').val().toLowerCase()
                    notes: self.addEventForm.find('#event-notes').val()
                self.createEvent newEvent
                newMonth = $.inArray newEvent.month, self.months
                self.changeCalendar.call @, newMonth, self.currentYear
                self.addEventForm.find(':input').val ''

            self.calendar.on 'click', "td:not(.#{self.classes.muted})", ->
                that = $ @
                month = self.months[that.data('month')]
                date = that.data 'date'
                year = that.data 'year'

                if self.addEventForm.is ':hidden'
                    self.addEventForm.slideDown()
                    self.showEventFormButton.text 'Hide Form'

                month: self.addEventForm.find('#month').val month
                year: self.addEventForm.find('#year').val year
                eventDate: self.addEventForm.find('#event-date').val date

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

        createEvent: (newEvent) =>
            obj = @events

            eventName = do ->
                key = $.trim(newEvent.name).toLowerCase()
                key.replace /\W+/g, ''
            obj[eventName] =
                name: $.trim newEvent.name
                month: $.trim newEvent.month
                year: $.trim newEvent.year
                eventDate: $.trim newEvent.eventDate
                day: $.trim newEvent.day
                dayNum: $.trim newEvent.dayNum
                type: $.trim newEvent.type
                notes: $.trim newEvent.notes
            $(@events).add obj[eventName]

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

        addEventsToCalendar: (numberDays, dayShift) =>
            self = @
            calendarInner = self.calendar.find "div.#{@calendarInnerClass}"
            currentMonth = calendarInner.data 'month'
            currentYear = calendarInner.data 'year'
            weeks = calendarInner.find('tbody').find 'tr'

            getWeekNum = (dayNum, day, numberDays, dayShift) ->
                numberWeeks = self.getWeeksInMonth(numberDays, dayShift)
                lastWeekLength = weeks.eq(numberWeeks).length

                if dayNum is 'last' and dayShift <= day
                    if lastWeekLength < day then (numberWeeks - 2) else numberWeeks - 1
                else if dayNum is 'last' and dayShift > day
                    numberWeeks - 2
                else
                    parseInt(dayNum, 10) - 1

            $.each self.events, (key, value) ->                
                eventDays = []
                # add yearly events
                if value.recurrance is 'yearly'
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
                        eventDays.push calendarInner.find "[data-date=#{eventDate}]"
                # add monthly events
                else if value.recurrance is 'monthly'

                    if value.day
                        day = $.inArray value.day, self.days
                        weekNum = getWeekNum value.dayNum, day, numberDays, dayShift
                        eventWeek = if dayShift <= day then eventWeek = weeks.eq weekNum else eventWeek = weeks.eq weekNum + 1
                        eventDate = eventWeek.find('td').eq(day).data 'date'
                    else
                        eventDate = value.eventDate

                    eventDays.push calendarInner.find "[data-date=#{eventDate}]"
                # else if value.recurrance is 'biweekly'
                #     # events that occur every 2 weeks
                else if value.recurrance is 'weekly'
                    # weekly events               
                    if value.day
                        day = $.inArray value.day, self.days
                        eventDate = []
                        length = weeks.length
                        $.each weeks, (key, value) ->
                            that = $ value
                            weekLength = that.find("td:not(.#{self.classes.muted})").length
                            if key is 0
                                if dayShift <= day then eventDate.push that.find('td').eq(day).data('date')
                            else if key is (length - 1)
                                if day < weekLength then eventDate.push that.find('td').eq(day).data('date')
                            else
                                eventDate.push that.find('td').eq(day).data('date')

                    $.each eventDate, (key, value) ->
                        eventDays.push calendarInner.find "[data-date=#{value}]"

                else if value.recurrance is 'daily'
                    days = calendarInner.find('tbody').find "td:not(.#{self.classes.muted})"
                    days.each ->
                        eventDays.push $(@)

                else if value.recurrance is 'none'
                    month = $.inArray value.month, self.months

                    if currentMonth is month and currentYear is value.year
                        eventDate = value.eventDate

                        eventDays.push calendarInner.find "[data-date=#{eventDate}]"                                           
                
                if eventDays.length > 0
                    $.each eventDays, (key, day) ->
                        # add css classes here
                        if value.type is 'holiday' then day.addClass self.classes.holiday
                        self.addNewCalendarEvent value.name, day

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
                        weeks += "<td data-month='#{month}' data-date='#{date}' data-year='#{year}'>#{date}</td>"
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
                        weeks += "<td data-month='#{month}' data-date='#{date}' data-year='#{year}'>#{date}</td>"
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
            self.addEventsToCalendar numberDays, dayShift
            $('.drm-calendar-year-prev').text lastYear
            $('.drm-calendar-year-next').text nextYear

            $('.drm-calendar-month-prev').text lastMonth
            $('.drm-calendar-month-next').text nextMonth

    drmCalendar = new DrmCalendar()

) jQuery