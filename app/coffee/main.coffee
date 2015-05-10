###############################################################################
# Base Scripts
###############################################################################
"use strict"

$ = jQuery
$ ->
    new ElrStickyNav $('nav.elr-sticky-sidebar'), null, $('div.sticky-sidebar-content')

    elrCalendar = new ElrCalendar()

    elrCalendar.createEvent
        name: "Rabbit Rabbit Day"
        eventDate: 1
        type: "fun day"
        recurrance: "monthly"
        notes: "Say Rabbit Rabbit for good luck this month"
    elrCalendar.createEvent
        name: "First Monday"
        day: ["Monday"]
        dayNum : 1
        recurrance: "monthly"
        notes: "This is the first Monday of the month"
    elrCalendar.createEvent
        name: "Lawn Day"
        month: "April"
        eventDate: 24
        day: ["Thursday"]
        recurrance: "biweekly"
        notes: "Every other Thursday"
    elrCalendar.createEvent
        name: "Wake Up"
        day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        time: "6:00am"
        recurrance: "weekly"
        note: "Wake Up Every Day"
    elrCalendar.createEvent
        name: "Sleep In!"
        day: ["Saturday", "Sunday"]
        time: "9:00am"
        recurrance: "weekly"
    elrCalendar.createEvent
        name: "Eat Lunch"
        time: "12:00pm"
        notes: "eat a healthy lunch"
        recurrance: "daily"
    elrCalendar.createEvent
        name: "One Time Event"
        month: "May"
        year: 2014
        time: '1:00pm'
        eventDate: 4
        recurrance: "none"
        note: "do this once"
    elrCalendar.createEvent
        name: "Later That Day"
        month: "May"
        year: 2014
        time: '1:30pm'
        eventDate: 4
        recurrance: "none"
        note: "do this once"
    elrCalendar.createEvent
        name: "Another One Time Event"
        month: "May"
        year: 2014
        time: '2:30pm'
        eventDate: 4
        recurrance: "none"
        note: "do this once"

    # new ElrSort $('.elr-events'), yes
    
    # prettyPrint()

    return