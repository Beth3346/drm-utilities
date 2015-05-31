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

    console.log(elrTime.months);
})(jQuery);