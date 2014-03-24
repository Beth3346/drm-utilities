###############################################################################
# Displays an offscreen menu that slides into view
###############################################################################
"use strict"

( ($) ->
    class window.DrmOffscreen
        constructor: (@menu = $('nav.drm-offscreen-menu'), @button = $('button.drm-menu-button'), @content = $('div.drm-offscreen-content'), @holder = $('div.drm-content-holder'), @state = 'hide') ->
            self = @
            menuWidth = self.getDimensions()

            # set menu and content positions            
            if self.state is 'hide' then self.hideMenu(menuWidth)

            self.button.on 'click', $.proxy self.toggleMenu, self

        toggleMenu: ->
            menuPos = @menu.css 'left'
            menuWidth = @getDimensions()

            if menuPos is '0px' then @hideMenu menuWidth else @showMenu menuWidth

        showMenu: (menuWidth) ->
            contentWidth = 100 - menuWidth

            @menu.animate {
                'left': '0'
            }

            @content.animate {
                'left': "#{menuWidth}%", 'width': "#{contentWidth}%"
            }

        hideMenu: (menuWidth) ->
            @menu.animate {
                'left': "-#{menuWidth}%"}
            @content.animate {
                'left': '0', 'width': '100%'}
            @addScroll()

        getDimensions: ->   
            menuWidth = parseInt @menu.css('width'), 10
            holderWidth = parseInt @holder.css('width'), 10

            # calculate menuWidth as a percentage of container
            menuWidth = (menuWidth / holderWidth) * 100
            menuWidth

        addScroll: ->
            menuHeight = parseInt @menu.find('ul').css('height'), 10
            contentHeight = parseInt @content.css('height'), 10

            if menuHeight > contentHeight then @menu.css {'overflow-y': 'scroll'}
            
    new DrmOffscreen()

) jQuery