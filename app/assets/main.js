(function($){
    elrAccordion();
    elrAccordionNav();
    elrAccordionNav({
        containerClass: 'sidebar'
    });

    $('button.mobile-menu-toggle').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('ul.mobile-nav').slideToggle();
    });

})(jQuery);

(function($){
    var elrAlert = elrAlerts();
    
    elrAlert.showAlert('info', 'This is just an informative alert', $('.elr-alert-holder'));
    elrAlert.showAlert('danger', 'Danger Danger Danger!', $('.elr-alert-holder'));
    elrAlert.showAlert('warning', 'This is just a gentle warning', $('.elr-alert-holder'));
    elrAlert.showAlert('success', 'your request was successful', $('.elr-alert-holder'));
    elrAlert.showAlert('muted', 'A muted alert that will probably be ignored', $('.elr-alert-holder'));
    elrAlert.showAlert('custom', 'This is a custom alert', $('.elr-alert-holder'));
})(jQuery);

(function() {
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
})();

(function() {
    var formControls = elrFormControls({
        selectOptions: {
            fn: function(option) {
                console.log(option);
            }
        }
    });
    
    formControls.select();
})();

(function() {
    elrLightbox();

    elrModal();

    elrOffscreenMenu();

    elrPasswords();

    elrPopovers();

    elrSimpleSlider({effect: 'fade'});
    elrSimpleSlider({sliderClass: 'elr-simple-slider-2', effect: 'slide-left'});

    elrSort();
})();

(function($) {
    var $input = $('.regex-tester').find('input');

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
})(jQuery);

(function($) {
    elrStickyNav();
    elrStickyNav({
        nav: $('nav.elr-sticky-sidebar'),
        content: $('div.sticky-sidebar-content')
    });
    elrTableFilter();
    elrTableSorter();
    elrTabs();
})(jQuery);

(function($) {
    $('.now').text(elrTime.now);
    console.log(elrTime.today);
    console.log(elrTime.daysPerWeek);
    console.log(elrTime.unitTokens);

    $.each(elrTime.months, function(k,v) {
        $('<li>', {
            text: v
        }).appendTo($('ul.months'));
    });

    $.each(elrTime.shortMonths, function(k,v) {
        $('<li>', {
            text: v
        }).appendTo($('ul.shortMonths'));
    });

    $.each(elrTime.days, function(k,v) {
        $('<li>', {
            text: v
        }).appendTo($('ul.days'));
    });

    $.each(elrTime.shortDays, function(k,v) {
        $('<li>', {
            text: v
        }).appendTo($('ul.shortDays'));
    });

    $.each(elrTime.minDays, function(k,v) {
        $('<li>', {
            text: v
        }).appendTo($('ul.minDays'));
    });

    $('ul.leapYear li').each(function(k, v) {
        var $that = $(v);
        var year = $that.find('.year').text();
        var result = elrTime.isLeapYear(year);
        $that.append('<span>: ' + result + '</span>');
    });

    $('ul.daysInYear li').each(function(k, v) {
        var $that = $(v);
        var year = $that.find('.year').text();
        var result = elrTime.getDaysInYear(year);
        $that.append('<span>: ' + result + '</span>');
    });

    $('ul.daysInMonth li').each(function(k, v) {
        var $that = $(v);
        var month = $.inArray($that.find('.month').text(), elrTime.months);
        var year = $that.find('.year').text();
        var result = elrTime.getDaysInMonth(month, year);
        $that.append('<span>: ' + result + '</span>');
    });
})(jQuery);