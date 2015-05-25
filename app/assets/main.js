(function(){
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

})();

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
})();

(function() {
    elrDropdownButton();
    elrDropdownButton({
        containerClass: 'elr-dropdown-split-btn-holder',
        speed: 300,
        button: 'button:last()'
    });
})();

(function() {
    elrDropdownMenu();
    elrDropdownMenu({menuClass: 'main-nav'});
})();

(function() {
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
})();

(function() {
    elrModal();
})();

(function() {
    elrOffscreenMenu();
})();

(function() {
    elrPasswords();
})();

(function() {
    elrPopovers();
})();

// (function() {
//     console.log(elr.parseTime('11:05 pm'));
//     console.log(elr.cleanAlpha('The Tempest'));
//     console.log(elr.cleanAlpha("A Midsummer Night's Dream"));
//     console.log(elr.sortValues('Beth', 'Foby'));
//     console.log(elr.sortValues('Dog', 'Cat'));
//     console.log(elr.sortValues('Dog', 'Dog'));
//     console.log(elr.getDataTypes(['Dog', 'Cat', 'Bird', 'Sheep', 'Horse']));
//     console.log(elr.getDataTypes([1, 2, 3, 123, 9000]));
//     console.log(elr.getDataTypes(['12:33am', '7:45pm', '09:34am', '10:00pm', '08:23am']));
//     console.log(elr.getDataTypes(['12/25/1988', '2/23/1988', '3/14/1988', '1/01/1999', '05/12/1879']));
//     console.log(elr.getDataTypes(['Dog', 124, '12:33am', '12/25/1988', 'Horse']));
// })();

// (function() {
//     var $list = elr.createElement('ul', {
//         html: '<li>12</li><li>Dog</li><li>14</li><li>122</li><li>Cat</li>'
//     });

//     $list = $list.find('li');

//     var text = elr.getText($list);
//     var types = elr.getDataTypes(text);

//     $list = elr.sortComplexList(types, $list);

//     $.each($list, function() {
//         console.log($(this).text());
//     });
// })();

(function() {
    elrSimpleSlider({effect: 'fade'});
    elrSimpleSlider({sliderClass: 'elr-simple-slider-2', effect: 'slide-left'});
})();

(function() {
    elrSort();
})();

(function($) {
    var $input = $('.regex-tester').find('input');

    if ( $input.length ) {
        $('#pattern-utilities').on('keyup', '.regex-tester input', function() {
            var that = $(this);
            var patternName = that.data('pattern');
            var str = $.trim(that.val());
            var result = elr.patterns[patternName].exec(str);
            var results = that.parent().find('.regex-test-results');

            if ( result !== null ) {
                results.html('This string matches');
            } else if ( str.length === 0 ) {
                results.html('');
            } else {
                results.html('This string doesn\'t contain any matches');
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
})(jQuery);

(function() {
    elrTableFilter();
    elrTableSorter();
})();

(function() {
    elrTabs();
})();

(function() {
    var firstDayOfYear = {
        month: 1,
        date: 1,
        year: 2015
    };
    var lastDayOfYear = {
        month: 12,
        date: 31,
        year: 2015
    };
    var date1 = {
        month: 2,
        date: 1,
        year: 2015
    };
    var date2 = {
        month: 10,
        date: 31,
        year: 2015
    };
    // console.log('1900: ' + elrTime.isLeapYear(1900));
    // console.log('1996: ' + elrTime.isLeapYear(1996));
    // console.log('2000: ' + elrTime.isLeapYear(2000));
    // console.log('cat: ' + elrTime.isLeapYear('cat'));
    // console.log('2015: ' + elrTime.isLeapYear(2015));
    // console.log('2000: ' + elrTime.getDaysInYear(2000));
    // console.log('2015: ' + elrTime.getDaysInYear(2015));
    // console.log('February 2000: ' + elrTime.getDaysInMonth(2, 2000));
    // console.log('February 2015: ' + elrTime.getDaysInMonth(2, 2015));
    // console.log('May 2015: ' + elrTime.getDaysInMonth(5, 2015));
    // console.log('May 24, 2015: ' + elrTime.getDayOfWeek(5, 24, 2015));
    // console.log('June 28, 2015: ' + elrTime.getDayOfWeek(6, 28, 2015));
    // console.log(elrTime.getFirstDayOfMonth(6, 2015));
    // console.log(elrTime.getFirstDayOfMonth(7, 2015));
    // console.log(elrTime.getWeeksInMonth(5, 2015));
    // console.log(elrTime.getLastMonth(elrTime.today));
    // console.log(elrTime.getNextMonth(elrTime.today));
    // console.log(elrTime.getLastDate(elrTime.today));
    // console.log(elrTime.getNextDate(elrTime.today));
    // console.log(elrTime.getYesterday(elrTime.today));
    // console.log(elrTime.getToday(elrTime.today));
    // console.log(elrTime.getTomorrow(elrTime.today));
    // console.log('Yesterday FirstDayOfYear: ');
    // console.log(elrTime.getYesterday(firstDayOfYear));
    // console.log('Today FirstDayOfYear: ');
    // console.log(elrTime.getToday(firstDayOfYear));
    // console.log('Tomorrow FirstDayOfYear: ');
    // console.log(elrTime.getTomorrow(firstDayOfYear));
    // console.log('Yesterday LastDayOfYear: ');
    // console.log(elrTime.getYesterday(lastDayOfYear));
    // console.log('Today LastDayOfYear: ');
    // console.log(elrTime.getToday(lastDayOfYear));
    // console.log('Tomorrow LastDayOfYear: ');
    // console.log(elrTime.getTomorrow(lastDayOfYear));
    // console.log('Yesterday: ');
    // console.log(elrTime.getYesterday(date1));
    // console.log('Today: ');
    // console.log(elrTime.getToday(date1));
    // console.log('Tomorrow: ');
    // console.log(elrTime.getTomorrow(date1));
    // console.log('Yesterday: ');
    // console.log(elrTime.getYesterday(date2));
    // console.log('Today: ');
    // console.log(elrTime.getToday(date2));
    // console.log('Tomorrow: ');
    // console.log(elrTime.getTomorrow(date2));
    // console.log(elrTime.getMonthName('02/24/1945'));
    // console.log(elrTime.getMonthName('05/25/2015'));
    // console.log(elrTime.getMonthName('February 24, 1945', 'MMM'));
    // console.log(elrTime.getMonthName('May 25, 2015', 'MMM'));
    // console.log(elrTime.getDateNum('02/24/1945'));
    // console.log(elrTime.getDateNum('05-25-2015'));
    // console.log(elrTime.getDateNum('05/1/2015'));
    // console.log(elrTime.getDateNum('05/04/2015'));
    // console.log(elrTime.getDateNum('05.04.2015'));
    // console.log(elrTime.getDateNum('February 24, 1945'));
    // console.log(elrTime.getDateNum('May 25, 2015'));
    // console.log(elrTime.getDateNum('Mar 25, 2015'));
})();