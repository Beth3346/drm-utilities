scrollSpy: =>
    scroll = $('body').scrollTop()
    links = @nav.find 'a[href^="#"]'

    _findPositions = ->
        sections = @content.find 'section'
        positions = []
        # populate positions array with the position of the top of each section element 
        sections.each (index) ->
            that = $ @
            length = sections.length

            getPosition = (height) ->
                if height > 200
                    that.position().top - (that.height() / 2)
                else    
                    that.position().top - that.height()

            # the first element's position should always be 0
            if index is 0
                position = 0
            # subtract the bottom container's full height so final scroll value is equivalent 
            # to last container's position  
            else if index is length - 1
                position = getPosition that.height()
            # for all other elements correct position by only subtracting half of its height
            # from its top position
            else
                position = that.position().top - (that.height() / 2)

            # correct for any elements that may have a negative position value  
            if position < 0 then positions.push 0 else positions.push position

        positions

    positions = _findPositions()

    $.each positions, (index, value) =>
        # console.log "value: #{value} : scroll: #{scroll}"
        if scroll is 0
            $("a.#{@activeClass}").removeClass @activeClass  
            links.eq(0).addClass @activeClass
        # if value is less than scroll add @activeClass to link with the same index
        else if value < scroll
            $("a.#{@activeClass}").removeClass @activeClass
            links.eq(index).addClass @activeClass