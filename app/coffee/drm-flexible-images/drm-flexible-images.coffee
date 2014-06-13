###############################################################################
# Allow for images that resize to fit their container
###############################################################################
"use strict"

$ = jQuery
class @DrmFlexibleImages
    constructor: (@images = $('.flexible-image')) ->

new DrmFlexibleImages()