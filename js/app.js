import elrUtils from 'elr-utility-lib';
import elrUI from 'elr-ui';
import elrTimeUtilities from 'elr-time-utilities';

import elrAccordion from 'elr-accordion';
import elrAccordionNav from 'elr-accordion-nav';
import elrAlerts from 'elr-alerts';
import elrBackToTop from 'elr-back-to-top';
import elrDropdownButton from 'elr-dropdown-buttons';
import elrDropdownMenu from 'elr-dropdown-menu';
import elrFilterGrid from 'elr-filter-grid';
import elrLightbox from 'elr-lightbox';
import elrModal from 'elr-modal';
import elrModalAlert from 'elr-modal-alerts';
import elrOffscreenMenu from 'elr-offscreen-menus';
import elrPasswords from 'elr-password';
import elrPopovers from 'elr-popovers';
import elrSimpleSlider from 'elr-simple-slider';
import elrSort from 'elr-sort';
import elrStickyNav from 'elr-sticky-nav';
import elrTableFilter from 'elr-tablefilter';
import elrTableSorter from 'elr-tablesorter';
import elrTabs from 'elr-tabs';

import elrCalendar from './elr-calendar';
import elrValidation from './elr-validation';

const $ = require('jquery');
const jQuery = require('jquery');

let elr = elrUtils();
let elrTime = elrTimeUtilities();
let ui = elrUI();

$('.slide-down').on('click', function() {
    $(this).find('.elr-slide-down').toggleClass('active');
});

$('.js-reveal').on('click', function() {
    let target = $(this).data('target');

    $(this).parent().find(target).toggleClass('active');
});

$('.js-flipper-container').on('click', function() {
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
let modalAlert = elrModalAlert({speed: 300});

let $input = $('.regex-tester').find('input');

elrAccordion();

elrAccordionNav();

elrAccordionNav({
    containerClass: 'main-sidebar-menu'
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
    modalAlert.showAlert({type: 'info'});
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
                onClick() {
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
                onClick() {
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
    addHolidays: true,
    currentDate: elrTime.today(),
    // currentDate: {
    //     'month': 10,
    //     'date': 23,
    //     'year': 2016
    // }
    newEvents: [
        {
            'name': 'First Tuesday of Month',
            'recurrance': 'monthly',
            'day': ['Tuesday'],
            'dayNum': 'first'
        },
        {
            'name': 'First MWF',
            'recurrance': 'monthly',
            'day': ['Monday', 'Wednesday', 'Friday'],
            'dayNum': 'first'
        },
        {
            'name': 'Last Friday',
            'recurrance': 'monthly',
            'day': ['Friday'],
            'dayNum': 'last'
        },
        {
            'name': 'Rabbit Rabbit Day',
            'recurrance': 'monthly',
            'eventDate': 1
        },
        {
            'name': 'Pay Day',
            'recurrance': 'biweekly',
            'day': ['Monday', 'Friday'],
            'week': 'even'
        },
        {
            'name': 'Lawn Day',
            'recurrance': 'biweekly',
            'day': ['Thursday'],
            'week': 'odd'
        },
        {
            'name': 'Day Off',
            'recurrance': 'weekly',
            'day': ['Saturday', 'Sunday']
        },
        {
            'name': 'Work Day',
            'recurrance': 'weekly',
            'day': ['Friday']
        },
        {
            'name': 'Wake Up',
            'recurrance': 'daily'
        },
        {
            'name': 'Special Event',
            'recurrance': 'one-time',
            'month': 11,
            'eventDate': 7,
            'year': 2016
        }
    ]
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
