###############################################################################
# Creates a Pinterest like sortable, draggable grid
###############################################################################
"use strict"

$ = jQuery
# adds case insensitive contains to jQuery

$.extend $.expr[":"], {
    "containsNC": (elem, i, match) ->
        (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0
}

class @DrmFlexibleGrid
    constructor: (@gridClass = 'drm-flexible-grid', @imagesPerRow = 4, @flex = true) ->
        self = @
        self.grid = $ ".#{self.gridClass}"

        if self.grid.length isnt 0
            self.gridNav = $ '.drm-grid-nav'
            self.items = self.grid.find('.drm-grid-item').hide()
            hash = window.location.hash

            $(window).load ->
                self.tags = self.getTags()
                filter = if hash then hash.replace /^#/, '' else null
                self.addFilterButtons self.tags
                self.filterListItems filter

                if filter
                    activeButton = $("button.drm-grid-filter[data-filter=#{filter}]")
                    activeButton.siblings('button').removeClass 'active'
                    activeButton.addClass 'active'

            if self.flex
                $(window).resize ->
                    items = self.grid.find '.drm-grid-item'
                    self.positionListItems items
                    self.resizeCurtain()

            $(window).load self.resizeCurtain

            self.grid.on 'mouseenter', '.drm-grid-item', ->
                $(@).find('.curtain').stop().fadeIn 'fast'

            self.grid.on 'mouseleave', '.drm-grid-item', ->
                $(@).find('.curtain').stop().fadeOut 'fast'

            self.gridNav.on 'click', 'button.drm-grid-filter', ->
                that = $ @
                filter = that.data('filter').toLowerCase()
                self.filterListItems filter
                that.siblings('button').removeClass 'active'
                that.addClass 'active'

    getTags: =>
        self = @
        tags = []
        tagListItems = self.grid.find 'ul.caption-tags li'

        $.each tagListItems, (key, value) ->
            tag = $(value).text()
            tags.push tag
            $.unique tags

        tags

    addFilterButtons: (tags) =>
        self = @

        _capitalize = (str) ->
            str.toLowerCase().replace /^.|\s\S/g, (a) ->
                a.toUpperCase()

        $.each tags, (key, value) ->
            tagButton = $ '<button></button>',
                class: 'drm-grid-filter'
                text: _capitalize value
                'data-filter': value
            tagButton.appendTo self.gridNav

        self.gridNav.find('.drm-grid-filter').first().addClass 'active'

    resizeCurtain: =>
        curtain = @grid.find '.curtain'

        $.each curtain, (key, value) ->
            that = $ value
            holder = that.parent '.drm-grid-item'
            imageHeight = holder.find('img').height()

            that.height(imageHeight).hide()

    addListItems: (items) =>
        self = @
        @grid.empty()
        items.appendTo(@grid).hide 0, ->
            self.positionListItems items

    positionListItems: (items) =>
        self = @

        # add height to grid holder to accomodate images
        _resizeHolder = (items) ->
            tallestColumn = 0
            columnHeights = []

            i = 0
            until i is self.imagesPerRow 
                columnHeights.push 0
                i = i + 1
            
            $.each items, (key, value) ->
                that = $ value
                columnNum = that.data 'column'
                height = that.outerHeight true

                columnHeights[columnNum] += height

            $.each columnHeights, (key, value) ->
                if value > tallestColumn
                    tallestColumn = value
                    tallestColumn

            self.grid.css 'height': tallestColumn + 40

        # need to keep track of column length so that any one column doesn't get too long

        $.each items, (key, value) ->
            that = $ value
            index = key + 1
            columnNum = if index % self.imagesPerRow is 0 then self.imagesPerRow - 1 else (index % self.imagesPerRow) - 1
            that.attr 'data-column', columnNum
            that.attr 'data-num', index
            prevImage = if index > self.imagesPerRow then self.grid.find('.drm-grid-item').eq(index - (self.imagesPerRow + 1)) else null
            
            if prevImage?
                margin = prevImage.outerWidth(true) - prevImage.outerWidth(false)
                top = if index < ((self.imagesPerRow * 2) + 1) then prevImage.outerHeight(false) + margin else prevImage.outerHeight(false) + margin + prevImage.position().top
                left = (prevImage.outerWidth(false) * columnNum) + (margin * columnNum)

                that.css
                    'top': top
                    'left': left
                    'position': 'absolute'
            else
                that.css
                    'top': 0
                    'left': 0
                    'position': 'relative'

            that.show()

        _resizeHolder items

    filterListItems: (filter) =>
        # filter images by tag
        filter = if window.location.hash then filter else 'all'
        window.location.hash = filter

        if filter in @tags or filter is 'all'
            filteredItems = if filter is 'all' then @items else @items.has "ul.caption-tags li:containsNC(#{filter})"
            @addListItems filteredItems
        else
            $('<p></p>',
                text: 'no items match').appendTo @grid
        

new DrmFlexibleGrid()