// Adds a button for user to scroll to top immediately

import elrUtlities from './elr-utilities';
const $ = require('jquery');

let elr = elrUtlities();

const elrBackToTop = function(params) {
    const self = {};
    const spec = params || {};
    const scrollSpeed = spec.scrollSpeed || 900;
    const $content = spec.content || $('body, html');

    if ($content.length) {
        const $backToTop = elr.createElement('button', {
            'class': 'back-to-top fa fa-caret-up'
        }).appendTo('body').hide();

        elr.scrollToView($backToTop);

        $backToTop.on('click', function() {
            elr.toTop($content, scrollSpeed);
        });
    }

    return self;
};

export default elrBackToTop;