(function($) {
    drmUtilties.getDataTypes = function(listItems, type) {
        var values = function(listItems) {
                // creates an array of values from list items
                values = [];

                listItems.each(function() {
                    var _that = $(this);
                    
                    values.push($.trim(_that.text()));

                    return values;
                });             
            },
            types = [];

        if (typeof types !== 'undefined') {
            types.push(type);
        // } else {
        //     $.each(values, function() {
        //         if dataTypeChecks.isDate.call self, @ 
        //             types.push 'date'
        //         else if dataTypeChecks.isTime.call self, @
        //             types.push 'time'
        //         else if dataTypeChecks.isNumber.call self, @
        //             types.push 'number'
        //         else if dataTypeChecks.isAlpha.call self, @
        //             types.push 'alpha'
        //         else
        //             types.push null
        //     });
        }

    };
})(jQuery);