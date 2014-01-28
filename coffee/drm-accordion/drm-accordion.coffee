###############################################################################
# Toggles hiding and showing content with an accordion efffect
###############################################################################

$ = jQuery
win = $ window
accordion = $ '.drm-accordion'
label = $ '.drm-accordion-label'
content = $ '.drm-accordion-inner'
defaultState = accordion.data 'state'
hideButton = $ 'button.drm-hide-all'
showButton = $ 'button.drm-show-all'

# Initialize

# if no defaultState value is supplied, hide content

if defaultState == 'collapse'
	content.hide()
else if defaultState == 'expanded'
	content.show()
else 
	content.hide()

# Toggle Accordion State

label.click ->
	that = $ this
	that.next().slideToggle()

showButton.click ->
	content.show()

hideButton.click ->
	content.hide()					