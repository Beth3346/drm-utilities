###############################################################################
# Displays a modal window
###############################################################################
"use strict"

$ = jQuery
class @DrmModal
    constructor: (@buttons = $('button.drm-modal-open'), @lightbox = $('div.drm-modal-lightbox'), @speed = 300) ->
        self = @
        modals = self.lightbox.find 'div.drm-modal'
        close = modals.find 'button.drm-modal-close'

        self.buttons.on 'click', -> self.showModal.call @, self.speed
        
        close.on 'click', $.proxy self.hideModal, self
        
        self.lightbox.on 'click', $.proxy self.hideModal, self
        
        modals.on 'click', (e) ->
            e.stopPropagation()

    showModal: (speed) ->
        modalId = $(@).data 'modal'
        $("##{modalId}").fadeIn speed

    hideModal: (e) ->
        @lightbox.fadeOut @speed
        e.preventDefault()
        
new DrmModal()