###############################################################################
# Displays tooltips on click
###############################################################################

( ($) ->
	
    drmTooltips = {
        config: {
            tooltip: $ '.drm-has-tooltip'
            speed: 300
        }

        init: (config) ->
            $.extend @config, config

            drmTooltips.config.tooltip.on 'mouseenter', @.addTooltip
            drmTooltips.config.tooltip.on 'mouseleave', @.removeTooltip

        addTooltip: ->
            that = $ @
            content = that.data 'title'
            position = that.data 'position'
            oldTooltip = $ ".drm-tooltip-#{position}:contains(#{content})"
            positionTop = that.position().top
            positionLeft = that.position().left

            if oldTooltip.length == 0
                newTooltip = $('<div></div>', {
                    text: content,
                    class: "drm-tooltip-#{position}"
                })

                newTooltip.hide().insertBefore that
                height = parseInt(newTooltip.css('height'), 10) + parseInt(newTooltip.css('padding-top'), 10) + parseInt(newTooltip.css('padding-bottom'), 10)
                width = parseInt(newTooltip.css('width'), 10) + parseInt(newTooltip.css('padding-left'), 10) + parseInt(newTooltip.css('padding-right'), 10)
                elWidth = parseInt(that.css('width'), 10) + parseInt(that.css('padding-left'), 10) + parseInt(that.css('padding-right'), 10)
                elHeight = parseInt(that.css('height'), 10) + parseInt(that.css('padding-top'), 10) + parseInt(that.css('padding-bottom'), 10)

                if position == 'left'
                    tooltipTop = positionTop
                    tooltipLeft = positionLeft - width + 10
                else if position == 'right'
                    tooltipTop = positionTop
                    tooltipLeft = positionLeft + elWidth + 10
                else if position == 'bottom'
                    tooltipTop = positionTop
                    tooltipLeft = positionLeft
                else
                    tooltipTop = positionTop
                    tooltipLeft = positionLeft
                
                console.log "left: #{positionLeft}, top: #{positionTop}"
                console.log "height: #{elHeight}, width: #{elWidth}"
                console.log "left: #{tooltipLeft}, top: #{tooltipTop}"

                newTooltip.css({'top': "#{tooltipTop}px", 'left': "#{tooltipLeft}px"}).fadeIn drmTooltips.config.speed

        removeTooltip: ->
            that = $ @
            content = that.data 'title'
            position = that.data 'position'
            oldTooltip = $ ".drm-tooltip-#{position}:contains(#{content})"

            if oldTooltip.length > 0
                oldTooltip.fadeOut drmTooltips.config.speed, ->
                    $(@).remove()
    }

    drmTooltips.init()

) jQuery