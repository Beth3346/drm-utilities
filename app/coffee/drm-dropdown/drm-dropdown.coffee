( ($) ->
	menu = $ '.drm-dropdown-nav'
	listItem = menu.children 'li:has(ul)'
	link = listItem.children 'a'
	dropdown = listItem.children 'ul'
	nestedListItem = dropdown.children 'li:has(ul)'
	nestedDropdown = nestedListItem.children 'ul'
	nestedLink = nestedListItem.children 'a'
	speed = 1000

	link.addClass 'carat'
	nestedLink.addClass 'carat-right'	

	listItem.on 'mouseenter', ->
		$(@).find(dropdown).fadeIn()

	listItem.on 'mouseleave', ->
		$(@).find(dropdown).fadeOut speed

	link.on 'click', (e) ->
		e.preventDefault()

	nestedListItem.on 'mouseenter', ->
		$(@).find(nestedDropdown).fadeIn()

	nestedListItem.on 'mouseleave', ->
		$(@).find(nestedDropdown).fadeOut speed

	nestedLink.on 'click', (e) ->
		e.preventDefault()

) jQuery