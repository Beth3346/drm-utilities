// // classes filter

// (function ($) {
//     'use-strict';
//     var $classSection = $('.classes-section');
//     var $container = $classSection.find('.elr-container .elr-row');
//     var $fullClasses = $classSection.find('.class-holder');
//     var $classFilter = $('ul.classes-filter-list');
//     var appliedFilters = {
//         category: [],
//         level: [],
//         intensity: []
//     };

//     var applyFilters = function($fullClasses, appliedFilters) {
//         var $filteredByCategory = $();
//         var $filteredByLevel = $();
//         var $filteredByIntensity = $();

//         // for each applied filter add the matched elements

//         $.each(appliedFilters.category, function() {
//             $filteredByCategory = applyFilter($fullClasses, 'category', this).add($filteredByCategory);
//         });

//         $.each(appliedFilters.level, function() {
//             $filteredByLevel =  applyFilter($fullClasses, 'level', 'all').add($filteredByLevel);
//             $filteredByLevel = applyFilter($fullClasses, 'level', this).add($filteredByLevel);
//         });

//         $.each(appliedFilters.intensity, function() {
//             $filteredByIntensity = applyFilter($fullClasses, 'intensity', this).add($filteredByIntensity);
//         });

//         return $().add($filteredByLevel).add($filteredByIntensity).add($filteredByCategory);
//     };

//     var applyFilter = function($fullClasses, filterName, filterValue ) {
//         var filterString = '[data-' + filterName + '="' + filterValue + '"]';
//         return $fullClasses.filter(filterString);
//     };

//     var emptyClasses = function() {
//         var $viewFull = $('<p></p>', {
//             'class': 'view-full',
//             html: 'No classes match. <a href="#all" class="view-all">See a full list of classes</a>'
//         });

//         removeItems(function() {
//             $(this).remove();
//         });

//         if ( !$container.children('p.view-full').length ) {
//             appendItem($viewFull);
//         }
//     };

//     var removeItems = function(fn) {
//         $container.find('.class-holder').fadeOut(300, fn);
//     };

//     var appendItem = function($item) {
//         $item.appendTo($container).fadeIn();
//     };

//     var addFilter = function($filter) {
//         var filterTitle = $filter.closest('ul').data('filter');
//         var filterValue = $filter.data('filter');

//         appliedFilters[filterTitle].push(filterValue);
//     };

//     var removeFilter = function($filter) {
//         var filterTitle = $filter.closest('ul').data('filter');
//         var filterValue = $filter.data('filter');
//         var valueIndex = appliedFilters[filterTitle].indexOf(filterValue);

//         appliedFilters[filterTitle].splice(valueIndex, 1);
//     };

//     var isApplied = function($filter) {
//         var filterTitle = $filter.closest('ul').data('filter');
//         var filterValue = $filter.data('filter');
//         var valueIndex = appliedFilters[filterTitle].indexOf(filterValue);

//         if ( valueIndex !== -1 ) {
//             return true;
//         } else {
//             return false;
//         }
//     };

//     var clearFilters = function() {
//         appliedFilters = {
//             category: [],
//             level: [],
//             intensity: []
//         };
//     };

//     var resetItems = function($fullClasses) {
//         // add full list of classes back to container
//         $(this).parent('p').fadeOut(300, function() {
//             $(this).remove();
//             appendItem($fullClasses);
//         });

//         $classFilter.find('button').removeClass('active');

//         clearFilters();
//     };

//     $container.on('click', 'a.view-all', function(e) {
//         resetItems.call(this, $fullClasses);
//         e.preventDefault();
//     });

//     $classFilter.on('click', 'button', function(e) {
//         var $that = $(this);
//         var $classes;

//         $that.closest('ul').find('button');
//         $that.toggleClass('active');

//         if ( isApplied($that) ) {
//             removeFilter($that);
//         } else {
//             addFilter($that);
//         }

//         $classes = applyFilters( $fullClasses, appliedFilters );

//         if ( $classes.length ) {
//             removeItems(function() {
//                 $(this).remove();
//                 appendItem($classes);
//             });
//         } else {
//             emptyClasses();
//         }

//         e.preventDefault();
//     });
// })(jQuery);