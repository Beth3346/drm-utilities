( ($) ->

    drmDropdownMenu = {
        menu: $ '.drm-dropdown-nav'

        config: {
            speed: 1000
        }

        init: (config) ->
            $.extend @.config, config
            listItem = @.menu.find 'li:has(ul)'

            listItem.on 'mouseenter', @.showMenu
            listItem.on 'mouseleave', @.hideMenu       

            listItem.children('a').on 'click', (e) ->
                e.preventDefault()

        showMenu: ->
            $(@).children('ul').fadeIn 300
        
        hideMenu: ->
            $(@).children('ul').fadeOut drmDropdownMenu.config.speed
    }

    drmDropdownMenu.init()

) jQuery