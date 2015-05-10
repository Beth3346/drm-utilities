(function($) {
    window.elrDropdownButton = function(params) {
        var self = {};
        var spec = params || {};
        var containerClass = spec.containerClass || 'elr-dropdown-solid-btn-holder';
        var speed = spec.speed || 300;
        var button = spec.button || 'button';
        var activeClass = spec.activeClass || 'clicked';
        var $container = $('.' + containerClass);

        if ( $container.length ) {
            $container.on('click', button, function(e) {
                var $that = $(this);
                var $menu = $that.next('ul');
                var $openButtons = $container.find('ul').not(':hidden').prev('button');

                $menu.slideDown(speed);
                $that.addClass(activeClass);

                if ( $openButtons.length ) {
                    $openButtons.removeClass(activeClass);
                    $openButtons.next('ul').slideUp(speed);
                }
                
                e.preventDefault();
                e.stopPropagation();
            });

            $('body').on('click', function(e) {
                var $openButtons = $container.find('ul').not(':hidden').prev('button');

                if ( $openButtons.length ) {
                    $openButtons.removeClass(activeClass);
                    $openButtons.next('ul').slideUp(speed);
                }

                e.stopPropagation();
            });
        }

        return self;
    };
})(jQuery);