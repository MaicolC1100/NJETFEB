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

    // Cargar tarifas
    function loadTarifas() {
        showSpinner();
        $.ajax({
            url: "/tarifas",
            method: "GET",
            success: function(data) {
                hideSpinner();
                var tarifasTableBody = $("#tarifasTableBody");
                tarifasTableBody.empty();
                data.forEach(function(tarifa) {
                    var row = $("<tr>");
                    row.append($("<td>").text(tarifa.idTarifa));
                    row.append($("<td>").text(tarifa.trayectos));
                    row.append($("<td>").text(tarifa.precioTotal));
                    row.append(`
                        <td>
                            <button class="btn btn-primary btn-sm edit-tarifa" data-id="${tarifa.idTarifa}"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-danger btn-sm delete-tarifa" data-id="${tarifa.idTarifa}"><i class="bi bi-trash"></i></button>
                        </td>
                    `);
                    tarifasTableBody.append(row);
                });
            },
            error: function() {
                hideSpinner();
                showAlert("Error al cargar las tarifas.");
            }
        });
    }

    // Crear o actualizar tarifa
    function saveTarifa(tarifa) {
        var method = tarifa.idTarifa ? "PUT" : "POST";
        var url = tarifa.idTarifa ? "/tarifas/" + tarifa.idTarifa : "/tarifas";
        $.ajax({
            url: url,
            method: method,
            contentType: "application/json",
            data: JSON.stringify(tarifa),
            success: function() {
                loadTarifas();
            },
            error: function() {
                showAlert("Error al guardar la tarifa.");
            }
        });
    }

    // Eliminar tarifa
    function deleteTarifa(id) {
        $.ajax({
            url: "/tarifas/" + id,
            method: "DELETE",
            success: function() {
                loadTarifas();
            },
            error: function() {
                showAlert("Error al eliminar la tarifa.");
            }
        });
    }

    // Event listeners
    $("#addTarifaBtn").on("click", function() {
        $("#tarifaId").val("");
        $("#tarifaTrayectos").val("");
        $("#tarifaPrecioTotal").val("");
        $("#tarifaModalLabel").text("Agregar Tarifa");
        $("#tarifaModal").modal("show");
    });

    $("#saveTarifaBtn").on("click", function() {
        var tarifa = {
            idTarifa: $("#tarifaId").val(),
            trayectos: $("#tarifaTrayectos").val(),
            precioTotal: $("#tarifaPrecioTotal").val()
        };
        saveTarifa(tarifa);
        $("#tarifaModal").modal("hide");
    });

    $(document).on("click", ".edit-tarifa", function() {
        var id = $(this).data("id");
        $.ajax({
            url: "/tarifas/" + id,
            method: "GET",
            success: function(tarifa) {
                $("#tarifaId").val(tarifa.idTarifa);
                $("#tarifaTrayectos").val(tarifa.trayectos);
                $("#tarifaPrecioTotal").val(tarifa.precioTotal);
                $("#tarifaModalLabel").text("Editar Tarifa");
                $("#tarifaModal").modal("show");
            },
            error: function() {
                showAlert("Error al obtener los datos de la tarifa.");
            }
        });
    });

    $(document).on("click", ".delete-tarifa", function() {
        var id = $(this).data("id");
        if (confirm("¿Estás seguro de que quieres eliminar esta tarifa?")) {
            deleteTarifa(id);
        }
    });

    // Inicializar la carga de tarifas
    loadTarifas();
});
