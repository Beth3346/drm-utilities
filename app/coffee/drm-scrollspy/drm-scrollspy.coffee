###############################################################################
# Scollspy
###############################################################################

( ($) ->

    drmScrollspy = {

        config: {
            holder: $ '.drm-scrollspy'
            content: '.drm-scroll-content'
            nav: '.drm-scroll-nav'
            activeClass: 'active'
        }

        init: (config) ->
            $.extend @config, config
            content = drmScrollspy.config.holder.find drmScrollspy.config.content          
            nav = drmScrollspy.config.holder.find drmScrollspy.config.nav
            links = nav.find 'a[href^="#"]'
            hash = window.location.hash
            positions = @.findPositions(content)
            spy = -> drmScrollspy.scrollspy.call(content, positions)
            
            if hash
                nav.find("a[href='#{hash}']").addClass drmScrollspy.config.activeClass
            else    
                links.first().addClass drmScrollspy.config.activeClass

            links.on 'click', @.goToSection
            content.on 'scroll', spy

        goToSection: (e) ->
            that = $ @
            content = drmScrollspy.config.holder.find drmScrollspy.config.content  
            target = that.attr 'href'
            offset = ->
                scroll = content.scrollTop()
                position = $(target).position().top

                # if position is less than scroll "scroll up"
                if position < scroll
                    offset = position + scroll
                # if position is greater than scroll "scroll down"
                else
                    offset = scroll + position
                return offset    

            $('a.active').removeClass drmScrollspy.config.activeClass      
            that.addClass drmScrollspy.config.activeClass

            e.preventDefault()

            content.stop().animate {
                'scrollTop': offset()   
            }, 900, 'swing', ->
                window.location.hash = target
                return

        scrollspy: (positions) ->
            scroll = $(@).scrollTop()
            links = drmScrollspy.config.holder.find('.drm-scroll-nav').find 'a[href^="#"]'

            # find out which section position corresponds with scroll
            # if scroll is less than the next position highlight the link with the same index
            $.each positions, (index, value) ->
                if scroll == 0
                    $('a.active').removeClass drmScrollspy.config.activeClass  
                    links.eq(0).addClass drmScrollspy.config.activeClass
                else if value < scroll
                    $('a.active').removeClass drmScrollspy.config.activeClass  
                    links.eq(index).addClass drmScrollspy.config.activeClass

        findPositions: (content) ->
            sections = content.find 'section'
            positions = []
            # populate positions array with the position of the top of each section element 
            sections.each (index) ->
                that = $ @
                length = sections.length

                # the first element's position should always be 0
                if index == 0
                    position = 0
                # subtract the bottom container's full height so final scroll value is equivalent 
                # to last container's position  
                else if index == length - 1
                    if that.height() > 200
                        position = that.position().top - (that.height() / 2)
                    else    
                        position = that.position().top - that.height()
                # for all other elements correct position by only subtracting half of its height 
                # from its top position
                else
                    position = that.position().top - (that.height() / 2)

                # correct for any elements that may have a negative position value  
                if position < 0 then positions.push 0 else positions.push position
                return positions           

            return positions
    }

    drmScrollspy.init() 

) jQuery