removeParent: (speed) -> 
    $(@).parent().fadeOut speed, ->
        $(@).remove()