import elrUtlities from 'elr-utility-lib';
import elrTimeUtlities from 'elr-time-utilities';
const $ = require('jquery');

let elr = elrUtlities();
let elrTime = elrTimeUtlities();

const elrCalendarEvents = function({
    calendarClass = 'elr-calendar',
    view = 'month'
} = {}) {
    let $calendar = $(`.${calendarClass}`);
    let calendarInnerClass = `elr-calendar-${view}-view`;
    let evtClass = 'elr-events';
    let classes = {
        'weekend': 'elr-cal-weekend',
        'muted': 'elr-cal-muted',
        'holiday': 'elr-cal-holiday',
        'today': 'elr-cal-today',
        'month': 'elr-month',
        'week': 'elr-week',
        'date': 'elr-date'
    };

    // these events occur once per year
    const addYearlyEvent = (evt, $calendarInner) => {
        // need to add support for multi-day events
        if (evt.day) {
            const dates = [];
            elr.each(evt.day, function() {
                const day = elr.inArray(elrTime.days, this);
                const evtMonth = $calendarInner.data('month');
                const evtYear = $calendarInner.data('year');
                const weeks = $calendarInner.find('.elr-week');
                const evtWeekNum = elrTime.getEventWeekNum(evt, evtYear);

                weeks.each(function() {
                    const $that = $(this);
                    const firstDate = $that.find(`.${classes.date}`)
                        .first()
                        .data('date');
                    const weekInfo = elrTime.getDatesInWeek({
                        'month': evtMonth,
                        'date': firstDate,
                        'year': evtYear
                    });

                    if (evtWeekNum && evtWeekNum === weekInfo.weekNum) {
                        const evtDate = $that.find(`.${classes.date}[data-day="${day}"]`);
                        dates.push(evtDate.data('date'));
                    }
                });

                return dates;
            });

            return dates;
        } else {
            const dates = [];
            dates.push(parseInt(evt.eventDate, 10));

            return dates;
        }
    };

    const addEventToWeek = (week, evtDay, $cal, evt) => {
        let $week = $(week);
        let evtMonth = $cal.data('month');
        let evtYear = $cal.data('year');
        let firstDate = $week.find('.elr-date').first().data('date');
        let weekInfo = elrTime.getDatesInWeek({
            'month': evtMonth,
            'date': firstDate,
            'year': evtYear
        });

        // copy event so we can add update properties without changing
        // the original

        let tempEvt = $.extend({}, evt);

        // set event month to get week number
        tempEvt.month = elrTime.months[evtMonth];

        // set event day for multi day event
        tempEvt.day = [evtDay];

        let weekNum = elrTime.getEventWeekNum(tempEvt, evtYear);

        if (weekNum === weekInfo.weekNum) {
            // for monthly events
            return $week
                .find(`.elr-date[data-day="${elr.inArray(elrTime.days, evtDay)}"]`)
                .data('date');
        }

        return;
    };

    const addDayEvent = (evtDay, $cal, evt) => {
        const $weeks = $cal.find('.elr-week');
        let evtDate;

        $weeks.each(function() {
            const date = addEventToWeek(this, evtDay, $cal, evt);

            if (date) {
                evtDate = date;
            }
        });

        return evtDate;
    };

    // these events occur once per month
    const addMonthlyEvent = (evt, $calendarInner) => {
        const dates = [];
        // events that occur on a specific day of the week
        // eg. event occurs on the first Tuesday of every month
        if (evt.day) {
            elr.each(evt.day, function() {
                dates.push(addDayEvent(this, $calendarInner, evt));

                return dates;
            });
        } else {
            dates.push(parseInt(evt.eventDate, 10));
        }

        return dates;
    };

    // these events occur every 2 weeks
    // they occur on odd or even weeks
    const addBiWeeklyEvent = (evt, $calendarInner) => {
        const $weeks = $calendarInner.find('.elr-week');
        const evtWeek = evt.week;
        const dates = [];

        if (evt.day) {
            elr.each(evt.day, function() {
                let evtDay = this;
                $weeks.each(function() {
                    const $week = $(this);
                    const mod = $week.data('week') % 2;
                    const day = elr.inArray(elrTime.days, evtDay);
                    const date = $week
                        .find(`.elr-date[data-day="${day}"]`)
                        .data('date');

                    // even weeks
                    if (!mod && evtWeek === 'even') {
                        dates.push(date);
                    } else if (mod && evtWeek === 'odd') {
                        dates.push(date);
                    }

                    return dates;
                });

                return dates;
            });
        } else {
            return;
        }

        return dates;
    };

    // these events occur every week
    // can be multiple days eg. Monday, Wendesday, Friday or Weekends
    const addWeeklyEvent = (evt, $calendarInner) => {
        const $weeks = $calendarInner.find('.elr-week');
        const dates = [];

        if (evt.day) {
            elr.each(evt.day, function() {
                let evtDay = this;
                $weeks.each(function() {
                    const $week = $(this);
                    const mod = $week.data('week') % 2;
                    const day = elr.inArray(elrTime.days, evtDay);
                    const date = $week
                        .find(`.elr-date[data-day="${day}"]`)
                        .data('date');

                    dates.push(date);

                    return dates;
                });

                return dates;
            });
        } else {
            return;
        }

        return dates;
    };

    // these events occur every day
    // can be all day events or can occur at a set time
    const addDailyEvent = ($calendarInner) => {
        const $days = $calendarInner.find('.elr-date');
        const dates = [];

        elr.each($days, function() {
            const date = $(this).data('date');
            dates.push(date);

            return dates;
        });

        return dates;
    };

    // these events occur once
    // can be all day events or can occur at a set time
    const addOneTimeEvent = (evt, $calendarInner) => {
        const $days = $calendarInner.find('.elr-date');
        const dates = [];

        elr.each($days, function() {
            const date = $(this).data('date');

            if (date === evt.eventDate) {
                dates.push(date);
            }

            return dates;
        });

        return dates;
    };

    // gets the index of an evt so we can keep track after evts are removed
    const getEventIndex = (evtId, evts) => {
        let index = null;

        $.each(evts, function(k, v) {
            if (v.id === evtId) {
                index = k;
            }

            return index;
        });

        return index;
    };

    let self = {
        addEvent(evt, $calendar) {
            let $calendarInner = $calendar.find(`div.${calendarInnerClass}`);
            let evtMonth = $calendarInner.data('month');
            let month = elr.inArray(elrTime.months, evt.month);
            let evtDates;

            if (evt.recurrance === 'yearly' && evtMonth === month) {
                evtDates = addYearlyEvent(evt, $calendarInner);
            } else if (evt.recurrance === 'monthly') {
                evtDates = addMonthlyEvent(evt, $calendarInner);
            } else if (evt.recurrance === 'biweekly') {
                evtDates = addBiWeeklyEvent(evt, $calendarInner);
            } else if (evt.recurrance === 'weekly') {
                evtDates = addWeeklyEvent(evt, $calendarInner);
            } else if (evt.recurrance === 'daily') {
                evtDates = addDailyEvent($calendarInner);
            } else if (evt.recurrance === 'one-time') {
                evtDates = addOneTimeEvent(evt, $calendarInner);
            } else if (evt.recurrance === 'yearly') {
                // console.log(`event does not occur in this month: ${evt.name}`);
                return;
            } else {
                console.log(`invalid event recurrance: ${evt.recurrance}`);
                return;
            }

            elr.each(evtDates, (key, date) => {
                this.addEventToCalendar(evt, date, $calendarInner);
            });
        },

        addEventToCalendar(evt, date, $calendarInner) {
            let $calendarItem;
            let eventContent;

            if (view === 'month') {
                $calendarItem = $calendarInner.find(`.${classes.date}[data-date="${date}"]`);
            }

            let $eventList = $calendarItem.find(`ul.${evtClass}`);

            if (evt.time) {
                eventContent = `<span class='elr-time'>${evt.time}: </span><span class='elr-event'>${evt.name}</span>`;
            } else {
                eventContent = `<span class='elr-event elr-all-day-event'>${evt.name}</span>`;
            }

            let eventHtml = $('<a></a>', {
                'href': '#',
                'data-event': evt.id,
                'html': eventContent
            });

            if ($eventList.length === 0) {
                $eventList = $('<ul></ul>', {
                    'class': evtClass
                });

                $eventList.appendTo($calendarItem);
            }

            let $item = $('<li></li>', {
                'html': eventHtml
            });

            $item.appendTo($eventList);

            // if (evt.type === 'holiday') {
                $eventList.find(`a:contains(${evt.name})`)
                    .addClass(classes.holiday);
            // }
        },

        // closeEvent: (e) => {
        //     e.prevtDefault();

        //     $('div.elr-blackout').fadeOut(300, function() {
        //         $(this).remove();
        //     });
        // },

        // createEvent: (newEvent, evts, calendar) => {
        //     if (evts) {
        //         let id = evts.length;
        //         let name;
        //         let obj = {
        //             'id': id,
        //             'name': name,
        //             'recurrance': recurrance,
        //             'month': month,
        //             'year': year,
        //             'evtDate': evtDate,
        //             'time': time,
        //             'day': day,
        //             'dayNum': dayNum,
        //             'type': type,
        //             'notes': notes
        //         };

        //         evts.push(obj);

        //         this.addEvents(evts[obj.id], calendar);
        //     }
        // },

        // destroyEvent: (evtId, index, evts) => {
        //     let $evt = $calendar.find(`ul.${evtClass} a[data-evt=${evtId}]`);

        //     $evt.remove();

        //     return evts.splice(index, 1);
        // },

        // editEvent: () => {
        //     console.log(`${evtId} ${index}`);
        // },

        // updateEvent: () => {
        //     console.log(`${evtId} ${index}`);
        // },

        // readEvent: () => {
        //     console.log(`${evtId} ${index}`);
        // }
    };

    return self;
};

export default elrCalendarEvents;