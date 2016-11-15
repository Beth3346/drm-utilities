import elrUtlities from './elr-utilities';
import elrTimeUtlities from './elr-time-utilities';
import elrCalendarCreate from './elr-calendar-create';
const $ = require('jquery');

let elr = elrUtlities();
let elrTime = elrTimeUtlities();
let elrCreate = elrCalendarCreate();

const elrCalendarActions = function(params) {
    let spec = params || {};
    let view = spec.view || 'month';
    let calendarInnerClass = `elr-calendar-${view}-view`;
    let classes = {
        'weekend': 'elr-cal-weekend',
        'muted': 'elr-cal-muted',
        'holiday': 'elr-cal-holiday',
        'today': 'elr-cal-today',
        'month': 'elr-month',
        'week': 'elr-week',
        'date': 'elr-date'
    };

    let self = {
        advanceYear: (dir, evts, $cal) => {
            let $calendarInner = $cal.find(`.${calendarInnerClass}`);
            let dateObj = {
                'month': $calendarInner.data('month'),
                'year': $calendarInner.data('year')
            };

            dateObj.date = (dateObj.month === elrTime.today.month) ? elrTime.today.date : 1;
            dateObj.year = (dir === 'prev') ? dateObj.year - 1 : dateObj.year + 1;

            elrCreate.changeCalendar(view, dateObj, $cal, evts);
        },
        advanceDate: (dir, evts, $cal) => {
            let $calendarInner = $cal.find(`.${calendarInnerClass}`);
            let month = $calendarInner.data('month');
            let date = $calendarInner.find(`.${classes.date}`).data('date');
            let year = $calendarInner.data('year');
            let dateObj = {
                'month': month,
                'date': 1,
                'year': year
            };
        },
        advanceWeek: (dir, evts, $cal) => {
            let $calendarInner = $cal.find(`.${calendarInnerClass}`);
            let month = $calendarInner.data('month');
            let year = $calendarInner.data('year');
            let dateObj = {
                'month': month,
                'date': 1,
                'year': year
            };
            let nextYear = dateObj.year + 1;
            let lastYear = dateObj.year - 1;
            let nextMonth = (dateObj.month === 11) ? 0 : dateObj.month + 1;
            let lastMonth = (dateObj.month === 0) ? 11 : dateObj.month - 1;
            let view = 'week';
            let firstDay;
            let lastDayOfPrevMonth;
            let lastDay;
            let lastDayOfMonth;

            if (dir === 'prev') {
                firstDay = $calendarInner.find(`.${classes.date}`).first().data('date');
                lastDayOfPrevMonth = elrTime.getDaysInMonth({
                    'month': lastMonth,
                    'date': dateObj.date,
                    'year': dateObj.year
                });

                if ((firstDay === 1) && (view === 'week')) {
                    dateObj.date = lastDayOfPrevMonth;
                    dateObj.year = (dateObj.month === 0) ? lastYear : dateObj.year;
                    dateObj.month = lastMonth;
                } else if ((firstDay < 7) && (view === 'week')) {
                    dateObj.date = firstDay - 1;
                } else if ((firstDay === 1) && (view === 'date')) {
                    dateObj.date = lastDayOfPrevMonth - 6 ; // 30 - 6 1 24
                    dateObj.year = (dateObj.month === 0) ? lastYear : dateObj.year;
                    dateObj.month = lastMonth;
                } else if ((firstDay < 7) && (view === 'date')) {
                    dateObj.date = lastDayOfPrevMonth - (7 - firstDay); // 31 - (7 - 3) = 27 27  28 - (7 - 6) = 27 6 27
                    dateObj.year = (dateObj.month === 0) ? lastYear : dateObj.year;
                    dateObj.month = lastMonth;
                } else {
                    dateObj.date = firstDay - 7;
                }
            } else if (dir === 'next') {
                lastDay = $calendarInner.find(`.${classes.date}`).last().data('date');
                lastDayOfMonth = elrTime.getDaysInMonth(dateObj);

                if ((lastDay === lastDayOfMonth) && (view === 'week')) {
                    dateObj.date = 1;
                    dateObj.year = (dateObj.month === 11) ? nextYear : dateObj.year;
                    dateObj.month = nextMonth;
                } else if ((lastDay + 7 > lastDayOfMonth) && (view === 'week')) {
                    dateObj.date = lastDayOfMonth;
                } else if ((lastDay + 7 > lastDayOfMonth) && (view === 'date')) {
                    dateObj.date = 7 - (lastDayOfMonth - lastDay); // 31 - 29 = 2 ? 7 - 2 = 5
                    dateObj.year = (dateObj.month === 11) ? nextYear : dateObj.year;
                    dateObj.month = nextMonth;
                } else {
                    dateObj.date = lastDay + 7;
                }
            }
        },
        advanceMonth: (dir, evts, $cal) => {
            let $calendarInner = $cal.find(`.${calendarInnerClass}`);
            let month = $calendarInner.data('month');
            let year = $calendarInner.data('year');
            let dateObj = {
                'month': month,
                'date': (month === elrTime.today.month) ? elrTime.today.date : 1,
                'year': year
            };

            if (dir === 'prev') {
                dateObj.month = (dateObj.month === 0) ? 11 : dateObj.month - 1;
                dateObj.year = (dateObj.month === 11) ? dateObj.year - 1 : dateObj.year;
            } else if (dir === 'next') {
                dateObj.month = (dateObj.month === 11) ? 0 : dateObj.month + 1;
                dateObj.year = (dateObj.month === 0) ? dateObj.year + 1 : dateObj.year;
            }

            elrCreate.changeCalendar(view, dateObj, $cal, evts);
        }
    };

    return self;
};

export default elrCalendarActions;