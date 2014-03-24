###############################################################################
# Allows a button to display a dropdown when clicked
###############################################################################
"use strict"

( ($) ->
    class window.DrmDropdownButton
        constructor: (@container = $('div.drm-dropdown-solid-btn-holder'), @speed = 300, @button = 'button') ->
            self = @

            self.container.on 'click', self.button, (e) ->
                that = $ @
                menu = that.next 'ul'
                menuStatus = menu.is ':hidden'

                # close any open menus
                openButtons = self.container.find('ul').not(':hidden').prev 'button'

                unless openButtons.length is 0
                    self.hideMenu.call openButtons, self.speed

                if menuStatus
                    self.showMenu.call that, self.speed
                else
                    self.hideMenu.call that, self.speed
                e.preventDefault()

        showMenu: (speed) ->
            $(@).next('ul').addClass('clicked').slideDown speed

        hideMenu: (speed) ->
            $(@).next('ul').removeClass('clicked').slideUp speed
            
    new DrmDropdownButton()

) jQuery