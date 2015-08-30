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
    $('#btn-submit-new').on('click', function() {
        var coverDiv = $('.cover');
        var host;
        var port;
        var username;
        var password;
        var db;
        if ($('#custom-db').is(':checked')) {
            host = $('#db-host').val();
            port = $('#db-port').val();
            username = $('#db-user').val();
            password = $('#db-password').val();
            db = $('#db-name').val();
        }
        var province = $('#province-selector').val();
        var city = $('#city-selector').val();
        var area = $('#area-selector').val();
        var address = $('#address').val();
        var name = $('[name="community-name"]').val();

        if (name.trim() === '') {
            alert('上区名不能为空');
            return;
        }
        if (address.trim() === '') {
            alert('上区地址不能为空');
            return;
        }

        //显示cover
        coverDiv.addClass('top-cover');
        $.post('/new', {
            host: host,
            port: port,
            username: username,
            password: password,
            database: db,

            province: province,
            city: city,
            area: area,
            address: address,

            communityName: name
        }, function(data) {
            coverDiv.removeClass('top-cover');
            console.log(data);
            if (data.status === 'success') {
                //TODO 改了
                Redirect('/');
            }
        });
    });

    //配置数据库radio click
    $('#default-db').on('click', function() {
        $('#form-custom-db').slideUp();
    });
    $('#custom-db').on('click', function() {
        $('#form-custom-db').slideDown();
    });

})(jQuery);

