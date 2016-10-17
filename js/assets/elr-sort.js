import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

const elrSort = function(params) {
    const self = {};
    const spec = params || {};

    spec.listsClass = 'elr-sortable';
    spec.autoSort = true;
    spec.buttonClass = 'elr-sort-list';
    spec.activeClass = 'active';
    spec.ignoreWords = ['a', 'the'];

    const buttonClass = `.${spec.buttonClass}`;

    const toggleActiveClass = function(className, parent) {
        $(this).closest(parent).find(`.${className}`).removeClass(className).end().end().addClass(className);
    };

    const sortList = function(direction, $listItems) {
        const type = $listItems.parent().data('type');
        let types = [];

        if ( type ) {
            types.push(type);
        } else {
            types = ['date', 'time', 'number', 'alpha'];
        }

        return elr.sortComplexList(types, $listItems, direction);
    };

    const renderSort = function(sortedList, $list) {
        $list.empty();

        $.each(sortedList, function() {
            const value = elr.trim($(this).text());
            const $listItem = $('<li>', {
                text: value
            });

            $list.append($listItem);
        });
    };

    const $lists = $(`.${spec.listsClass}`);

    if ( spec.autoSort ) {
        $.each($lists, function() {
            const $list = $(this);
            const $listItems = $list.find('li');
            const $sortedList = sortList('ascending', $listItems);

            renderSort($sortedList, $list);
            $(`button.${spec.buttonClass}[data-sort='ascending']`).addClass(spec.activeClass);
        });
    }

    $('body').on('click', buttonClass, function() {
        const $that = $(this);
        const listId = $that.data('list');
        const $list = $(`ul#${listId}`);
        const direction = $that.data('sort');
        const $listItems = $list.find('li');
        const $sortedList = sortList(direction, $listItems);

        renderSort($sortedList, $list);
        toggleActiveClass.call(this, 'active', '.button-group');
    });

    return self;
};

export default elrSort;