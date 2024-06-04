$(document).ready(function() {
    cargarTarifas();

    $('#addTarifaBtn').click(function() {
        $('#tarifaId').val('');
        $('#tarifaTrayectos').val('');
        $('#tarifaPrecioTotal').val('');
        $('#tarifaModal').modal('show');
    });

    $('#saveTarifaBtn').click(function() {
        guardarTarifa();
    });
});

function cargarTarifas() {
    $.ajax({
        url: '/api/tarifa/consultar',
        method: 'GET',
        success: function(tarifas) {
            let tarifasTableBody = $('#tarifasTableBody');
            tarifasTableBody.empty();
            tarifas.forEach(function(tarifa) {
                tarifasTableBody.append(`
                    <tr>
                        <td>${tarifa.idTarifa}</td>
                        <td>${tarifa.trayectos}</td>
                        <td>${tarifa.precioTotal}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editarTarifa(${tarifa.idTarifa})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarTarifa(${tarifa.idTarifa})">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function() {
            mostrarAlerta('Error al cargar las tarifas.');
        }
    });
}

function editarTarifa(id) {
    $.ajax({
        url: `/api/tarifa/consultar/${id}`,
        method: 'GET',
        success: function(tarifa) {
            $('#tarifaId').val(tarifa.idTarifa);
            $('#tarifaTrayectos').val(tarifa.trayectos);
            $('#tarifaPrecioTotal').val(tarifa.precioTotal);
            $('#tarifaModal').modal('show');
        },
        error: function() {
            mostrarAlerta('Error al cargar la tarifa.');
        }
    });
}

function eliminarTarifa(id) {
    if (confirm('¿Está seguro de que desea eliminar esta tarifa?')) {
        $.ajax({
            url: `/api/tarifa/eliminar/${id}`,
            method: 'DELETE',
            success: function() {
                cargarTarifas();
                mostrarAlerta('Tarifa eliminada exitosamente.');
            },
            error: function() {
                mostrarAlerta('Error al eliminar la tarifa.');
            }
        });
    }
}

function guardarTarifa() {
    let id = $('#tarifaId').val();
    let trayectos = $('#tarifaTrayectos').val();
    let precioTotal = $('#tarifaPrecioTotal').val();

    let tarifa = {
        trayectos: trayectos,
        precioTotal: precioTotal
    };

    let method = id ? 'PUT' : 'POST';
    let url = id ? `/api/tarifa/actualizar/${id}` : '/api/tarifa/guardar';

    $.ajax({
        url: url,
        method: method,
        contentType: 'application/json',
        data: JSON.stringify(tarifa),
        success: function() {
            $('#tarifaModal').modal('hide');
            cargarTarifas();
            mostrarAlerta('Tarifa guardada exitosamente.');
        },
        error: function() {
            mostrarAlerta('Error al guardar la tarifa.');
        }
    });
}

function mostrarAlerta(mensaje) {
    $('#alertModalMessage').text(mensaje);
    $('#alertModal').modal('show');
}
