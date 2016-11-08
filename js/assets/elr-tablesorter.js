import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

const elrTableSorter = function(params) {
    const self = {};
    const spec = params || {};
    const $table = spec.table || $('.elr-sortable-table');
    const buttonClass = spec.buttonClass || 'elr-sortable-table-button';
    const activeClass = spec.activeClass || 'active';

    const toggleActiveClass = function(className, $parent) {
        $(this).closest($parent).find(`.${className}`).removeClass(className);
        $(this).addClass(className);
    };

    const sortComplexList = function($listItems, dir, columnNum, types) {
        const that = this;
        const sortLists = {};

        elr.createArrays(sortLists, types);

        $.each($listItems, function() {
            const listItem = this;
            const value = $.trim($(listItem).find('td').eq(columnNum).text());

            $.each(types, function() {
                if ( elr.dataTypeChecks[`is${elr.capitalize(this)}`].call(that, value) ) {
                    sortLists[this].push(listItem);
                }

                return sortLists;
            });
        });

        $.each(sortLists, function(k) {
            elr.comparators[`sortColumn${elr.capitalize(k)}`](sortLists[k], dir, columnNum);
        });

        return elr.concatArrays(sortLists);
    };

    const renderSort = function($sortedRows, $table) {
        $table.empty();

        $.each($sortedRows, function() {
            $table.append(this);
        });
    };

    $table.on('click', `.${buttonClass}`, function(e) {
        e.preventDefault();

        const $that = $(this);
        const $parentTable = $that.closest('table');
        const $tableBody = $parentTable.find('tbody');
        const $rows = $tableBody.find('tr');
        const columnNum = $that.closest('th').index();
        const type = $parentTable.find('th').eq(columnNum).data('type');
        const $list = elr.getColumnList(columnNum, $rows);
        const values = elr.getListValues($list);
        const types = elr.getDataTypes(values, type);
        const $sortedRows = sortComplexList($rows, $that.data('dir'), columnNum, types);

        toggleActiveClass.call(this, activeClass, 'tr');
        renderSort($sortedRows, $tableBody);
    });

    return self;
};

export default elrTableSorter;