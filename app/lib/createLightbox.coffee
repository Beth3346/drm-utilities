createLightbox: () ->

    close = $ '<button></button>',
        class: 'close'
        text: 'x'

    lightboxHtml = $ '<div></div>',
        class: 'drm-blackout'

    lightboxHtml.hide().appendTo('body').fadeIn 300, ->
        close.appendTo lightboxHtml

    false