###############################################################################
# Base Scripts
###############################################################################

( ($) -> 
    drmAccordion = new DrmAccordion(300, 'collapsed', $ '.drm-accordion')
    toggle = -> drmAccordion.toggle.call(@, drmAccordion.speed, drmAccordion.contentHolder)
    drmAccordion.container.on 'click', drmAccordion.label, toggle
    drmAccordion.showButton.on 'click', drmAccordion.showAll
    drmAccordion.hideButton.on 'click', drmAccordion.hideAll
    prettyPrint()
) jQuery