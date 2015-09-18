/**
 * Created by Yongfeng on 15/9/23.
 */
(function() {
    $('#btn-new-entity').on('click', function() {
        $('#myModal').modal('show');
    });

    $('#btn-submit-new-entity').on('click', function() {
        var entityName = $('#entity-name').val();
        var tableName = $('#table-name').val();
        var description = $('#table-desc').val();

        if (entityName.trim() == '' || tableName.trim() == '') {
            alert('请输入非空内容');
            return;
        }else {
            $.post('/meta/createEntity', {
                name: entityName,
                tableName: tableName,
                description: description
            },function(data) {
                console.log(data);
                if (data.status === 'success') {
                    window.location.href = data.redirect;
                }
            });
        }

    });

})(jQuery);

