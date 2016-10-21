import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

$.extend($.expr[':'], {
    containsNC: function(elem, i, match) {
        return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
    }
});

const elrTableFilter = function(params) {
    const self = {};
    const spec = params || {};
    const tableClass = spec.tableClass || 'elr-searchable-table';
    const searchInput = spec.searchInput || 'elr-search-table';
    const $table = $(`.${tableClass}`);

    const getFilterValues = function($inputs) {
        let filterValues = [];

        elr.each($inputs, function(k,v) {
            const $that = $(v);

            if ( elr.trim($that.val()).length ) {
                filterValues.push(v);
            }

            return filterValues;
        });

        return filterValues;
    };

    const getRows = function($fullRows, filterValues) {
        let $newRows;

        elr.each(filterValues, function(k,v) {
            const $that = $(v);
            const input = elr.trim($that.val()).toLowerCase();
            const columnNum = $that.closest('th').index();

            if ( filterValues.length === 1 ) {
                $newRows = $fullRows.has(`td:eq(${columnNum}):containsNC(${input})`);
            } else if ( k === 0 ) {
                $newRows = $fullRows.has(`td:eq(${columnNum}):containsNC(${input})`);
            } else {
                $newRows = $newRows.has(`td:eq(${columnNum}):containsNC(${input})`);
            }

            return $newRows;
        });

        return $newRows;
    };

    const filterRows = function($fullRows, filterValues) {

        if ( filterValues.length === 0 ) {
            return $fullRows;
        } else {
            return getRows($fullRows, filterValues);
        }
    };

    const renderTable = function($table, $filteredRows) {
        const $tableBody = $table.find('tbody').empty();

        elr.each($filteredRows, function(k,v) {
            $tableBody.append(v);
        });
    };

    $table.each(function() {
        const $that = $(this);
        const $fullRows = $that.find('tbody tr');
        const $inputs = $that.find('th').find(`.${searchInput}`);

        $that.on('keyup', `input.${searchInput}`, function() {
            const filterValues = getFilterValues($inputs);
            const $filteredRows = filterRows($fullRows, filterValues);

            renderTable($that, $filteredRows);
        });
    });

    return self;
};

export default elrTableFilter;