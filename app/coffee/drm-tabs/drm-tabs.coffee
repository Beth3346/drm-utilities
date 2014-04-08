###############################################################################
# Enables dynamic tabbed content
###############################################################################
"use strict"

( ($) ->
    class window.DrmTabs
        constructor: (@holder = $('div.drm-tabs'), @activeClass = 'active', @speed = 300) ->
            self = @
            @nav = self.holder.find 'nav'
            @tabs = self.holder.find 'section'
            hash = window.location.hash

            self.tabs.hide()

            if hash
                self.holder.find("section#{hash}").show()
                self.nav.find("a[href='#{hash}']").addClass self.activeClass
            else
                self.nav.find('a[href^="#"]').first().addClass self.activeClass
                self.tabs.first().show()

            self.nav.on 'click', 'a[href^="#"]', ->                
                target = self.getTarget.call @
                self.changeTab target

        getTarget: ->
            $(@).attr 'href'

        changeTab: (target) =>
            tab = @holder.find "section#{target}"
            currentTab = @holder.find('section').not ':hidden'
            currentId = currentTab.attr 'id'

            currentTab.fadeOut @speed, ->
                tab.fadeIn @speed
            @nav.find("a[href^='##{currentId}']").removeClass @activeClass
            window.location.hash = target   
            @nav.find("a[href='#{target}']").addClass @activeClass

            false

    new DrmTabs()

) jQuery