###############################################################################
# Base Scripts
###############################################################################

( ($) -> 
    drmAccordion = new DrmAccordion 300, 'collapsed', $('.drm-accordion')
    toggleContent = -> 
        that = drmAccordion
        that.toggle.call @, that.speed, that.contentHolder
    drmAccordion.container.on 'click', drmAccordion.label, toggleContent
    drmAccordion.showButton.on 'click', drmAccordion.showAll
    drmAccordion.hideButton.on 'click', drmAccordion.hideAll

    drmAlert = new DrmAlert 'drm-dismissable-alert', 300

    $('.drm-alert-holder').on 'click', ".#{drmAlert.alertClass} button.close", drmAlert.clearAlert
    drmAlert.showAlert 'info', 'this is a dynamic alert', $('.drm-alert-holder')
    drmAlert.showAlert 'success', 'your request was successful', $('.drm-alert-holder')
    
    prettyPrint()
) jQuery