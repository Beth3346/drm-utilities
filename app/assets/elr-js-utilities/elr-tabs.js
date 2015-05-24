(function($) {
    window.elrTabs = function(params) {
        var self = {};
        var spec = params || {};
        var holderClass = spec.holder || 'elr-tabs';
        var activeClass = spec.activeClass || 'active';
        var speed = spec.speed || 300;
        var $holders = $('.' + holderClass);

        var getTarget = function() {
            return $(this).attr('href');
        };

        var updateHash = function(target) {
            window.location.hash = target;
        };

        var setActive = function(activeClass, $nav, currentId, target) {
            $nav.find('a[href=' + currentId + ']').removeClass(activeClass);
            $nav.find('a[href="' + target + '"]').addClass(activeClass);
        };

        var changeTab = function($holder, target, speed) {
            var $tab = $holder.find('section' + target);
            var $currentTab = $holder.find('section').not(':hidden');
            var currentId = '#' + $currentTab.attr('id');

            $currentTab.fadeOut(speed, function() {
                $tab.fadeIn(speed);
            });

            return currentId;
        };

        var setupTabs = function($containers, activeClass) {
            var hash = window.location.hash;

            $.each($containers, function() {
                var $that = $(this);
                var $tabs = $that.find('section');
                var hashTab = $that.find('nav').find('a[href="' + hash + '"]');

                $tabs.hide();

                if ( hashTab.length ) {
                    $that.find('section' + hash).show();
                    $that.find('nav').find('a[href="' + hash + '"]').addClass(activeClass);
                } else {
                    $that.find('nav').find('a[href^="#"]').first().addClass(activeClass);
                    $tabs.first().show();
                }
            });
        };

        if ( $holders.length ) {
            setupTabs($holders, activeClass);

            $holders.on('click', 'nav a[href^="#"]', function(e) {
                var $that = $(this);
                var $parent = $that.closest('.' + holderClass);
                var target = getTarget.call(this);
                var currentId = changeTab($parent, target, speed);

                setActive(activeClass, $parent.find('nav'), currentId, target);
                updateHash(target);
                e.preventDefault();
            });
        }

        return self;
    };
})(jQuery);