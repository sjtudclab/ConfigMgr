/**
 * Created by Yongfeng on 15/9/23.
 */
(function() {
    $('#btn-new-entity').on('click', function() {
        $('#myModal').modal('show');
    });

    function packProperties(tableRows) {
        var properties = [];
        for (var i = 0 ; i < tableRows.length; i ++) {
            var template = {};
            var row = $(tableRows.get(i));
            template.name = row.find('[name="propertyName"]').val();
            template.type = row.find('select[name="propertyType"]').find(':selected').text();
            template.length = row.find('[name="propertyLength"]').val();
            template.isPrimary = row.find('[name="propertyLength"]').val();
            template.allowNull = row.find('[name="allowNull"]').is('checked');
            properties.push(template);
        }
        console.log(properties);
        return properties;
    }

    $('#btn-submit-new-entity').on('click', function() {
        var entityName = $('#entity-name').val();
        var tableName = $('#table-name').val();
        var description = $('#table-desc').val();
        // var entityPromise = $.deferred();
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
                    entityPromise.resolve(data);
                }
            });
        }

        entityPromise.then(function(data) {

        });

    });

    $('#btn-add-property').on('click', function() {
        var row = $($('#properties').find('.row')[0]).clone();
        row.removeClass('hidden');
        $('#properties').append(row);
        packProperties($('#properties').find('.row').slice(1));
    });
    // 转换select的style
    // $('select').select2({dropdownCssClass: 'dropdown-inverse'});
    //转换checkbox
    

})(jQuery);

