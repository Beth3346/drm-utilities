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
            images.on 'load', @resizeCurtain

            @grid.on 'mouseenter', 'img', ->
                $(@).parent('li').find('.curtain').stop().fadeIn 'fast'

            @grid.on 'mouseleave', '.curtain', ->
                $(@).stop().fadeOut 'fast'

        resizeCurtain: =>
            curtain = @grid.find '.curtain'

            $.each curtain, (key, value) ->
                that = $ value
                holder = that.parent 'li'
                imageHeight = holder.find('img').height()

                that.height(imageHeight).hide()

        positionListItems: =>
            items = @grid.find('li').hide().fadeIn 1000, ->
                $.each items, (key, value) ->
                    that = $ @
                    height = that.height()
    
    new DrmFlexibleGrid()

) jQuery