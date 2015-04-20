(function(){
    elrAccordion();
    elrAccordionNav();
    elrAccordionNav({
        containerClass: 'sidebar'
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

(function() {
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
})();