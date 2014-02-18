(($) ->

	$('a.more-link').click ->
		link = $ @
		prefix = 'psm_rmpi'

		link.html 'loading...'

		post_id = link.data 'post'

		data = {
			action: "#{prefix}_ajax"
			post_id: post_id
		}

		$.get(prefix.ajaxurl, data, (data) ->
			excerpt = $ "div.post-excerpt#{post_id}"
			data = "<div class='post-content#{post_id}'>#{data}</div><button class='hide-link hide-content #{post_id}'>Hide Article</button>"

			excerpt.before(data).slideUp 'slow'

			hideButton = $('button.hide-content' + post_id).click ->
				$("div.post-content#{post_id}").slideUp('slow', ->
					$(@).remove()
					hideButton.remove()
					$("div.post-excerpt#{post_id}").slideDown 'slow'
					link.html 'Read More'

					return
				)
				
				return

			return	
		)
		
		return false
	return	
) jQuery 		