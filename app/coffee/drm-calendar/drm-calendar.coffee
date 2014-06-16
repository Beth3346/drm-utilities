###############################################################################
# Interactive JS Calendar
###############################################################################
# needs support for events with start and end dates and times
# needs support for events that recur a limited number of times
# needs edit view
"use strict"

$ = jQuery
class @DrmCalendar
    constructor: (@calendarClass = 'drm-calendar', @view = 'month', @addHolidays = yes) ->
        self = @
        self.calendar = $ ".#{self.calendarClass}"

        if self.calendar isnt 0
            self.body = $ 'body'
            self.daysPerWeek = 7
            self.events = []
            self.now = new Date()
            self.today =
                month: self.now.getMonth()
                date: self.now.getDate()
                year: self.now.getFullYear()
            self.calendarInnerClass = "drm-calendar-#{self.view}-view"
            self.calendarNav = $ '.drm-calendar-nav'
            self.calendarSelect = $ '.drm-calendar-select'
            self.calendarSelectButton = self.calendarSelect.find 'button[type=submit]'
            self.addEventForm = self.calendar.find('form.drm-calendar-new-event').hide()
            self.showEventFormButton = self.calendar.find 'button.drm-show-event-form'
            self.calendarViewActiveButton = self.calendar.find(".drm-calendar-view-nav button[data-view=#{self.view}]").addClass 'active'
            self.eventClass = 'drm-events'
            self.classes =
                weekend: 'drm-cal-weekend'
                muted: 'drm-cal-muted'
                holiday: 'drm-cal-holiday'
                today: 'drm-cal-today'
                month: 'drm-month'
                week: 'drm-week'
                date: 'drm-date'

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

            self.hours = [
                {
                    name: 'All Day Event'
                    time: null
                }
                {
                    name: '12am'
                    time: 0
                }
                {
                    name: '1am'
                    time: 1
                }
                {
                    name: '2am'
                    time: 2
                }
                {
                    name: '3am'
                    time: 3
                }
                {
                    name: '4am'
                    time: 4
                }
                {
                    name: '5am'
                    time: 5
                }
                {
                    name: '6am'
                    time: 6
                }
                {
                    name: '7am'
                    time: 7
                }
                {
                    name: '8am'
                    time: 8
                }
                {
                    name: '9am'
                    time: 9
                }
                {
                    name: '10am'
                    time: 10
                }
                {
                    name: '11am'
                    time: 11
                }
                {
                    name: '12pm'
                    time: 12
                }
                {
                    name: '1pm'
                    time: 13
                }
                {
                    name: '2pm'
                    time: 14
                }
                {
                    name: '3pm'
                    time: 15
                }
                {
                    name: '4pm'
                    time: 16
                }
                {
                    name: '5pm'
                    time: 17
                }
                {
                    name: '6pm'
                    time: 18
                }
                {
                    name: '7pm'
                    time: 19
                }
                {
                    name: '8pm'
                    time: 20
                }
                {
                    name: '9pm'
                    time: 21
                }
                {
                    name: '10pm'
                    time: 22
                }
                {
                    name: '11pm'
                    time: 23
                }
            ]

            self.holidays = [
                {
                    name: "New Year's Day"
                    month: "January"
                    eventDate: 1
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Martin Luther King's Birthday"
                    month: "January"
                    day: ["Monday"]
                    dayNum: 3
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Groundhog Day"
                    month: "February"
                    eventDate: 2
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Valentine's Day"
                    month: "February"
                    eventDate: 14
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "President's Day"
                    month: "February"
                    day: ["Monday"]
                    dayNum: 3
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "St. Patrick's Day"
                    month: "March"
                    eventDate: 17
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "April Fool's Day"
                    month: "April"
                    eventDate: 1
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Earth Day"
                    month: "April"
                    eventDate: 22
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Arbor Day"
                    month: "April"
                    day: ["Friday"]
                    dayNum: "last"
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "May Day"
                    month: "May"
                    eventDate: 1
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Cinco De Mayo"
                    month: "May"
                    eventDate: 5
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Mother's Day"
                    month: "May"
                    day: ["Sunday"]
                    dayNum: 2
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Memorial Day"
                    month: "May"
                    day: ["Monday"]
                    dayNum: "last"
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Flag Day"
                    month: "June"
                    eventDate: 14
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Father's Day"
                    month: "June"
                    day: ["Sunday"]
                    type: "holiday"
                    recurrance: "yearly"
                    dayNum: 3
                }
                {
                    name: "Independence Day"
                    month: "July"
                    eventDate: 4
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Labor Day"
                    month: "September"
                    day: ["Monday"]
                    dayNum: 1
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Patroit Day"
                    month: "September"
                    eventDate: 11
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Columbus Day"
                    month: "October"
                    day: ["Monday"]
                    dayNum: 2
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Halloween"
                    month: "October"
                    eventDate: 31
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Veteran's Day"
                    month: "November"
                    eventDate: 11
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Thanksgiving"
                    month: "November"
                    day: ["Thursday"]
                    dayNum: 4
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Pearl Harbor Day"
                    month: "December"
                    eventDate: 7
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Festivus"
                    month: "December"
                    eventDate: 23
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Christmas Eve"
                    month: "December"
                    eventDate: 24
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Christmas"
                    month: "December"
                    eventDate: 25
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "Boxing Day"
                    month: "December"
                    eventDate: 26
                    type: "holiday"
                    recurrance: "yearly"
                }
                {
                    name: "New Year's Eve"
                    month: "December"
                    eventDate: 31
                    type: "holiday"
                    recurrance: "yearly"
                }
            ]

            if self.addHolidays
                $.each self.holidays, (key, value) ->
                    self.createEvent value

            if self.calendar.length > 0
                currentDate =
                    month: self.today.month
                    date: self.today.date
                    year: self.today.year
                self.createCalendar currentDate

            self.calendar.on 'click', '.drm-calendar-date-prev, .drm-calendar-date-next', ->
                # skip date forward or backward
                direction = $(@).data 'dir'
                self.advanceDate.call @, direction

            self.calendar.on 'click', '.drm-calendar-week-prev, .drm-calendar-week-next', ->
                # skip week forward or backward
                direction = $(@).data 'dir'
                self.advanceWeek.call @, direction

            self.calendar.on 'click', '.drm-calendar-month-prev, .drm-calendar-month-next', ->
                # skip month forward or backward
                direction = $(@).data 'dir'
                self.advanceMonth.call @, direction

            self.calendar.on 'click', '.drm-calendar-year-prev, .drm-calendar-year-next', ->
                # skip year forward or backward
                direction = $(@).data 'dir'
                self.advanceYear.call @, direction

            self.calendar.on 'click', '.drm-calendar-current', ->
                # go to today's date
                currentDate =
                    month: self.today.month
                    date: self.today.date
                    year: self.today.year
                self.changeCalendar.call @, currentDate

            self.calendar.on 'click', '.drm-calendar-select button[type=submit]', (e) ->
                # go to a specific date
                e.preventDefault()
                that = $ @
                fields = that.parent().find(':input').not 'button[type=submit]'
                currentDate =
                    month: that.parent().find('#month').val()
                    date: that.parent().find('#date').val()
                    year: that.parent().find('#year').val()

                # clear form
                self.clearForm fields

                # parse form data
                $.each currentDate, (key, value) ->
                    parseInt value, 10

                # change calendar view
                self.changeCalendar.call self, currentDate

            self.calendar.on 'click', 'button.drm-show-event-form', ->
                # show add event form
                that = $ @
                if self.addEventForm.is(':hidden')
                    self.addEventForm.slideDown()
                    that.text 'Hide Form'
                else
                    self.addEventForm.slideUp()
                    that.text 'Add New Event'

            self.calendar.on 'click', '.drm-calendar-view-nav button', (e) ->
                # change calendar view
                e.preventDefault()
                that = $ @
                that.addClass 'active'
                self.calendar.find(".drm-calendar-view-nav button.active").removeClass 'active'
                view = that.data 'view'

                self.changeCalendarView view

            self.calendar.on 'click', 'form.drm-calendar-new-event button.addEvent', (e) ->
                # add an new event to the events object
                # this code should be moved to its own method
                # write a method to get the form data and send the object to the createEvent method
                e.preventDefault()
                newEvent = self.getFormData self.addEventForm
                currentMonth = $(".#{self.calendarInnerClass}").data 'month'

                self.createEvent newEvent

                newMonth = if newEvent.month? then $.inArray newEvent.month, self.months else self.today.month

                if newMonth isnt currentMonth
                    currentDate =
                        month: newMonth
                        date: newEvent.eventDate
                        year: self.today.year

                    self.changeCalendar.call @, currentDate

                # reset form
                fields = self.addEventForm.find(':input').not('button[type=submit]').val ''
                self.clearForm fields                

            self.calendar.on 'click', ".drm-date", ->
                # show event form and fill out date infomation when a date is clicked
                that = $ @

                if self.addEventForm.is ':hidden'
                    self.addEventForm.slideDown()
                    self.showEventFormButton.text 'Hide Form'

                month: self.addEventForm.find('#month').val self.months[that.data('month')]
                year: self.addEventForm.find('#year').val that.data('year')
                eventDate: self.addEventForm.find('#eventDate').val that.data('date')
                time: self.addEventForm.find('#time').val that.data('hour')

            self.calendar.on 'click', "ul.#{self.eventClass} a", (e) ->
                # show event details
                that = $ @
                day = that.closest '.drm-date'
                eventId = that.data 'event'
                fullDate =
                    month: self.months[day.data('month')]
                    date: day.data 'date'
                    year: day.data 'year'
                e.preventDefault()
                e.stopPropagation()
                self.showEventDetails eventId, fullDate

            self.body.on 'click', 'div.drm-calendar-event-details', (e) ->
                e.stopPropagation()

            self.body.on 'click', 'div.drm-calendar-event-details button.drm-event-edit', (e) ->
                e.preventDefault()
                that = $ @
                eventId = that.data 'event'
                index = self.getEventIndex eventId
                console.log "editing event #{index}"

            self.body.on 'click', 'div.drm-calendar-event-details button.drm-event-delete', (e) ->
                e.preventDefault()
                that = $ @
                eventId = that.data 'event'
                index = self.getEventIndex eventId
                self.removeCalendarEvent eventId, index
                self.removeEventDetails e

            self.body.on 'click', 'div.drm-calendar-event-details button.drm-event-close', self.removeEventDetails

    capitalize: (str) ->
        str.toLowerCase().replace /^.|\s\S/g, (a) ->
            a.toUpperCase()

    getFormData: (form) ->
        # get form data and return an object
        # need to remove dashes from ids
        formInput = {}
        fields = form.find(':input').not('button').not ':checkbox'
        checkboxes = form.find 'input:checked'

        if checkboxes.length isnt 0
            boxIds = []

            checkboxes.each ->
                boxIds.push $(@).attr 'id'

            boxIds = $.unique boxIds

            $.each boxIds, (key, value) ->
                checkboxValues = []
                boxes = form.find "input:checked##{value}"

                boxes.each ->
                    checkboxValues.push $.trim($(@).val())

                formInput["#{value}"] = checkboxValues
                return

        $.each fields, (key, value) ->
            that = $ value
            id = that.attr 'id'

            input = if $.trim(that.val()) is '' then null else $.trim(that.val())

            if input? then formInput["#{id}"] = input
            return

        formInput

    clearForm: (fields) ->
        fields.each ->
            that = $ @
            if that.attr('type') is 'checkbox' then that.prop 'checked', false else that.val ''

    getDaysInMonth: (month, year) ->
        month = month + 1
        new Date(year, month, 0).getDate()

    getDayOfWeek: (month, date, year) ->
        day = new Date year, month, date
        day.getDay()

    getWeeksInMonth: (month, year) =>
        # gets the number of weeks in a month
        firstDay = @getDayOfWeek month, 1, year
        numberDays = @getDaysInMonth month, year
        dayShift = if firstDay is @daysPerWeek then 0 else firstDay
        Math.ceil (numberDays + dayShift) / @daysPerWeek

    getWeekNum: (dayNum, day, currentMonth, currentYear) =>
        # gets the week of the month which an event occurs
        calendarInner = @calendar.find "div.#{@calendarInnerClass}"
        weeks = calendarInner.find '.drm-week'
        firstDay = @getDayOfWeek currentMonth, 1, currentYear
        dayShift = if firstDay is @daysPerWeek then 0 else firstDay
        numberWeeks = @getWeeksInMonth currentMonth, currentYear
        lastWeekLength = weeks.eq(numberWeeks).length

        if dayNum is 'last' and dayShift <= day
            eventWeekNum = if lastWeekLength < day then (numberWeeks - 2) else numberWeeks - 1
        else if dayNum is 'last' and dayShift > day
            eventWeekNum = numberWeeks - 2
        else
            eventWeekNum = parseInt(dayNum, 10) - 1

        return if dayShift <= day then eventWeekNum else eventWeekNum + 1

    getDatesInWeek: (currentMonth, currentDate, currentYear) =>
        firstDay = @getDayOfWeek currentMonth, 1, currentYear
        numberDays = @getDaysInMonth currentMonth, currentYear
        dayShift = if firstDay is @daysPerWeek then 0 else firstDay
        currentDay = @getDayOfWeek currentMonth, currentDate, currentYear
        numberWeeks = @getWeeksInMonth currentMonth, currentYear
        weekInfo = {}
        weekInfo.datesInWeek = []

        firstWeek = []
        lastWeek = []

        daysInFirstWeek = @daysPerWeek - dayShift

        i = 1
        while i <= numberWeeks
            dates = []

            if i is 1
                j = 0
                while j < daysInFirstWeek
                    j = j + 1
                    dates.push j
            else if i < numberWeeks
                if i is 2 then date = daysInFirstWeek
                j = 0
                while j < @daysPerWeek
                    j = j + 1
                    date = date + 1
                    dates.push date
            else if i is numberWeeks
                # last week in month
                while date < numberDays
                    date = date + 1
                    dates.push date

            if currentDate in dates
                weekInfo.weekNum = i - 1
                weekInfo.datesInWeek = dates

            i = i + 1
        weekInfo

    getWeekNumber: (currentMonth, currentDate, currentYear) =>
        self = @
        weekNum = 1
        weekNums = []
        weekInfo = self.getDatesInWeek currentMonth, currentDate, currentYear

        $.each self.months, (key, value) ->
            numberDays = self.getDaysInMonth key, currentYear
            firstDay = self.getDayOfWeek key, 1, currentYear
            dayShift = if firstDay is self.daysPerWeek then 0 else firstDay
            numberWeeks = self.getWeeksInMonth currentMonth, currentYear
            week = 1
            if $.isNumeric numberWeeks
                while week <= numberWeeks
                    if week is 1 and firstDay isnt 0
                        weekNum = weekNum
                    else
                        weekNum = weekNum + 1
                    week = week + 1
                    if currentMonth is key
                        weekNums.push weekNum
        weekNumber = weekNums[weekInfo.weekNum]
        weekNumber

    createEvent: (newEvent) =>
        _id = @events.length
        obj =
            _id: _id
            name: if newEvent.name? then newEvent.name else null
            recurrance: if newEvent.recurrance? then newEvent.recurrance.toLowerCase() else 'none'
            month: if newEvent.month? then newEvent.month else null
            year: if newEvent.year? then parseInt(newEvent.year, 10) else null
            eventDate: if newEvent.eventDate? then parseInt(newEvent.eventDate, 10) else null
            time: if newEvent.time? then newEvent.time else null
            day: if newEvent.day? then newEvent.day else null
            dayNum: if newEvent.dayNum? then newEvent.dayNum else null
            type: if newEvent.type? then newEvent.type.toLowerCase() else null
            notes: if newEvent.notes? then newEvent.notes else null

        @events.push obj
        @addEventsToCalendar @events[obj._id]

    removeCalendarEvent: (eventId, index) =>
        events = @calendar.find "ul.#{@eventClass} a[data-event=#{eventId}]"
        events.remove()
        @events.splice index, 1

    getEventIndex: (eventId) =>
        index = null
        $.each @events, (key, value) ->
            if value._id is eventId then index = key
            index
        index

    showEventDetails: (eventId, fullDate) =>
        self = @
        index = self.getEventIndex eventId
        events = self.events[index]
        eventDate = "#{fullDate.month} #{fullDate.date}, #{fullDate.year}"

        eventFrequency = do ->
            if events.recurrance is 'yearly' and events.dayNum?
                "Every #{events.dayNum} #{events.day} of #{events.month}"
            else if events.recurrance is 'yearly'
                "Every #{events.eventDate} of #{events.month}"
            else if events.recurrance is 'monthly' and events.dayNum?
                "Every #{events.dayNum} #{events.day} of the month"
            else if events.recurrance is 'monthly'
                "Every #{events.eventDate} of the month"
            else if events.recurrance is 'biweekly'
                "Every other #{events.day}"
            else if events.recurrance is 'weekly'
                "Every #{events.day}"
            else if events.recurrance is 'daily'
                "Every Day"
            else
                "One Time Event"
        
        eventDetails =
            date: eventDate
            time: events.time
            type: events.type
            frequency: eventFrequency
            repeat: events.recurrance
            notes: events.notes

        eventHolder = $ '<div></div>',
            class: 'drm-calendar-event-details'
            html: "<h1 class='drm-calendar-header'>#{events.name}</h1>"
        closeButton = $ '<button></button>',
            class: 'drm-event-close'
            text: 'Close'
            type: 'button'
        editButton = $ "<button></button>",
            class: 'drm-event-edit'
            'data-event': events._id
            text: 'Edit'
            type: 'button'
        deleteButton = $ "<button></button>",
            class: 'drm-event-delete'
            'data-event': events._id
            text: 'Delete'
            type: 'button'
        eventDetailList = $ '<ul></ul>',
            class: 'drm-event-detail-list'
        close = $ '<button></button>',
            class: 'close'
            text: 'x'
        lightboxHtml = $ '<div></div>',
            class: 'drm-blackout'
            html: close + eventHolder

        lightboxHtml.hide().appendTo('body').fadeIn 300, ->
            eventHolder.appendTo lightboxHtml
            eventDetailList.appendTo eventHolder
            $.each eventDetails, (key, value) ->
                if value?
                    title = self.capitalize key
                    listItem = $ '<li></li>',
                        html: "<span class='drm-bold'>#{title}: </span><span class='drm-event-detail'>#{value}</span>"
                    listItem.appendTo eventDetailList

            closeButton.appendTo eventDetailList
            editButton.appendTo eventDetailList
            deleteButton.appendTo eventDetailList

    removeEventDetails: (e) ->
        $('div.drm-blackout').fadeOut 300, ->
            $(@).remove()

        e.preventDefault()

    addEventsToCalendar: (events) =>
        self = @
        calendarInner = self.calendar.find "div.#{@calendarInnerClass}"
        currentMonth = calendarInner.data 'month'
        currentYear = calendarInner.data 'year'
        month = $.inArray events.month, self.months
        weeks = calendarInner.find '.drm-week'
        eventDates = []

        _addYearlyEvents = (events, eventDates) ->
            # add yearly events
            if events.day
                $.each events.day, (key, value) ->
                    day = $.inArray value, self.days
                    eventWeekNum = self.getWeekNum events.dayNum, day, currentMonth, currentYear

                    if currentMonth is month
                        weeks.each ->
                            that = $ @
                            firstDate = that.find(".#{self.classes.date}").first().data 'date'
                            weekInfo = self.getDatesInWeek currentMonth, firstDate, currentYear
                            if eventWeekNum is weekInfo.weekNum
                                eventDates.push that.find(".#{self.classes.date}[data-day=#{day}]").data 'date'
            else
                eventDates.push parseInt(events.eventDate, 10)
                
        _addMonthlyEvents = (events, eventDates) ->
            # add monthly events
            if events.day
                $.each events.day, (key, value) ->
                    day = $.inArray value, self.days
                    eventWeekNum = self.getWeekNum events.dayNum, day, currentMonth, currentYear
                    weeks.each ->
                        that = $ @
                        firstDate = that.find(".#{self.classes.date}").first().data 'date'
                        weekInfo = self.getDatesInWeek currentMonth, firstDate, currentYear
                        if eventWeekNum is weekInfo.weekNum
                            eventDates.push that.find(".#{self.classes.date}[data-day=#{day}]").data 'date'
            else
                eventDates.push parseInt(events.eventDate, 10)

        _addBiWeeklyEvents = (events, eventDates) ->
            # events that occur every 2 weeks
            if events.day
                weekInfo = self.getDatesInWeek currentMonth, events.eventDate, currentYear
                $.each events.day, (key, value) ->
                    day = $.inArray value, self.days
                    length = weeks.length
                    weekPattern = if weekInfo.weekNum % 2 is 0 then 'even' else 'odd'
                    eventWeeks = calendarInner.find ".#{weekPattern}-week"

                    $.each eventWeeks, (key, value) ->
                        that = $ value
                        weekLength = that.find(".drm-date").length
                        eventDates.push that.find(".#{self.classes.date}[data-day=#{day}]").data('date')

        _addWeeklyEvents = (events, eventDates) ->
            # weekly events
            firstDay = self.getDayOfWeek currentMonth, 1, currentYear
            dayShift = if firstDay is self.daysPerWeek then 0 else firstDay
            if events.day
                $.each events.day, (key, value) ->
                    day = $.inArray value, self.days
                    length = weeks.length
                    $.each weeks, (key, value) ->
                        that = $ value
                        days = if self.view is 'month'
                                that.find ".#{self.classes.date}"
                            else
                                that.find ".#{self.classes.date}[data-hour='All Day Event']"

                        weekLength = days.length

                        if key is 0 and length isnt 1
                            if dayShift <= day then eventDates.push that.find(".#{self.classes.date}[data-day=#{day}]").data('date')
                        else if key is (length - 1) and length isnt 1
                            if day < weekLength then eventDates.push that.find(".#{self.classes.date}[data-day=#{day}]").data('date')
                        else
                            eventDates.push that.find(".#{self.classes.date}[data-day=#{day}]").data('date')

            eventDates

        _addDailyEvents = (events, eventDates) ->
            days = if self.view is 'month'
                    calendarInner.find ".#{self.classes.date}"
                else
                    calendarInner.find ".#{self.classes.date}[data-hour='All Day Event']"

            days.each ->
                eventDates.push $(@).data 'date'

        _addOneTimeEvents = (events, eventDates) ->
            eventDates.push parseInt(events.eventDate, 10)
            eventDates

        _addCalendarEvent = (events, dates) ->
            # create event html

            if self.view is 'month'
                calendarItem = calendarInner.find ".drm-date[data-date=#{dates}]"
            else if !events.time?
                calendarItem = calendarInner.find ".drm-date[data-date=#{dates}][data-hour='All Day Event']"
            else
                # find hour td element
                re = new RegExp '^0?','gi'
                re2 = new RegExp ':[0-9]{2}', 'gi'
                hour = events.time.replace re, ''
                hour = hour.replace re2, ''
                calendarItem = calendarInner.find ".drm-date[data-date=#{dates}][data-hour=#{hour}]"

            eventList = calendarItem.find "ul.#{self.eventClass}"
            length = eventList.length

            eventContent = 
                if events.time?
                    "<span class='drm-time'>#{events.time}: </span><span class='drm-event'>#{events.name}</span>"
                else
                    "<span class='drm-event drm-all-day-event'>#{events.name}</span>"

            eventHtml = $ '<a></a>',
                href: '#'
                'data-event': events._id
                html: eventContent

            if length is 0
                eventList = $ '<ul></ul>',
                    class: "#{self.eventClass}"

                eventList.appendTo calendarItem
            
            item = $ '<li></li>',
                html: eventHtml
            
            item.appendTo eventList

            if events.type is 'holiday' then eventList.find("a:contains(#{events.name})").addClass self.classes.holiday

        if events.recurrance is 'yearly' and currentMonth is month
            _addYearlyEvents events, eventDates
        else if events.recurrance is 'monthly'
            _addMonthlyEvents events, eventDates
        else if events.recurrance is 'biweekly'
            _addBiWeeklyEvents events, eventDates
        else if events.recurrance is 'weekly'
            _addWeeklyEvents events, eventDates
        else if events.recurrance is 'daily'
            _addDailyEvents events, eventDates
        else if events.recurrance is 'none' and currentMonth is month and currentYear is parseInt(events.year, 10)                                         
            _addOneTimeEvents events, eventDates
        if eventDates.length > 0
            $.each eventDates, (key, date) ->
                # add css classes here
                _addCalendarEvent events, date

    advanceDate: (direction) =>
        calendarInner = @calendar.find "div.#{@calendarInnerClass}"
        currentDate =
            month: calendarInner.data 'month'
            date: calendarInner.find(".#{@classes.date}").data 'date'
            year: calendarInner.data 'year'
        nextYear = currentDate.year + 1
        lastYear = currentDate.year - 1
        nextMonth = if currentDate.month is 11 then 0 else currentDate.month + 1
        lastMonth = if currentDate.month is 0 then 11 else currentDate.month - 1
        
        if direction is 'prev'
            lastDayOfPrevMonth = @getDaysInMonth lastMonth, currentDate.year

            if currentDate.date is 1
                currentDate.date = lastDayOfPrevMonth
                currentDate.year = if currentDate.month is 0 then lastYear else currentDate.year
                currentDate.month = lastMonth
            else
                currentDate.date = currentDate.date - 1

        else if direction is 'next'
            lastDayOfMonth = @getDaysInMonth currentDate.month, currentDate.year

            if currentDate.date is lastDayOfMonth
                currentDate.date = 1
                currentDate.year = if currentDate.month is 11 then nextYear else currentDate.year
                currentDate.month = nextMonth
            else
                currentDate.date = currentDate.date + 1

        if @view is 'date' then @changeCalendar currentDate

    advanceWeek: (direction) =>
        calendarInner = @calendar.find "div.#{@calendarInnerClass}"
        currentDate =
            month: calendarInner.data 'month'
            date: 1
            year: calendarInner.data 'year'
        nextYear = currentDate.year + 1
        lastYear = currentDate.year - 1
        nextMonth = if currentDate.month is 11 then 0 else currentDate.month + 1
        lastMonth = if currentDate.month is 0 then 11 else currentDate.month - 1
        
        if direction is 'prev'
            firstDay = calendarInner.find(".#{@classes.date}").first().data 'date'
            lastDayOfPrevMonth = @getDaysInMonth lastMonth, currentDate.year

            if firstDay is 1 and @view is 'week'
                currentDate.date = lastDayOfPrevMonth
                currentDate.year = if currentDate.month is 0 then lastYear else currentDate.year
                currentDate.month = lastMonth
            else if firstDay < 7 and @view is 'week'
                currentDate.date = firstDay - 1
            else if firstDay is 1 and @view is 'date'
                currentDate.date = lastDayOfPrevMonth - 6 # 30 - 6 1 24
                currentDate.year = if currentDate.month is 0 then lastYear else currentDate.year
                currentDate.month = lastMonth
            else if firstDay < 7 and @view is 'date'
                currentDate.date = lastDayOfPrevMonth - (7 - firstDay) # 31 - (7 - 3) = 27 27  28 - (7 - 6) = 27 6 27
                currentDate.year = if currentDate.month is 0 then lastYear else currentDate.year
                currentDate.month = lastMonth
            else
                currentDate.date = firstDay - 7

        else if direction is 'next'
            lastDay = calendarInner.find(".#{@classes.date}").last().data 'date'
            lastDayOfMonth = @getDaysInMonth currentDate.month, currentDate.year

            if lastDay is lastDayOfMonth and @view is 'week'
                currentDate.date = 1
                currentDate.year = if currentDate.month is 11 then nextYear else currentDate.year
                currentDate.month = nextMonth
            else if (lastDay + 7 > lastDayOfMonth) and @view is 'week'
                currentDate.date = lastDayOfMonth
            else if (lastDay + 7 > lastDayOfMonth) and @view is 'date'
                currentDate.date = 7 - (lastDayOfMonth - lastDay) # 31 - 29 = 2 then 7 - 2 = 5
                currentDate.year = if currentDate.month is 11 then nextYear else currentDate.year
                currentDate.month = nextMonth
            else
                currentDate.date = lastDay + 7

        if @view is 'date' or @view is 'week' then @changeCalendar currentDate

    advanceMonth: (direction) =>
        self = @
        calendarInner = @calendar.find "div.#{@calendarInnerClass}"
        currentDate =
            month: calendarInner.data 'month'
            date: if @month is self.today.month then self.today.date else 1
            year: calendarInner.data 'year'
        
        if direction is 'prev'
            currentDate.month = if currentDate.month is 0 then 11 else currentDate.month - 1
            currentDate.year = if currentDate.month is 11 then currentDate.year - 1 else currentDate.year
        else if direction is 'next'
            currentDate.month = if currentDate.month is 11 then 0 else currentDate.month + 1
            currentDate.year = if currentDate.month is 0 then currentDate.year + 1 else currentDate.year
        @changeCalendar currentDate

    advanceYear: (direction) =>
        self = @
        calendarInner = @calendar.find "div.#{@calendarInnerClass}"
        currentDate =
            month: calendarInner.data 'month'
            year: calendarInner.data 'year'

        currentDate.date = if currentDate.month is self.today.month then self.today.date else 1
        currentDate.year = if direction is 'prev' then currentDate.year - 1 else currentDate.year + 1
        
        @changeCalendar currentDate

    changeCalendarView: (view) =>
        self = @
        calendarInner = @calendar.find "div.#{@calendarInnerClass}"
        currentDate =
            month: calendarInner.data 'month'
            year: calendarInner.data 'year'

        currentDate.date = if currentDate.month is self.today.month then self.today.date else 1     

        # update view
        @view = view
        @changeCalendar currentDate
        # change calendar class
        @calendarInnerClass = "drm-calendar-#{view}-view"
        @calendarInnerClass

    changeCalendar: (currentDate) =>
        self = @
        calendarInner = self.calendar.find "div.#{self.calendarInnerClass}"
        calendarInner.fadeOut(300).queue (next) ->
            $.when(calendarInner.remove()).then(self.createCalendar(currentDate))
            next()

    createCalendar: (currentDate) =>
        self = @
        nextYear = currentDate.year + 1
        lastYear = currentDate.year - 1
        nextMonth = if currentDate.month is 11 then 0 else currentDate.month + 1
        lastMonth = if currentDate.month is 0 then 11 else currentDate.month - 1
        firstDay = self.getDayOfWeek currentDate.month, 1, currentDate.year
        dayShift = if firstDay is self.daysPerWeek then 0 else firstDay
        numberDays = self.getDaysInMonth currentDate.month, currentDate.year
        numberWeeks = self.getWeeksInMonth currentDate.month, currentDate.year
        prevMonthNumberDays = self.getDaysInMonth lastMonth, currentDate.year
        weekInfo = self.getDatesInWeek currentDate.month, currentDate.date, currentDate.year
        datesInWeek = weekInfo.datesInWeek
        weekNumber = self.getWeekNumber currentDate.month, currentDate.date, currentDate.year
        weekClass = if weekNumber % 2 is 0 then 'even-week' else 'odd-week'
        day = self.getDayOfWeek currentDate.month, currentDate.date, currentDate.year

        _highlightWeekends = ->
            calendarInner = self.calendar.find "div.#{self.calendarInnerClass}"
            weeks = calendarInner.find '.drm-week'
            weekends = [0, 6]

            $.each weeks, ->
                that = $ @
                $.each weekends, (key, value) ->
                    weekend = that.find(".#{self.classes.date}[data-day=#{value}]")
                        .not ".#{self.classes.muted}, .#{self.classes.today}, .#{self.classes.holiday}"
                    weekend.addClass self.classes.weekend

        _highlightToday = ->
            calendarInner = self.calendar.find "div.#{self.calendarInnerClass}"
            month = calendarInner.data 'month'
            year = calendarInner.data 'year'

            if month is self.today.month and year is self.today.year
                calendarInner.find(".drm-date[data-date=#{self.today.date}]")
                    .addClass self.classes.today

        _createMonthView = (currentDate) ->
            _addWeekNumbers = ->
                weeks = self.calendar.find("div.#{self.calendarInnerClass}").find '.drm-week'

                $.each weeks, (key, value) ->
                    that = $ value
                    firstDateInWeek = that.find('.drm-date').first().data 'date'
                    weekNumber = self.getWeekNumber currentDate.month, firstDateInWeek, currentDate.year

                    if weekNumber % 2 is 0
                        that.addClass 'even-week'
                    else
                        that.addClass 'odd-week'

                    that.attr 'data-week', weekNumber

            # create html
            weekdays = '<table><thead><tr>'
            $.each self.days, (key, value) ->
                weekdays += "<th>#{value}</th>"
            weekdays += '</tr></thead>'

            weeks = "<tbody class='#{self.classes.month}'>"
            i = 1
            currentDate.date = 1
            l = 1
            prevDays = (prevMonthNumberDays - dayShift) + 1
            nextDates = 1

            while i <= numberWeeks
                j = 1
                weeks += "<tr class='#{self.classes.week}'>"
                # if we are in week 1 we need to shift to the correct day of the week
                if i is 1 and firstDay isnt 0
                    # add cells for the previous month until we get to the first day
                    while l <= dayShift
                        weeks += "<td class='#{self.classes.muted}' data-day='#{j}'>#{prevDays}</td>"
                        prevDays += 1
                        l += 1
                        j += 1
                    # start adding cells for the current month
                    while j <= self.daysPerWeek
                        weeks += "<td class='#{self.classes.date}' data-month='#{currentDate.month}' data-date='#{currentDate.date}' 
                            data-year='#{currentDate.year}' data-day='#{j - 1}'>#{currentDate.date}</td>"
                        j += 1
                        currentDate.date += 1
                # if we are in the last week of the month we need to add blank cells for next month
                else if i is numberWeeks
                    while j <= self.daysPerWeek
                        # finish adding cells for the current month
                        if currentDate.date <= numberDays
                            weeks += "<td class='#{self.classes.date}' data-month='#{currentDate.month}' data-date='#{currentDate.date}' 
                                data-year='#{currentDate.year}' data-day='#{j - 1}'>#{currentDate.date}</td>"
                        # start adding cells for next month
                        else
                            weeks += "<td class='#{self.classes.muted}' data-day='#{j}'>#{nextDates}</td>"
                            nextDates += 1
                        j += 1
                        currentDate.date += 1
                else
                    # if we are in the middle of the month add cells for the current month
                    while j <= self.daysPerWeek
                        weeks += "<td class='#{self.classes.date}' data-month='#{currentDate.month}' data-date='#{currentDate.date}' 
                            data-year='#{currentDate.year}' data-day='#{j - 1}'>#{currentDate.date}</td>"
                        j += 1
                        currentDate.date += 1
                weeks += '</tr>'
                i += 1
            weeks += '</tbody></table>'

            calendar = $ '<div></div>',
                class: self.calendarInnerClass
                html: weekdays + weeks
                'data-month': currentDate.month
                'data-year': currentDate.year

            heading = $ '<h1></h1>',
                class: 'drm-calendar-header'
                text: "#{self.months[currentDate.month]} #{currentDate.year}"
            
            calendar.appendTo ".#{self.calendarClass}"
            heading.prependTo ".#{self.calendarInnerClass}"

            _highlightToday()
            _highlightWeekends()
            _addWeekNumbers()

            $.each self.events, (key, value) ->
                self.addEventsToCalendar value

            $('.drm-calendar-year-prev').text lastYear
            $('.drm-calendar-year-next').text nextYear

            $('.drm-calendar-month-prev').text self.months[lastMonth]
            $('.drm-calendar-month-next').text self.months[nextMonth]

            $('.drm-calendar-week-prev, .drm-calendar-week-next').hide()
            $('.drm-calendar-date-prev, .drm-calendar-date-next').hide()

        _createWeekView = (currentDate) ->
            _getDates = (datesInWeek, key) ->
                dates = {}
                # if its the first week of the month
                if datesInWeek.length < self.daysPerWeek and datesInWeek[0] is 1
                    if key is firstDay
                        dates.date = 1
                        dates.month = currentDate.month
                    else if key > firstDay
                        dates.date = (key - firstDay) + 1
                        dates.month = currentDate.month
                    else
                        dates.date = prevMonthNumberDays - (firstDay - (key + 1))
                        dates.month = lastMonth
                else if datesInWeek.length is self.daysPerWeek
                    dates.date = datesInWeek[key]
                    dates.month = currentDate.month
                # if its the last week of the month
                else if datesInWeek.length < self.daysPerWeek and datesInWeek[0] isnt 1
                    if key < datesInWeek.length
                        dates.date = datesInWeek[key]
                        dates.month = currentDate.month
                    else
                        dates.date = Math.abs (datesInWeek.length - (key + 1))
                        dates.month = nextMonth
                dates

            weekdaysHtml = "<thead><tr><th></th>"
            $.each self.days, (key, value) ->
                dates = _getDates datesInWeek, key
                weekdaysHtml += "<th>#{value}<br>#{self.months[dates.month]} #{dates.date}</th>"
            weekdaysHtml += '</tr></thead>'

            weekHtml = "<tbody class='#{self.classes.week} #{weekClass}' data-week='#{weekNumber}'>"
            $.each self.hours, (key, value) ->
                hour = value.name

                weekHtml += "<tr><td><span class='hour'>#{hour}</span></td>"
                $.each self.days, (key, value) ->
                    dates = _getDates datesInWeek, key
                    weekHtml += "<td class='#{self.classes.date}' data-month='#{dates.month}' data-date='#{dates.date}' 
                        data-year='#{currentDate.year}' data-day='#{key}' data-hour='#{hour}'></td>"
                weekHtml += '</tr>'

            weekHtml += '</tbody>'

            weekView = $ '<table></table>',
                html: weekdaysHtml + weekHtml

            calendar = $ '<div></div>',
                class: self.calendarInnerClass
                html: weekView
                'data-month': currentDate.month
                'data-year': currentDate.year

            weekDates = if datesInWeek.length > 1
                    "#{datesInWeek[0]} - #{datesInWeek[datesInWeek.length - 1]}"
                else 
                    "#{datesInWeek[0]}"

            heading = $ '<h1></h1>',
                class: 'drm-calendar-header'
                text: "#{self.months[currentDate.month]} #{weekDates}: Week #{weekNumber} of #{currentDate.year}"
            
            calendar.appendTo ".#{self.calendarClass}"
            heading.prependTo "div.#{self.calendarInnerClass}"

            $("div.#{self.calendarInnerClass}")
                .find "tbody td[data-month=#{lastMonth}]"
                .addClass self.classes.muted
                .removeClass 'drm-date'
            
            $("div.#{self.calendarInnerClass}")
                .find "tbody td[data-month=#{nextMonth}]"
                .addClass self.classes.muted
                .removeClass 'drm-date'

            _highlightToday()
            _highlightWeekends()

            $.each self.events, (key, value) ->
                self.addEventsToCalendar value

            $('.drm-calendar-year-prev').text lastYear
            $('.drm-calendar-year-next').text nextYear

            $('.drm-calendar-month-prev').text self.months[lastMonth]
            $('.drm-calendar-month-next').text self.months[nextMonth]

            $('.drm-calendar-week-prev, .drm-calendar-week-next').show()
            $('.drm-calendar-date-prev, .drm-calendar-date-next').hide()

        _createDateView = (currentDate) ->
            dayListHtml = "<ul class='drm-week drm-day #{weekClass}' data-week='#{weekNumber}'>"
            $.each self.hours, (key, value) ->
                hour = value.name
                dayListHtml += "<li class='#{self.classes.date}' data-month='#{currentDate.month}' data-date='#{currentDate.date}' 
                    data-year='#{currentDate.year}' data-day='#{day}' data-hour='#{hour}'><span class='hour'>#{hour}</span></li>"
            dayListHtml += '</ul>'

            calendar = $ '<div></div>',
                class: self.calendarInnerClass
                'data-month': currentDate.month
                'data-year': currentDate.year
                html: dayListHtml

            headingText = 
                if currentDate.month is self.today.month and currentDate is self.today.date and currentDate.year is self.today.year
                    "Today, #{self.days[day]}, #{self.months[currentDate.month]} #{currentDate.date} #{currentDate.year}"
                else
                    "#{self.days[day]}, #{self.months[currentDate.month]} #{currentDate.date} #{currentDate.year}"

            heading = $ '<h1></h1>',
                class: 'drm-calendar-header'
                text: headingText
            
            calendar.appendTo ".#{self.calendarClass}"
            heading.prependTo ".#{self.calendarInnerClass}"

            $.each self.events, (key, value) ->
                self.addEventsToCalendar value

            $('.drm-calendar-year-prev').text lastYear
            $('.drm-calendar-year-next').text nextYear

            $('.drm-calendar-month-prev').text self.months[lastMonth]
            $('.drm-calendar-month-next').text self.months[nextMonth]

            $('.drm-calendar-week-prev, .drm-calendar-week-next').show()
            $('.drm-calendar-date-prev, .drm-calendar-date-next').show()

        switch self.view
            when 'month' then _createMonthView currentDate
            when 'week' then _createWeekView currentDate
            when 'date' then _createDateView currentDate