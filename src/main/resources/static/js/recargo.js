$(document).ready(function() {
    cargarRecargos();

    $('#addRecargoBtn').click(function() {
        $('#recargoId').val('');
        $('#recargoNombre').val('');
        $('#recargoPrecio').val('');
        $('#recargoModal').modal('show');
    });

    $('#saveRecargoBtn').click(function() {
        guardarRecargo();
    });
});

function cargarRecargos() {
    $.ajax({
        url: '/api/recargo/consultar',
        method: 'GET',
        success: function(recargos) {
            let recargosTableBody = $('#recargosTableBody');
            recargosTableBody.empty();
            recargos.forEach(function(recargo) {
                recargosTableBody.append(`
                    <tr>
                        <td>${recargo.idRecargo}</td>
                        <td>${recargo.recargo}</td>
                        <td>${recargo.precio}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editarRecargo(${recargo.idRecargo})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarRecargo(${recargo.idRecargo})">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function() {
            mostrarAlerta('Error al cargar los recargos.');
        }
    });
}

function editarRecargo(id) {
    $.ajax({
        url: `/api/recargo/consultar/${id}`,
        method: 'GET',
        success: function(recargo) {
            $('#recargoId').val(recargo.idRecargo);
            $('#recargoNombre').val(recargo.recargo);
            $('#recargoPrecio').val(recargo.precio);
            $('#recargoModal').modal('show');
        },
        error: function() {
            mostrarAlerta('Error al cargar el recargo.');
        }
    });
}

function eliminarRecargo(id) {
    if (confirm('¿Está seguro de que desea eliminar este recargo?')) {
        $.ajax({
            url: `/api/recargo/eliminar/${id}`,
            method: 'DELETE',
            success: function() {
                cargarRecargos();
                mostrarAlerta('Recargo eliminado exitosamente.');
            },
            error: function() {
                mostrarAlerta('Error al eliminar el recargo.');
            }
        });
    }
}

function guardarRecargo() {
    let id = $('#recargoId').val();
    let nombre = $('#recargoNombre').val();
    let precio = $('#recargoPrecio').val();

    let recargo = {
        recargo: nombre,
        precio: precio
    };

    let method = id ? 'PUT' : 'POST';
    let url = id ? `/api/recargo/actualizar/${id}` : '/api/recargo/guardar';

    $.ajax({
        url: url,
        method: method,
        contentType: 'application/json',
        data: JSON.stringify(recargo),
        success: function() {
            $('#recargoModal').modal('hide');
            cargarRecargos();
            mostrarAlerta('Recargo guardado exitosamente.');
        },
        error: function() {
            mostrarAlerta('Error al guardar el recargo.');
        }
    });
}

function mostrarAlerta(mensaje) {
    $('#alertModalMessage').text(mensaje);
    $('#alertModal').modal('show');
}
