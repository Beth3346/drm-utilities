###############################################################################
# Dropdown menu
###############################################################################

( ($) ->
    class @DrmDropdownMenu
        constructor: (@menu, @speed) ->
            @listItem = @menu.find 'li:has(ul)'

            @listItem.on 'mouseenter', @showMenu
            @listItem.on 'mouseleave', @hideMenu       

            @listItem.children('a').on 'click', (e) ->
                e.preventDefault()

        showMenu: ->
            $(@).children('ul').fadeIn 300
        
        hideMenu: ->
            $(@).children('ul').fadeOut @speed

    return

) jQuery