(function($) {
    'use strict';

    var elrValidationUtilities = function() {
        var self = {};

        self.evaluate = function(result, value, validate, errorMessage) {

            if ( result && ( value === result ) ) {
                validate.message = null;
                validate.status = 'success';
            } else {
                validate.message = errorMessage;
                validate.status = 'danger';
            }

            return validate;
        };

        self.validate = function(value, issuer, errorMessage) {
            var validate = {
                status: null,
                message: null,
                issuer: issuer
            };

            if ( value ) {
                var result;

                if ( elr.patterns[issuer].exec(value) ) {
                    result = elr.trim(elr.patterns[issuer].exec(value)[0]);
                }

                return self.evaluate(result, value, validate, errorMessage);
            } else {
                return false;
            }
        };

        self.required = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

            if ( !value ) {
                validate.message = 'this field is required';
                validate.status = 'danger';
            } else {
                validate.status = 'success';
            }

            return validate;
        };

        self.integer = function(value) {
            self.validate(value, 'integer', 'value should be a valid integer');
        };

        self.number = function(value) {
            self.validate(value, 'number', 'value should be a valid number');
        };

        self.url = function(value) {
            self.validate(value, 'url', 'value should be a valid url');
        };

        self.email = function(value) {
            self.validate(value, 'email', 'value should be a valid email');
        };

        self.phone = function(value) {
            self.validate(value, 'phone', 'value should be a valid phone');
        };

        self.fullName = function(value) {
            self.validate(value, 'fullName', 'value should be a valid full name');
        };

        self.alpha = function(value) {
            self.validate(value, 'alpha', 'value should be a valid alpha');
        };

        self.alphaNum = function(value) {
            self.validate(value, 'alphaNum', 'value should be a valid alphaNum');
        };

        self.alphaNumDash = function(value) {
            self.validate(value, 'alphaNumDash', 'value should be a valid alphaNumDash');
        };

        self.spaces = function(value) {
            self.validate(value, 'spaces', 'value should be a valid spaces');
        };

        self.alphaNumUnderscore = function(value) {
            self.validate(value, 'alphaNumUnderscore', 'value should be a valid alphaNumUnderscore');
        };

        self.tags = function(value) {
            self.validate(value, 'tags', 'value should be a valid tags');
        };

        self.monthDayYear = function(value) {
            self.validate(value, 'monthDayYear', 'value should be a valid monthDayYear');
        };

        self.time = function(value) {
            self.validate(value, 'time', 'value should be a valid time');
        };

        self.creditCard = function(value) {
            self.validate(value, 'creditCard', 'value should be a valid credit card number');
        };

        self.cvv = function(value) {
            self.validate(value, 'cvv', 'value should be a valid cvv');
        };

        self.postalCode = function(value) {
            self.validate(value, 'postalCode', 'value should be a valid postalCode');
        };

        self.equal = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };
        };

        self.notEqual = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.checkbox = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.radio = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.selectInput = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.inList = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.notList = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.requiredWith = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.allowedWith = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.maxValue = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.minValue = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.betweenValue = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.maxLength = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.minLength = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        self.betweenLength = function(value) {
            var validate = {
                status: null,
                message: null,
                issuer: 'required'
            };

        };

        return self;
    };

    window.elrVal = elrValidationUtilities();
})(jQuery);