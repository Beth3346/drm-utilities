const $ = require('jquery');

const elrTableFilter = function(params) {
    const self = {};
    const spec = params || {};
    const tableClass = spec.tableClass || 'elr-searchable-table';
    const searchInput = spec.searchInput || 'elr-search-table';
    const $table = $(`.${tableClass}`);

    const getFilterValues = function($inputs) {
        let filterValues = [];

        $.each($inputs, function(k,v) {
            const $that = $(v);

            if ( $.trim($that.val()).length ) {
                filterValues.push(v);
            }

            return filterValues;
        });

        return filterValues;
    };

    const getRows = function($fullRows, filterValues) {
        let $newRows;

        $.each(filterValues, function(k,v) {
            const $that = $(v);
            const input = $.trim($that.val()).toLowerCase();
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

        $.each($filteredRows, function(k,v) {
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