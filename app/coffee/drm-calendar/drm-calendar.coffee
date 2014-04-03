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
            self.calendarInnerClass = 'drm-calendar-inner'
            self.calendar = $ ".#{self.calendarClass}"
            self.calendarNav = $ '.drm-calendar-nav'
            self.calendarSelect = $ '.drm-calendar-select'
            self.calendarSelectButton = self.calendarSelect.find 'button[type=submit]'
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
                'Thursdays'
                'Friday'
                'Saturday']

            self.holidays =
                newYears:
                    name: "New Year's Day"
                    month: 1
                    date: 1
                valentines:
                    name: "Valentine's Day"
                    month: 2
                    date: 14
                stpatricks:
                    name: "St. Patrick's Day"
                    month: 3
                    date: 17
                independenceDay:
                    name: "Independence Day"
                    month: 7
                    date: 4
                halloween:
                    name: "Halloween"
                    month: 10
                    date: 31
                christmasEve:
                    name: "Christmas Eve"
                    month: 12
                    date: 24
                christmas:
                    name: "Christmas"
                    month: 12
                    date: 25

            self.createCalendar self.currentMonth, self.currentYear

            self.calendarNav.on 'click', '.drm-calendar-prev, .drm-calendar-next', ->
                direction = $(@).data('dir')
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
            day = new Date(year, month, day)
            return day.getDay()

        createDaysInMonth: =>
            self = @
            numberDays = []
            $.each @months, (key, value) ->
                numberDays.push self.getDaysInMonth (key + 1), self.currentYear
            numberDays

        getDayShift = (firstDay) ->
            if firstDay isnt 0 then shift = daysPerWeek - (firstDay - 1) else shift = 0
            shift

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

            weekdays = "<table><thead><tr>"
            $.each @days, (key, value) ->
                weekdays += "<th>#{value}</th>"
            weekdays += "</tr></thead>"

            weeks = "<tbody>"
            i = 1
            date = 1
            l = 1
            prevDays = (prevMonthNumberDays - dayShift) + 1
            nextDates = 1

            while i <= numberWeeks
                j = 1
                weeks += "<tr>"
                # if we are in week 1 we need to shift to the correct day of the week
                if i is 1 and firstDay isnt 0
                    while l <= dayShift
                        weeks += "<td class='muted-cell'>#{prevDays}</td>"
                        prevDays += 1
                        l += 1
                        j += 1
                    while j < 8
                        weeks += "<td>#{date}</td>"
                        j += 1
                        date += 1
                # if we are in the last week of the month we need to add blank cells for next month
                else if i is numberWeeks
                    while j < 8
                        if date <= numberDays
                            weeks += "<td>#{date}</td>"
                        else
                            weeks += "<td class='muted-cell'>#{nextDates}</td>"
                            nextDates += 1
                        j += 1
                        date += 1
                else
                    while j < 8
                        weeks += "<td>#{date}</td>"
                        j += 1
                        date += 1
                weeks += "</tr>"
                i += 1
            weeks += "</tbody></table>"

            calendar = $ '<div></div>',
                class: self.calendarInnerClass
                html: weekdays + weeks
                'data-month': month
                'data-year': year

            heading = $ '<h1></h1>',
                text: "#{@months[month]} #{year}"
            
            calendar.appendTo ".#{self.calendarClass}"
            heading.prependTo ".#{self.calendarInnerClass}" 

    new DrmCalendar()

) jQuery