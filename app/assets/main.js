(function($){
    'use strict';
    
    var elrAlert = elrAlerts();
    var formControls = elrFormControls({
        selectOptions: {
            fn: function(option) {
                console.log(option);
            }
        }
    });
    
    var $input = $('.regex-tester').find('input');

    elrAccordion();
    elrAccordionNav();
    elrAccordionNav({
        containerClass: 'sidebar'
    });
    
    elrAlert.showAlert('info', 'This is just an informative alert', $('.elr-alert-holder'));
    elrAlert.showAlert('danger', 'Danger Danger Danger!', $('.elr-alert-holder'));
    elrAlert.showAlert('warning', 'This is just a gentle warning', $('.elr-alert-holder'));
    elrAlert.showAlert('success', 'your request was successful', $('.elr-alert-holder'));
    elrAlert.showAlert('muted', 'A muted alert that will probably be ignored', $('.elr-alert-holder'));
    elrAlert.showAlert('custom', 'This is a custom alert', $('.elr-alert-holder'));

    elrBackToTop();

    elrDropdownButton();
    elrDropdownButton({
        containerClass: 'elr-dropdown-split-btn-holder',
        speed: 300,
        button: 'button:last()'
    });

    elrDropdownMenu();
    elrDropdownMenu({menuClass: 'main-nav'});

    elrFlexibleGrid();
    
    formControls.select();

    elrLightbox();

    elrModal();

    elrOffscreenMenu();

    elrPasswords();

    elrPopovers();

    elrSimpleSlider({effect: 'fade'});
    elrSimpleSlider({sliderClass: 'elr-simple-slider-2', effect: 'slide-left'});

    elrSort();

    if ( $input.length ) {
        $('#pattern-utilities').on('keyup', '.regex-tester input', function() {
            var that = $(this);
            var patternName = that.data('pattern');
            var str = that.val();
            var result = elr.patterns[patternName].exec(str);
            var results = that.parent().find('.regex-test-results');

            if ( result !== null ) {
                results.html('This string matches ' + patternName);
            } else if ( str.length === 0 ) {
                results.html('');
            } else {
                results.html('This string doesn\'t match ' + patternName);
            }
        });
    }

    elrStickyNav();
    elrStickyNav({
        nav: $('nav.elr-sticky-sidebar'),
        content: $('div.sticky-sidebar-content')
    });
    elrTableFilter();
    elrTableSorter();
    elrTabs();
    elrValidation();

    $('.now').text(elrTime.now);
    // console.log(elrTime.today);
    // console.log(elrTime.daysPerWeek);
    // console.log(elrTime.unitTokens);

    elr.each(elrTime.months, function(k,v) {
        $('<li>', {
            text: v
        }).appendTo($('ul.months'));
    });

    elr.each(elrTime.shortMonths, function(k,v) {
        $('<li>', {
            text: v
        }).appendTo($('ul.short-months'));
    });

    elr.each(elrTime.days, function(k,v) {
        $('<li>', {
            text: v
        }).appendTo($('ul.days'));
    });

    elr.each(elrTime.shortDays, function(k,v) {
        $('<li>', {
            text: v
        }).appendTo($('ul.short-days'));
    });

    elr.each(elrTime.minDays, function(k,v) {
        $('<li>', {
            text: v
        }).appendTo($('ul.min-days'));
    });

    $('ul.leap-year li').each(function(k,v) {
        var $that = $(v);
        var year = $that.find('.year').text();
        var result = elrTime.isLeapYear(year);
        $that.append('<span>: ' + result + '</span>');
    });

    $('ul.days-in-year li').each(function(k,v) {
        var $that = $(v);
        var year = $that.find('.year').text();
        var result = elrTime.getDaysInYear(year);
        $that.append('<span>: ' + result + '</span>');
    });

    $('ul.days-in-month li').each(function(k,v) {
        var $that = $(v);
        var month = elr.inArray(elrTime.months, $that.find('.month').text());
        var year = $that.find('.year').text();
        var result = elrTime.getDaysInMonth(month, year);
        $that.append('<span>: ' + result + '</span>');
    });

    var dayOfWeek = elrTime.getDayOfWeek(elrTime.today.month, elrTime.today.date, elrTime.today.year);
    $('p.day-of-week').text('Today is ' + elrTime.days[dayOfWeek] + ' (' + dayOfWeek + ')');

    $('ul.first-day-of-month li').each(function(k,v) {
        var $that = $(v);
        var month = elr.inArray(elrTime.months, $that.find('.month').text());
        var year = $that.find('.year').text();
        var result = elrTime.getFirstDayOfMonth(month, year);
        $that.append('<span>: ' + elrTime.days[result] + ' (' + result + ')' + '</span>');
    });

    $('ul.weeks-in-month li').each(function(k,v) {
        var $that = $(v);
        var month = elr.inArray(elrTime.months, $that.find('.month').text());
        var year = $that.find('.year').text();
        var result = elrTime.getWeeksInMonth(month, year);
        $that.append('<span>: ' + result + '</span>');
    });

    $('ul.prev-month li').each(function(k,v) {
        var $that = $(v);
        var dateObj = {};
        var result;

        dateObj.month = elr.inArray(elrTime.months, $that.find('.month').text());
        dateObj.date = parseInt($that.find('.date').text(), 10);
        dateObj.year = $that.find('.year').text();

        result = elrTime.getPrevMonth(dateObj);
        $that.append('<span>: ' + result + ' // ' + elrTime.months[result] + '</span>');
    });

    $('ul.next-month li').each(function(k,v) {
        var $that = $(v);
        var dateObj = {};
        var result;

        dateObj.month = elr.inArray(elrTime.months, $that.find('.month').text());
        dateObj.date = parseInt($that.find('.date').text(), 10);
        dateObj.year = $that.find('.year').text();

        result = elrTime.getNextMonth(dateObj);
        $that.append('<span>: ' + result + ' // ' + elrTime.months[result] + '</span>');
    });

    $('ul.prev-date li').each(function(k,v) {
        var $that = $(v);
        var dateObj = {};
        var result;

        dateObj.month = elr.inArray(elrTime.months, $that.find('.month').text());
        dateObj.date = parseInt($that.find('.date').text(), 10);
        dateObj.year = $that.find('.year').text();

        result = elrTime.getPrevDate(dateObj);
        $that.append('<span>: ' + result + '</span>');
    });

    $('ul.next-date li').each(function(k,v) {
        var $that = $(v);
        var dateObj = {};
        var result;

        dateObj.month = elr.inArray(elrTime.months, $that.find('.month').text());
        dateObj.date = parseInt($that.find('.date').text(), 10);
        dateObj.year = $that.find('.year').text();

        result = elrTime.getNextDate(dateObj);
        $that.append('<span>: ' + result + '</span>');
    });

    $('button.mobile-menu-toggle').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('ul.mobile-nav').slideToggle();
    });

})(jQuery);