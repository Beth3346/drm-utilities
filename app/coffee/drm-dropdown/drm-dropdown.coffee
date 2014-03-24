###############################################################################
# Dropdown menu
###############################################################################
"use strict"

( ($) ->
    class window.DrmDropdownMenu
        constructor: (@menu = $('ul.drm-dropdown-nav'), @speed = 1000) ->
            self = @
            @listItem = @menu.find 'li:has(ul)'
            
            @listItem.on 'mouseenter', @showMenu
            @listItem.on 'mouseleave', -> self.hideMenu.call @, self.speed       

            @listItem.children('a').on 'click', (e) ->
                e.preventDefault()

        showMenu: ->
            $(@).children('ul').fadeIn 300
        
        hideMenu: (speed) ->
            $(@).children('ul').fadeOut speed

    new DrmDropdownMenu()

) jQuery