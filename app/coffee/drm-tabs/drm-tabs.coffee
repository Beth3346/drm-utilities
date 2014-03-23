###############################################################################
# Enables dynamic tabbed content
###############################################################################
"use strict"

( ($) ->	
    drmTabs =
        config:
            holder: $ 'div.drm-tabs'
            activeClass: 'active'
            speed: 300

        init: (config) ->
            $.extend @config, config
            holder = drmTabs.config.holder
            nav = holder.find 'nav'
            tabs = holder.find 'section'
            hash = window.location.hash

            tabs.hide()

            if hash
                holder.find("section#{hash}").show()
                nav.find("a[href='#{hash}']").addClass drmTabs.config.activeClass
            else
                nav.find('a[href^="#"]').first().addClass drmTabs.config.activeClass
                tabs.first().show()

            nav.on 'click', 'a[href^="#"]', @.changeTab

        changeTab: (e) ->
            holder = drmTabs.config.holder
            nav = holder.find 'nav'
            target = $(@).attr 'href'
            tab = holder.find "section#{target}"
            speed = drmTabs.config.speed
            currentTab = holder.find('section').not ':hidden'
            currentId = currentTab.attr 'id'

            e.preventDefault()

            currentTab.fadeOut speed, ->
                tab.fadeIn speed
            nav.find("a[href^='##{currentId}']").removeClass drmTabs.config.activeClass
            window.location.hash = target   
            nav.find("a[href='#{target}']").addClass drmTabs.config.activeClass

    drmTabs.init()

) jQuery