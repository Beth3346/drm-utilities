###############################################################################
# Creates a Pinterest like sortable, draggable grid
###############################################################################
"use strict"

( ($) ->
    class window.DrmFlexibleGrid
        constructor: (@gridClass = 'drm-flexible-grid') ->
            @grid = $ ".#{@gridClass}"
            images = @grid.find 'img'

            @positionListItems()
        #     images.on 'load', @resizeCurtain

        #     @grid.on 'mouseenter', 'img', ->
        #         $(@).parent('li').find('.curtain').stop().fadeIn 'fast'

        #     @grid.on 'mouseleave', '.curtain', ->
        #         $(@).stop().fadeOut 'fast'

        # resizeCurtain: =>
        #     curtain = @grid.find '.curtain'

        #     $.each curtain, (key, value) ->
        #         that = $ value
        #         holder = that.parent 'li'
        #         imageHeight = holder.find('img').height()

        #         that.height(imageHeight).hide()

        positionListItems: =>
            items = @grid.find('li').hide().fadeIn 3000, ->
                that = $ @
                key = that.index() + 1
                columnNum = if key % 4 is 0 then 4 else key % 4
                that.attr 'data-column', columnNum
                height = that.height()
                captionTitle = that.find '.caption-title'
                imageNum = $('<h2></h2>',
                    class: 'caption-sub'
                    text: "Image #{key}").insertAfter captionTitle
    
    new DrmFlexibleGrid()

) jQuery