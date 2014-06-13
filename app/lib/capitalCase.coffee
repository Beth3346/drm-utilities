capitalize: (str) ->
    str.toLowerCase().replace /^.|\s\S/g, (a) ->
        a.toUpperCase()