###############################################################################
# Base Scripts
###############################################################################

( ($) ->

	disabledLinks = $('a.text-disabled')

	disabledLinks.click (event) ->
		event.preventDefault()
		
	prettyPrint()	
) jQuery