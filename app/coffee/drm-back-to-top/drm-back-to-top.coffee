###############################################################################
# Adds a button for user to scroll to top immediately
###############################################################################
"use strict"

$ = jQuery
class @DrmBackToTop
    constructor: (@content = $('body'), @speed = 300, @scrollSpeed = 900) ->
        @backToTop = @addButton()
        $(window).on 'scroll', @showButton
        @backToTop.on 'click', @toTop

    addButton: =>
        $('<button></button>',
            class: 'back-to-top'
            html: '&#9652;').appendTo('body').hide()
        
    showButton: =>
        scroll = $('body').scrollTop()
        height = $(window).height()

        if scroll > height
            @backToTop.fadeIn @speed
        else if scroll < height
            @backToTop.fadeOut @speed 

    toTop: =>
        @content.stop().animate {
            'scrollTop': @content.position().top
        }, @scrollSpeed, 'swing'

new DrmBackToTop()