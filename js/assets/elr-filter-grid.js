import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

$.extend($.expr[':'], {
    containsNC: function(elem, i, match) {
        return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
    }
});

const elrFilterGrid = function(params) {
    const self = {};
    const spec = params || {};
    const gridClass = spec.gridClass || 'elr-flexible-grid';
    const $grid = $(`.${gridClass}`);

    const addListItems = function($items) {
        $grid.empty();
        $items.appendTo($grid);
    };

    const addFilterButtons = function(tags, $nav) {

        $.each(tags, function(k, v) {
            const $tagButton = $('<button></button>', {
                'class': 'elr-grid-filter',
                'text': elr.capitalize(v),
                'data-filter': v
            });

            $tagButton.appendTo($nav);
        });

        $nav.find('.elr-grid-filter').first().addClass('active');
    };

    const filterListItems = function(filter, $items, tags) {
        // filter list items by tag
        let $filteredItems;

        window.location.hash = filter;

        if (($.inArray(filter, tags) !== -1) || filter === 'all') {
            if (filter === 'all') {
                $filteredItems = $items;
            } else {
                $filteredItems = $items.has(`ul.caption-tags li:containsNC(${filter})`);
            }

            addListItems($filteredItems);
        } else {
            $('<p></p>', {
                text: 'no items match'
            }).appendTo($grid);
        }
    };

    const setActiveButton = function(button, $buttons) {
        const $button = $buttons.find(`button[data-filter=${button}]`);

        $button.siblings('button').removeClass('active');
        $button.addClass('active');
    }

    if ($grid.length) {
        const hash = window.location.hash;
        const $gridNav = $('.elr-grid-nav');
        const $items = $grid.find('.elr-grid-item');
        const tags = elr.unique(elr.toArray($grid.find('ul.caption-tags li')));
        let filter = (window.location.hash) ? filter : 'all';

        $(window).on('load', function() {
            addFilterButtons(tags, $gridNav);

            if (hash) {
                filterListItems(hash.slice(1), $items, tags);
                setActiveButton(hash.slice(1), $gridNav);
            }

            if (typeof filter !== 'undefined') {
                setActiveButton('all', $gridNav);
            }
        });

        $gridNav.on('click', 'button.elr-grid-filter', function(e) {
            e.preventDefault();
            const $that = $(this);
            const filter = $that.data('filter').toLowerCase();

            filterListItems(filter, $items, tags);
            setActiveButton(filter, $gridNav);
        });

        $grid.on('click', '.caption-tags li', function(e) {
            e.preventDefault();
            const filter = $(this).data('filter').toLowerCase();

            filterListItems(filter, $items, tags);
            setActiveButton(filter, $gridNav);
        });
    }

    return self;
};

export default elrFilterGrid;