###############################################################################
# Displays an offscreen menu that slides into view
###############################################################################
"use strict"

$ = jQuery
class @DrmOffscreen
    constructor: (@menu = $('nav.drm-offscreen-menu'), @button = $('button.drm-menu-button'), @content = $('.drm-offscreen-content'), @holder = $('.drm-content-holder'), @state = 'hide') ->
        self = @
        menuWidth = self.getDimensions()

        # set menu and content positions            
        if self.state is 'hide' then self.hideMenu(menuWidth)

        self.content.on 'click', (e) ->
            self.hideMenu(menuWidth)
            e.stopPropagation()
        self.button.on 'click', $.proxy self.toggleMenu, self

    toggleMenu: (e) ->
        _menuPos = @menu.css 'left'
        menuWidth = @getDimensions()

        if _menuPos is '0px' then @hideMenu menuWidth else @showMenu menuWidth
        e.stopPropagation()

    showMenu: ->
        @menu.animate {
            'left': '0'}
        @addScroll()

    hideMenu: (menuWidth) ->
        @menu.animate {
            'left': "-#{menuWidth}%"}

    getDimensions: ->   
        _menuWidth = parseInt @menu.css('width'), 10
        _holderWidth = parseInt @holder.css('width'), 10

        # calculate menuWidth as a percentage of container
        Math.ceil (_menuWidth / _holderWidth) * 100

    addScroll: ->
        _menuHeight = parseInt @menu.find('ul').css('height'), 10
        _contentHeight = parseInt @content.css('height'), 10

        if _menuHeight > _contentHeight then @menu.css {'overflow-y': 'scroll'}
        
new DrmOffscreen()