const $ = require('jquery');

const elrAccordionNav = function(params) {
    const self = {};
    const spec = params || {};
    const speed = spec.speed || 300;
    const containerClass = spec.containerClass || 'elr-accordion-nav';
    const expandIconClass = spec.expandIconClass  || 'fa-plus';
    const collapseIconClass = spec.collapseIconClass  || 'fa-minus';
    const iconClass = spec.iconClass || 'elr-accordion-icon';
    const contentHolderClass = contentHolderClass || 'elr-accordion-nav-inner';
    const $container = $(`.${containerClass}`);

    const showDefaultContent = function($expandedContent, $content) {
        $content.hide();
        $expandedContent.show();
    };

    const toggle = function(speed, $openContent) {
        const $that = $(this);
        const $nextContent = $that.next();

            $openContent.slideUp(speed);

            if ($nextContent.is(':hidden')) {
                $nextContent.slideDown(speed);
            } else {
                $nextContent.slideUp(speed);
            }
    };

    const replaceIcons = function($openContent, iconClass, expandIconClass, collapseIconClass) {
        const $that = $(this);
        const $icon = $that.find(`.${iconClass}`);
        const $openContentIcons = $openContent.prev().find(`.${iconClass}`);

        if ($icon.hasClass(expandIconClass)) {
            $icon.removeClass(expandIconClass).addClass(collapseIconClass);
        } else {
            $icon.removeClass(collapseIconClass).addClass(expandIconClass);
        }

        $openContentIcons.removeClass(collapseIconClass).addClass(expandIconClass);
    };

    // remove the hash mark from a url hash
    const trimHash = function(hash) {
        return hash.slice(0,1);
    }

    const getCurrent = function() {
        const location = window.location.pathname;
        const hash = window.location.hash;
        const startIndex = location.lastIndexOf('/') + 1;
        let currentPage;
        let $target;
        let $currentList;

        if (hash) {
            currentPage = location.slice(startIndex) + hash;
        } else if (location.slice(0,1) === '/') {
            currentPage = location.slice(startIndex);
        } else {
            currentPage = location;
        }

        $target = $container.find(`a[href="${currentPage}"]`).addClass('active');

        if ($target.length) {
            return $target.closest('ul').parent('li');
        } else if (hash) {
            // if the hash is not in the menu remove it and return the url
            currentPage = location.slice(startIndex);
            $target = $container.find(`a[href="${currentPage}"]`).addClass('active');

            return $target.closest('ul').parent('li');
        } else {
            return false;
        }
    };

    const showCurrent = function($currentList) {
        // if ($currentList) {
            $currentList.find('ul').show();
            $currentList.find(`.${iconClass}`).removeClass(expandIconClass).addClass(collapseIconClass);
        // }

        // return;
    };

    if ($container.length) {
        const $label = $container.children('ul')
            .children('li')
            .has('ul')
            .children('a');
        const $content = $label.next('ul');
        const $expandedContent = $container.find(`.${contentHolderClass}[data-state=expanded]`);
        let $currentList = getCurrent();
        const $icons = $label.find(`.${iconClass}`);

        if (!$currentList) {
            showDefaultContent($expandedContent, $content);
        } else {
            $content.hide();
            $icons.removeClass(collapseIconClass).addClass(expandIconClass);
            showCurrent($currentList);
        }

        $(window).on('hashchange', function(e){
            e.preventDefault();

            $container.find('a.active').removeClass('active');
            $currentList = getCurrent();
            $content.hide();
            $icons.removeClass(collapseIconClass).addClass(expandIconClass);
            showCurrent($currentList);
        });

        $label.on('click', function(e) {
            e.stopPropagation();
            e.preventDefault();

            const $openContent = $($content).not(':hidden');

            toggle.call(this, speed, $openContent);
            replaceIcons.call(this, $openContent, iconClass, expandIconClass, collapseIconClass);
        });
    }

    return self;
};

export default elrAccordionNav;