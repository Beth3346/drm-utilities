###############################################################################
# Allows a button to display a dropdown when clicked
###############################################################################

( ($) ->

    drmDropdownButton = {
        solidContainer: $ '.drm-dropdown-solid-btn-holder'
        splitContainer: $ '.drm-dropdown-split-btn-holder'

        config: {
            speed: 300
        }

        init: (config) ->
            $.extend @.config, config
            @.solidContainer.on 'click', 'button', @.toggleMenu
            @.splitContainer.on 'click', 'button:last()', @.toggleMenu
            $('html').on 'click', @.hideOpenMenus

        toggleMenu: (e) ->
            that = $ @
            menu = that.next 'ul'
            drmDropdownButton.hideOpenMenus.call that

            if menu.is ':hidden'
                drmDropdownButton.showMenu.call that       
            else
                drmDropdownButton.hideMenu.call that

            e.stopPropagation()

        showMenu: ->
            $(@).addClass('clicked').next('ul').slideDown drmDropdownButton.config.speed

        hideMenu: ->
            $(@).removeClass('clicked').next('ul').slideUp drmDropdownButton.config.speed

        hideOpenMenus: ->
            openSolidButtons = drmDropdownButton.solidContainer.find('ul').not(':hidden').prev 'button'
            openSplitButtons = drmDropdownButton.splitContainer.find('ul').not(':hidden').prev 'button'

            drmDropdownButton.hideMenu.call openSolidButtons
            drmDropdownButton.hideMenu.call openSplitButtons
    }

    drmDropdownButton.init()

) jQuery