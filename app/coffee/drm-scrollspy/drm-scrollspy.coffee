###############################################################################
# Scollspy
###############################################################################

( ($) ->

    drmScrollspy = {
        holder: $ '.drm-scrollspy'

        init: ->
            content = @.holder.find '.drm-scroll-content'                
            nav = @.holder.find '.drm-scroll-nav'
            links = nav.find 'a[href^="#"]'
            hash = window.location.hash
            positions = @.findPositions(content)
            spy = -> drmScrollspy.scrollspy.call(content, positions)
            
            if hash
                nav.find("a[href='#{hash}']").addClass 'active'
            else    
                links.first().addClass 'active'

            links.on 'click', @.gotoSection
            content.on 'scroll', spy

        gotoSection: (e) ->
            that = $ @
            content = drmScrollspy.holder.find '.drm-scroll-content'
            target = that.attr 'href'
            scroll = content.scrollTop()
            position = $(target).position().top
            offset = ->
                if position < scroll
                    position + scroll
                else if position > scroll
                    position - scroll
                else if position == 0
                    0
                else    
                    content.height()

            $('a.active').removeClass 'active'      
            that.addClass 'active'

            e.preventDefault()

            content.stop().animate {
                'scrollTop': offset()   
            }, 900, 'swing', ->
                window.location.hash = target
                return

        scrollspy: (positions) ->
            scroll = $(@).scrollTop()
            links = drmScrollspy.holder.find('.drm-scroll-nav').find 'a[href^="#"]'

            # find out which section position corresponds with scroll
            # if scroll is less than the next position highlight the link with the same index
            $.each positions, (index, value) ->
                if scroll == 0
                    $('a.active').removeClass 'active'  
                    links.eq(0).addClass 'active'
                else if value < scroll
                    $('a.active').removeClass 'active'  
                    links.eq(index).addClass 'active'

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