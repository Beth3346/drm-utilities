###############################################################################
# Creates a Pinterest like sortable, draggable grid
###############################################################################
"use strict"

( ($) ->
    class window.DrmFlexibleGrid
        constructor: (@gridClass = 'drm-flexible-grid') ->
            @grid = $ ".#{@gridClass}"
            @images = @grid.find 'img'

            $(window).on 'load', @positionListItems
            $(window).on 'load', @resizeCurtain

            @grid.on 'mouseenter', 'li', ->
                $(@).find('.curtain').stop().fadeIn 'fast'

            @grid.on 'mouseleave', 'li', ->
                $(@).find('.curtain').stop().fadeOut 'fast'

        resizeCurtain: =>
            curtain = @grid.find '.curtain'

            $.each curtain, (key, value) ->
                that = $ value
                holder = that.parent 'li'
                imageHeight = holder.find('img').height()

                that.height(imageHeight).hide()

        positionListItems: =>
            self = @
            items = self.grid.find 'li'
            margin = 10
            left1 = 0
            left2 = (items.eq(1).outerWidth(false) * 1) + (margin * 1)
            left3 = (items.eq(2).outerWidth(false) * 2) + (margin * 2)
            left4 = (items.eq(3).outerWidth(false) * 3) + (margin * 3)

            $.each items, (key, value) ->
                that = $ value
                index = key + 1
                columnNum = if index % 4 is 0 then 4 else index % 4
                that.attr 'data-column', columnNum
                captionTitle = that.find '.caption-title'
                imageNum = $('<h2></h2>',
                    class: 'caption-sub'
                    text: "Image #{index}").insertAfter captionTitle
                prevImage = if index > 4 then self.grid.find('li').eq(index - 5) else null
                
                if prevImage
                    top = if index < 9 then prevImage.outerHeight(false) + 10 else prevImage.outerHeight(false) + 10 + prevImage.position().top
                    switch columnNum
                        when 1
                            left = left1
                        when 2
                            left = left2
                        when 3
                            left = left3
                        when 4
                            left = left4
                    console.log "#{index}: #{columnNum} Left: #{left} Top: #{top}"

                    that.css
                        'top': top
                        'left': left
                        'position': 'absolute'

            @grid.css 'height': items.last().outerHeight(true) + items.last().position().top
    
    new DrmFlexibleGrid()

) jQuery