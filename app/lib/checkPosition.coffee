checkPosition = ->
    that = $ @
    positionLeft = that.position().left
    offsetLeft = that.offset().left
    positionTop = that.position().top
    offsetTop = that.offset().top
    itemHeight = that.height()

    if offsetLeft < 0               
        that.css('left': (Math.abs(offsetLeft) + 10) + positionLeft)
    else if offsetTop < 0
        that.css('bottom': (Math.abs(positionTop) - itemHeight) - Math.abs(offsetTop))