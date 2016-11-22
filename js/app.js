import elrUtils from './elr-utilities';
import elrTimeUtilities from './elr-time-utilities';

import elrAccordion from './elr-accordion';
import elrAccordionNav from './elr-accordion-nav';
import elrAlerts from './elr-alerts';
import elrBackToTop from './elr-back-to-top';
import elrCalendar from './elr-calendar';
import elrDropdownButton from './elr-dropdown-buttons';
import elrDropdownMenu from './elr-dropdown-menu';
import elrFilterGrid from './elr-filter-grid';
import elrLightbox from './elr-lightbox';
import elrModal from './elr-modal';
import elrModalAlert from './elr-modal-alerts';
import elrOffscreenMenu from './elr-offscreen-menus';
import elrPasswords from './elr-passwords';
import elrPopovers from './elr-popovers';
import elrSimpleSlider from './elr-simple-slider';
import elrSort from './elr-sort';
import elrStickyNav from './elr-sticky-nav';
import elrTableFilter from './elr-tablefilter';
import elrTableSorter from './elr-tablesorter';
import elrTabs from './elr-tabs';
import elrValidation from './elr-validation';

const $ = require('jquery');
const jQuery = require('jquery');

let elr = elrUtils();
let elrTime = elrTimeUtilities();

$('.slide-down').on('click', function() {
    $(this).find('.elr-slide-down').toggleClass('active');
});

$('.js-reveal').on('click', function() {
    let target = $(this).data('target');

    $(this).parent().find(target).toggleClass('active');
});

$('.flipper-container').on('click', function() {
    $(this).toggleClass('active');
});

$('.label-close').on('click', function() {
    elr.clearElement($(this).parent('.label'));
});

$('button.mobile-menu-toggle').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.mobile-nav-holder').toggleClass('active');
});

$('.menu-animated .menu-item').on('click', function(e) {
    e.preventDefault();
    let $that = $(this);

    $that.parent('ul').find('.current').removeClass('current');
    $that.addClass('current');
});

$('.icon-animate').on('click', function() {
    $(this).toggleClass('active');
});

$('.icon-card').hover(function() {
    $(this).find('.icon-animated').toggleClass('active');
});

$('.mobile-toggle-button, .mobile-toggle-button-border').on('click', function() {
    $(this).find('.hamburger').toggleClass('active');
});

$('.smooth-scroll').on('click', 'a', elr.gotoSection);

let elrAlert = elrAlerts();
let modalAlert = elrModalAlert();

let $input = $('.regex-tester').find('input');

elrAccordion();

elrAccordionNav();

elrAccordionNav({
    containerClass: 'main-sidebar'
});

elrAlert.showAlert(
    'info', 'This is just an informative alert', $('.elr-alert-holder')
);

elrAlert.showAlert(
    'danger', 'Danger Danger Danger!', $('.elr-alert-holder')
);

elrAlert.showAlert(
    'warning', 'This is just a gentle warning', $('.elr-alert-holder')
);

elrAlert.showAlert(
    'success', 'your request was successful', $('.elr-alert-holder')
);

elrAlert.showAlert(
    'muted', 'A muted alert that will probably be ignored', $('.elr-alert-holder')
);

elrAlert.showAlert(
    'custom', 'This is a custom alert', $('.elr-alert-holder')
);

elrAlert.showAlert(
    'purple', 'This is another custom alert', $('.elr-alert-holder')
);

$('.js-show-info-alert').on('click', function() {
    modalAlert.showAlert();
});

$('.js-show-confirmation-alert').on('click', function() {
    modalAlert.showAlert({
        type: 'confirmation',
        title: 'Please confirm',
        text: 'Are you sure you want to proceed with this action?',
        buttons: {
            confirmButton: {
                type: 'success',
                text: 'Confirm',
                class: 'elr-button elr-button-success',
                onClick: function() {
                    modalAlert.clearAlert.call(this, null, function() {
                        modalAlert.showAlert({
                            title: 'Success'
                        });
                    });
                }
            },
            cancelButton: {
                type: 'cancel',
                text: 'Cancel',
                class: 'elr-button elr-button-danger',
                onClick: function() {
                    console.log('cancel');
                    modalAlert.clearAlert.call(this);
                }
            }
        }
    });
});

elrBackToTop();

elrCalendar({
    view: 'month',
    currentDate: elrTime.today
    // currentDate: {
    //     'month': 11,
    //     'date': 31,
    //     'year': 2015
    // }
});

elrDropdownButton();

elrDropdownMenu();

elrFilterGrid();

elrLightbox();

elrModal();

elrOffscreenMenu();

elrPasswords();

elrPopovers();

elrSimpleSlider({effect: 'fade'});
elrSimpleSlider({sliderClass: 'elr-simple-slider-2', effect: 'slide-left'});

elrSort();

// if ( $input.length ) {
//     $('#pattern-utilities').on('keyup', '.regex-tester input', function() {
//         let that = $(this);
//         let patternName = that.data('pattern');
//         let str = that.val();
//         let result = elr.patterns[patternName].exec(str);
//         let results = that.parent().find('.regex-test-results');

//         if ( result !== null ) {
//             results.html('This string matches ' + patternName);
//         } else if ( str.length === 0 ) {
//             results.html('');
//         } else {
//             results.html('This string doesn\'t match ' + patternName);
//         }
//     });
// }

elrStickyNav({spy: true});

elrTableFilter();
elrTableSorter();
elrTabs();
elrValidation();

// $('.now').text(elrTime.now);
// // console.log(elrTime.daysPerWeek);
// // console.log(elrTime.unitTokens);

// elr.each(elrTime.months, function(k,v) {
//     $('<li>', {
//         text: v
//     }).appendTo($('ul.months'));
// });

// elr.each(elrTime.shortMonths, function(k,v) {
//     $('<li>', {
//         text: v
//     }).appendTo($('ul.short-months'));
// });

// elr.each(elrTime.days, function(k,v) {
//     $('<li>', {
//         text: v
//     }).appendTo($('ul.days'));
// });

// elr.each(elrTime.shortDays, function(k,v) {
//     $('<li>', {
//         text: v
//     }).appendTo($('ul.short-days'));
// });

// elr.each(elrTime.minDays, function(k,v) {
//     $('<li>', {
//         text: v
//     }).appendTo($('ul.min-days'));
// });

// $('ul.leap-year li').each(function(k,v) {
//     let $that = $(v);
//     let year = $that.find('.year').text();
//     let result = elrTime.isLeapYear(year);
//     $that.append('<span>: ' + result + '</span>');
// });

// $('ul.days-in-year li').each(function(k,v) {
//     let $that = $(v);
//     let year = $that.find('.year').text();
//     let result = elrTime.getDaysInYear(year);
//     $that.append('<span>: ' + result + '</span>');
// });

// $('ul.days-in-month li').each(function(k,v) {
//     let $that = $(v);
//     let dateObj = {
//         'month': elr.inArray(elrTime.months, $that.find('.month').text()),
//         'date': 0,
//         'year': $that.find('.year').text()
//     };

//     let result = elrTime.getDaysInMonth(dateObj);

//     $that.append('<span>: ' + result + '</span>');
// });

// let dayOfWeek = elrTime.getDayOfWeek(elrTime.today);
// $('p.day-of-week').text('Today is ' + elrTime.days[dayOfWeek] + ' (' + dayOfWeek + ')');

// $('ul.first-day-of-month li').each(function(k,v) {
//     let $that = $(v);
//     let dateObj = {
//         'month': elr.inArray(elrTime.months, $that.find('.month').text()),
//         'date': 1,
//         'year': $that.find('.year').text()
//     };

//     let result = elrTime.getFirstDayOfMonth(dateObj);

//     $that.append('<span>: ' + elrTime.days[result] + ' (' + result + ')' + '</span>');
// });

// $('ul.weeks-in-month li').each(function(k,v) {
//     let $that = $(v);
//     let month = elr.inArray(elrTime.months, $that.find('.month').text());
//     let year = $that.find('.year').text();
//     let result = elrTime.getWeeksInMonth(month, year);
//     $that.append('<span>: ' + result + '</span>');
// });

// $('ul.prev-month li').each(function(k,v) {
//     let $that = $(v);
//     let dateObj = {};
//     let result;

//     dateObj.month = elr.inArray(elrTime.months, $that.find('.month').text());
//     dateObj.date = parseInt($that.find('.date').text(), 10);
//     dateObj.year = $that.find('.year').text();

//     result = elrTime.getPrevMonth(dateObj);
//     $that.append('<span>: ' + result + ' // ' + elrTime.months[result] + '</span>');
// });

// $('ul.next-month li').each(function(k,v) {
//     let $that = $(v);
//     let dateObj = {};
//     let result;

//     dateObj.month = elr.inArray(elrTime.months, $that.find('.month').text());
//     dateObj.date = parseInt($that.find('.date').text(), 10);
//     dateObj.year = $that.find('.year').text();

//     result = elrTime.getNextMonth(dateObj);
//     $that.append('<span>: ' + result + ' // ' + elrTime.months[result] + '</span>');
// });

// $('ul.prev-date li').each(function(k,v) {
//     let $that = $(v);
//     let dateObj = {};
//     let result;

//     dateObj.month = elr.inArray(elrTime.months, $that.find('.month').text());
//     dateObj.date = parseInt($that.find('.date').text(), 10);
//     dateObj.year = $that.find('.year').text();

//     result = elrTime.getPrevDate(dateObj);
//     $that.append('<span>: ' + result + '</span>');
// });

// $('ul.next-date li').each(function(k,v) {
//     let $that = $(v);
//     let dateObj = {};
//     let result;

//     dateObj.month = elr.inArray(elrTime.months, $that.find('.month').text());
//     dateObj.date = parseInt($that.find('.date').text(), 10);
//     dateObj.year = $that.find('.year').text();

//     result = elrTime.getNextDate(dateObj);
//     $that.append('<span>: ' + result + '</span>');
// });

// $('.test-box-in-array').each(function() {
//     let $that = $(this);
//     let arr = elr.strToArray($that.find('p.in-array').text());
//     let testValue = $that.find('.test-value').text();
//     let output = elr.inArray(arr, testValue) !== -1 ? 'true' : 'false';

//     $that.find('.output-holder').text(output);
// });

// let cityList = document.querySelectorAll('.city-list li');

// let cities = elr.toArray(cityList);
// $('.output-holder-city-list').text(cities);
// console.log(cities);

// let testFunction = function(let1, let2) {
//     return elr.isArrayLike(arguments);
// };

// let numbers = [1,4,5,3,3,3,5];

// console.log(testFunction(1, 2));
// console.log(numbers);
// console.log(elr.unique(numbers));

// console.log(elr.createArrays({animals: 'names'}, ['Dogs', 'Cats', 'Birds']));

// console.log(`Say ${elr.trim('Hello   ')} everybody`);

// console.log(elr.getText(document.getElementsByClassName('page-title')));
// console.log(elr.getText(document.getElementsByClassName('main-nav-item')));
// console.log(elr.getText(document.getElementsByClassName('main-nav-item'), ', '));

// const navItems = document.getElementsByClassName('main-nav-item');
// const pageTitle = document.getElementsByClassName('page-title');
// const html = document.getElementsByTagName('html');

// const wrapper = elr.closest(pageTitle, 'div.hero-unit');
// const mainNav = elr.closest(navItems, 'ul');
// const mainHeader = elr.closest(navItems, '#main-header');
// const navParent = elr.parent(navItems, 'li');
// const titleWrapper = elr.parent(pageTitle, '.hero-unit-content');
// const titleWrappers = elr.parents(pageTitle);
// const thirdNavItem = elr.eq(navItems, 2);
// const notListItem = elr.not(navItems, '.active');
// const evenListItem = elr.even(navItems);
// const oddListItem = elr.odd(navItems);

// console.log(wrapper);
// console.log(mainNav);
// console.log(mainHeader);
// console.log(navParent);
// console.log($('.main-nav-item').eq(0));

// console.log(titleWrapper);
// console.log(titleWrappers);
// console.log(thirdNavItem);
// console.log(elr.index(thirdNavItem));
// console.log(notListItem);
// console.log(evenListItem);
// console.log(oddListItem);
// console.log(elr.data(elr.eq(navItems, 3), 'link'));
// console.log(elr.first(navItems));
// console.log(elr.last(navItems));

$(window).on('scroll', function() {
    let $sidebar = $('.main-sidebar-holder');
    let sidebarPos = $sidebar.offset().top;
    let sidebarLeft = $sidebar.offset().left;
    let scrollPos = $(document).scrollTop();
    let $header = $('.main-header');

    if (scrollPos > 0) {
        $header.addClass(`fixed-header`);
    } else {
        $header.removeClass(`fixed-header`);
    }

    if (scrollPos > (sidebarPos - 80)) {
        $sidebar.find('.main-sidebar')
            .addClass(`sticky-left`)
            .css({'left': sidebarLeft});
    } else {
        $sidebar.find('.main-sidebar')
            .removeClass(`sticky-left`)
            .css({'left': 0});
    }
});
