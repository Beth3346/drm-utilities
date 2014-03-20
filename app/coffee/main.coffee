###############################################################################
# Base Scripts
###############################################################################
"use strict"

( ($) ->
    new DrmAccordion 300, 'collapsed', $('.drm-accordion'), true
    drmAlert = new DrmAlert()
    new DrmDropdownMenu $('ul.drm-dropdown-nav'), 1000
    new DrmDropdownButton $('div.drm-dropdown-solid-btn-holder'), 300, 'button'
    new DrmDropdownButton $('div.drm-dropdown-split-btn-holder'), 300, 'button:last()'
    lightbox = new DrmLightbox $('ul.drm-lightbox-thumbnails'), 300

    # console.log lightbox

    drmAlert.showAlert 'info', 'This is just an informative alert', $('.drm-alert-holder')
    drmAlert.showAlert 'danger', 'Danger Danger Danger!', $('.drm-alert-holder')
    drmAlert.showAlert 'warning', 'This is just a gentle warning', $('.drm-alert-holder')
    drmAlert.showAlert 'success', 'your request was successful', $('.drm-alert-holder')
    drmAlert.showAlert 'muted', 'A muted alert that will probably be ignored', $('.drm-alert-holder')
    drmAlert.showAlert 'custom', 'This is a custom alert', $('.drm-alert-holder')
    
    prettyPrint()
) jQuery