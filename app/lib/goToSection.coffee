goToSection: (activeClass) ->
    that = $ @
    target = that.attr 'href'
    content = $ 'body'

    $('a.active').removeClass activeClass
    that.addClass activeClass

    content.stop().animate {
        'scrollTop': $(target).position().top
    }, 900, 'swing', ->
        window.location.hash = target
        return

    false