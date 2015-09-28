/**
 * Created by Yongfeng on 15/9/23.
 */
(function() {
    $('#btn-add-entity').on('click', function() {
        $('#modal-new-entity').modal('show');
    });

    function packProperties(tableRows) {
        var properties = [];
        for (var i = 0 ; i < tableRows.length; i ++) {
            var template = {};
            var row = $(tableRows.get(i));
            template.name = row.find('[name="propertyName"]').val();
            template.type = row.find('select[name="propertyType"]').find(':selected').text();
            template.length = row.find('[name="propertyLength"]').val();
            template.isPrimary = row.find('[name="isPrimary"]').is(':checked');
            template.allowNull = row.find('[name="allowNull"]').is(':checked');
            properties.push(template);
        }
        console.log(properties);
        return properties;
    }

    $('#btn-submit-add-entity').on('click', function() {
        var entityName = $('#entity-name').val();
        var tableName = $('#table-name').val();
        var description = $('#table-desc').val();
        var category = $('#entity-category').val();
        // var entityPromise = $.deferred();
        if (entityName.trim() == '' || tableName.trim() == '') {
            alert('请输入非空内容');
            return;
        }else {
            $.post('/meta/createEntity', {
                name: entityName,
                tableName: tableName,
                description: description,
                category: category
            },function(data) {
                console.log(data);
                if (data.status === 'success') {
                    // entityPromise.resolve(data);
                    location.reload();
                }
            });
        };
    });

    $('.btn-add-property').on('click', function() {
        var row = $($('#properties').find('.row')[0]).clone();
        row.removeClass('hidden');
        $('#properties').append(row);
        packProperties($('#properties').find('.row').slice(1));
    });

    $('.btn-remove-property').on('click', function(event) {
        var target = $(event.target);
        var tr = target.closest('tr');
        var propertyId = tr.attr('property');
        if (!propertyId) {
            return ;
        } else {
            console.log(propertyId);
            $.post('/meta/removeProperty', {
                propertyId: propertyId
            },function(data) {
                if (data.status === 'success') {
                    tr.remove();
                }
            });
        }
    });

    $('.modify-entity').on('click', function(event) {
        var btnModify = $(event.target);
        var entityName = btnModify.find('span:eq(0)').html();
        var entityDesc = btnModify.find('span:eq(1)').html();
        var entityTable = btnModify.find('span:eq(2)').html();
        var entityCategory = btnModify.find('span:eq(3)').html();
        var entityId = btnModify.find('span:eq(4)').html();

        console.log(entityName + ' ' + entityDesc);
        var modalUpdate = $('#modal-update-entity');
        modalUpdate.find('#entity-id').html(entityId);
        modalUpdate.find('#entity-name').val(entityName);
        modalUpdate.find('#table-desc').val(entityDesc);
        modalUpdate.find('#table-name').val(entityTable);
        modalUpdate.find('#entity-category').val(entityCategory);

        modalUpdate.modal('show');
    });

    $('#btn-submit-modify-entity').on('click', function() {
        var modalUpdate = $('#modal-update-entity');
        var entityId = modalUpdate.find('#entity-id').html();
        var entityName = modalUpdate.find('#entity-name').val();
        var tableName = modalUpdate.find('#table-name').val();
        var description = modalUpdate.find('#table-desc').val();
        var category = modalUpdate.find('#entity-category').val();

        $.post('/meta/updateEntity', {
            id: entityId,
            name: entityName,
            tableName: tableName,
            description: description,
            category: category
        }, function(data) {
            console.log(data);
            if (data.status == 'success') {
                location.reload();
            }
        });
    });

    $('.remove-entity').on('click', function() {
        var btnDelete = $(event.target);
        var entityId = btnDelete.find('span:eq(0)').html();
        console.log(entityId);
        var r = confirm('确认删除 ？');
        if (r == true) {
            $.post('/meta/removeEntity', {
                id: entityId
            }, function(data) {
                if (data.status === 'success') {
                    location.reload();
                }
            });
        } else {
            return;
        }
    });

    $('.add-new-property').on('click', function(event) {
        var panel = $(event.target).closest('.panel');
        var rowTemplate = $('<tr class="row"><th><input name="propertyName" type="text" class="form-control"></th><th><select name="propertyType" class="form-control select select-primary select-block mbl"><option value="INT">INT</option><option value="VARCHAR">VARCHAR</option><option value="ENUM">ENUM</option></select></th><th><input name="propertyLength" type="number" min="1" maxlength="4" size="4" class="form-control"></th><th> <input name="isPrimary" type="checkbox"></th><th> <input name="allowNull" type="checkbox"></th><th> <input name="autoInc" type="checkbox"></th><th> <input name="propertyComment" type="text" class="form-control"></th><th> <input name="propertyDefault" type="text" class="form-control"></th><th> <a class="btn-edit-property fa fa-floppy-o"></a></th><th> <a class="fa fa-close"></a></th></tr>');
        var properties = $(panel.find('#properties'));
        properties.append(rowTemplate);
        bindEditPropertyClickEvent();
        console.log(properties);
    });

    function bindEditPropertyClickEvent() {
        $('.btn-edit-property').off('click');
        $('.btn-edit-property').on('click', function(event) {
            var editBtn = $(event.target);
            var row = $(editBtn.closest('.row'));

            if ((editBtn).hasClass('fa-floppy-o')) {
                // do something to update the attribute
                var propertyId = row.attr('property');
                var propertyName = row.find('[name="propertyName"]').val();
                var propertyType = row.find('[name="propertyType"]').val();
                var propertyLength = row.find('[name="propertyLength"]').val();
                var isPrimary = row.find('[name="isPrimary"]').is(':checked');
                var allowNull = row.find('[name="allowNull"]').is(':checked');
                var autoInc = row.find('[name="autoInc"]').is(':checked');
                var propertyComment = row.find('[name="propertyComment"]').val();
                var propertyDefault = row.find('[name="propertyDefault"]').val();

                var entityId = row.closest('.entity-panel').attr('entity');

                console.log(propertyId);
                console.log(propertyName);
                console.log(propertyType);
                console.log(propertyLength);
                console.log(isPrimary);
                console.log(allowNull);
                console.log(autoInc);
                console.log(propertyComment);
                console.log(propertyDefault);
                if (!propertyId) {
                    // create Property and update propertyId after success created
                    $.post('/meta/createProperty', {
                        entityId: entityId,
                        id: propertyId,
                        name: propertyName,
                        type: propertyType,
                        length: propertyLength,
                        isPrimary: isPrimary,
                        allowNull: allowNull,
                        autoInc: autoInc,
                        comment: propertyComment,
                        defaultVal: propertyDefault
                    }, function(data) {
                        console.log(data);
                        if (data.status != 'success') {
                            alert('创建不成功，请重试');
                        } else {
                            row.attr('property', data.propertyId);
                        }
                    });
                } else {
                    // update
                    $.post('/meta/updateProperty', {
                        id: propertyId,
                        name: propertyName,
                        type: propertyType,
                        length: propertyLength,
                        isPrimary: isPrimary,
                        allowNull: allowNull,
                        autoInc: autoInc,
                        comment: propertyComment,
                        defaultVal: propertyDefault
                    }, function(data) {
                        console.log(data);

                        if (data.status != 'success') {
                            alert('更新不成功，请重试');
                        }
                    });
                }
            }

            editBtn.toggleClass('fa-pencil');
            editBtn.toggleClass('fa-floppy-o');

            row.find('th select, th input').toggleDisabled();
            console.log('clicked');
        });
    };

    bindEditPropertyClickEvent();
})(jQuery);

