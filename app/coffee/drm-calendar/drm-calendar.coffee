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

            @numberDays = @createDaysInMonth()

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

            @createCalendar()

        getDaysInMonth: (month, year) ->
            return new Date(year, month, 0).getDate()

        createDaysInMonth: =>
            self = @
            numberDays = []
            $.each @months, (key, value) ->
                numberDays.push self.getDaysInMonth (key + 1), self.currentYear
            numberDays

        createCalendar: =>
            self = @
            containerClass = 'drm-calendar'

            weekdays = "<thead><tr>"
            $.each @days, (key, value) ->
                weekdays += "<th>#{value}</th>"
            weekdays += "</tr></thead>"

            calendar = $ '<table></table>',
                html: weekdays

            $.each @months, (key, value) ->
                container = $ '<div></div>',
                    class: containerClass
                    text: "#{value} #{self.currentYear}"
                container.appendTo '.main-content'
                
            calendar.appendTo ".#{containerClass}"

    new DrmCalendar()

) jQuery