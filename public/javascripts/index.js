/**
 * Created by Yongfeng on 15/8/23.
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
    //配置数据库radio click
    $('#default-db').on('click', function() {
        $('#form-custom-db').slideUp();
    });
    $('#custom-db').on('click', function() {
        $('#form-custom-db').slideDown();
    });

    //导航栏效果
    $('#left-nav > a').on('click', function(event) {
        // $(event.target).next().slideToggle('slow');
        // $(event.target).toggleClass('open');
    });
})(jQuery);

