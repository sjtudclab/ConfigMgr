/**
 * Created by Yongfeng on 29/9/23.
 */
(function() {
    function isEmpty(str) {
        return (!str || str.trim() == '');
    }
    $('#btn-add-relationship').on('click', function() {
        console.log('clicked');
        $('#modal-new-relationship').modal();
    });

    $('select#table-name, select#fk-table-name').on('change', function(e) {
        var select = $(e.target);
        var columnSelect = $(select.closest('.form-group').find('select')[1]);
        columnSelect.empty();
        var entityId = select.val();
        $.post('/meta/getPropertiesByEntityId', {
            entityId: entityId
        }, function(data) {
            if (data.status == 'success') {
                var properties = data.properties;
                console.log(properties);
                for (var i = 0 ; i < properties.length; i++) {
                    columnSelect.append($('<option />').val(properties[i].id).text(properties[i].name));
                }
            }
        });
        console.log($(e.target).val());
    });

    $('#btn-submit-add-relationship').on('click', function() {
        var relName = $('#relationship-name').val();
        var tableId = $('#table-name').val();
        var propertyId = $('#property-name').val();
        var fkTableId = $('#fk-table-name').val();
        var fkPropertyId = $('#fk-property-name').val();

        if (isEmpty(relName) || isEmpty(tableId) || isEmpty(propertyId)
            || isEmpty(fkTableId) || isEmpty(fkPropertyId)) {
            alert('不许为空！');
            return;
        }
        $.post('/meta/createRelationship', {
            name: relName,
            tableId: tableId,
            propertyId: propertyId,
            fkTableId: fkTableId,
            fkPropertyId: fkPropertyId
        },function(data) {
            if (data.status == 'success') {
                location.reload();
            };
        });
    });

    $('#table-relationship tbody tr.row').on('click', function(e) {
        console.log($(e.target));
        var row = $($(e.target).parent());
        var relId = row.attr('id');
        console.log(relId);
        var relName = row.find('td:eq(0)').text();
        var tableId = row.find('td:eq(1) > span').text();
        var propertyId = row.find('td:eq(2) > span').text();
        var fkTableId = row.find('td:eq(3) > span').text();
        var fkPropertyId = row.find('td:eq(4) > span').text();

        var tableList = $.Deferred();
        var propertyList = $.Deferred();
        var fkTableList = $.Deferred();
        var fkPropertyList = $.Deferred();
        var modal = $('#modal-update-relationship');

        var modalRelName = modal.find('#relationship-name');
        var selectTable = modal.find('select#table-name');
        var selectProperty = modal.find('select#property-name');
        var selectFkTable = modal.find('select#fk-table-name');
        var selectFkProperty = modal.find('select#fk-property-name');
        $.post('/meta/getEntities',{},function(data) {
            if (data.status == 'success') {
                tableList.resolve(data.entities);
                fkTableList.resolve(data.entities);
            }
        });
        $.post('/meta/getPropertiesByEntityId', {
            entityId: tableId
        }, function(data) {
            if (data.status == 'success') {
                propertyList.resolve(data.properties);
            }
        });
        $.post('/meta/getPropertiesByEntityId', {
            entityId: fkTableId
        }, function(data) {
            if (data.status == 'success') {
                fkPropertyList.resolve(data.properties);
            }
        });

        $.when(tableList, propertyList, fkTableList , fkPropertyList)
        .done(function(a, b, c, d) {
            console.log(a);
            console.log(b);
            console.log(c);
            console.log(d);
            selectTable.empty();
            selectProperty.empty();
            selectFkTable.empty();
            selectFkProperty.empty();
            modalRelName.val(relName);
            for (var i = 0; i < a.length; i ++) {
                selectTable.append($('<option />').val(a[i].id).text(a[i].name).attr('selected',a[i].id == tableId));
                selectFkTable.append($('<option />').val(a[i].id).text(a[i].name).attr('selected',a[i].id == fkTableId));
            }
            for (var i = 0; i < b.length; i++) {
                selectProperty.append($('<option />').val(b[i].id).text(b[i].name).attr('selected',b[i].id == propertyId));
            }
            for (var i = 0; i < d.length; i++) {
                selectFkProperty.append($('<option />').val(d[i].id).text(d[i].name).attr('selected',d[i].id == propertyId));
            }
            modal.modal('show');
        });
    });

    $('#btn-submit-update-relationship').on('click', function() {
        
    });
})(jQuery);

