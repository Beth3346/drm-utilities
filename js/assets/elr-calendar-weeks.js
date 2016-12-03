import elrUtlities from 'elr-utility-lib';
import elrTimeUtlities from 'elr-time-utilities';
import elrCalendarEvents from './elr-calendar-events';
const $ = require('jquery');

let elr = elrUtlities();
let elrTime = elrTimeUtlities();
let elrEvents = elrCalendarEvents();

const elrCalendarWeeks = function() {
    const classes = {
        'weekend': 'elr-cal-weekend',
        'muted': 'elr-cal-muted',
        'holiday': 'elr-cal-holiday',
        'today': 'elr-cal-today',
        'month': 'elr-month',
        'week': 'elr-week',
        'date': 'elr-date'
    };

    const createWeekdayHtml = function(datesInWeek, weekNum) {
        let weekdayHtml = `<thead><tr><th></th>`;

        $.each(datesInWeek.datesInWeek, function(k) {
            let day = elrTime.days[elrTime.getDayOfWeek(this)];
            weekdayHtml += `<th>${day}<br>${(this.month + 1)} / ${this.date}</th>`;
        });

        weekdayHtml += `</tr></thead>`;

        return weekdayHtml;
    };

    const createWeekHtml = function(datesInWeek, weekNum) {
        const weekClass = (weekNum % 2 === 0) ? 'even-week' : 'odd-week';
        let weekHtml = `<tbody class="${classes.week} ${weekClass}" data-week="${weekNum}">`;

        $.each(elrTime.hours, function() {
            // need to account for first and last weeks of the month
            const hour = this.name;

            weekHtml += `<tr><td><span class="hour">${hour}</span></td>`;

            $.each(datesInWeek.datesInWeek, function(k) {
                weekHtml += `<td `;
                weekHtml += `class="${classes.date}"`;
                weekHtml += ` data-month="${(this.month + 1)}"`;
                weekHtml += ` data-date="${this.date}"`;
                weekHtml += ` data-year="${this.year}"`;
                weekHtml += ` data-day="${k}"`;
                weekHtml += ` data-hour="${hour}"`;
                weekHtml += `></td>`;
            });

            weekHtml += '</tr>';
        });

        weekHtml += '</tbody>';

        return weekHtml;
    };

    const createWeekHeading = function(dateObj, datesInWeek, weekNum) {
        const month = elrTime.months[dateObj.month];
        const startDate = {
            month: elrTime.months[datesInWeek.datesInWeek[0].month],
            date: datesInWeek.datesInWeek[0].date
        };
        const endDate = {
            month: elrTime.months[datesInWeek.datesInWeek[datesInWeek.datesInWeek.length - 1].month],
            date: datesInWeek.datesInWeek[datesInWeek.datesInWeek.length - 1].date
        };
        const year = dateObj.year;
        const text = `${startDate.month} ${startDate.date} - ${endDate.month} ${endDate.date}: Week ${weekNum} of ${year}`;
        const $heading = elr.createElement('h1', {
            'class': 'elr-calendar-header',
            'text': text
        });

        return $heading;
    };

    const self = {
        renderWeek: function(dateObj, $cal, evts) {
            const weekNum = elrTime.getWeekNumber(dateObj);
            const lastYear = elrTime.getPrevYear(dateObj);
            const nextYear = elrTime.getNextYear(dateObj);
            const lastMonth = elrTime.getPrevMonth(dateObj);
            const nextMonth = elrTime.getNextMonth(dateObj);
            const datesInWeek = elrTime.getDatesInWeek(dateObj);
            const $heading = createWeekHeading(dateObj, datesInWeek, weekNum);
            const weekdayHtml = createWeekdayHtml(datesInWeek, weekNum);
            const weekHtml = createWeekHtml(datesInWeek, weekNum);

            const weekView = elr.createElement('table', {
                'html': weekdayHtml + weekHtml
            });

            const calendarHtml = elr.createElement('div', {
                'class': 'calendar-inner calendar-week-view',
                'data-month': dateObj.month,
                'data-year': dateObj.year,
                'html': weekView
            });

            $cal.append(calendarHtml);

            $heading.prependTo($cal.find(`.calendar-week-view`));

            // add and remove navigation buttons
            $('.elr-calendar-year-prev').text(lastYear).hide();
            $('.elr-calendar-year-next').text(nextYear).hide();

            $('.elr-calendar-month-prev').text(elrTime.months[lastMonth]).hide();
            $('.elr-calendar-month-next').text(elrTime.months[nextMonth]).hide();

            $('.elr-calendar-week-prev, .elr-calendar-week-next').hide();
            $('.elr-calendar-date-prev, .elr-calendar-date-next').hide();

            $('.elr-calendar-current').hide();
        }
    };

    return self;
};

export default elrCalendarWeeks;