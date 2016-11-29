import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

const elrTimeUtilities = function() {
    const self = {
        now: new Date(),
        today() {
            return {
                'month': this.now.getMonth(),
                'day': this.now.getDay(),
                'date': this.now.getDate(),
                'year': this.now.getFullYear(),
                'hour': this.now.getHours(),
                'minute': this.now.getMinutes(),
                'second': this.now.getSeconds()
            }
        },
        daysPerWeek: 7,
        unitTokens: {
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
        },
        months: [
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
        ],
        shortMonths: [
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
        ],
        days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        shortDays: [
            'Sun',
            'Mon',
            'Tues',
            'Wed',
            'Thurs',
            'Fri',
            'Sat'
        ],
        minDays: [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ],
        hours: [
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
        ],
        holidays: [
            {
                name: 'New Year\'s Day',
                month: 'January',
                eventDate: 1,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Martin Luther King\'s Birthday',
                month: 'January',
                day: ['Monday'],
                dayNum: 3,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Groundhog Day',
                month: 'February',
                eventDate: 2,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Valentine\'s Day',
                month: 'February',
                eventDate: 14,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'President\'s Day',
                month: 'February',
                day: ['Monday'],
                dayNum: 3,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'St. Patrick\'s Day',
                month: 'March',
                eventDate: 17,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'April Fool\'s Day',
                month: 'April',
                eventDate: 1,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Earth Day',
                month: 'April',
                eventDate: 22,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Arbor Day',
                month: 'April',
                day: ['Friday'],
                dayNum: 'last',
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'May Day',
                month: 'May',
                eventDate: 1,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Cinco De Mayo',
                month: 'May',
                eventDate: 5,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Mother\'s Day',
                month: 'May',
                day: ['Sunday'],
                dayNum: 2,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Memorial Day',
                month: 'May',
                day: ['Monday'],
                dayNum: 'last',
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Flag Day',
                month: 'June',
                eventDate: 14,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Father\'s Day',
                month: 'June',
                day: ['Sunday'],
                type: 'holiday',
                recurrance: 'yearly',
                dayNum: 3
            },
            {
                name: 'Independence Day',
                month: 'July',
                eventDate: 4,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Labor Day',
                month: 'September',
                day: ['Monday'],
                dayNum: 1,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Patroit Day',
                month: 'September',
                eventDate: 11,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Columbus Day',
                month: 'October',
                day: ['Monday'],
                dayNum: 2,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Halloween',
                month: 'October',
                eventDate: 31,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Veteran\'s Day',
                month: 'November',
                eventDate: 11,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Thanksgiving',
                month: 'November',
                day: ['Thursday'],
                dayNum: 4,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Pearl Harbor Day',
                month: 'December',
                eventDate: 7,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Festivus',
                month: 'December',
                eventDate: 23,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Christmas Eve',
                month: 'December',
                eventDate: 24,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Christmas',
                month: 'December',
                eventDate: 25,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'Boxing Day',
                month: 'December',
                eventDate: 26,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'New Year\'s Eve',
                month: 'December',
                eventDate: 31,
                type: 'holiday',
                recurrance: 'yearly'
            },
            {
                name: 'First Tuesday of Month',
                recurrance: 'monthly',
                day: ['Tuesday'],
                dayNum: 'first',
                type: 'holiday'
            },
            {
                name: 'First Monday',
                recurrance: 'monthly',
                day: ['Monday'],
                dayNum: 'first',
                type: 'holiday'
            },
            {
                name: 'Last Friday',
                recurrance: 'monthly',
                day: ['Friday'],
                dayNum: 'last',
                type: 'holiday'
            },
        ],
        factors: {
            ms: 1,
            seconds: 1e3,
            minutes: 6e4,
            hours: 36e5,
            days: 864e5,
            weeks: 6048e5,
            months: 2592e6,
            years: 31556952e3
        },
        dateUtilities: {
            getYearsToDays: (years) => (years * 146097) / 400,
            getDaysToYears: (days) => (days * 400) / 146097
        },
        formatTokens: {
            dddd: (date) => {
                return this.days[date.getDay()]; // long day name
            },
            ddd: (date) => {
                return this.shortDays[date.getDay()]; // short day name
            },
            dd: (date) => {
                return this.minDays[date.getDay()]; // three letter day abbr
            },
            MMMM: (date) => {
                return this.months[date.getMonth()]; // long month name
            },
            MMM: (date) => {
                return this.shortMonths[date.getMonth()]; // short month name
            },
            MM: (date) => {
                // two digit month
                if (date.getMonth().toString().length === 1) {
                    return '0' + date.getMonth().toString();
                }

                return date.getMonth();
            },
            M: (date) => {
                return date.getMonth(); // one digit month
            },
            DD: (date) => {
                if (date.getDate().toString().length === 1) {
                    return '0' + date.getDate().toString();
                }

                date.getDate(); // two digit date
            },
            D: (date) => {
                return date.getDate(); // one digit date
            },
            yyyy: (date) => {
                return date.getFullYear(); // four digit year
            },
            yy: (date) => {
                return date.getFullYear().toString().slice(-2); // two digit year
            },
            hh: (date) => {
                if (this.get12Hours(date).toString().length === 1) {
                    return '0' + this.get12Hours(date).toString();
                }

                this.get12Hours(date); // two digit hours
            },
            h: (date) => {
                return this.get12Hours(date); // one digit hours
            },
            HH: (date) => {
                if (date.getHours().toString().length === 1) {
                    return '0' + date.getHours().toString();
                }

                date.getHours(); // two digit 24hr format
            },
            H: (date) => {
                return date.getHours(); // one digit 24hr format
            },
            mm: (date) => {
                if (date.getMinutes().toString().length === 1) {
                    return '0' + date.getMinutes().toString();
                }

                date.getMinutes(); // two digit minutes
            },
            m: (date) => {
                return date.getMinutes(); // one digit minutes
            },
            ss: (date) => {
                if (date.getSeconds().toString().length === 1) {
                    return '0' + date.getSeconds().toString();
                }

                date.getSeconds().toString(); // two digit seconds
            },
            s: (date) => {
                return date.getSeconds(); // one digit seconds
            },
            a: (date) => {
                if (date.getHours() >= 12) {
                    return 'pm';
                }

                return 'am'; // ampm
            },
            A: (date) => {
                if (date.getHours() >= 12) {
                    return 'PM';
                }

                return 'AM'; // AMPM
            }
        },
        conversionUtilities: {
            convertMsToSeconds: (ms) => {
                return ms/this.factors.seconds;
            },
            convertMsToMinutes: (ms) => {
                return ms/this.factors.minutes;
            },
            convertMsToHours: (ms) => {
                return ms/this.factors.hours;
            },
            convertMsToDays: (ms) => {
                return ms/this.factors.days;
            },
            convertMsToWeeks: (ms) => {
                return ms/this.factors.weeks;
            },
            convertMsToMonths: (ms) => {
                return ms/this.factors.months;
            },
            convertMsToYears: (ms) => {
                let days = this.convertMsToDays(ms);

                if ((ms/this.factors.days) >= 0) {
                    days = Math.floor(ms/this.factors.days);
                } else {
                    days = Math.ceil(ms/this.factors.days);
                }

                return this.dateUtilities.getDaysToYears(days);
            },
            convertSecondsToMs: (seconds) => {
                return seconds * this.factors.seconds;
            },
            convertMinutesToMs: (minutes) => {
                return minutes * this.factors.minutes;
            },
            convertHoursToMs: (hours) => {
                return hours * this.factors.hours;
            },
            convertDaysToMs: (days) => {
                return days * this.factors.days;
            }
        },
        durationUtilities: {
            getMsDuration(now, date) {
                return (now.getTime() - date.getTime()) / factors.ms;
            },
            getSecondsDuration(now, date) {
                const ms = self.getMsDuration(now, date);
                const seconds = self.conversionUtilities.convertMsToSeconds(ms);

                if (seconds >= 0) {
                    return Math.floor(seconds);
                }

                return Math.ceil(seconds);
            },
            getMinutesDuration(now, date) {
                const ms = self.getMsDuration(now, date);
                const minutes = self.conversionUtilities.convertMsToMinutes(ms);

                if (minutes >= 0) {
                    return Math.floor(minutes);
                }

                return Math.ceil(minutes);
            },
            getHoursDuration(now, date) {
                const ms = self.getMsDuration(now, date);
                const hours = self.conversionUtilities.convertMsToHours(ms);

                if (hours >= 0) {
                    return Math.floor(hours);
                }

                return Math.ceil(hours);
            },
            getDaysDuration(now, date) {
                const ms = self.getMsDuration(now, date);
                const days = self.conversionUtilities.convertMsToDays(ms);

                if (days >= 0) {
                    return Math.floor(days);
                }

                return Math.ceil(days);
            },
            getWeeksDuration(now, date) {
                const ms = self.getMsDuration(now, date);
                const weeks = self.conversionUtilities.convertMsToWeeks(ms);

                if (weeks >= 0) {
                    return Math.floor(weeks);
                }

                return Math.ceil(weeks);
            },
            getMonthsDuration(now, date) {
                const ms = self.getMsDuration(now, date);
                const months = self.conversionUtilities.convertMsToMonths(ms);

                if (Math.abs(months) >= 1) {
                    // round months up to account for number of weeks estimated weirdness
                    if (months >= 0) {
                        return Math.ceil(months);
                    }

                    return Math.floor(months);
                }

                return 0;
            },
            getYearsDuration(now, date) {
                const ms = self.getMsDuration(now, date);
                const years = self.conversionUtilities.convertMsToYears(ms);

                if (years >= 0) {
                    return Math.floor(years);
                }

                return Math.ceil(years);
            }
        },
        remainderUtilities: {
            // seconds, minutes, hours need adjustments for countdowns
            getLeftOverSeconds(now, date) {
                if ((date.getSeconds() !== 0) || (self.durationUtilities.getMsDuration(now, date) > 0)) {
                    return now.getSeconds() - date.getSeconds();
                }

                return now.getSeconds() - 59;
            },
            getLeftOverMinutes(now, date) {
                if ((date.getMinutes() !== 0) || (self.durationUtilities.getMsDuration(now, date) > 0)) {
                    return now.getMinutes() - date.getMinutes();
                }

                return now.getMinutes() - 59;
            },
            getLeftOverHours(now, date) {
                if ((date.getHours() !== 0) || (self.durationUtilities.getMsDuration(now, date) > 0)) {
                    return now.getHours() - date.getHours();
                }

                return now.getHours() - 11;
            },
            getLeftOverDays(now, date) {
                const ms = self.durationUtilities.getMsDuration(now, date);
                const days = self.conversionUtilities.convertMsToDays(ms % factors.weeks);

                if (days >= 0) {
                    return Math.floor(days);
                }

                return Math.ceil(days);
            },
            getLeftOverDaysInYear(now, date) {
                let days = self.durationUtilities.getDaysDuration(now, date);
                let years = self.durationUtilities.getYearsDuration(now, date);

                if (self.isLeapYear(date.getFullYear())) {
                    days = days + 1;
                }

                days = days - self.dateUtilities.getYearsToDays(years);

                if (days >= 0) {
                    return Math.floor(days);
                }

                return Math.ceil(days);
            }
        },
        isLeapYear(year) {
            if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0) ) {
                return true;
            }

            return false;
        },
        getDaysInYear(year) {
            if (self.isLeapYear(year)) {
                return 366;
            }

            return 365;
        },
        getDaysInMonth(dateObj) {
            return new Date(dateObj.year, dateObj.month + 1, 0).getDate();
        },
        getDayOfWeek(dateObj) {
            return new Date(dateObj.year, dateObj.month, dateObj.date).getDay();
        },
        getFirstDayOfMonth(dateObj) {
            return self.getDayOfWeek({
                'month': dateObj.month,
                'date': 1,
                'year': dateObj.year
            });
        },
        getWeeksInMonth(dateObj) {
            const firstDay = self.getFirstDayOfMonth(dateObj);
            const numberDays = self.getDaysInMonth(dateObj);
            const dayShift = (firstDay === self.daysPerWeek) ? 0 : firstDay;

            return Math.ceil((numberDays + dayShift) / self.daysPerWeek);
        },
        // dateObj is a date object
        getPrevYear(dateObj) {
            return dateObj.year - 1;
        },
        // dateObj is a date object
        getNextYear(dateObj) {
            return dateObj.year + 1;
        },
        // dateObj is a date object
        getPrevMonth(dateObj) {
            if (dateObj.month === 0) {
                return 11;
            }

            return dateObj.month - 1;
        },
        // dateObj is a date object
        getNextMonth(dateObj) {
            if (dateObj.month === 11) {
                return 0;
            }

            return dateObj.month + 1;
        },
        getPrevDate(dateObj) {
            let lastMonth = self.getPrevMonth(dateObj);
            let lastDateInLastMonth = self.getDaysInMonth(lastMonth, dateObj.year);

            if (dateObj.date === 1) {
                return lastDateInLastMonth;
            }

            return dateObj.date - 1;
        },
        getNextDate(dateObj) {
            const lastDateInMonth = self.getDaysInMonth(dateObj.month, dateObj.year);

            if (dateObj.date === lastDateInMonth) {
                return 1;
            }

            return dateObj.date + 1;
        },
        // today is a date object
        getYesterday(today) {
            const lastMonth = self.getPrevMonth(today);
            const yesterday = {};

            // assign month
            if (today.date === 1) {
                yesterday.month = lastMonth;
            } else {
                yesterday.month = today.month;
            }

            // assign date
            yesterday.date = self.getPrevDate(today);

            // assign year
            if ((today.month === 1) && (today.date === 1)) {
                yesterday.year = today.year - 1;
            } else {
                yesterday.year = today.year;
            }

            return yesterday;
        },
        getToday(today) {
            return {
                month: today.month,
                date: today.date,
                year: today.year
            };
        },
        // today is a date object
        getTomorrow(today) {
            const nextMonth = self.getNextMonth(today);
            const lastDateInMonth = self.getDaysInMonth(today.month, today.year);
            const tomorrow = {};

            if (today.date === lastDateInMonth) {
                tomorrow.month = nextMonth;
            } else {
                tomorrow.month = today.month;
            }

            tomorrow.date = self.getNextDate(today);

            if ((today.month === 12) && (today.date === lastDateInMonth)) {
                tomorrow.year = today.year + 1;
            } else {
                tomorrow.year = today.year;
            }

            return tomorrow;
        },
        getMonthNum(date) {
            const month = date.match(/^([0]?[1-9]|[1][012]|[1-9])/);

            if (month) {
                return parseInt(month[0], 10) - 1;
            }

            return false;
        },
        getMonthByName(date) {
            const months = [];
            const shortMonths = [];
            // month or day of the week
            const dayMonth = date.match(elr.patterns.longMonth);

            month = $.trim(dayMonth[0]).toLowerCase();

            $.map(self.months, function(str) {
                months.push(str.toLowerCase());
            });

            $.map(self.shortMonths, function(str) {
                shortMonths.push(str.toLowerCase());
            });

            if ($.inArray(month, months) !== -1) {
                return $.inArray(month, months);
            } else if ($.inArray(month, shortMonths) !== -1) {
                return $.inArray(month, shortMonths);
            } else {
                return false;
            }
        },
        getMonthName(date, style = 'MMMM') {
            const monthNum = self.getMonthNum(date);
            const monthByName = self.getMonthByName(date);
            let num;

            if (monthNum) {
                num = monthNum;
            } else if (monthByName) {
                num = monthByName;
            } else {
                return;
            }

            if (style === 'MMM') {
                return self.shortMonths[num];
            } else {
                return self.months[num];
            }
        },
        getDateNum(date) {
            const d = date.match(elr.patterns.dateNumber);

            if (d[1]) {
                return parseInt(d[1], 10);
            } else if (d[2]) {
                return parseInt(d[2], 10);
            } else if (d[3]) {
                return parseInt(d[3], 10);
            } else {
                return false;
            }
        },
        getYearNum(date) {
            const year = date.match(/([0-9]{4})$/);

            return parseInt(year[1], 10);
        },
        getTimeHours(time) {
            const ampm = time.match(/(am|pm)$/i)[1];
            let hour = time.match(/^(?:([12][012]):|([0]?[0-9]):)/);

            if (hour[1]) {
                hour = parseInt(hour[1], 10);
            } else {
                hour = parseInt(hour[2], 10);
            }

            if (ampm === 'am' && hour === 12) {
                return 0;
            } else if (ampm === 'pm' && hour < 12) {
                return hour + 12;
            } else {
                return hour;
            }
        },
        getTimeMinutes(time) {
            const minute = time.match(/\:([012345][0-9])/);

            return parseInt(minute[1], 10);
        },
        getTimeSeconds(time) {
            const second = time.match(/\:(?:[012345][0-9])\:([012345][0-9])/);

            if (second) {
                return parseInt(second[1], 10);
            }

            return 0;
        },
        parseDate(date) {
            // look for date keywords yesterday, today, tomorrow
            if (date.search(/^(yesterday|today|tomorrow)/i) !== -1) {
                const keyword = date.match(/^(yesterday|today|tomorrow)/i)[0];

                if (keyword === 'yesterday') {
                    return self.getYesterday(self.today);
                } else if (keyword === 'today') {
                    return self.getToday(self.today);
                } else if (keyword === 'tomorrow') {
                    return self.getTomorrow(self.today);
                } else {
                    console.log('unrecognized date keyword');
                }
            } else if (date.search(/^(?:[a-z]*[\.,]?\s)?[a-z]*\.?\s(?:[3][01],?\s|[012][1-9],?\s|[1-9],?\s)[0-9]{4}$/i) !== -1) {

                return {
                    month: self.getMonthName(date),
                    date: self.getDateNum(date),
                    year: self.getYearNum(date)
                };

            } else if (date.search(/((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})/) !== -1) {
                const fullDate = date.match(/((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})/)[0];

                return {
                    month: self.getMonthName(fullDate),
                    date: self.getDateNum(fullDate),
                    year: self.getYearNum(fullDate)
                };
            } else {
                return;
            }
        },
        parseTime(time) {
            // add noon and midnight keywords
            if (time.search(/^(noon|midnight)/i) !== -1) {
                const keyword = time.match(/^(noon|midnight)/i)[0];

                if (keyword === 'noon') {
                    return self.getNoon(self.today);
                } else if (keyword === 'midnight') {
                    return self.getMidnight(self.today);
                }

            } else if (time.search(/((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\:[012345][0-9])?(?:am|pm)?)/i) !== -1) {
                const fullTime = time.match(/((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\:[012345][0-9])?(?:am|pm)?)/i)[0];

                return {
                    hour: self.getTimeHours(fullTime),
                    minute: self.getTimeMinutes(fullTime),
                    second: self.getTimeSeconds(fullTime)
                };
            } else {
                return;
            }
        },
        parseDateTime(dateTime) {
            let date = self.parseDate(dateTime);
            let time = self.parseTime(dateTime);

            if (date && time) {
                return new Date(date.year, date.month, date.date, time.hour, time.minute, time.second);
            } else if (date && !time) {
                return new Date(date.year, date.month, date.date, 0, 0, 0);
            } else if (!date && time) {
                return new Date(self.today.year, self.today.month, self.today.date, time.hour, time.minute, time.second);
            } else {
                console.log('invalid date string');
            }
        },
        get12Hours(date) {
            if (date.getHours() === 0) {
                return 12;
            } else if (date.getHours() > 12) {
                return date.getHours() - 12;
            } else {
                return date.getHours();
            }
        },
        getDatesFromLastMonth(dateObj, dates) {
            let firstDay = self.getFirstDayOfMonth(dateObj);
            let prevMonth = self.getPrevMonth(dateObj);

            // if the first day of the month is not a Sunday
            if (firstDay !== 0) {
                let remainingDays = firstDay;
                let prevMonthNumberDays = self.getDaysInMonth({
                    'month': self.getPrevMonth(dateObj),
                    'date': 0,
                    'year': dateObj.year
                });
                let leftOverDays = prevMonthNumberDays;

                while (remainingDays > 0) {
                    dates.push({
                        month: prevMonth,
                        date: leftOverDays,
                        year: dateObj.year
                    });
                    remainingDays = remainingDays - 1;
                    leftOverDays = leftOverDays - 1;
                }

                dates = dates.reverse();
                return dates;
            } else {
                return dates;
            }
        },
        getDatesFromLastYear(dateObj) {
            let firstDay = self.getFirstDayOfMonth(dateObj);
            let dates = [];
            let day = 0;

            // since december always has 31 days we can hard code this
            let startDate = 31 - (firstDay - 1);

            while (day < firstDay) {
                dates.push({
                    'month': 11,
                    'date': startDate,
                    'year': dateObj.year - 1
                });

                day = day + 1;
                startDate = startDate + 1;
            }

            return dates;
        },
        getDatesInFirstWeek(dateObj) {
            let firstDay = self.getFirstDayOfMonth(dateObj);
            let dates = self.getDatesFromLastMonth(dateObj, []);

            // if its the first week of the year
            // should probably move this to its own function getDatesFromLastYear

            if (dateObj.month === 0 && firstDay !== 0) {
                // need to get the last days of the previous year
                let dates = self.getDatesFromLastYear(dateObj);

                // get the dates from the new year

                let remainingDays = self.daysPerWeek - dates.length;
                let day = 0;

                while (day < remainingDays) {
                    day = day + 1;

                    dates.push({
                        'month': 0,
                        'date': day,
                        'year': dateObj.year
                    });
                }

                return dates;
            } else {
                // not the first week of the year
                let dayShift;

                if (firstDay === self.daysPerWeek) {
                    dayShift = 0;
                } else {
                    dayShift = firstDay;
                }

                let daysInFirstWeek = self.daysPerWeek - dayShift;
                let day = 0;

                while (day < daysInFirstWeek) {
                    day = day + 1;
                    dates.push({
                        month: dateObj.month,
                        date: day,
                        year: dateObj.year
                    });
                }
            }

            return dates;
        },
        getDatesInLastWeek(dateObj) {
            let numberDays = self.getDaysInMonth(dateObj);
            let lastDay = self.getDayOfWeek({
                month: dateObj.month,
                date: numberDays,
                year: dateObj.year
            });
            let firstDateLastWeek = numberDays - lastDay;
            let date = firstDateLastWeek;
            let remainingDays = lastDay + 1;
            let nextMonthDays = self.daysPerWeek - (lastDay + 1);
            let dates = [];

            // if its the last week of the year get the first days of the new year

            // get the days left in month
            while (remainingDays > 0) {
                dates.push({
                    month: dateObj.month,
                    date: date,
                    year: dateObj.year
                });

                date = date + 1;
                remainingDays = remainingDays - 1;
            }

            // get the days from next month
            let i = 1;
            while (nextMonthDays > 0) {
                dates.push({
                    month: self.getNextMonth(dateObj),
                    date: i,
                    year: dateObj.year
                });
                nextMonthDays = nextMonthDays - 1;
                i = i + 1;
            }

            return dates;
        },
        getDatesInMiddleWeek(dateObj) {
            let day = 0;
            let dates = [];
            let dayOfWeek = self.getDayOfWeek(dateObj);
            let firstDateOfWeek = dateObj.date - dayOfWeek;

            while (day < self.daysPerWeek) {
                dates.push({
                    month: dateObj.month,
                    date: firstDateOfWeek,
                    year: dateObj.year
                });
                day = day + 1;
                firstDateOfWeek = firstDateOfWeek + 1;
            }

            return dates;
        },
        getFirstDateOfWeek(dateObj) {
            let dayOfWeek = self.getDayOfWeek(dateObj);
            let firstDay = self.getFirstDayOfMonth(dateObj);
            let prevMonth = self.getPrevMonth(dateObj);
            let prevMonthNumberDays = self.getDaysInMonth({
                'month': self.getPrevMonth(dateObj),
                'date': 0,
                'year': dateObj.year
            });

            // if the first day of the week is a Sunday
            if (dayOfWeek === 0) {
                return dateObj;
            // if its the first week of the month
            } else if (firstDay <= dayOfWeek && firstDay <= self.daysPerWeek) {
                return self.getDatesInFirstWeek(dateObj)[0];
            } else {
                let firstDate = dateObj.date - dayOfWeek;

                return {
                    'month': dateObj.month,
                    'date': firstDate,
                    'year': dateObj.year
                }
            }
        },
        getWeekNum(dateObj) {
            let firstDay = self.getFirstDayOfMonth(dateObj);
            let numberDays = self.getDaysInMonth(dateObj);
            let lastDay = self.getDayOfWeek({
                month: dateObj.month,
                date: numberDays,
                year: dateObj.year
            });
            let date = dateObj.date;
            let weeksInMonth = self.getWeeksInMonth(dateObj);
            let dayShift;

            if (firstDay === self.daysPerWeek) {
                dayShift = 0;
            } else {
                dayShift = firstDay;
            }

            let daysInFirstWeek = self.daysPerWeek - dayShift;
            let firstDateLastWeek = numberDays - lastDay;
            let firstDays = [];

            if (firstDay === 0) {
                firstDays.push(1);
            } else {
                let datesInFirstWeek = self.getDatesInFirstWeek(dateObj);
                firstDays.push(datesInFirstWeek[0].date);
            }

            let firstDateSecondWeek = (self.daysPerWeek - dayShift) + 1;

            firstDays.push(firstDateSecondWeek);

            let remainingWeeks = weeksInMonth - 2;
            let prevWeekFirstDate = firstDateSecondWeek;

            while (remainingWeeks > 0) {
                prevWeekFirstDate = prevWeekFirstDate + 7;
                firstDays.push(prevWeekFirstDate);
                remainingWeeks = remainingWeeks - 1;
            }

            // is first week
            if (date <= daysInFirstWeek) {
                return 1;
            // is last week
            } else if (date >= firstDateLastWeek) {
                return self.getWeeksInMonth(dateObj);
            } else {
                let num;

                $.each(firstDays, function(key, val) {
                    if (date >= val) {
                        num = key + 1;
                    }

                    return num;
                });

                return num;
            }
        },
        getDatesInWeek(dateObj) {
            let numberDays = self.getDaysInMonth(dateObj);
            let currentDay = self.getDayOfWeek(dateObj);
            let lastMonthDays = 1;
            let weekNum = self.getWeekNum(dateObj);

            // console.log(weekNum);

            let weekInfo = {
                datesInWeek: [],
                weekNum: weekNum
            };

            if (weekNum === 1) {
                weekInfo.datesInWeek = self.getDatesInFirstWeek(dateObj);
            } else if (weekNum === self.getWeeksInMonth(dateObj)) {
                weekInfo.datesInWeek = self.getDatesInLastWeek(dateObj);
            } else {
                weekInfo.datesInWeek = self.getDatesInMiddleWeek(dateObj);
            }

            return weekInfo;
        },
        // gets the length of the last week of the month
        getLastWeekLength(dateObj) {
            // let lastDate = self.getDaysInMonth(dateObj);

            return self.getDayOfWeek({
                'month': dateObj.month,
                'date': self.getDaysInMonth(dateObj),
                'year': dateObj.year
            });
        },
        getDayShift(dayOfWeek) {
            if (dayOfWeek === self.daysPerWeek) {
                return 0;
            }

            return dayOfWeek;
        },
        //gets the week of the month when an event occurs
        getEventWeekNum(evt, year) {
            // gets the week of the month which an event occurs

            let dateObj = {
                'month': elr.inArray(self.months, evt.month),
                'date': 1,
                'year': year
            };

            let firstDay = self.getFirstDayOfMonth(dateObj);
            let numberWeeks = self.getWeeksInMonth(dateObj);
            let lastWeekLength = self.getLastWeekLength(dateObj);
            let dayNum = evt.dayNum;
            let day = elr.inArray(self.days, evt.day[0]);

            if (dayNum === 'last') {
                // check if last week in month contains day
                if (lastWeekLength >= day) {
                    return numberWeeks;
                } else {
                    return numberWeeks - 1;
                }
            }

            if (dayNum === 'first') {
                // check if first week in month contains day
                if (firstDay <= day) {
                    return 1;
                } else {
                    return 2;
                }
            }

            // check if you should count from 1st or 2nd week of month
            if (self.getFirstDayOfMonth(dateObj) > day) {
                return dayNum + 1;
            } else {
                return dayNum;
            }
        },
        getWeekNumber(dateObj) {
            let weekNum = 1;
            let weekNums = [];
            let weekInfo = self.getDatesInWeek(dateObj);

            elr.each(self.months, function(key) {
                let numberDays = self.getDaysInMonth({
                    'month': key,
                    'date': 1,
                    'year': dateObj.year
                });

                let firstDay = self.getDayOfWeek({
                    'month': key,
                    'date': 1,
                    'year': dateObj.year
                });

                let lastDay = self.getDayOfWeek({
                    'month': key,
                    'date': self.getDaysInMonth(dateObj),
                    'year': dateObj.year
                });

                let numberWeeks = self.getWeeksInMonth({
                    'month': dateObj.month,
                    'date': 1,
                    'year': dateObj.year
                });

                if ($.isNumeric(numberWeeks)) {
                    let week = 0;

                    while (week <= numberWeeks) {
                        // if the first day of the year is not Sunday, Monday or Tuesday its week 53
                        // the first week of the year is the first Tuesday
                        if ((key === 0 && firstDay > 2) && week === 0) {
                            weekNum = 53;
                        // if its the first week of the year
                        } else if (week === 1 && key === 0) {
                            weekNum = 1;
                        // if its the first week of the month don't increment the week number
                        } else if (week === 0 && firstDay !== 0) {
                            weekNum = weekNum;
                        // if its the last week of the month don't increment the week number
                        } else if (week === numberWeeks && lastDay !== 6) {
                            weekNum = weekNum;
                        } else {
                            weekNum = weekNum + 1;
                        }

                        // when the loop get the the current month add the week
                        // numbers to the array
                        if (dateObj.month === key) {
                            weekNums.push(weekNum);
                        }

                        week = week + 1;
                    }
                }
            });

            return weekNums[weekInfo.weekNum - 1];
        }
    };

    return self;
};

export default elrTimeUtilities;