###############################################################################
# Dropdown menu
###############################################################################
"use strict"

$ = jQuery
class @DrmDropdownMenu
    constructor: (@menu = $('ul.drm-dropdown-nav'), @speed = 1000) ->
        self = @
        @listItem = @menu.find 'li:has(ul)'
        
        @listItem.on 'mouseenter', @showMenu
        @listItem.on 'mouseleave', -> self.hideMenu.call @, self.speed

        @listItem.children('a').on 'click', (e) ->
            e.preventDefault()

    showMenu: ->
        $(@).children('ul').stop().fadeIn 300
    
    hideMenu: (speed) ->
        $(@).children('ul').stop().fadeOut speed

new DrmDropdownMenu()