###############################################################################
# Base Scripts
###############################################################################
"use strict"

$ = jQuery
$ ->
    new DrmSimpleSlider $('div.drm-simple-slider-2')
    new DrmStickyNav $('nav.drm-sticky-sidebar'), null, $('div.sticky-sidebar-content')
    new DrmStickyNav $('aside.sidebar'), null, $('main'), no

    drmAlert = new DrmDismissibleAlert()
    drmAlert.showAlert 'info', 'This is just an informative alert', $('.drm-alert-holder')
    drmAlert.showAlert 'danger', 'Danger Danger Danger!', $('.drm-alert-holder')
    drmAlert.showAlert 'warning', 'This is just a gentle warning', $('.drm-alert-holder')
    drmAlert.showAlert 'success', 'your request was successful', $('.drm-alert-holder')
    drmAlert.showAlert 'muted', 'A muted alert that will probably be ignored', $('.drm-alert-holder')
    drmAlert.showAlert 'custom', 'This is a custom alert', $('.drm-alert-holder')

    drmCalendar = new DrmCalendar()

    drmCalendar.createEvent
        name: "Rabbit Rabbit Day"
        eventDate: 1
        type: "fun day"
        recurrance: "monthly"
        notes: "Say Rabbit Rabbit for good luck this month"
    drmCalendar.createEvent
        name: "First Monday"
        day: ["Monday"]
        dayNum : 1
        recurrance: "monthly"
        notes: "This is the first Monday of the month"
    drmCalendar.createEvent
        name: "Lawn Day"
        month: "April"
        eventDate: 24
        day: ["Thursday"]
        recurrance: "biweekly"
        notes: "Every other Thursday"
    drmCalendar.createEvent
        name: "Wake Up"
        day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        time: "6:00am"
        recurrance: "weekly"
        note: "Wake Up Every Day"
    drmCalendar.createEvent
        name: "Sleep In!"
        day: ["Saturday", "Sunday"]
        time: "9:00am"
        recurrance: "weekly"
    drmCalendar.createEvent
        name: "Eat Lunch"
        time: "12:00pm"
        notes: "eat a healthy lunch"
        recurrance: "daily"
    drmCalendar.createEvent
        name: "One Time Event"
        month: "May"
        year: 2014
        time: '1:00pm'
        eventDate: 4
        recurrance: "none"
        note: "do this once"
    drmCalendar.createEvent
        name: "Later That Day"
        month: "May"
        year: 2014
        time: '1:30pm'
        eventDate: 4
        recurrance: "none"
        note: "do this once"
    drmCalendar.createEvent
        name: "Another One Time Event"
        month: "May"
        year: 2014
        time: '2:30pm'
        eventDate: 4
        recurrance: "none"
        note: "do this once"

    new DrmSort $('.drm-events'), yes
    
    # prettyPrint()

    $('button.mobile-menu-toggle').on 'click', (e) ->
        e.preventDefault()
        e.stopPropagation()
        $('ul.mobile-nav').slideToggle()

    return