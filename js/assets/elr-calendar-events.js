import elrUtlities from './elr-utilities';
import elrTimeUtlities from './elr-time-utilities';
const $ = require('jquery');

let elr = elrUtlities();
let elrTime = elrTimeUtlities();

const elrCalendarEvents = function(params) {
    let spec = params || {};
    let calendarClass = spec.calendarClass || 'elr-calendar';
    let view = spec.view || 'month';
    let newEvents = spec.newEvents || [];
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

    let self = {
        addEvents: (evt, $calendar) => {
            let $calendarInner = $calendar.find(`div.${calendarInnerClass}`);
            let evtMonth = $calendarInner.data('month');
            let month = elr.inArray(elrTime.months, evt.month);
            let evtDates = [];

            if (evt.recurrance === 'yearly' && evtMonth === month) {
                self.addYearlyEvents(evt, evtDates, $calendarInner);
            } else if (evt.recurrance === 'monthly') {
                self.addMonthlyEvents(evt, evtDates, $calendarInner);
            } else if (evt.recurrance === 'biweekly') {
                self.addBiWeeklyEvents(evt, evtDates, $calendarInner);
            } else if (evt.recurrance === 'weekly') {
                self.addWeeklyEvents(evt, evtDates, $calendarInner);
            } else if (evt.recurrance === 'daily') {
                self.addDailyEvents(evt, evtDates, $calendarInner);
            } else if (evt.recurrance === 'one-time') {
                self.addOneTimeEvents(evt, evtDates, $calendarInner);
            } else if (evt.recurrance === 'yearly') {
                // console.log(`event does not occur in this month: ${evt.name}`);
                return
            } else {
                console.log(`invalid event recurrance: ${evt.recurrance}`);
                return;
            }

            elr.each(evtDates, function(key, date) {
                self.addEventsToCalendar(evt, date, $calendarInner);
            });
        },

        addEventsToCalendar: (evt, date, $calendarInner) => {
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

            if (evt.type === 'holiday') {
                $eventList.find(`a:contains(${evt.name})`)
                    .addClass(classes.holiday);
            }
        },

        addYearlyEvents: (evt, evtDates, $calendarInner) => {
            // need to add support for multi-day events
            if (evt.day) {
                elr.each(evt.day, function() {
                    let day = elr.inArray(elrTime.days, this);
                    let evtMonth = $calendarInner.data('month');
                    let evtYear = $calendarInner.data('year');
                    let weeks = $calendarInner.find('.elr-week');
                    let evtWeekNum = elrTime.getEventWeekNum(evt, evtYear);

                    weeks.each(function() {
                        let $that = $(this);
                        let firstDate = $that.find(`.${classes.date}`).first().data('date');
                        let weekInfo = elrTime.getDatesInWeek({
                            'month': evtMonth,
                            'date': firstDate,
                            'year': evtYear
                        });

                        if (evtWeekNum && evtWeekNum === weekInfo.weekNum) {
                            let evtDate = $that.find(`.${classes.date}[data-day="${day}"]`);
                            evtDates.push(evtDate.data('date'));
                        }
                    });
                });
            } else {
                evtDates.push(parseInt(evt.eventDate, 10));
            }
        },

        addMonthlyEvents: (evt, evtDates, $calendarInner) => {
            let weeks = $calendarInner.find('.elr-week');

            if (evt.day) {
                elr.each(evt.day, function() {
                    let evtMonth = $calendarInner.data('month');
                    let evtYear = $calendarInner.data('year');
                    let day = elr.inArray(elrTime.days, this);

                    evt.month = elrTime.months[evtMonth];
                    let evtWeekNum = elrTime.getEventWeekNum(evt, evtYear);

                    weeks.each(function() {
                        let $that = $(this);
                        let firstDate = $that.find('.elr-date').first().data('date');
                        let weekInfo = elrTime.getDatesInWeek({
                            'month': evtMonth,
                            'date': firstDate,
                            'year': evtYear
                        });

                        if (evtWeekNum === weekInfo.weekNum) {
                            evtDates.push($that.find(`.elr-date[data-day="${day}"]`).data('date'));
                        }
                    });
                });
            } else {
                evtDates.push(parseInt(evt.eventDate, 10));
            }
        },

        addBiWeeklyEvents: (evts, eventDates) => {

        },

        addWeeklyEvents: (evts, eventDates) => {

        },

        addDailyEvents: (evts, eventDates) => {

        },

        addOneTimeEvents: (evts, eventDates) => {

        },

        // gets the index of an evt so we can keep track after evts are removed
        getEventIndex: (evtId) => {
            let index = null;

            $.each(evts, function(k, v) {
                if (value.id === evtId) {
                    index = key;
                }

                return index;
            });

            return index;
        },

        closeEvent: (e) => {
            e.prevtDefault();

            $('div.elr-blackout').fadeOut(300, function() {
                $(this).remove();
            });
        },

        createEvent: (newEvent, evts, calendar) => {
            if (evts) {
                let id = evts.length;
                let name;
                let obj = {
                    'id': id,
                    'name': name,
                    'recurrance': recurrance,
                    'month': month,
                    'year': year,
                    'evtDate': evtDate,
                    'time': time,
                    'day': day,
                    'dayNum': dayNum,
                    'type': type,
                    'notes': notes
                };

                evts.push(obj);

                this.addEvents(evts[obj.id], calendar);
            }
        },

        destroyEvent: (evtId, index) => {
            let $evt = $calendar.find(`ul.${evtClass} a[data-evt=${evtId}]`);

            $evt.remove();

            return evts.splice(index, 1);
        },

        editEvent: () => {
            console.log(`${evtId} ${index}`);
        },

        updateEvent: () => {
            console.log(`${evtId} ${index}`);
        },

        readEvent: () => {
            console.log(`${evtId} ${index}`);
        }
    };

    return self;
};

export default elrCalendarEvents;