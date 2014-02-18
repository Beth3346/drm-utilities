###############################################################################
# Allows a button to display a dropdown when clicked
###############################################################################

( ($) ->
    
    buttonHolder = $ '.drm-dropdown-solid-btn-holder'
    button = buttonHolder.find('button')
    splitButtonHolder = $ '.drm-dropdown-split-btn-holder'
    menuButton = splitButtonHolder.find('button:last()')
    html = $ 'html'

    # when a solid button is clicked show a dropdown menu
    # hide all other menus that are in the same container

    buttonHolder.on 'click', 'button', (e) ->
        that = $ @
        # show menu
        that.toggleClass('clicked').next('ul').slideToggle()
        # hide solid button menus
        that.parent().siblings().find(button).removeClass('clicked').next('ul').slideUp()
        # hide split button menus
        that.parent().siblings().find(menuButton).removeClass('clicked').next('ul').slideUp()
        e.stopPropagation()

    # when the user clicks outside a dropbdown button hide all menus

    html.on 'click', () ->
        # hide solid button menus
        button.removeClass('clicked').next('ul').slideUp()
        # hide split button menus
        menuButton.removeClass('clicked').next('ul').slideUp()

    # when a split button is clicked show a dropdown menu
    # hide all other menus that are in the same container

    splitButtonHolder.on 'click', 'button:last()', (e) ->
        that = $ @
        # show menu
        that.toggleClass('clicked').next('ul').slideToggle()
        # hide solid button menus
        that.parent().parent().siblings().find(button).removeClass('clicked').next('ul').slideUp()
        # hide split button menus
        that.parent().parent().siblings().find(menuButton).removeClass('clicked').next('ul').slideUp()
        e.stopPropagation()

) jQuery