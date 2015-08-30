(function() {
    $('#community-list > .panel').on('click', function(event) {
        var redirect = $(event.target).parent().attr('href');
        console.log(redirect);
        window.location.href = redirect;
    });
})(jQuery);
