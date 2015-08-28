(function($) {
    'use strict';
    
    window.elrTableFilter = function(params) {
        var self = {};
        var spec = params || {};
        var tableClass = spec.tableClass || 'elr-searchable-table';
        var searchInput = spec.searchInput || 'elr-search-table';
        var $table = $('.' + tableClass);

        var getFilterValues = function($inputs) {
            var filterValues = [];

            $.each($inputs, function(k,v) {
                var $that = $(v);

                if ( $.trim($that.val()).length ) {
                    filterValues.push(v);
                }

                return filterValues;
            });

            return filterValues;
        };

        var getRows = function($fullRows, filterValues) {
            var $newRows;
            
            $.each(filterValues, function(k,v) {
                var $that = $(v);
                var input = $.trim($that.val()).toLowerCase();
                var columnNum = $that.closest('th').index();

                if ( filterValues.length === 1 ) {
                    $newRows = $fullRows.has('td:eq(' + columnNum + '):containsNC(' + input + ')');
                } else if ( k === 0 ) {
                    $newRows = $fullRows.has('td:eq(' + columnNum + '):containsNC(' + input + ')');
                } else {
                    $newRows = $newRows.has('td:eq(' + columnNum + '):containsNC(' + input + ')');
                }

                return $newRows;
            });

            return $newRows;
        };

        var filterRows = function($fullRows, filterValues) {

            if ( filterValues.length === 0 ) {
                return $fullRows;
            } else {
                return getRows($fullRows, filterValues);
            }
        };

        var renderTable = function($table, $filteredRows) {
            var $tableBody = $table.find('tbody').empty();

            $.each($filteredRows, function(k,v) {
                $tableBody.append(v);
            });
        };

        $table.each(function() {
            var $that = $(this);
            var $fullRows = $that.find('tbody tr');
            var $inputs = $that.find('th').find('.' + searchInput);

            $that.on('keyup', 'input.' + searchInput, function() {
                var filterValues = getFilterValues($inputs);
                var $filteredRows = filterRows($fullRows, filterValues);
                
                renderTable($that, $filteredRows);
            });
        });

        return self;
    };
})(jQuery);