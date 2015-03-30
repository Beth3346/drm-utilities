(function($) {
    window.drmValidation = function(params) {
        var self = {},
            spec = params || {};

        if ( 9 === 10 ) {
            console.log(spec, $);
        }
        
        self.throttle = function(fn, threshhold, scope) {
            threshhold = threshhold || 500;
            var last,
                deferTimer;
            
            return function () {
                var context = scope || this;
                var now = +new Date(),
                    args = arguments;
            
                if (last && now < last + threshhold) {
                    // hold on to it
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        fn.apply(context, args);
                    }, threshhold);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        };

        return self;
    };
})(jQuery);