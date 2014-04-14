###############################################################################
# Password utility
###############################################################################
"use strict"

( ($) ->
    class window.DrmPasswords
        constructor: (@password = $(':input.drm-password')) ->
            self = @
            self.button = 'button.show-password'

            $('form').on 'click', self.button, self.showPassword
            @password.on 'keyup', self.createMeter

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

        getPassword: =>
            $.trim @password.val()

        checkBlacklist: (password) ->
            blacklist = [
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

            $.inArray password.toLowerCase(), blacklist

        checkLength: (password, length) ->
            passwordLength = password.length

            if passwordLength < length
                true
            else
                false

        checkStrength: (password) ->
            patterns =
                number: new RegExp '^\\d*$','g'
                alphaLower: new RegExp '^[a-z]*$','g'
                alphaUpper: new RegExp '^[A-Z]*$','g'

            if patterns.number.test password
                true
            else if patterns.alphaLower.test password
                true
            else if patterns.alphaUpper.test password
                true
            else
                false

        evaluatePassword: =>
            password = @getPassword()
            blacklist = @checkBlacklist password
            complexity = @checkStrength password
            length = @checkLength password, 7
            results =
                message: null
                strength: null

            if blacklist isnt -1
                results.strength = 'weak'
                results.message = 'please do not use a common password'
            else if complexity
                results.strength = 'weak'
                results.message = 'use a combination of uppercase and lowercase letters, numbers, and special characters'
            else if length
                results.strength = 'weak'
                results.message = 'not enough characters'
            else
                results.strength = 'strong'
                results.message = 'great password'

            results

        createMeter: =>
            password = @getPassword()
            length = password.length
            results = @evaluatePassword()
            resultsHolder = $ 'small.password-meter'

            if resultsHolder.length is 0 and results.message isnt null

                resultsHolder = $ '<small></small>',
                    text: results.message + results.message
                    class: 'password-meter'

                resultsHolder.hide().insertAfter(@password).show()

            else if results.message is null or length is 0
                resultsHolder.remove()
            else
                resultsHolder.text results.message

    new DrmPasswords()

) jQuery