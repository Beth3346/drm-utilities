(function($) {
    'use strict';

    window.elrCalendar = function(params) {
        var self = {};
        var spec = params || {};
        var calendarClass = spec.calendarClass || 'elr-calendar';
        var view = spec.view || 'month';
        var addHolidays = (typeof spec.addHoldays === 'undefined') ? true : spec.addHoldays;
        var currentDate = spec.currentDate || 'today';
        var newEvents = spec.newEvents || [];
        var $calendar = $('.' + calendarClass);

        var eventUtilities = {
            // gets the index of an event so we can keep track after events are removed
            this.getEventIndex = function(eventId) {
                var index = null;

                $.each(events, function(k, v) {
                    if (value.id === eventId) {
                        index = key;
                    }

                    return index;
                });

                return index;
            }
        }

        if ($calendar.length) {
            var $body = $('body');
            var calendarInnerClass = 'elr-calendar-' + view + '-view';
            var eventClass = 'elr-events';
            var classes = {
                'weekend': 'elr-cal-weekend',
                'muted': 'elr-cal-muted',
                'holiday': 'elr-cal-holiday',
                'today': 'elr-cal-today',
                'month': 'elr-month',
                'week': 'elr-week',
                'date': 'elr-date'
            }
            var $calendarNav = $('.elr-calendar-nav');
            var $calendarSelect = $('.elr-calendar-select');
            var $calendarSelectButton = $calendarSelect.find('button[type=submit]');
            var $addEventForm = $calendar.find('form.elr-calendar-new-event').hide();
            var $showEventFormButton = $calendar.find('button.elr-show-event-form');
            var $calendarViewActiveButton = $calendar.find('.elr-calendar-view-nav button[data-view=' + view + ']').addClass('active');
        }

        return self;
    };
})(jQuery);