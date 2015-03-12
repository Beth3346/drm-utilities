###############################################################################
# Utility for custom form select controls
###############################################################################
"use strict"

$ = jQuery
class @DrmSelect
    constructor: (@select = $('.drm-select'), fn) ->
        @dropdownText = @select.find '.dropdown-text'
        @button = @select.find '.dropdown-button'
        @list = @select.find('ul').hide()
        @action = fn
        self = @

        @button.on 'click', (e) ->
            self.list.fadeToggle()
            e.preventDefault()
            e.stopPropagation()

        $('body').on 'click', (e) ->
            self.list.fadeOut()
            e.stopPropagation()

        @list.on 'click', 'li', (e) ->
            that = $ @
            option = self.changeOption.call that
            self.action option
            e.preventDefault()
            e.stopPropagation()

    changeOption: ->
        _that = $ @
        option = _that.data 'option'
        text = _that.text()
        _dropdownText = _that.closest('.drm-select').find '.dropdown-text'

        _dropdownText.html text
        _that.parent('ul').fadeOut()

        return option


new DrmSelect null, (option) ->
    console.log option