###############################################################################
# Displays an offscreen menu that slides into view
###############################################################################
"use strict"

( ($) ->
    drmOffscreen =    
        menu: $ 'nav.drm-offscreen-menu'
        button: $ 'button.drm-menu-button'
        content: $ 'div.drm-offscreen-content'
        holder: $ 'div.drm-content-holder'
        config:
            state: 'hide'

        init: (config) ->
            $.extend @config, config
            menuWidth = @getDimensions()

            # set menu and content positions            
            if drmOffscreen.config.state is 'hide'
                drmOffscreen.hideMenu(menuWidth)

            @button.on 'click', @toggleMenu

        toggleMenu: ->
            menuPos = drmOffscreen.menu.css 'left'
            menuWidth = drmOffscreen.getDimensions()

            if menuPos is '0px' then drmOffscreen.hideMenu(menuWidth) else drmOffscreen.showMenu(menuWidth)

        showMenu: (menuWidth) ->
            contentWidth = 100 - menuWidth

            drmOffscreen.menu.animate {
                'left': '0'}
            drmOffscreen.content.animate {
                'left': "#{menuWidth}%", 'width': "#{contentWidth}%"}

        hideMenu: (menuWidth) ->
            drmOffscreen.menu.animate {
                'left': "-#{menuWidth}%"}
            drmOffscreen.content.animate {
                'left': '0', 'width': '100%'}

            drmOffscreen.addScroll()

        getDimensions: ->   
            menuWidth = parseInt(drmOffscreen.menu.css('width'), 10)
            holderWidth = parseInt(drmOffscreen.holder.css('width'), 10)

            # calculate menuWidth as a percentage of container
            menuWidth = (menuWidth / holderWidth) * 100
            menuWidth

        addScroll: ->
            menuHeight = parseInt((drmOffscreen.menu.find('ul').css 'height'), 10)
            contentHeight = parseInt((drmOffscreen.content.css 'height'), 10)

            if menuHeight > contentHeight
                drmOffscreen.menu.css {'overflow-y': 'scroll'}

    drmOffscreen.init() 

) jQuery