###############################################################################
# Password utility
###############################################################################
"use strict"

( ($) ->
    class window.DrmPasswords
        constructor: (@password = $(':input.drm-password')) ->
            self = @
            self.button = 'button.show-password'

            @blacklist = [
                'password',
                'pass',
                '1234',
                'shadow'
                '12345'
                '123456'
                'qwerty'
                '1234'
                'iloveyou'
                'abc123'
                '123456789'
                '1234567890'
                'adobe123'
                '123123'
                'admin'
                'letmein'
                'photoshop'
                'monkey'
                'sunshine'
                'princess'
                'password1'
                'azerty'
                'trustno1'
                '000000'
                'guest'
                'default'
            ]

            $('form').on 'click', self.button, self.showPassword
            @password.on 'keyup', self.evaluatePassword

        showPassword: (e) =>
            fieldType = @password.attr 'type'
            button = $ @button

            if fieldType is 'password'
                @password.attr 'type', 'text'
                button.text 'Hide Password'
            else
                @password.attr 'type', 'password'
                button.text 'Show Password'

            e.preventDefault()

        evaluatePassword: =>
            password = $.trim @password.val()
            blacklist = $.inArray password.toLowerCase(), @blacklist
            strength = null
            length = password.length

            patterns =
                number: new RegExp '^\\d*$','g'
                alphaLower: new RegExp '^[a-z]*$','g'

            if blacklist isnt -1
                strength = 0
                console.log 'please do not use a common password'
            else if patterns.number.test password
                strength = 0
                console.log 'add some letters or special characters'
            else if patterns.alphaLower.test password
                strength = 0
                console.log 'add some uppercase letters, numbers and special characters'
            else if length < 6
                strength = 0
                console.log 'not enough characters'
            else
                if (length - 6) < 10
                    strength = length - 6
                else
                    strength = 10

            console.log "Strength: #{strength}"

    new DrmPasswords()

) jQuery