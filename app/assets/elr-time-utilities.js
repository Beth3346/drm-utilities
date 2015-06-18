(function($) {
    'use strict';
    
    var elrTimeUtilities = function() {
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
  
        self.hours = [
            {
                name: 'All Day Event',
                time: null
            },
            {
                name: '12am',
                time: 0
            },
            {
                name: '1am',
                time: 1
            },
            {
                name: '2am',
                time: 2
            },
            {
                name: '3am',
                time: 3
            },
            {
                name: '4am',
                time: 4
            },
            {
                name: '5am',
                time: 5
            },
            {
                name: '6am',
                time: 6
            },
            {
                name: '7am',
                time: 7
            },
            {
                name: '8am',
                time: 8
            },
            {
                name: '9am',
                time: 9
            },
            {
                name: '10am',
                time: 10
            },
            {
                name: '11am',
                time: 11
            },
            {
                name: '12pm',
                time: 12
            },
            {
                name: '1pm',
                time: 13
            },
            {
                name: '2pm',
                time: 14
            },
            {
                name: '3pm',
                time: 15
            },
            {
                name: '4pm',
                time: 16
            },
            {
                name: '5pm',
                time: 17
            },
            {
                name: '6pm',
                time: 18
            },
            {
                name: '7pm',
                time: 19
            },
            {
                name: '8pm',
                time: 20
            },
            {
                name: '9pm',
                time: 21
            },
            {
                name: '10pm',
                time: 22
            },
            {
                name: '11pm',
                time: 23
            }
        ];

        self.holidays = [
            {
                name: "New Year's Day",
                month: "January",
                eventDate: 1,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Martin Luther King's Birthday",
                month: "January",
                day: ["Monday"],
                dayNum: 3,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Groundhog Day",
                month: "February",
                eventDate: 2,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Valentine's Day",
                month: "February",
                eventDate: 14,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "President's Day",
                month: "February",
                day: ["Monday"],
                dayNum: 3,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "St. Patrick's Day",
                month: "March",
                eventDate: 17,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "April Fool's Day",
                month: "April",
                eventDate: 1,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Earth Day",
                month: "April",
                eventDate: 22,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Arbor Day",
                month: "April",
                day: ["Friday"],
                dayNum: "last",
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "May Day",
                month: "May",
                eventDate: 1,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Cinco De Mayo",
                month: "May",
                eventDate: 5,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Mother's Day",
                month: "May",
                day: ["Sunday"],
                dayNum: 2,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Memorial Day",
                month: "May",
                day: ["Monday"],
                dayNum: "last",
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Flag Day",
                month: "June",
                eventDate: 14,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Father's Day",
                month: "June",
                day: ["Sunday"],
                type: "holiday",
                recurrance: "yearly",
                dayNum: 3
            },
            {
                name: "Independence Day",
                month: "July",
                eventDate: 4,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Labor Day",
                month: "September",
                day: ["Monday"],
                dayNum: 1,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Patroit Day",
                month: "September",
                eventDate: 11,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Columbus Day",
                month: "October",
                day: ["Monday"],
                dayNum: 2,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Halloween",
                month: "October",
                eventDate: 31,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Veteran's Day",
                month: "November",
                eventDate: 11,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Thanksgiving",
                month: "November",
                day: ["Thursday"],
                dayNum: 4,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Pearl Harbor Day",
                month: "December",
                eventDate: 7,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Festivus",
                month: "December",
                eventDate: 23,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Christmas Eve",
                month: "December",
                eventDate: 24,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Christmas",
                month: "December",
                eventDate: 25,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "Boxing Day",
                month: "December",
                eventDate: 26,
                type: "holiday",
                recurrance: "yearly"
            },
            {
                name: "New Year's Eve",
                month: "December",
                eventDate: 31,
                type: "holiday",
                recurrance: "yearly"
            }
        ];

        self.factors = {
            ms: 1,
            seconds: 1e3,
            minutes: 6e4,
            hours: 36e5,
            days: 864e5,
            weeks: 6048e5,
            months: 2592e6,
            years: 31556952e3
        };

        self.dateUtilities = {
            getYearsToDays: function(years) {
                return (years * 146097) / 400;
            },

            getDaysToYears: function(days) {
                return (days * 400) / 146097;
            }
        };

        self.formatTokens = {
            dddd: function(date) {
                return self.days[date.getDay()]; // long day name
            },

            ddd: function(date) {
                return self.shortDays[date.getDay()]; // short day name
            },

            dd: function(date) {
                return self.minDays[date.getDay()]; // three letter day abbr
            },

            MMMM: function(date) {
                return self.months[date.getMonth()]; // long month name
            },

            MMM: function(date) {
                return self.shortMonths[date.getMonth()]; // short month name
            },

            MM: function(date) {
                // two digit month
                if ( date.getMonth().toString().length === 1 ) {
                    return '0' + date.getMonth().toString();
                } else {
                    return date.getMonth();
                }
            },

            M: function(date) {
                return date.getMonth(); // one digit month
            },

            DD: function(date) {
                if ( date.getDate().toString().length === 1 ) {
                    return '0' + date.getDate().toString();
                } else {
                    date.getDate(); // two digit date
                }
            },

            D: function(date) {
                return date.getDate(); // one digit date
            },

            yyyy: function(date) {
                return date.getFullYear(); // four digit year
            },

            yy: function(date) {
                return date.getFullYear().toString().slice(-2); // two digit year
            },

            hh: function(date) {
                if ( self.get12Hours(date).toString().length === 1 ) {
                    return '0' + self.get12Hours(date).toString();
                } else {
                    self.get12Hours(date); // two digit hours
                }
            },

            h: function(date) {
                return self.get12Hours(date); // one digit hours
            },

            HH: function(date) {
                if ( date.getHours().toString().length === 1 ) {
                    return '0' + date.getHours().toString();
                } else {
                    date.getHours(); // two digit 24hr format
                }
            },

            H: function(date) {
                return date.getHours(); // one digit 24hr format
            },

            mm: function(date) {
                if ( date.getMinutes().toString().length === 1 ) {
                    return '0' + date.getMinutes().toString();
                } else {
                    date.getMinutes(); // two digit minutes
                }
            },

            m: function(date) {
                return date.getMinutes(); // one digit minutes
            },

            ss: function(date) {
                if ( date.getSeconds().toString().length === 1 ) {
                    return '0' + date.getSeconds().toString();
                } else {
                    date.getSeconds().toString(); // two digit seconds
                }
            },

            s: function(date) {
                return date.getSeconds(); // one digit seconds
            },

            a: function(date) {
                if ( date.getHours() >= 12 ) {
                    return 'pm';
                } else {
                    return 'am'; // ampm
                }
            },

            A: function(date) {
                if ( date.getHours() >= 12 ) {
                    return 'PM';
                } else {
                    return 'AM'; // AMPM
                }
            }
        };

        self.conversionUtilities = {
            convertMsToSeconds: function(ms) {
                return ms/self.factors.seconds;
            },

            convertMsToMinutes: function(ms) {
                return ms/self.factors.minutes;
            },

            convertMsToHours: function(ms) {
                return ms/self.factors.hours;
            },

            convertMsToDays: function(ms) {
                return ms/self.factors.days;
            },

            convertMsToWeeks: function(ms) {
                return ms/self.factors.weeks;
            },

            convertMsToMonths: function(ms) {
                return ms/self.factors.months;
            },

            convertMsToYears: function(ms) {
                var days = self.convertMsToDays(ms);
                if ( (ms/self.factors.days) >= 0 ) {
                    days = Math.floor(ms/self.factors.days);
                } else { 
                    days = Math.ceil(ms/self.factors.days);
                }

                return self.dateUtilities.getDaysToYears(days);
            },

            convertSecondsToMs: function(seconds) {
                return seconds * self.factors.seconds;
            },

            convertMinutesToMs: function(minutes) {
                return minutes * self.factors.minutes;
            },

            convertHoursToMs: function(hours) {
                return hours * self.factors.hours;
            },

            convertDaysToMs: function(days) {
                return days * self.factors.days;
            }
        };

        self.durationUtilities = {
            getMsDuration: function(now, date) {
                return (now.getTime() - date.getTime()) / factors.ms;
            },

            getSecondsDuration: function(now, date) {
                var ms = self.getMsDuration(now, date);
                var seconds = self.conversionUtilities.convertMsToSeconds(ms);

                if ( seconds >= 0 ) {
                    return Math.floor(seconds);
                } else {
                    return Math.ceil(seconds);
                }
            },

            getMinutesDuration: function(now, date) {
                var ms = self.getMsDuration(now, date);
                var minutes = self.conversionUtilities.convertMsToMinutes(ms);

                if ( minutes >= 0 ) {
                    return Math.floor(minutes);
                } else {
                    return Math.ceil(minutes);
                }
            },

            getHoursDuration: function(now, date) {
                var ms = self.getMsDuration(now, date);
                var hours = self.conversionUtilities.convertMsToHours(ms);

                if ( hours >= 0 ) {
                    return Math.floor(hours);
                } else {
                    return Math.ceil(hours);
                }
            },

            getDaysDuration: function(now, date) {
                var ms = self.getMsDuration(now, date);
                var days = self.conversionUtilities.convertMsToDays ms

                if ( days >= 0 ) {
                    return Math.floor(days);
                } else {
                    return Math.ceil(days);
                }
            },

            getWeeksDuration: function(now, date) {
                var ms = self.getMsDuration(now, date);
                var weeks = self.conversionUtilities.convertMsToWeeks(ms);

                if ( weeks >= 0 ) {
                    return Math.floor(weeks);
                } else {
                    return Math.ceil(weeks);
                }
            },

            getMonthsDuration: function(now, date) {
                var ms = self.getMsDuration(now, date);
                var months = self.conversionUtilities.convertMsToMonths(ms);
                
                if ( Math.abs(months) >= 1 ) {
                    // round months up to account for number of weeks estimated weirdness
                    if ( months >= 0 ) {
                        return Math.ceil(months);
                    } else {
                        return Math.floor(months);
                    }
                } else {
                    return 0;
                }
            },

            getYearsDuration: function(now, date) {
                var ms = self.getMsDuration(now, date);
                var years = self.conversionUtilities.convertMsToYears(ms);
                
                if ( years >= 0 ) {
                    return Math.floor(years);
                } else {
                    return Math.ceil(years);
                }
            }
        };

        self.remainderUtilities = {
            // seconds, minutes, hours need adjustments for countdowns
            getLeftOverSeconds: function(now, date) {
                if ( ( date.getSeconds() !== 0 ) || ( self.durationUtilities.getMsDuration(now, date) > 0 ) ) {
                    return now.getSeconds() - date.getSeconds();
                } else {
                    return now.getSeconds() - 59;
                }
            },

            getLeftOverMinutes: function(now, date) {
                if ( ( date.getMinutes() !== 0 ) || ( self.durationUtilities.getMsDuration(now, date) > 0 ) ) {
                    return now.getMinutes() - date.getMinutes();
                } else {
                    return now.getMinutes() - 59;
                }
            },

            getLeftOverHours: function(now, date) {
                if ( ( date.getHours() !== 0 ) || ( self.durationUtilities.getMsDuration(now, date) > 0 ) ) {
                    return now.getHours() - date.getHours();
                } else {
                    return now.getHours() - 11;
                }
            },

            getLeftOverDays: function(now, date) {
                var ms = self.durationUtilities.getMsDuration(now, date);
                var days = self.conversionUtilities.convertMsToDays(ms % factors.weeks);

                if ( days >= 0 ) {
                    return Math.floor(days);
                } else {
                    return Math.ceil(days);
                }
            },

            getLeftOverDaysInYear: function(now, date) {
                var days = self.durationUtilities.getDaysDuration(now, date);
                var years = self.durationUtilities.getYearsDuration(now, date);

                if ( self.isLeapYear(date.getFullYear()) ) {
                    days = days + 1;
                }
                
                days = days - self.dateUtilities.getYearsToDays(years);
                
                if ( days >= 0 ) {
                    return Math.floor(days);
                } else {
                    return Math.ceil(days);
                }
            }
        };

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
            return new Date(year, month, date).getDay();
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

        // dateObj is a date object
        self.getPrevMonth = function(dateObj) {
            if ( dateObj.month === 1 ) {
                return 12;
            } else {
                return dateObj.month - 1;
            }
        };

        // dateObj is a date object
        self.getNextMonth = function(dateObj) {
            if ( dateObj.month === 12 ) {
                return 1;
            } else {
                return dateObj.month + 1;
            }
        };

        self.getPrevDate = function(dateObj) {
            var lastMonth = self.getPrevMonth(dateObj);
            var lastDateInLastMonth = self.getDaysInMonth(lastMonth, dateObj.year);

            if ( dateObj.date === 1 ) {
                return lastDateInLastMonth;
            } else {
                return dateObj.date - 1;
            }
        };

        self.getNextDate = function(dateObj) {
            var lastDateInMonth = self.getDaysInMonth(dateObj.month, dateObj.year);

            if ( dateObj.date === lastDateInMonth ) {
                return 1;
            } else {
                return dateObj.date + 1;
            }
        };

        // today is a date object
        self.getYesterday = function(today) {
            var lastMonth = self.getPrevMonth(today);
            var yesterday = {};

            if ( today.date === 1 ) {
                yesterday.month = lastMonth;
            } else {
                yesterday.month = today.month;
            }

            yesterday.date = self.getPrevDate(today);

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

        self.getYearNum = function(date) {
            var year = date.match(/([0-9]{4})$/);
            
            return parseInt(year[1], 10);
        };

        self.getTimeHours = function(time) {
            var ampm = time.match(/(am|pm)$/i)[1];

            var hour = time.match(/^(?:([12][012]):|([0]?[0-9]):)/);
            
            if ( hour[1] ) {
                hour = parseInt(hour[1], 10); 
            } else {
                hour = parseInt(hour[2], 10);
            }
            
            if ( ampm === 'am' && hour === 12 ) {
                return 0;
            } else if ( ampm === 'pm' && hour < 12 ) {
                return hour + 12;
            } else {
                return hour;
            }
        };

        self.getTimeMinutes = function(time) {
            var minute = time.match(/\:([012345][0-9])/);
            return parseInt(minute[1], 10);
        };

        self.getTimeSeconds = function(time) {
            var second = time.match(/\:(?:[012345][0-9])\:([012345][0-9])/);
            
            if ( second ) {
                return parseInt(second[1], 10);
            } else {
                return 0;
            }
        };

        self.parseDate = function(date) {
            // look for date keywords yesterday, today, tomorrow
            if ( date.search(/^(yesterday|today|tomorrow)/i) !== -1 ) {
                var keyword = date.match(/^(yesterday|today|tomorrow)/i)[0];

                if ( keyword === 'yesterday' ) {
                    return self.getYesterday(self.today);
                } else if ( keyword === 'today' ) {
                    return self.getToday(self.today);
                } else if ( keyword === 'tomorrow' ) {
                    return self.getTomorrow(self.today);
                } else {
                    console.log('unrecognized date keyword');
                }
            } else if ( date.search(/^(?:[a-z]*[\.,]?\s)?[a-z]*\.?\s(?:[3][01],?\s|[012][1-9],?\s|[1-9],?\s)[0-9]{4}$/i) !== -1 ) {
                
                return {
                    month: self.getMonthName(date),
                    date: self.getDateNum(date),
                    year: self.getYearNum(date)
                };

            } else if ( date.search(/((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})/) !== -1 ) {
                var fullDate = date.match(/((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})/)[0];
                
                return {
                    month: self.getMonthName(fullDate),
                    date: self.getDateNum(fullDate),
                    year: self.getYearNum(fullDate)
                };
            } else {
                return;
            }
        };

        self.parseTime = function(time) {
            // add noon and midnight keywords
            if ( time.search(/^(noon|midnight)/i) !== -1 ) {
                var keyword = time.match(/^(noon|midnight)/i)[0];

                if ( keyword === 'noon' ) {
                    return self.getNoon(self.today);
                } else if ( keyword === 'midnight' ) {
                    return self.getMidnight(self.today);
                }
            
            } else if ( time.search(/((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\:[012345][0-9])?(?:am|pm)?)/i) !== -1 ) {
                var fullTime = time.match(/((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\:[012345][0-9])?(?:am|pm)?)/i)[0];

                return {
                    hour: self.getTimeHours(fullTime),
                    minute: self.getTimeMinutes(fullTime),
                    second: self.getTimeSeconds(fullTime)
                };
            } else {
                return;
            }
        };

        self.parseDateTime = function(dateTime) {
            var date = self.parseDate(dateTime);
            var time = self.parseTime(dateTime);
            
            if ( date && time ) {
                return new Date(date.year, date.month, date.date, time.hour, time.minute, time.second);
            } else if ( date && !time ) {
                return new Date(date.year, date.month, date.date, 0, 0, 0);
            } else if ( !date && time ) {
                return new Date(self.today.year, self.today.month, self.today.date, time.hour, time.minute, time.second);
            } else {
                console.log('invalid date string');
            }
        };

        self.get12Hours = function(date) {
            if ( date.getHours() === 0 ) {
                return 12;
            } else if ( date.getHours() > 12 ) {
                return date.getHours() - 12;
            } else {
                return date.getHours();           
            }
        };

        return self;
    };

    window.elrTime = elrTimeUtilities();
})(jQuery);