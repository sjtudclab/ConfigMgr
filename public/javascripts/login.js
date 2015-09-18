/**
 * Created by Yongfeng on 15/9/23.
 */
(function() {
    function Redirect(url) {
        var ua        = navigator.userAgent.toLowerCase();
        var isIE      = ua.indexOf('msie') !== -1;
        var version   = parseInt(ua.substr(4, 2), 10);

        // Internet Explorer 8 and lower
        if (isIE && version < 9) {
            var link = document.createElement('a');
            link.href = url;
            document.body.appendChild(link);
            link.click();
        }

        // All other browsers
        else { window.location.href = url; }
    }
    // $('#btn-login').on('click', function() {
    //     $.post('/login', function(data, status) {
    //         console.log(data);
    //         Redirect('/');
    //     });
    // });

})(jQuery);

