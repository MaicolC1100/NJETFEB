$(document).ready(function() {
    // Mostrar el spinner
    function showSpinner() {
        $("#spinner").show();
    }

    // Ocultar el spinner
    function hideSpinner() {
        $("#spinner").hide();
    }

    // Mostrar una alerta modal
    function showAlert(message) {
        $("#alertModalMessage").text(message);
        $("#alertModal").modal("show");
    }

    // Cargar recargos
    function loadRecargos() {
        showSpinner();
        $.ajax({
            url: "/recargos",
            method: "GET",
            success: function(data) {
                hideSpinner();
                var recargosTableBody = $("#recargosTableBody");
                recargosTableBody.empty();
                data.forEach(function(recargo) {
                    var row = $("<tr>");
                    row.append($("<td>").text(recargo.idRecargo));
                    row.append($("<td>").text(recargo.recargo));
                    row.append($("<td>").text(recargo.precio));
                    row.append(`
                        <td>
                            <button class="btn btn-primary btn-sm edit-recargo" data-id="${recargo.idRecargo}"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-danger btn-sm delete-recargo" data-id="${recargo.idRecargo}"><i class="bi bi-trash"></i></button>
                        </td>
                    `);
                    recargosTableBody.append(row);
                });
            },
            error: function() {
                hideSpinner();
                showAlert("Error al cargar los recargos.");
            }
        });
    }

    // Crear o actualizar recargo
    function saveRecargo(recargo) {
        var method = recargo.idRecargo ? "PUT" : "POST";
        var url = recargo.idRecargo ? "/recargos/" + recargo.idRecargo : "/recargos";
        $.ajax({
            url: url,
            method: method,
            contentType: "application/json",
            data: JSON.stringify(recargo),
            success: function() {
                loadRecargos();
            },
            error: function() {
                showAlert("Error al guardar el recargo.");
            }
        });
    }

    // Eliminar recargo
    function deleteRecargo(id) {
        $.ajax({
            url: "/recargos/" + id,
            method: "DELETE",
            success: function() {
                loadRecargos();
            },
            error: function() {
                showAlert("Error al eliminar el recargo.");
            }
        });
    }

    // Event listeners
    $("#addRecargoBtn").on("click", function() {
        $("#recargoId").val("");
        $("#recargoNombre").val("");
        $("#recargoPrecio").val("");
        $("#recargoModalLabel").text("Agregar Recargo");
        $("#recargoModal").modal("show");
    });

    $("#saveRecargoBtn").on("click", function() {
        var recargo = {
            idRecargo: $("#recargoId").val(),
            recargo: $("#recargoNombre").val(),
            precio: $("#recargoPrecio").val()
        };
        saveRecargo(recargo);
        $("#recargoModal").modal("hide");
    });

    $(document).on("click", ".edit-recargo", function() {
        var id = $(this).data("id");
        $.ajax({
            url: "/recargos/" + id,
            method: "GET",
            success: function(recargo) {
                $("#recargoId").val(recargo.idRecargo);
                $("#recargoNombre").val(recargo.recargo);
                $("#recargoPrecio").val(recargo.precio);
                $("#recargoModalLabel").text("Editar Recargo");
                $("#recargoModal").modal("show");
            },
            error: function() {
                showAlert("Error al obtener los datos del recargo.");
            }
        });
    });

    $(document).on("click", ".delete-recargo", function() {
        var id = $(this).data("id");
        if (confirm("¿Estás seguro de que quieres eliminar este recargo?")) {
            deleteRecargo(id);
        }
    });

    // Inicializar la carga de recargos
    loadRecargos();
});
