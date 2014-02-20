###############################################################################
# Displays a modal window
###############################################################################

( ($) ->

    drmModal = {
        modalButtons: $ '.drm-modal-open'
        lightbox: $ '.drm-modal-lightbox'

        config: {
            speed: 300
        }

        init: ->
            $.extend @.config, config
            modals = lightbox.find '.drm-modal'
            close = modals.find '.drm-modal-close'

            @.modalButtons.on 'click', @.showModal
            
            close.on 'click', @.hideModal
            
            @.lightbox.on 'click', @.hideModal
            
            modals.on 'click', (e) ->
                e.stopPropagation()

        showModal: ->
            modalId = $(@).data 'modal'
            $("##{modalId}").fadeIn drmModal.config.speed

        hideModal: (e) ->
            lightbox.fadeOut drmModal.config.speed 
            e.preventDefault()
    }

    drmModal.init()

) jQuery