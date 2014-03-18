###############################################################################
# Allows a button to display a dropdown when clicked
###############################################################################

( ($) ->
    class @DrmDropdownButton
        constructor: (@container, @speed, @button) ->
            self = @
            self.container.on 'click', self.button, (e) ->
                that = $ @
                menu = that.next 'ul'

                # close any open menus
                openButtons = self.container.find('ul').not(':hidden').prev 'button'

                if openButtons.length > 0
                    self.hideMenu.call openButtons, self.speed

                if menu.is ':hidden'
                    self.showMenu.call that, self.speed
                else
                    self.hideMenu.call that, self.speed

                e.stopPropagation()

        showMenu: (speed) ->
            $(@).next('ul').addClass('clicked').slideDown speed

        hideMenu: (speed) ->
            $(@).next('ul').removeClass('clicked').slideUp speed
    return      

) jQuery