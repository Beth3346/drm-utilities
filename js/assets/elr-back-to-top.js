// Adds a button for user to scroll to top immediately

import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

const elrBackToTop = function(params = {}) {
    const self = {};
    const scrollSpeed = params.scrollSpeed || 900;
    const $backToTop = elr.createElement('button', {
        'class': 'back-to-top fa fa-caret-up'
    }).appendTo('body').hide();

    elr.scrollToView($backToTop);

    $backToTop.on('click', function() {
        elr.toTop($('body, html'), scrollSpeed);
    });

    return self;
};

export default elrBackToTop;