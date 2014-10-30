validateRequired: (value) ->
    validate =
        status: null
        message: null
        issuer: 'required'

    if !value
        validate.message = 'this field is required'
        validate.status = 'danger'
    
    validate

validateInteger: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'integer'

    _evaluate = (result, value) ->
        if result and value is result
            validate.message = null
            validate.status = 'success'
        else
            validate.message = 'please enter a valid integer'
            validate.status = 'danger'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateNumber: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'number'

    _evaluate = (result, value) ->
        if result and value is result
            validate.message = null
            validate.status = 'success'
        else
            validate.message = 'please enter a valid number'
            validate.status = 'danger'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateURL: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'url'

    _evaluate = (result, value) ->
        if result and value is result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please enter a valid url'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateEmail: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'email'

    _evaluate = (result, value) ->
        if result and value is result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please enter a valid email address'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validatePhone: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'phone'

    _evaluate = (result, value) ->
        if result and value is result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please enter a valid phone number'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateFullName: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'fullName'

    _evaluate = (result, value) ->
        if result and value is result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please enter your first and last name'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateAlpha: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'alpha'

    _evaluate = (result, value) ->
        if result and value is result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please use alpha characters only'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateAlphaNum: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'alphanum'

    _evaluate = (result, value) ->
        if result and value is result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please use alphanumeric characters only'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateNoSpaces: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'noSpaces'

    _evaluate = (result, value) ->
        if result and value is result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'no spaces'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateAlphaNumDash: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'alphaNumDash'

    _evaluate = (result, value) ->
        if result and value is result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please use alphanumeric and dash characters only'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateAlphaNumUnderscore: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'alphaNumUnderscore'

    _evaluate = (result, value) ->
        if result and value is result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please use alphanumeric and underscores only. no spaces'                    
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateNoTags: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'number'

    _evaluate = (result) ->                
        if result
            validate.status = 'danger'
            validate.message = 'no html tags allowed'
        else
            validate.message = null
            validate.status = 'success'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateMonthDayYear: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'date'

    _evaluate = (result) ->                
        if result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please provide a valid date'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateTime: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'time'

    _evaluate = (result) ->                
        if result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please provide a valid time'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateCreditCard: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'creditCard'

    _evaluate = (result) ->                
        if result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please provide a valid credit card number'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateCvv: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'cvv'

    _evaluate = (result) ->                
        if result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please provide a valid cvv'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateZip: (value, pattern) ->
    validate =
        status: null
        message: null
        issuer: 'zip'

    _evaluate = (result) ->                
        if result
            validate.message = null
            validate.status = 'success'
        else
            validate.status = 'danger'
            validate.message = 'please provide a valid zip code'
        validate

    if value?
        pattern = new RegExp pattern
        result = $.trim pattern.exec value
        _evaluate result, value

validateEqual: (value) ->
    that = $ @
    equal = that.data 'equal'
    validate =
        status: null
        message: null
        issuer: 'equal'

    _evaluate = (equal, value) ->
        if value == equal  
            validate.message = null
            validate.status = 'success'                
        else
            validate.status = 'danger'
            validate.message = "this field should be #{equal}"
        validate

    if value?
        _evaluate equal, value

validateNotEqual: (value) ->
    that = $ @
    notEqual = that.data 'not-equal'
    validate =
        status: null
        message: null
        issuer: 'notEqual'

    _evaluate = (notEqual, value) ->
        if value == notEqual
            validate.status = 'danger'
            validate.message = "this field cannot be #{notEqual}"                   
        else
            validate.message = null
            validate.status = 'success'
        validate

    if value?
        _evaluate notEqual, value

validateCheckbox: () ->

validateRadio: () ->

validateSelect: () ->

validateInList: (value) ->
    that = $ @
    list = that.data 'in-list'
    listItems = []
    listItems = list.split ','

    validate =
        status: null
        message: null
        issuer: 'inList'

    _evaluate = (listItems, value) ->
        if $.inArray(value, listItems) is -1
            list = listItems.join ', '
            validate.status = 'danger'
            validate.message = "this field should be one of these: #{list}"                   
        else
            validate.message = null
            validate.status = 'success'
        validate

    if value?
        _evaluate listItems, value

validateNotList: (value) ->
    that = $ @
    list = that.data 'not-list'
    listItems = []
    listItems = list.split ','

    validate =
        status: null
        message: null
        issuer: 'notList'

    _evaluate = (listItems, value) ->
        if $.inArray(value, listItems) isnt -1
            list = listItems.join ', '
            validate.status = 'danger'
            validate.message = "this field cannot be one of these: #{list}"                   
        else
            validate.message = null
            validate.status = 'success'
        validate

    if value?
        _evaluate listItems, value

validateRequiredWith: (value) ->
    that = $ @
    requiredWith = that.data 'required-with'
    validate =
        status: null
        message: null
        issuer: 'not-equal'

    if requiredWith.search(':') isnt -1
        requiredWith = requiredWith.split ':'
        fieldID = requiredWith[0]
        fieldValue = requiredWith[1]
    else
        fieldID = requiredWith

    _evaluate = (value, fieldID, fieldValue) ->
        field = $ "##{fieldID}"
        requiredFieldValue = $.trim field.val()

        checkValue = ->
            if not value
                validate.status = 'danger'
                validate.message = "this field is required with #{fieldID}"
            else
                validate.message = null
                validate.status = 'success'
            validate

        if fieldValue? and (requiredFieldValue is fieldValue)
            validate = checkValue()
        else if requiredFieldValue.length > 0 and (not fieldValue?)
            validate = checkValue()
        else if requiredFieldValue.length == 0
            validate.message = null
            validate.status = 'success'
        
        validate

    _evaluate value, fieldID, fieldValue

validateMaxValue: (value) ->
    that = $ @
    max = that.data 'max-value'
    validate =
        status: null
        message: null
        issuer: 'maxValue'

    _evaluate = (max, value) ->
        if value > max
            validate.status = 'danger'
            validate.message = "please enter a value that is less than #{max + 1}"                    
        else
            validate.message = null
            validate.status = 'success'
        validate

    if value?
        _evaluate max, value

validateMinValue: (value) ->
    that = $ @
    min = that.data 'min-value'
    validate =
        status: null
        message: null
        issuer: 'minValue'

    _evaluate = (min, value) ->                
        if value < min
            validate.status = 'danger'
            validate.message = "please enter a value of at least #{min}"
        else
            validate.message = null
            validate.status = 'success'
        validate

    if value?
        _evaluate min, value

validateBetweenValue: (value) ->
    that = $ @
    min = that.data 'min-value'
    max = that.data 'max-value'
    validate =
        status: null
        message: null
        issuer: 'betweenValue'

    _evaluate = (min, max, value) ->                
        if (value < min) or (value > max)
            validate.status = 'danger'
            validate.message = "please enter a value that is between #{min - 1} and #{max + 1}"
        else
            validate.message = null
            validate.status = 'success'
        validate

    if value?
        _evaluate min, max, value

validateMaxLength: (value) ->
    that = $ @
    max = that.data 'max-length'
    validate =
        status: null
        message: null
        issuer: 'maxLength'

    _evaluate = (max, length) ->                
        if length > max
            validate.status = 'danger'
            validate.message = "please enter less than #{max + 1} characters"
        else
            validate.message = null
            validate.status = 'success'
        validate

    if value?
        length = value.length
        _evaluate max, length

validateMinLength: (value) ->
    that = $ @
    min = that.data 'min-length'
    validate =
        status: null
        message: null
        issuer: 'minLength'

    _evaluate = (min, length) ->                
        if length < min
            validate.status = 'danger'
            validate.message = "please enter at least #{min} characters"
        else
            validate.message = null
            validate.status = 'success'
        validate

    if value?
        length = value.length
        _evaluate min, length

validateBetweenLength: (value) ->
    that = $ @
    min = that.data 'min-length'
    max = that.data 'max-length'
    validate =
        status: null
        message: null
        issuer: 'betweenLength'

    _evaluate = (min, max, length) ->                
        if (length < min) or (length > max)
            validate.status = 'danger'
            validate.message = "please enter a value that is between #{min - 1} and #{max + 1} characters"
        else
            validate.message = null
            validate.status = 'success'
        validate

    if value?
        length = value.length
        _evaluate min, max, length