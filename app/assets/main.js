(function(){
    drmAccordion();

    drmAccordionNav();

    drmAccordionNav({
        speed: 300,
        containerClass: 'sidebar'
    });
})();

(function($){
    var drmAlert = drmAlerts();
    
    drmAlert.showAlert('info', 'This is just an informative alert', $('.drm-alert-holder'));
    drmAlert.showAlert('danger', 'Danger Danger Danger!', $('.drm-alert-holder'));
    drmAlert.showAlert('warning', 'This is just a gentle warning', $('.drm-alert-holder'));
    drmAlert.showAlert('success', 'your request was successful', $('.drm-alert-holder'));
    drmAlert.showAlert('muted', 'A muted alert that will probably be ignored', $('.drm-alert-holder'));
    drmAlert.showAlert('custom', 'This is a custom alert', $('.drm-alert-holder'));
})(jQuery);

(function() {
    drmBackToTop();
})();

(function() {
    drmDropdownButton();
    drmDropdownButton({
        containerClass: 'drm-dropdown-split-btn-holder',
        speed: 300,
        button: 'button:last()'
    });
})();

(function() {
    drmDropdownMenu();
})();

(function() {
    drmFlexibleGrid();
})();

(function() {
    var formControls = drmFormControls({
        selectOptions: {
            fn: function(option) {
                console.log(option);
            }
        }
    });
    
    formControls.select();
})();

(function() {
    drmLightbox();
})();

(function() {
    drmModal();
})();

(function() {
    drmOffscreenMenu();
})();

(function() {
    drmPasswords();
})();

(function() {
    drmPopovers();
})();

(function() {
    drmSimpleSlider({effect: 'fade'});
    drmSimpleSlider({sliderClass: 'drm-simple-slider-2', effect: 'slide-left'});
})();