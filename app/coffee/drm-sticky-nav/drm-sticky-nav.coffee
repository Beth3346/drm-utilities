###############################################################################
# Creates a navigation bar that stays put when the user scrolls
###############################################################################

( ($) ->

    drmStickyNav = {

        config: {
            nav: $ '.drm-sticky-nav'
            activeClass: 'active'
            content: $ 'body'
        }

        init: (config) ->
            $.extend @.config, config
            links = drmStickyNav.config.nav.find 'a[href^="#"]'
            hash = window.location.hash
            
            if hash
                drmStickyNav.config.nav.find("a[href='#{hash}']").addClass drmStickyNav.config.activeClass
            else    
                links.first().addClass drmStickyNav.config.activeClass

            if drmStickyNav.config.nav.length > 0
                $(window).on 'scroll', @affixNav

            drmStickyNav.config.nav.on 'click', 'a[href^="#"]', @goToSection

        affixNav: ->
            position = drmStickyNav.config.nav.data 'position'
            navPosition = drmStickyNav.config.nav.position().top
            scroll = drmStickyNav.config.content.scrollTop()

            if scroll > navPosition
                drmStickyNav.config.nav.addClass 'sticky'
            else
                drmStickyNav.config.nav.removeClass 'sticky'

        goToSection: (e) ->
            that = $ @
            target = that.attr 'href'
            content = drmStickyNav.config.content

            offset = ->
                scroll = content.scrollTop()
                position = $(target).position().top

                # if position is less than scroll "scroll up"
                if position < scroll
                    offset = position + scroll
                    console.log "scroll up"
                # if position is greater than scroll "scroll down"
                else
                    offset = scroll + position
                    console.log "scroll down"
                return offset 

            e.preventDefault()

            $('a.active').removeClass drmStickyNav.config.activeClass
            that.addClass drmStickyNav.config.activeClass

            content.stop().animate {
                'scrollTop': offset()   
            }, 900, 'swing', ->
                console.log "offset: #{offset}"
                console.log "position: #{position}"
                console.log "scroll: #{scroll}"
                # window.location.hash = target
                return
    }

    drmStickyNav.init()

) jQuery