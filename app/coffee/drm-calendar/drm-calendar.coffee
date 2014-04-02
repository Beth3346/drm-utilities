###############################################################################
# Interactive JS Calendar
###############################################################################
"use strict"

( ($) ->
    class window.DrmCalendar
        constructor: (@calendar = $('.drm-calendar')) ->
            @today = new Date()
            @currentMonth = @today.getMonth()
            @currentYear = @today.getFullYear()
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
                'December']

            @days = [
                'Sunday'
                'Monday'
                'Tuesday'
                'Wednesday'
                'Thursdays'
                'Friday'
                'Saturday']

            @holidays =
                newYears:
                    name: "New Year's Day"
                    date: '1-1'
                valentines:
                    name: "Valentine's Day"
                    date: '2-14'
                stpatricks:
                    name: "St. Patrick's Day"
                    date: '3-17'
                independenceDay:
                    name: "Independence Day"
                    date: '7-4'

            @createCalendar 2, 2014

        getDaysInMonth: (month, year) ->
            return new Date(year, month, 0).getDate()

        getDayOfWeek: (month, year, day) ->
            day = new Date(year, month, day)
            return day.getDay()

        createDaysInMonth: =>
            self = @
            numberDays = []
            $.each @months, (key, value) ->
                numberDays.push self.getDaysInMonth (key + 1), self.currentYear
            numberDays

        createCalendar: (month, year) =>
            self = @
            containerClass = 'drm-calendar'
            daysPerWeek = 7
            numberDays = self.getDaysInMonth (month + 1), year
            prevMonthNumberDays = self.getDaysInMonth month, year
            firstDay = self.getDayOfWeek (month + 1), year, 1
            dayShift = daysPerWeek - (firstDay - 1)
            numberWeeks = Math.ceil (numberDays + dayShift) / 7

            weekdays = "<thead><tr>"
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
                if i is 1
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
            weeks += "</tbody>"

            calendar = $ '<table></table>',
                html: weekdays + weeks

            heading = $ '<h1></h1>',
                text: "#{@months[month]} #{year}"
            
            heading.prependTo ".#{containerClass}" 
            calendar.appendTo ".#{containerClass}"

    new DrmCalendar()

) jQuery