// Call the dataTables jQuery plugin
$(document).ready(function() {
    // on ready
    cargarListaEmpleados();
});

const empleadosTableBody = document.querySelector('#empleados-table tbody');
let idEmpleadoModificar = null;

// Función para cargar la lista de empleados
async function cargarListaEmpleados() {

    //await showSpinner(800);

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
    } finally {
        hideSpinner();
    }
}

async function registrarEmpleado() {
    
    const nombre = document.querySelector('#nombre').value.trim();
    if (!nombre) {
        showModalAlert('Faltan campos', 'El campo nombres es obligatorio', 'danger');
        return;
    }

    const apellido = document.querySelector('#apellido').value.trim();
    if (!apellido) {
        showModalAlert('Faltan campos', 'El campo apellidos es obligatorio', 'danger');
        return;
    }

    const correo = document.querySelector('#correo').value.trim();
    if (!correo) {
        showModalAlert('Faltan campos', 'El campo correo es obligatorio', 'danger');
        return;
    }

    const cargo = document.querySelector('#cargo').value.trim();
    if (!cargo) {
        showModalAlert('Faltan campos', 'El campo cargo es obligatorio', 'danger');
        return;
    }

    const celular = document.querySelector('#celular').value.trim();
    if (!celular) {
        showModalAlert('Faltan campos', 'El campo celular es obligatorio', 'danger');
        return;
    }

    const cedula = document.querySelector('#cedula').value.trim();
    if (!cedula) {
        showModalAlert('Faltan campos', 'El campo cédula es obligatorio', 'danger');
        return;
    }

    const placa = document.querySelector('#placa').value.trim();
    if (!placa) {
        showModalAlert('Faltan campos', 'El campo placa es obligatorio', 'danger');
        return;
    }

    // Si todos los campos están completos, continuar con el registro
    let datos = {
        nombre,
        apellido,
        cedula,
        cargo,
        celular,
        correo,
        placa,
        estado: true
    };

    await showSpinner(300);

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
            showModalAlert('¡Registro existoso!', 'El empleado se creo exitosamente.', 'success');
            cargarListaEmpleados();
        }
    } catch (error) {
        console.error('Error al registrar el empleado:', error);
    } finally {
        hideSpinner();  
    }
}

async function modificarEmpleado(idEmpleado) {

    document.getElementById('divRegistroEmpleado').style.display = 'none';

    await showSpinner(300);

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
        document.getElementById('divRegistroEmpleado').style.display = 'flex';
    } finally {
        hideSpinner();
    }
}

async function registrarModificarEmpleado() {

    const nombre = document.querySelector('#nombreModificar').value.trim();
    if (!nombre) {
        showModalAlert('Faltan campos', 'El campo nombre es obligatorio', 'danger');
        return;
    }

    const apellido = document.querySelector('#apellidoModificar').value.trim();
    if (!apellido) {
        showModalAlert('Faltan campos', 'El campo apellido es obligatorio', 'danger');
        return;
    }

    const correo = document.querySelector('#correoModificar').value.trim();
    if (!correo) {
        showModalAlert('Faltan campos', 'El campo correo es obligatorio', 'danger');
        return;
    }

    const cargo = document.querySelector('#cargoModificar').value.trim();
    if (!cargo) {
        showModalAlert('Faltan campos', 'El campo cargo es obligatorio', 'danger');
        return;
    }

    const celular = document.querySelector('#celularModificar').value.trim();
    if (!celular) {
        showModalAlert('Faltan campos', 'El campo celular es obligatorio', 'danger');
        return;
    }

    const cedula = document.querySelector('#cedulaModificar').value.trim();
    if (!cedula) {
        showModalAlert('Faltan campos', 'El campo cédula es obligatorio', 'danger');
        return;
    }

    const placa = document.querySelector('#placaModificar').value.trim();
    if (!placa) {
        showModalAlert('Faltan campos', 'El campo placa es obligatorio', 'danger');
        return;
    }
    
    let datos = {
        nombre,
        apellido,
        cedula,
        cargo,
        celular,
        correo,
        placa
    };

    await showSpinner(300);
    
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
            showModalAlert('¡Modificacion exitosa!', 'El empleado se modificó exitosamente.', 'success');
            cargarListaEmpleados();
            document.getElementById('divModificarEmpleado').style.display = 'none';
            document.getElementById('divRegistroEmpleado').style.display = 'flex';
        }
    } catch (error) {
        console.error('Error al modificar el empleado:', error);
    } finally {
        hideSpinner();
    }
}

async function cambioEstadoEmpleado(estado, idEmpleadoEstado) {

    let datos = { estado: estado };

    await showSpinner(150);

    try {
        const request = await fetch('/api/empleado/' + idEmpleadoEstado, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        if (request.ok) {
            showModalAlert('¡Modificacion exitosa!', 'Se modifico el estado del empleado exitosamente.', 'success');
            cargarListaEmpleados();
        }
    } catch (error) {
        console.error('Error al cambiar el estado del empleado:', error);
    } finally {
        hideSpinner();
    }
}
