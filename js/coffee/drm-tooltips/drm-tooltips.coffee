###############################################################################
# Displays tooltips on click
###############################################################################
"use strict"

( ($) ->	
    elrTooltips =
        config:
            tooltip: $ '.elr-has-tooltip'
            speed: 300

        init: (config) ->
            $.extend @config, config

            elrTooltips.config.tooltip.on 'mouseenter', @.addTooltip
            elrTooltips.config.tooltip.on 'mouseleave', @.removeTooltip

        addTooltip: ->
            that = $ @
            content = that.data 'title'
            oldTooltip = $ "div.elr-tooltip-#{position}:contains(#{content})"
            position = that.data 'position'

            unless oldTooltip.length isnt 0
                newTooltip = $ '<div></div>', {
                    text: content,
                    class: "elr-tooltip-#{position}"
                }

                newTooltip.hide().insertBefore that
                tooltipCSS = elrTooltips.positionTooltip.call(that, newTooltip, position)

                newTooltip.css(tooltipCSS).fadeIn elrTooltips.config.speed

        positionTooltip: (newTooltip, position) ->
            that = $ @
            positionTop = that.offset().top + parseInt(that.css('padding-top'), 10)
            positionLeft = that.offset().left + parseInt(that.css('padding-left'), 10)
            height = parseInt(newTooltip.outerHeight(), 10)
            width = parseInt(newTooltip.outerWidth(), 10)
            elWidth = parseInt(that.outerWidth(), 10)
            elHeight = parseInt(that.outerHeight(), 10)

            switch position
                when 'left'
                    tooltipTop = positionTop - (elHeight / 2)
                    tooltipLeft = positionLeft - width + 10
                when 'right'
                    tooltipTop = positionTop - (elHeight / 2) 
                    tooltipLeft = positionLeft + elWidth + 15
                when 'bottom'
                    tooltipTop = positionTop 
                    tooltipLeft = positionLeft
                else # default to top
                    tooltipTop = positionTop - ((elHeight + height) / 2) - 10 
                    tooltipLeft = positionLeft + ((elWidth + width) / 2)

            console.log "Top: #{tooltipTop} #{positionTop}, Left: #{tooltipLeft} #{positionLeft}"
            console.log "Height: #{height} #{elHeight}, Width: #{width} #{elWidth}"
            tooltipCSS = {
                'top': "#{tooltipTop}px"
                'left': "#{tooltipLeft}px"
            }

            tooltipCSS            

        removeTooltip: ->
            that = $ @
            content = that.data 'title'
            position = that.data 'position'
            oldTooltip = $ "div.elr-tooltip-#{position}:contains(#{content})"

            unless oldTooltip.length is 0
                oldTooltip.fadeOut elrTooltips.config.speed, ->
                    $(@).remove()

    elrTooltips.init()

) jQuery