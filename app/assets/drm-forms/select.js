(function($) {

    var dropdown = $('.dropdown'),
        dropdownText = dropdown.find('.dropdown-text'),
        button = dropdown.find('.dropdown-button'),
        list = dropdown.find('ul').hide();

    button.on('click', function() {
        list.fadeToggle();
    });

    list.on('click', 'li', function(e) {
        var that = $(this),
            option = that.data('option'),
            text = that.text();
        dropdownText.html(text);
        list.fadeOut();
        e.preventDefault();

        // do something
    });
})(jQuery);