import elrUtlities from './elr-utilities';
import elrTimeUtlities from './elr-time-utilities';
const $ = require('jquery');

let elr = elrUtlities();
let elrTime = elrTimeUtlities();

const elrCalendar = function(params) {
    let self = {};
    let spec = params || {};
    let calendarClass = spec.calendarClass || 'elr-calendar';
    let view = spec.view || 'month';
    let addHolidays = (typeof spec.addHoldays === 'undefined') ? true : spec.addHoldays;
    let currentDate = spec.currentDate || 'today';
    let newEvents = spec.newEvents || [];
    let $calendar = $(`.${calendarClass}`);
    let $body = $('body');
    let calendarInnerClass = `elr-calendar-${view}-view`;
    let eventClass = 'elr-events';
    let classes = {
        'weekend': 'elr-cal-weekend',
        'muted': 'elr-cal-muted',
        'holiday': 'elr-cal-holiday',
        'today': 'elr-cal-today',
        'month': 'elr-month',
        'week': 'elr-week',
        'date': 'elr-date'
    };

    // gets the index of an event so we can keep track after events are removed
    let getEventIndex = function(eventId) {
        let index = null;

        $.each(events, function(k, v) {
            if (value.id === eventId) {
                index = key;
            }

            return index;
        });

        return index;
    };

    let closeEvent = function(e) {
        e.preventDefault();

        $('div.elr-blackout').fadeOut(300, function() {
            $(this).remove();
        });
    };

    let createEvent = function(newEvent, events, calendar) {
        if (events) {
            let id = events.length;
            let name;
            let obj = {
                'id': id,
                'name': name,
                'recurrance': recurrance,
                'month': month,
                'year': year,
                'eventDate': eventDate,
                'time': time,
                'day': day,
                'dayNum': dayNum,
                'type': type,
                'notes': notes
            };

            events.push(obj);

            this.addEventsToCalendar(events[obj.id], calendar);
        }
    };

    let destroyEvent = function(eventId, index) {
        let $event = $calendar.find(`ul.${eventClass} a[data-event=${eventId}]`);

        $event.remove();

        return events.splice(index, 1);
    };

    let editEvent = function() {
        console.log(`${eventId} ${index}`);
    };

    let updateEvent = function() {
        console.log(`${eventId} ${index}`);
    };

    let readEvent = function() {
        console.log(`${eventId} ${index}`);
    };

    let advanceYear = function(dir, events, $cal) {
        let $calendarInner = $cal.find(`.${calendarInnerClass}`);
        let newDate = {
            'month': $calendarInner.data('month'),
            'year': $calendarInner.data('year')
        };

        newDate.date = (newDate.month === elrTime.today.month) ? elrTime.today.date : 1;
        newDate.year = (dir === 'prev') ? newDate.year - 1 : newDate.year + 1;

        changeCalendar(newDate, $cal, events);
    };

    let advanceDate = function(dir, events, $cal) {
        let $calendarInner = $cal.find(`.${calendarInnerClass}`);
        let month = $calendarInner.data('month');
        let date = $calendarInner.find(`.${classes.date}`).data('date');
        let year = $calendarInner.data('year');
        let newDate = {
            'month': month,
            'date': 1,
            'year': year
        };
    };

    let advanceWeek = function(dir, events, $cal) {
        let $calendarInner = $cal.find(`.${calendarInnerClass}`);
        let month = $calendarInner.data('month');
        let year = $calendarInner.data('year');
        let newDate = {
            'month': month,
            'date': 1,
            'year': year
        };
        let nextYear = newDate.year + 1;
        let lastYear = newDate.year - 1;
        let nextMonth = (newDate.month === 11) ? 0 : newDate.month + 1;
        let lastMonth = (newDate.month === 0) ? 11 : newDate.month - 1;
        let view = 'week';
        let firstDay;
        let lastDayOfPrevMonth;
        let lastDay;
        let lastDayOfMonth;

        if (dir === 'prev') {
            firstDay = $calendarInner.find(`.${classes.date}`).first().data('date');
            lastDayOfPrevMonth = elrTime.getDaysInMonth({
                'month': lastMonth,
                'date': newDate.date,
                'year': newDate.year
            });

            if ((firstDay === 1) && (view === 'week')) {
                newDate.date = lastDayOfPrevMonth;
                newDate.year = (newDate.month === 0) ? lastYear : newDate.year;
                newDate.month = lastMonth;
            } else if ((firstDay < 7) && (view === 'week')) {
                newDate.date = firstDay - 1;
            } else if ((firstDay === 1) && (view === 'date')) {
                newDate.date = lastDayOfPrevMonth - 6 ; // 30 - 6 1 24
                newDate.year = (newDate.month === 0) ? lastYear : newDate.year;
                newDate.month = lastMonth;
            } else if ((firstDay < 7) && (view === 'date')) {
                newDate.date = lastDayOfPrevMonth - (7 - firstDay); // 31 - (7 - 3) = 27 27  28 - (7 - 6) = 27 6 27
                newDate.year = (newDate.month === 0) ? lastYear : newDate.year;
                newDate.month = lastMonth;
            } else {
                newDate.date = firstDay - 7;
            }
        } else if (dir === 'next') {
            lastDay = $calendarInner.find(`.${classes.date}`).last().data('date');
            lastDayOfMonth = elrTime.getDaysInMonth(newDate);

            if ((lastDay === lastDayOfMonth) && (view === 'week')) {
                newDate.date = 1;
                newDate.year = (newDate.month === 11) ? nextYear : newDate.year;
                newDate.month = nextMonth;
            } else if ((lastDay + 7 > lastDayOfMonth) && (view === 'week')) {
                newDate.date = lastDayOfMonth;
            } else if ((lastDay + 7 > lastDayOfMonth) && (view === 'date')) {
                newDate.date = 7 - (lastDayOfMonth - lastDay); // 31 - 29 = 2 ? 7 - 2 = 5
                newDate.year = (newDate.month === 11) ? nextYear : newDate.year;
                newDate.month = nextMonth;
            } else {
                newDate.date = lastDay + 7;
            }
        }
    };

    let advanceMonth = function(dir, events, $cal) {
        let $calendarInner = $cal.find(`.${calendarInnerClass}`);
        let month = $calendarInner.data('month');
        let year = $calendarInner.data('year');
        let newDate = {
            'month': month,
            'date': (month === elrTime.today.month) ? elrTime.today.date : 1,
            'year': year
        };

        if (dir === 'prev') {
            newDate.month = (newDate.month === 0) ? 11 : newDate.month - 1;
            newDate.year = (newDate.month === 11) ? newDate.year - 1 : newDate.year;
        } else if (dir === 'next') {
            newDate.month = (newDate.month === 11) ? 0 : newDate.month + 1;
            newDate.year = (newDate.month === 0) ? newDate.year + 1 : newDate.year;
        }

        changeCalendar(newDate, $cal, events);
    };

    let changeCalendar = function(newDate, $cal, events) {
        let $calendarInner = $cal.find(`.${calendarInnerClass}`);

        $calendarInner.fadeOut(300).queue(function(next) {
            $.when($(this).remove()).then(renderCalendar($cal, newDate));
            next();
        });
    };

    let createWeekdays = function(renderDate) {
        let weekdays = '<table><thead><tr>';

        $.each(elrTime.days, function() {
            weekdays += `<th>${this}</th>`;
        });

        weekdays += '</tr></thead>';

        return weekdays;
    };

    let highlightWeekends = function($cal) {
        let $calendarInner = $cal.find(`.${calendarInnerClass}`);
        let $weeks = $calendarInner.find('.elr-week');
        let weekends = [0, 6];

        $.each($weeks, function() {
            let $that = $(this);
            let weekend;

            $.each(weekends, function() {
                weekend = $that.find(`.${classes.date}[data-day=${this}]`)
                    .not(`.${classes.muted}`, `.${classes.today}`, `.${classes.holiday}`);

                weekend.addClass(classes.weekend);
            });
        });
    };

    let highlightToday = function($cal, renderDate) {
        let $calendarInner = $cal.find(`.${calendarInnerClass}`);
        let month = $calendarInner.data('month');
        let year = $calendarInner.data('year');

        if (month === parseInt(renderDate.month, 10) && year === parseInt(renderDate.year, 10)) {
            $calendarInner.find(`.elr-date[data-date=${renderDate.date}]`).addClass(classes.today);
        }

        return;
    };

    let addWeekNumbers = function($cal, renderDate) {
        let weeks = $cal.find(`.${calendarInnerClass}`).find('.elr-week');

        $.each(weeks, function() {
            let $that = $(this);
            let firstDateInWeek = $that.find('.elr-date').first().data('date');
            let dateObj = {
                'month': renderDate.month,
                'date': firstDateInWeek,
                'year': renderDate.year
            };

            let weekNumber = elrTime.getWeekNumber(dateObj);

            if (weekNumber % 2 === 0) {
                $that.addClass('even-week');
            } else {
                $that.addClass('odd-week');
            }

            $that.attr('data-week', weekNumber);
        });
    };

    let createFirstWeek = function(renderDate, firstDay) {
        let lastMonthDays = 1;
        let prevMonthNumberDays = elrTime.getDaysInMonth({
            'month': elrTime.getPrevMonth(renderDate),
            'date': 0,
            'year': renderDate.year
        });

        let dayShift = (firstDay === elrTime.daysPerWeek) ? 0 : firstDay;
        let prevDays = (prevMonthNumberDays - dayShift) + 1;
        let firstWeekHtml = '';

        $.each(elrTime.days, function(k) {
            if (lastMonthDays <= dayShift) {
                firstWeekHtml += `<td class='${classes.muted}' data-day='${k}'>${prevDays}</td>`;
                prevDays += 1;
                lastMonthDays += 1;
            } else {
                firstWeekHtml += `<td class='${classes.date}' data-month='${renderDate.month}' data-date='${renderDate.date}' data-year='${renderDate.year}' data-day='${k}'>${renderDate.date}</td>`;

                renderDate.date += 1;
            }
        });

        return firstWeekHtml;
    };

    let createLastWeek = function(renderDate) {
        let nextDates = 1;
        let lastWeekHtml = '';
        let numberDays = elrTime.getDaysInMonth(renderDate);

        $.each(elrTime.days, function(k) {
            // finish adding cells for the current month
            if (renderDate.date <= numberDays) {
                lastWeekHtml += '<td class=' + classes.date + ' data-month=' + renderDate.month + ' data-date=' + renderDate.date + ' data-year=' + renderDate.year + ' data-day=' + k + '>' + renderDate.date + '</td>';
            // start adding cells for next month
            } else {
                lastWeekHtml += '<td class=' + classes.muted + ' data-day=' + k + '>' + nextDates + '</td>';

                nextDates += 1;
            }

            renderDate.date += 1;
        });

        return lastWeekHtml;
    };

    let createMiddleWeeks = function(renderDate) {
        let middleWeeksHtml = '';

        $.each(elrTime.days, function(k) {
            middleWeeksHtml += '<td class=' + classes.date + ' data-month=' + renderDate.month + ' data-date=' + renderDate.date + ' data-year=' + renderDate.year + ' data-day=' + k + '>' + renderDate.date + '</td>';

            renderDate.date += 1;
        });

        return middleWeeksHtml;
    };

    let createWeeks = function(renderDate) {
        let tempDate = {
            'month': renderDate.month,
            'date': 1,
            'year': renderDate.year
        };

        let weekCount = 1;
        let weeks = '<tbody class="' + classes.month +  '">';
        let numberWeeks = elrTime.getWeeksInMonth(tempDate);
        let firstDay = elrTime.getFirstDayOfMonth(tempDate);

        while (weekCount <= numberWeeks) {
            weeks += '<tr class="' + classes.week + '">';

            // if we are in week 1 we need to shift to the correct day of the week
            if (weekCount === 1 && (firstDay !== 0)) {
                weeks += createFirstWeek(tempDate, firstDay);
            } else if (weekCount === numberWeeks) {
                // if we are in the last week of the month we need to add blank cells for next month
                weeks += createLastWeek(tempDate);
            } else {
                // if we are in the middle of the month add cells for the current month
                weeks += createMiddleWeeks(tempDate);
            }

            weeks += '</tr>';
            weekCount += 1;
        }

        weeks += '</tbody></table>';

        return weeks;
    };

    let createCalendarHtml = function(renderDate) {
        let html = createWeekdays(renderDate) + createWeeks(renderDate);

        return $('<div></div>', {
            'class': calendarInnerClass,
            'data-month': renderDate.month,
            'data-year': renderDate.year,
            'html': html
        });
    };

    let createHeading = function(renderDate) {
        return $('<h1></h1>', {
            'class': 'elr-calendar-header',
            'text': elrTime.months[renderDate.month] + ' ' + renderDate.year
        });
    };

    let renderCalendar = function($cal, renderDate) {
        let calendarHtml = createCalendarHtml(renderDate);
        let $heading = createHeading(renderDate);

        let lastYear = elrTime.getPrevYear(renderDate);
        let nextYear = elrTime.getNextYear(renderDate);
        let lastMonth = elrTime.getPrevMonth(renderDate);
        let nextMonth = elrTime.getNextMonth(renderDate);

        $cal.append(calendarHtml);

        $heading.prependTo($cal.find(`.${calendarInnerClass}`));

        highlightWeekends($cal);
        highlightToday($cal, renderDate);
        addWeekNumbers($cal, renderDate);

        // add and remove navigation buttons
        $('.elr-calendar-year-prev').text(lastYear);
        $('.elr-calendar-year-next').text(nextYear);

        $('.elr-calendar-month-prev').text(elrTime.months[lastMonth]);
        $('.elr-calendar-month-next').text(elrTime.months[nextMonth]);

        $('.elr-calendar-week-prev, .elr-calendar-week-next').hide();
        $('.elr-calendar-date-prev, .elr-calendar-date-next').hide();
    };

    let createMonth = function(newDate, $cal) {
        let renderDate = {
            'month': newDate.month,
            'date': newDate.date,
            'year': newDate.year
        };

        renderCalendar($cal, renderDate);
    };

    let createWeek = function(newDate, $cal) {
        let renderDate = {
            'month': newDate.month,
            'date': newDate.date,
            'year': newDate.year
        };

        let lastYear = elrTime.getPrevYear(renderDate);
        let nextYear = elrTime.getNextYear(renderDate);
        let lastMonth = elrTime.getPrevMonth(renderDate);
        let nextMonth = elrTime.getNextMonth(renderDate);
        let datesInWeek = elrTime.getDatesInWeek(renderDate);
        // let $heading = createHeading(renderDate);
        let weekClass = (datesInWeek.weekNum % 2 === 0) ? 'even-week' : 'odd-week';
        let $heading = $('<h1></h1>', {
            'class': 'elr-calendar-header',
            'text': elrTime.months[newDate.month] + ' ' + datesInWeek.datesInWeek[0] + '-' + datesInWeek.datesInWeek[datesInWeek.datesInWeek.length - 1] + ': Week ' + datesInWeek.weekNum + ' of ' + renderDate.year
        });

        let createWeekdayHtml = function(renderDate, datesInWeek) {
            let weekdayHtml = '<thead><tr><th></th>';

            $.each(elrTime.days, function(k, v) {
                weekdayHtml += '<th>' + v + '<br>' + (renderDate.month + 1) + ' / ' + datesInWeek.datesInWeek[k] + '</th>';
            });

            weekdayHtml += '</tr></thead>';

            return weekdayHtml;
        };

        let createWeekHtml = function(renderDate, datesInWeek) {
            let weekHtml = '<tbody class="' + classes.week + ' ' + weekClass + '" data-week="' + datesInWeek.weekNum + '">';

            $.each(elrTime.hours, function() {
                let hour = this.name;

                weekHtml += '<tr><td><span class="hour">' + hour + '</span></td>';

                $.each(elrTime.days, function(k) {
                    weekHtml += '<td ';
                    weekHtml += 'class="' + classes.date + '"';
                    weekHtml += ' data-month="' + (renderDate.month + 1) + '"';
                    weekHtml += ' data-date="' + datesInWeek.datesInWeek[k] + '"';
                    weekHtml += ' data-year="' + renderDate.year + '"';
                    weekHtml += ' data-day="' + k + '"';
                    weekHtml += ' data-hour="' + hour + '"';
                    weekHtml += '></td>';
                });

                weekHtml += '</tr>';
            });

            weekHtml += '</tbody>';

            return weekHtml;
        };

        let weekdayHtml = createWeekdayHtml(renderDate, datesInWeek);
        let weekHtml = createWeekHtml(renderDate, datesInWeek);

        let weekView = $('<table></table>', {
            'html': weekdayHtml + weekHtml
        });

        let calendarHtml = $('<div></div>', {
            'class': 'calendar-week-view',
            'data-month': renderDate.month,
            'data-year': renderDate.year,
            'html': weekView
        });

        $cal.append(calendarHtml);

        $heading.prependTo($cal.find('.' + 'calendar-week-view'));

        highlightWeekends($cal);
        highlightToday($cal, renderDate);

        // add and remove navigation buttons
        $('.elr-calendar-year-prev').text(lastYear).hide();
        $('.elr-calendar-year-next').text(nextYear).hide();

        $('.elr-calendar-month-prev').text(elrTime.months[lastMonth]).hide();
        $('.elr-calendar-month-next').text(elrTime.months[nextMonth]).hide();

        $('.elr-calendar-week-prev, .elr-calendar-week-next').hide();
        $('.elr-calendar-date-prev, .elr-calendar-date-next').hide();

        $('.elr-calendar-current').hide();
    };

    if ($calendar.length) {

        $calendar.each(function() {
            let $that = $(this);
            let $calendarNav = $that.find('.elr-calendar-nav');
            let $calendarSelect = $that.find('.elr-calendar-select');
            let $calendarSelectButton = $calendarSelect.find('button[type=submit]');
            let $addEventForm = $that.find('form.elr-calendar-new-event').hide();
            let $showEventFormButton = $that.find('button.elr-show-event-form');
            let $calendarViewActiveButton = $that.find(`.elr-calendar-view-nav button[data-view=${view}]`).addClass('active');
            let events = {};

            createMonth(elrTime.today, $that);
            // createWeek(elrTime.today, $that);

            $that.on('click', '.elr-calendar-year-prev, .elr-calendar-year-next', function() {
                let dir = $(this).data('dir');

                advanceYear(dir, events, $that);
            });

            $that.on('click', '.elr-calendar-month-prev, .elr-calendar-month-next', function() {
                let dir = $(this).data('dir');

                advanceMonth(dir, events, $that);
            });

            $that.on('click', '.elr-calendar-current', function() {
                changeCalendar(elrTime.today, $that, events);
            });
        });
    }

    return self;
};

export default elrCalendar;