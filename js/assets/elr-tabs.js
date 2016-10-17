const $ = require('jquery');

const elrTabs = function(params) {
    const self = {};
    const spec = params || {};
    const holderClass = spec.holder || 'elr-tabs';
    const activeClass = spec.activeClass || 'active';
    const speed = spec.speed || 300;
    const $holders = $(`.${holderClass}`);

    const getTarget = function() {
        return $(this).attr('href');
    };

    const updateHash = function(target) {
        // const scrollmem = $('html, body').scrollTop();

        window.location.hash = target;

        // $('html, body').scrollTop(scrollmem);
    };

    const setActive = function(activeClass, $nav, currentId, target) {
        $nav.find(`a[href='${currentId}']`).removeClass(activeClass);
        $nav.find(`a[href='${target}']`).addClass(activeClass);
    };

    const changeTab = function($holder, target, speed) {
        const $tab = $holder.find(`section${target}`);
        const $currentTab = $holder.find('section').not(':hidden');
        const currentId = `#${$currentTab.attr('id')}`;

        $currentTab.fadeOut(speed, function() {
            $tab.fadeIn(speed);
        });

        return currentId;
    };

    const setupTabs = function($containers, activeClass) {
        const hash = window.location.hash;

        $.each($containers, function() {
            const $that = $(this);
            const $tabs = $that.find('section');
            const hashTab = $that.find('nav').find(`a[href='${hash}']`);

            $tabs.hide();

            if ( hashTab.length ) {
                $that.find(`section${hash}`).show();
                $that.find('nav').find(`a[href='${hash}']`).addClass(activeClass);
            } else {
                $that.find('nav').find('a[href^="#"]').first().addClass(activeClass);
                $tabs.first().show();
            }
        });
    };

    if ( $holders.length ) {
        setupTabs($holders, activeClass);

        $holders.on('click', 'nav a[href^="#"]', function(e) {
            e.preventDefault();
            const $that = $(this);
            const $parent = $that.closest(`.${holderClass}`);
            const target = getTarget.call(this);
            const currentId = changeTab($parent, target, speed);

            setActive(activeClass, $parent.find('nav'), currentId, target);
            updateHash(target);
        });
    }

    return self;
};

export default elrTabs;