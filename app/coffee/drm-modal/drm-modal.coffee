###############################################################################
# Displays a modal window
###############################################################################

( ($) ->

    drmModal = {
        modalButtons: $ 'button.drm-modal-open'
        lightbox: $ 'div.drm-modal-lightbox'

        config: {
            speed: 300
        }

        init: (config) ->
            $.extend @.config, config
            modals = @.lightbox.find 'div.drm-modal'
            close = modals.find 'button.drm-modal-close'

            @.modalButtons.on 'click', @.showModal
            
            close.on 'click', @.hideModal
            
            @.lightbox.on 'click', @.hideModal
            
            modals.on 'click', (e) ->
                e.stopPropagation()

        showModal: ->
            modalId = $(@).data 'modal'
            $("##{modalId}").fadeIn drmModal.config.speed

        hideModal: (e) ->
            drmModal.lightbox.fadeOut drmModal.config.speed 
            e.preventDefault()
    }

    drmModal.init()

) jQuery