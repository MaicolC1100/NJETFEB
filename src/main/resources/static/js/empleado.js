// Call the dataTables jQuery plugin
$(document).ready(function() {
    // on ready
    cargarListaEmpleados();
});

const empleadosTableBody = document.querySelector('#empleados-table tbody');
let idEmpleadoModificar = null;

// Función para cargar la lista de empleados
async function cargarListaEmpleados() {
    try {
        const response = await fetch('/api/empleado');
        const data = await response.json();

        // Limpiar la tabla antes de volver a llenarla
        empleadosTableBody.innerHTML = '';

        // Llenar la tabla con los datos de los empleados
        data.forEach(empleado => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.cedula}</td>
                <td>${empleado.cargo}</td>
                <td>${empleado.celular}</td>
                <td>${empleado.correo}</td>
                <td>${empleado.placa}</td>
                ${empleado.estado ? 
                    '<td class="td-icon">'+
                        '<a href="#" onclick="cambioEstadoEmpleado(0, '+ empleado.idEmpleado + ')" title="Modificar">'+
                            '<i class="bi bi-toggle-on" style="font-size: 1rem; color: darkgreen;" title="Activo">'+
                            '</i>'+
                        '</a>'+
                    '</td>' :
                    '<td class="td-icon" style="transform: rotate(180deg);">'+
                        '<a href="#" onclick="cambioEstadoEmpleado(1,'+ empleado.idEmpleado + ')" title="Modificar">'+
                            '<i class="bi bi-toggle-on" style="font-size: 1rem; color: darkred;" title="Inactivo">'+
                            '</i>'+
                        '</a>'+
                    '</td>'}
                <td class="td-icon">
                    <a href="#" onclick="modificarEmpleado(${empleado.idEmpleado})" class="btn btn-warning btn-sm" title="Modificar"><i class="bi bi-eraser-fill"></i></a>
                </td>
            `;
            empleadosTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los datos de los empleados:', error);
    }
}

async function registrarEmpleado() {
    let datos = {
        nombre: document.querySelector('#nombre').value,
        apellido: document.querySelector('#apellido').value,
        cedula: document.querySelector('#cedula').value,
        cargo: document.querySelector('#cargo').value,
        celular: document.querySelector('#celular').value,
        correo: document.querySelector('#correo').value,
        placa: document.querySelector('#placa').value,
        estado: true
    };

    try {
        const request = await fetch('/api/empleado', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        if (request.ok) {
            // alert("El empleado fue creado exitosamente!");
            cargarListaEmpleados();
        }
    } catch (error) {
        console.error('Error al registrar el empleado:', error);
    }
}

async function modificarEmpleado(idEmpleado) {
    document.getElementById('divRegistroEmpleado').style.display = 'none';

    try {
        const request = await fetch('/api/empleado/' + idEmpleado, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const empleado = await request.json();

        idEmpleadoModificar = empleado.idEmpleado;
        document.getElementById('nombreModificar').value = empleado.nombre;
        document.getElementById('apellidoModificar').value = empleado.apellido;
        document.getElementById('correoModificar').value = empleado.correo;
        document.getElementById('cargoModificar').value = empleado.cargo;
        document.getElementById('celularModificar').value = empleado.celular;
        document.getElementById('cedulaModificar').value = empleado.cedula;
        document.getElementById('placaModificar').value = empleado.placa;

        document.getElementById('divModificarEmpleado').style.display = 'flex';
    } catch (error) {
        console.error('Error al obtener los datos del empleado:', error);
    }
}

async function registrarModificarEmpleado() {
    let datos = {
        nombre: document.querySelector('#nombreModificar').value,
        apellido: document.querySelector('#apellidoModificar').value,
        cedula: document.querySelector('#cedulaModificar').value,
        cargo: document.querySelector('#cargoModificar').value,
        celular: document.querySelector('#celularModificar').value,
        correo: document.querySelector('#correoModificar').value,
        placa: document.querySelector('#placaModificar').value
    };

    try {
        const request = await fetch('/api/empleado/' + idEmpleadoModificar, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        if (request.ok) {
            // alert("El empleado se modificó exitosamente!");
            cargarListaEmpleados();
            document.getElementById('divModificarEmpleado').style.display = 'none';
        }
    } catch (error) {
        console.error('Error al modificar el empleado:', error);
    }
}

async function cambioEstadoEmpleado(estado, idEmpleadoModificar) {
    let datos = { estado: estado };

    try {
        const request = await fetch('/api/empleado/' + idEmpleadoModificar, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        if (request.ok) {
            // alert("El estado del empleado se modificó exitosamente!");
            cargarListaEmpleados();
        }
    } catch (error) {
        console.error('Error al cambiar el estado del empleado:', error);
    }
}
