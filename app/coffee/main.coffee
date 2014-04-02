###############################################################################
# Base Scripts
###############################################################################
"use strict"

( ($) ->
    new DrmSimpleSlider $('div.drm-simple-slider-2')
    new DrmStickyNav $('nav.drm-sticky-sidebar'), null, $('div.sticky-sidebar-content')

    drmAlert = new DrmDismissableAlert()
    drmAlert.showAlert 'info', 'This is just an informative alert', $('.drm-alert-holder')
    drmAlert.showAlert 'danger', 'Danger Danger Danger!', $('.drm-alert-holder')
    drmAlert.showAlert 'warning', 'This is just a gentle warning', $('.drm-alert-holder')
    drmAlert.showAlert 'success', 'your request was successful', $('.drm-alert-holder')
    drmAlert.showAlert 'muted', 'A muted alert that will probably be ignored', $('.drm-alert-holder')
    drmAlert.showAlert 'custom', 'This is a custom alert', $('.drm-alert-holder')
    
    # prettyPrint()
) jQuery