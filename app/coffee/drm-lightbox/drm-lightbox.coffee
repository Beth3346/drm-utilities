###############################################################################
# Displays a lightbox with an image slideshow built with images from a 
# thumbnail set
###############################################################################
"use strict"

( ($) ->
    class window.DrmLightbox
        constructor: (@images, @speed) ->
            self = @
            @body = $ 'body'

            @body.on 'click', 'div.drm-blackout img.img-visible', (e) ->
                e.stopPropagation()

            @images.on 'click', 'a', @addLightbox

            @body.on 'click', "div.drm-blackout button.close", (e) ->
                console.log 'remove lightbox'
                e.preventDefault()
                @removeLightbox

            @body.on 'click', 'div.drm-blackout ul.thumbnail-list a', @changeImage

            @body.on 'click', 'div.drm-blackout', @removeLightbox

        @createThumbnails: ->
            links = @images.find 'a'
            thumbnailList = []          
            thumbnails = ''

            # populate imgList array
            links.each ->
                thumbnailList.push $(@).attr 'href'

            # create html for thumbnail-list
            $.each thumbnailList, (index, value) ->
                thumbnails += "<li><a href='#{value}'><img src='#{value}' /></a><li>"

            thumbnails

        createLightbox: ->
            img = $(@).attr 'href'
            thumbnails = @::createThumbnails()

            # html for the actual lightbox
            
            imgVisible = $ '<img></img>',
                class: 'img-visible'
                src: img
                alt: 'thumbnail'

            close = $ '<button></button>',
                class: 'close'
                text: 'x'

            thumbnailHtml = $ '<ul></ul',
                class: 'thumbnail-list'
                html: "<li><a href='#{img}'><img src='#{img}' /></a><li>"

            lightboxHtml = $ '<div></div>',
                class: 'drm-blackout'

            lightboxHtml = ->
                lightboxHtml.hide().appendTo('body').fadeIn 300, ->
                    close.appendTo lightboxHtml
                    imgVisible.appendTo lightboxHtml
                    thumbnailHtml.appendTo lightboxHtml

            lightboxHtml

        addLightbox: (e) ->
            e.preventDefault()
            img = $(@).attr 'href'
            lightbox = $ 'div.drm-blackout'
            # thumbnails = @::createThumbnails()

            # lightboxHtml = @::createLightbox.call $ @

            # if the lightbox isn't already showing, append it to body and fade it into view
            if lightbox.length == 0
                imgVisible = $ '<img></img>',
                    class: 'img-visible'
                    src: img
                    alt: 'thumbnail'

                close = $ '<button></button>',
                    class: 'close'
                    text: 'x'

                thumbnailHtml = $ '<ul></ul',
                    class: 'thumbnail-list'
                    html: "<li><a href='#{img}'><img src='#{img}' /></a><li>"

                lightboxHtml = $ '<div></div>',
                    class: 'drm-blackout'

                lightboxHtml.hide().appendTo('body').fadeIn 300, ->
                    close.appendTo lightboxHtml
                    imgVisible.appendTo lightboxHtml
                    thumbnailHtml.appendTo lightboxHtml

            return

        changeImage: (e) ->
            img = $(@).attr 'href'
            oldImg = $ 'div.drm-blackout img.img-visible'
            oldImgSrc = oldImg.attr 'src'
            speed = @speed

            e.preventDefault()

            if oldImgSrc != img             
                oldImg.fadeOut speed, ->
                    $(@).attr('src', img).fadeIn speed

            e.stopPropagation() 

        removeLightbox: ->
            $('div.drm-blackout').fadeOut @speed, ->
                console.log "removing lightbox"
                $(@).remove()

    return

    # drmLightbox = {
    #   images: $ 'ul.drm-lightbox-thumbnails'
    #   body: $ 'body'

    #   config: {
    #       speed: 300
    #   }

    #   init: (config) ->
    #       $.extend @config, config

    #       @body.on 'click', 'div.drm-blackout img.img-visible', (e) ->
    #           e.stopPropagation()

    #       @images.on 'click', 'a', @addLightbox   

    #       @body.on 'click', 'div.drm-blackout button.close', @removeLightbox

    #       @body.on 'click', 'div.drm-blackout ul.thumbnail-list a', @changeImage

    #       @body.on 'click', 'div.drm-blackout', @removeLightbox

    #   createThumbnails: ->
    #       links = @images.find 'a'
    #       thumbnailList = []          
    #       thumbnails = ''

    #       # populate imgList array
    #       links.each ->
    #           thumbnailList.push $(@).attr 'href'

    #       # create html for thumbnail-list
    #       $.each thumbnailList, (index, value) ->
    #           thumbnails += "<li><a href='#{value}'><img src='#{value}' /></a><li>"

    #       return thumbnails

    #   createLightbox: ->
    #       img = $(@).attr 'href'
    #       thumbnails = drmLightbox.createThumbnails()

    #       # html for the actual lightbox
    #       lightboxHtml = "<div class='drm-blackout'><button class='close'>x</button><img src='#{img}' alt='thumbnail' class='img-visible'><ul class='thumbnail-list'>#{thumbnails}</div>"

    #       return lightboxHtml

    #   addLightbox: (e) ->
    #       lightbox = $ 'div.drm-blackout'
    #       lightboxHtml = drmLightbox.createLightbox.call $ @

    #       # if the lightbox isn't already showing, append it to body and fade it into view
    #       if lightbox.length == 0
    #           $(lightboxHtml).hide().appendTo(drmLightbox.body).fadeIn drmLightbox.config.speed

    #       e.preventDefault()

    #   changeImage: (e) ->
    #       img = $(@).attr 'href'
    #       oldImg = $ 'div.drm-blackout img.img-visible'
    #       oldImgSrc = oldImg.attr 'src'
    #       speed = drmLightbox.config.speed

    #       e.preventDefault()

    #       if oldImgSrc != img             
    #           oldImg.fadeOut speed, ->
    #               $(@).attr('src', img).fadeIn speed

    #       e.stopPropagation() 

    #   removeLightbox: ->
    #       $('div.drm-blackout').fadeOut drmLightbox.config.speed, ->
    #           $(@).remove()
    # }

) jQuery