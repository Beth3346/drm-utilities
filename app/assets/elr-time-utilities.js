(function($) {
    'use strict';
    
    elrTimeUtilities = function() {
        var self = {};

        self.now = new Date();

        self.today = {
            month: self.now.getMonth(),
            day: self.now.getDay(),
            date: self.now.getDate(),
            year: self.now.getFullYear(),
            hour: self.now.getHours(),
            minute: self.now.getMinutes(),
            second: self.now.getSeconds()
        };

        self.daysPerWeek = 7;

        self.unitTokens = {
            ms: 'millisecond',
            s: 'second',
            m: 'minute',
            h: 'hour',
            d: 'day',
            D: 'date',
            w: 'week',
            M: 'month',
            Q: 'quarter',
            y: 'year',
            DDD: 'dayOfYear',
            a: 'ampm'
        };

        self.months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        self.shortMonths = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];

        self.days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];

        self.shortDays = [
            'Sun',
            'Mon',
            'Tues',
            'Wed',
            'Thurs',
            'Fri',
            'Sat'
        ];

        self.minDays = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];

        self.isLeapYear = function(year) {
            // return (year % 4 is 0 and year % 100 isnt 0) or year % 400 is 0

            if ( ( year % 4 === 0 ) && ( year % 100 !== 0 ) || ( year % 400 === 0 )  ) {
                return true;
            } else {
                return false;
            }
        };

        self.getDaysInYear = function(year) {
            if ( self.isLeapYear(year) ) {
                return 366;
            } else {
                return 365;
            }
        };

        self.getDaysInMonth = function(month, year) {
            return new Date(year, month + 1, 0).getDate();
        };

        self.getDayOfWeek = function(month, date, year) {
            return new Date(year, ( month - 1 ), date).getDay();
        };

        self.getFirstDayOfMonth = function(month, year) {
            return self.getDayOfWeek(month, 1, year);
        };

        self.getWeeksInMonth = function(month, year) {
            var firstDay = self.getFirstDayOfMonth(month, year);
            var numberDays = self.getDaysInMonth(month, year);
            var dayShift = ( firstDay === self.daysPerWeek ) ? 0 : firstDay;

            return Math.ceil((numberDays + dayShift) / self.daysPerWeek);
        };

        // today is a date object
        self.getLastMonth = function(today) {
            if ( today.month === 1 ) {
                return 12;
            } else {
                return today.month - 1;
            }
        };

        // today is a date object
        self.getNextMonth = function(today) {
            if ( today.month === 12 ) {
                return 1;
            } else {
                return today.month + 1;
            }
        };

        self.getLastDate = function(today) {
            var lastMonth = self.getLastMonth(today);
            var lastDateInLastMonth = self.getDaysInMonth(lastMonth, today.year);

            if ( today.date === 1 ) {
                return lastDateInLastMonth;
            } else {
                return today.date - 1;
            }
        };

        self.getNextDate = function(today) {
            var lastDateInMonth = self.getDaysInMonth(today.month, today.year);

            if ( today.date === lastDateInMonth ) {
                return 1;
            } else {
                return today.date + 1;
            }
        };

        // today is a date object
        self.getYesterday = function(today) {
            var lastMonth = self.getLastMonth(today);
            var yesterday = {};

            if ( today.date === 1 ) {
                yesterday.month = lastMonth;
            } else {
                yesterday.month = today.month;
            }

            yesterday.date = self.getLastDate(today);

            if ( ( today.month === 1 ) && ( today.date === 1 ) ) {
                yesterday.year = today.year - 1;
            } else {
                yesterday.year = today.year;
            }

            return yesterday;
        };

        self.getToday = function(today) {
            return {
                month: today.month,
                date: today.date,
                year: today.year
            };
        };

        // today is a date object
        self.getTomorrow = function(today) {
            var nextMonth = self.getNextMonth(today);
            var lastDateInMonth = self.getDaysInMonth(today.month, today.year);
            var tomorrow = {};

            if ( today.date === lastDateInMonth ) {
                tomorrow.month = nextMonth;
            } else {
                tomorrow.month = today.month;
            }

            tomorrow.date = self.getNextDate(today);

            if ( ( today.month === 12 ) && ( today.date === lastDateInMonth ) ) {
                tomorrow.year = today.year + 1;
            } else {
                tomorrow.year = today.year;
            }

            return tomorrow;
        };

        self.getMonthNum = function(date) {
            var month = date.match(/^([0]?[1-9]|[1][012]|[1-9])/);

            if ( month ) {
                return parseInt(month[0], 10) - 1;
            } else {
                return false;
            }
        };

        self.getMonthByName = function(date) {
            var months = [];
            var shortMonths = [];
            // month or day of the week
            var dayMonth = date.match(elr.patterns.longMonth);
            
            month = $.trim(dayMonth[0]).toLowerCase();

            $.map(self.months, function(str) {
                months.push(str.toLowerCase());
            });

            $.map(self.shortMonths, function(str) {
                shortMonths.push(str.toLowerCase());
            });

            if ( $.inArray(month, months) !== -1 ) {
                return $.inArray(month, months);
            } else if ( $.inArray(month, shortMonths) !== -1 ) {
                return $.inArray(month, shortMonths);
            } else {
                return false;
            }
        };

        self.getMonthName = function(date, style) {
            var monthNum = self.getMonthNum(date);
            var monthByName = self.getMonthByName(date);
            var num;
            
            style = style || 'MMMM';

            if ( monthNum ) {
                num = monthNum;
            } else if ( monthByName ) {
                num = monthByName;
            } else {
                return;
            }

            if ( style === 'MMM' ) {
                return self.shortMonths[num];
            } else {
                return self.months[num];
            }
        };

        self.getDateNum = function(date) {
            var d = date.match(elr.patterns.dateNumber);

            if ( d[1] ) {
                return parseInt(d[1], 10);
            } else if ( d[2] ) {
                return parseInt(d[2], 10);
            } else if ( d[3] ) {
                return parseInt(d[3], 10);
            } else {
                return false;
            }
        };

        self.getYear = function(date) {
            var year = date.match(/([0-9]{4})$/);
            
            return parseInt(year[1], 10);
        };

        self.getHours = function(time) {

        };

        self.getMinutes = function(time) {

        };

        self.getSeconds = function(time) {

        };

        self.parseDate = function(date) {

        };

        self.parseTime = function(time) {

        };

        return self;
    };

    window.elrTime = elrTimeUtilities();
})(jQuery);