$(document).ready(function () {

    loadData(2);

});

$(document).on('change', '#select_status', function () {
    loadData($(this).val());

    console.log("fgdfg")
});

var loadData = function(status) {
    
    //var persona = {
    //    nombre: "Ivan",
    //    apellido: "Flores",
    //    fecha_nac: "",
    //    sexo: "1",
    //    status: "1"
    //};

    var data = {
        status: status
    };

    $.ajax({
        type: "POST",
        url: "/Persona/read",
        content: "application/json; charset=utf-8",
        dataType: "json",
        //data: JSON.stringify(persona),
        data: data,
        success: function (data) {
            console.log(data)

            if (data != "") {

                var thead = '<tr>' +
                                '<th>NOMBRE</th>' +
                                '<th>APELLIDO</th>' +
                                '<th>SEXO</th>' +
                                '<th>FECHA NAC.</th>' +
                                '<th>STATUS</th>' +
                                '<th>OPCIONES</th>' +
                            '</tr>';


                var tbody = '';

                for (var i = 0; i < data.length; i++) {

                    if (data[i].status == 1)
                        var status = '<button class="btn btn-success btn-xs">ACTIVO</button>';
                    else
                        var status = '<button class="btn btn-danger btn-xs">INACTIVO</button>';

                    var sexo = data[i].sexo == 1 ? 'Masculino' : 'Femenino';

                    tbody += '<tr>' +
                                '<td>' + data[i].nombre + '</td>' +
                                '<td>' + data[i].apellido + '</td>' +
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
                alert("No hay personas para mostrar");
                $('#tbody').empty();
            }
                
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}

