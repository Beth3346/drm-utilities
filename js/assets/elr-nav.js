// export default elrNav = function(params) {
//     let self = {};
//     const spec = params || {};

//     self.speed = speed || 300;
//     self.easing = easing || 'swing';

//     const hideMenu = function($menu) {
//         const style = {
//             'display': 'none'
//         };

//         $menu.animate({
//             'opacity': 0,
//             'left': '-200px'
//         }, speed, easing, function() {
//             $(this).css(style);
//         });
//     };

//     const showMenu = function($menu) {
//         $menu.css({
//             'display': 'block'
//         });

//         $menu.animate({
//             'opacity': 1,
//             'left': 0
//         }, speed, easing);
//     };

//     const hideTempMenu = function($menu) {
//         $menu.animate({
//             'opacity': 0,
//             'left': '200px'
//         }, speed, easing, function() {
//             $(this).remove();
//         });
//     };

//     const createTempMenu = function($menu, $temp, prevText) {
//         const $subMenu = $temp.clone().addClass('child-menu');
//         const $prevMenu = $('<li></li>', {
//             'class': 'previous-menu',
//             'text': prevText
//         });

//         $menu.after($subMenu);
//         $subMenu.prepend($prevMenu);

//         return $subMenu;
//     };

//     const $parentLinks = $('.js-main-nav').find('li.menu-item-has-children > a');
//     const $mainNav = $('.main-nav');
//     const $mainMenu = $mainNav.find('ul.main-menu');

//     $parentLinks.on('click', function(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         const $that = $(this);
//         const $menu = $that.parent('li').parent('ul.main-menu');
//         const $sub = $that.parent('li').children('.sub-menu');

//         const $subMenu = createTempMenu($menu, $sub, 'Previous');
//         hideMenu($menu);
//         showMenu($subMenu);
//     });

//     $('.main-nav').on('click', '.previous-menu', function(e) {
//         e.stopPropagation();
//         const $that = $(this);
//         const $childMenu = $that.parent('ul.child-menu');

//         hideTempMenu($childMenu);
//         showMenu($mainMenu);
//     });

//     $('.js-main-menu-toggle').on('click', function(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         const childMenu = $('ul.child-menu').length;

//         if($mainMenu.is(':visible')) {
//             $mainMenu.slideUp(speed);
//         } else if (childMenu === 0) {
//             $mainMenu.animate({
//                 'left': 0,
//                 'opacity': 1,
//             }, 0, 'swing', function() {
//                 $(this).slideDown(speed);
//             });
//         }

//         if ($('.js-main-nav').find('.child-menu').is(':visible')) {
//             $('.js-main-nav').find('.child-menu').slideUp(speed, function() {
//                 $(this).remove();
//             });
//         }
//     });

//     $('document, body').on('click', function(e) {
//         e.stopPropagation();

//         $mainMenu.slideUp(speed);

//         $('.js-main-nav').find('.child-menu').slideUp(speed, function() {
//             $(this).remove();
//         });
//     });

//     $('document, body').on('click', function(e) {
//         e.stopPropagation();
//     });

//     return self;
// }