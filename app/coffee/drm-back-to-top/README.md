# DRM Back to Top

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Click back to top button to scroll to the top of page
Requires jQuery

## Features:

The button fades in as the user scrolls toward the end of the page.

Smooth scrolling effect when the back to top button is clicked and the user is taken to the top of the current page.

Just add compiled drm-back-to-top.coffee to your pages and you're ready to go.

## Initialize:

    new DrmBackToTop(content, speed, scrollSpeed);

## Options:

    new DrmBackToTop($('body'), 300, 900);

+ content: content to monitor - default: $('body')
+ speed: button fade in speed - default: 300
+ scrollSpeed: speed to scroll back to the top of the page - default: 900
