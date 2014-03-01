###############################################################################
# Creates a navigation bar that stays put when the user scrolls
###############################################################################

( ($) ->

    drmStickyNav = {
        nav: $ '.drm-sticky-nav'

        config: {
            navHeight: '50px'
        }

        init: (config) ->
            $.extend @.config, config
            container = @.nav.parent()
            $(window).on 'scroll', @affixNav

        affixNav: ->
            body = $ 'body'
            navPosition = drmStickyNav.nav.position().top
            scroll = body.scrollTop()
            console.log "Nav position is #{navPosition}"
            console.log "Scroll is #{scroll}"

            if scroll > navPosition
                drmStickyNav.nav.addClass 'sticky'
                body.css 'padding-top': drmStickyNav.config.navHeight
            else
                drmStickyNav.nav.removeClass 'sticky' 
                body.css 'padding-top': '0'
    }

    drmStickyNav.init()

) jQuery