###############################################################################
# Creates countdown relative to current time
###############################################################################
"use strict"

$ = jQuery
class @DrmCountdown
    constructor: (@countdown = $('.drm-countdown')) ->
        self = @
        @now = new Date()

    countdownTo: (date) ->
        # display a running countdown
        console.log date

new DrmCountdown()