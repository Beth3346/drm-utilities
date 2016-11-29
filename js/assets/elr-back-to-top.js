// Adds a button for user to scroll to top immediately

import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

const elrBackToTop = function() {
    // const self = {};
    const $backToTop = elr.createElement('button', {
        'class': 'back-to-top fa fa-caret-up'
    }).appendTo('body').hide();

    elr.scrollToView($backToTop);

    $backToTop.on('click', function() {
        elr.toTop($('body, html'), 900);
    });

    // return self;
};

export default elrBackToTop;