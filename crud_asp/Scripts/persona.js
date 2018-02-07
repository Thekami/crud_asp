$(document).ready(function () {

    loadData(2);

});

var ajaxSuccess = "Acción realizada con exito!";
var ajaxError = "Ocurrió un error inesperado, intentelo mas tarde o pongase en contacto con el administrador";
var validaCampos = "Debes completar todos los campos para poder continuar";
var idEdit;

$(document).on('change', '#select_status', function () {
    loadData($(this).val());
});


$(document).on('click', '#btn_new', function () {
    $('#action').val('add');
    $('#myModal').modal('show');
});

$(document).on('click', '#btn_add', function () {

    if (validaCampos('.required')) {

        var persona = {
            id: idEdit,
            nombre: $('#txt_nombres').val(),
            apellido: $('#txt_apellidos').val(),
            fecha_nac: $('#txt_fecha').val(),
            sexo: $('#txt_sexo').val()
        };

        var action = $('#action').val();

        $.ajax({
            type: "POST",
            url: "/Persona/" + action,
            content: "application/json; charset=utf-8",
            dataType: "json",
            data: persona,
            error: function (error) {
                console.log(error);
                toast('Error: ', ajaxError, 8000, 'danger');
            },
            success: function (data) {
                if (data === 1) {
                    $('#myModal').modal('hide');
                    resetForm('form_persona');
                    toast('Error: ', ajaxSuccess, 8000, 'success');

                }
                else {
                    toast('Error: ', ajaxError, 8000, 'danger');
                }

                loadData($('#select_status').val());
            }
        });
    }

});

var loadData = function (status) {

    var data = {
        status: status
    };

    $.ajax({
        type: "POST",
        url: "/Persona/read",
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: function (data) {
            console.log(data);

            if (data.length > 0) {

                var thead = '<tr>' +
                    '<th>NOMBRE</th>' +
                    '<th>SEXO</th>' +
                    '<th>FECHA NAC.</th>' +
                    '<th>STATUS</th>' +
                    '<th>OPCIONES</th>' +
                    '</tr>';


                var tbody = '';
                var status;

                for (var i = 0; i < data.length; i++) {

                    if (data[i].status === 1)
                        status = '<button class="btn btn-success btn-xs">ACTIVO</button>';
                    else
                        status = '<button class="btn btn-danger btn-xs">INACTIVO</button>';

                    var sexo = data[i].sexo === 1 ? 'Masculino' : 'Femenino';

                    tbody += '<tr>' +
                        '<td>' + data[i].nombre + '</td>' +
                        '<td>' + sexo + '</td>' +
                        '<td>' + data[i].fecha_nac + '</td>' +
                        '<td>' + status + '</td>' +
                        '<td>' +
                        '<a class="btn btn-info btn-xs" onclick="editPersona(' + data[i].id + ')">Editar</a>&nbsp;&nbsp;&nbsp;' +
                        '<a class="btn btn-danger btn-xs" onclick="deletePersona(' + data[i].id + ')">Eliminar</a>' +
                        '</td>' +
                        '</tr>';
                }

                $('#thead').empty();
                $('#tbody').empty();

                $('#thead').append(thead);
                $('#tbody').append(tbody);


            }
            else {
                toast('Error: ', 'No hay personas para mostrar', 8000, 'danger');
                $('#tbody').empty();
            }

        },
        error: function (error) {
            console.log(error);
            toast('Error: ', ajaxError, 8000, 'danger');
        }
    });

};

var editPersona = function(id){
    
    var data = { id: id };

    $.ajax({
        type: "POST",
        url: "/Persona/get",
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        error: function (error) {
            console.log(error);
            toast('Error: ', ajaxError, 8000, 'danger');
        },
        success: function (data) {
            console.log(data)
            if (data.length > 0) {
                $('#action').val('update');
                $('#myModal').modal('show');

                idEdit = id;

                $('#txt_nombres').val(data[0].nombre);
                $('#txt_apellidos').val(data[0].apellido);
                $('#txt_sexo').val(data[0].sexo);
                $('#txt_fecha').val(data[0].fecha_nac);
                //$('#txt_fecha').val();
            }
            else {
                toast('Error: ', ajaxError, 8000, 'danger');
            }
                
            
        }
    });
}

var deletePersona = function(id){


    if (confirm("Estas a punto de dar de baja a esta persona, ¿Esta seguro que desea continuar?")) {

        var persona = {id: id};

        $.ajax({
            type: "POST",
            url: "/Persona/delete",
            content: "application/json; charset=utf-8",
            dataType: "json",
            data: persona,
            error: function (error) {
                console.log(error);
                toast('Error: ', ajaxError, 8000, 'danger');
            },
            success: function (data) {
                console.log(data)
                if (data === 1) {
                    toast('Felicidades: ', ajaxSuccess, 8000, 'success');
                }
                else
                    toast('Error: ', ajaxError, 8000, 'danger');

                loadData($('#select_status').val());
            }
        });

    }
    

}

var validaCampos = function (obj) {

    var response = true;
    $(obj).removeClass('red');

    $(obj).each(function (index, el) {

        if (el.type == 'select-one') {
            var bandera = el.value == 0 ? true : bandera;
        }
        else {
            var bandera = el.value == '' ? true : bandera;
        }

        if (bandera == true) { $(el).addClass('red'); response = false; } else { $(el).removeClass('red') }

    });

    return response;

};