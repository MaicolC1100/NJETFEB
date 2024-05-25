$(document).ready(function() {
    // on ready
    cargarEmpresas();
    cargarListaEmpleadosCliente();
});

const empleadosClienteTableBody = document.querySelector('#empleados-cliente-table tbody');
const formAgregarEmpleadoCliente = document.querySelector('#form-agregar-empleado-cliente');
const empresaSelect = document.querySelector('#empresa');
const empresaModificarSelect = document.querySelector('#empresaModificar');
let idEmpleadoClienteModificar = null;

// Función para cargar la lista de empresas
async function cargarEmpresas() {

    await showSpinner(800);

    try {
        const response = await fetch('/api/empresa');
        const data = await response.json();
        
        // Limpiar los selects antes de volver a llenarlos
        empresaSelect.innerHTML = '';
        empresaModificarSelect.innerHTML = '';

        data.forEach(empresa => {
            if (empresa.estado) {
                const option = document.createElement('option');
                option.value = empresa.idEmpresa;
                option.textContent = empresa.nombre;
                empresaSelect.appendChild(option);

                const option2 = document.createElement('option');
                option2.value = empresa.idEmpresa;
                option2.textContent = empresa.nombre;
                empresaModificarSelect.appendChild(option2);
            }   
        });
    } catch (error) {
        console.error('Error al obtener la lista de empresas:', error);
    } finally {
        hideSpinner();
    }
}

// Función para cargar la lista de empleados de clientes
async function cargarListaEmpleadosCliente() {

    try {
        const response = await fetch('/api/empleado-cliente');
        const data = await response.json();

        // Limpiar la tabla antes de volver a llenarla
        empleadosClienteTableBody.innerHTML = '';

        // Llenar la tabla con los datos de los empleados de clientes
        data.forEach(empleadoCliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${empleadoCliente.nombre}</td>
                <td>${empleadoCliente.apellido}</td>
                <td>${empleadoCliente.cedula}</td>
                <td>${empleadoCliente.ctroCosto}</td>
                <td>${empleadoCliente.gerencia}</td>
                <td>${empleadoCliente.empresa.nombre}</td>
                	${empleadoCliente.estado ? 
                    '<td class="td-icon">'+
                        '<a href="#" onclick="cambioEstadoEmpleadoCliente(0, '+ empleadoCliente.idEmpleadoCliente + ')" title="Modificar">'+
                            '<i class="bi bi-toggle-on" style="font-size: 1rem; color: darkgreen;" title="Activo">'+
                            '</i>'+
                        '</a>'+
                    '</td>' :
                    '<td class="td-icon" style="transform: rotate(180deg);">'+
                        '<a href="#" onclick="cambioEstadoEmpleadoCliente(1,'+ empleadoCliente.idEmpleadoCliente + ')" title="Modificar">'+
                            '<i class="bi bi-toggle-on" style="font-size: 1rem; color: darkred;" title="Inactivo">'+
                            '</i>'+
                        '</a>'+
                    '</td>'}
					<td class="td-icon">
						<a href="#" onclick="modificarEmpleadoCliente(${empleadoCliente.idEmpleadoCliente})" class="btn btn-warning btn-sm" title="Modificar"><i class="bi bi-eraser-fill"></i></a>
					</td>
           		`;
            empleadosClienteTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los datos de los empleados de clientes:', error);
    }
}

async function registrarEmpleadoCliente() {
    
    let datos = {};
    let empresa = {};

    empresa.idEmpresa = document.querySelector('#empresa').value;

    datos.nombre = document.querySelector('#nombre').value;
    datos.apellido = document.querySelector('#apellido').value;
    datos.cedula = document.querySelector('#cedula').value;
    datos.ctroCosto = document.querySelector('#ctroCosto').value;
    datos.gerencia = document.querySelector('#gerencia').value;
    datos.empresa = empresa;
    datos.estado = true;

    // Validar campos
    if (!datos.empresa) {
        showModalAlert('Faltan datos','El campo empresa es obligatorio.', 'danger');
        return;
    }
    if (!datos.nombre) {
        showModalAlert('Faltan datos','El campo nombre es obligatorio.', 'danger');
        return;
    }
    if (!datos.apellido) {
        showModalAlert('Faltan datos','El campo apellido es obligatorio.', 'danger');
        return;
    }
	if (!datos.ctroCosto) {
        showModalAlert('Faltan datos','El campo centro costo es obligatorio.', 'danger');
        return;
    }
	if (!datos.gerencia) {
        showModalAlert('Faltan datos','El campo gerencia es obligatorio.', 'danger');
        return;
    }
    if (!datos.cedula) {
        showModalAlert('Faltan datos','El campo cédula es obligatorio.', 'danger');
        return;
    }    

    await showSpinner(800);

    try {
        const request = await fetch('/api/empleado-cliente', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        if (request.ok) {
            showModalAlert('¡Registro existoso!', 'El empleado cliente se creo exitosamente.', 'success');
            cargarListaEmpleadosCliente();  // Actualizar la lista de empleados
        }
    } catch (error) {
        console.error('Error al registrar el empleado cliente:', error);
    } finally {
        hideSpinner();
    }
}

async function modificarEmpleadoCliente(idEmpleadoCliente) {
	
    document.getElementById('divRegistroEmpleadoCliente').style.display = 'none';

    await showSpinner(300);

    try {
        const request = await fetch('/api/empleado-cliente/' + idEmpleadoCliente, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const empleadoCliente = await request.json();
        
        idEmpleadoClienteModificar = empleadoCliente.idEmpleadoCliente;
        document.getElementById('nombreModificar').value = empleadoCliente.nombre;
        document.getElementById('apellidoModificar').value = empleadoCliente.apellido;
        document.getElementById('ctroCostoModificar').value = empleadoCliente.ctroCosto;
        document.getElementById('gerenciaModificar').value = empleadoCliente.gerencia;
        document.getElementById('cedulaModificar').value = empleadoCliente.cedula;

        for (let i = 0; i < empresaModificarSelect.options.length; i++) {
            let option = empresaModificarSelect.options[i];

            // Verificar si el valor de la opción coincide con el valor deseado
            if (option.value == empleadoCliente.empresa.idEmpresa) {
                empresaModificarSelect.selectedIndex = i;
                break; // Salir del bucle una vez encontrada la coincidencia
            }
        }

        document.getElementById('divModificarEmpleadoCliente').style.display = 'flex';
    } catch (error) {
        console.error('Error al obtener los datos del empleado cliente:', error);
    } finally {
        hideSpinner();
    }
}

async function cambioEstadoEmpleadoCliente(estado, idEmpleadoClienteEstado) {

    let datos = { estado: estado };

    await showSpinner(150);

    try {
        const request = await fetch('/api/empleado-cliente/' + idEmpleadoClienteEstado, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        if (request.ok) {
            showModalAlert('¡Modificacion exitosa!', 'Se modifico el estado del empleado cliente exitosamente.', 'success');
            cargarListaEmpleadosCliente();
        }
    } catch (error) {
        console.error('Error al cambiar el estado del empleado cliente:', error);
    } finally {
        hideSpinner();
    }
}

async function registrarModificarEmpleadoCliente() {

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

    const ctroCosto = document.querySelector('#ctroCostoModificar').value.trim();
    if (!ctroCosto) {
        showModalAlert('Faltan campos', 'El campo centro de costo es obligatorio', 'danger');
        return;
    }
    const gerencia = document.querySelector('#gerenciaModificar').value.trim();
    if (!gerencia) {
        showModalAlert('Faltan campos', 'El campo gerencia es obligatorio', 'danger');
        return;
    }

    const cedula = document.querySelector('#cedulaModificar').value.trim();
    if (!cedula) {
        showModalAlert('Faltan campos', 'El campo cédula es obligatorio', 'danger');
        return;
    }

    const idEmpresa = parseInt(document.querySelector('#empresaModificar').value, 10);
    if (!idEmpresa) {
        showModalAlert('Faltan campos', 'El campo empresa es obligatorio', 'danger');
        return;
    }
    
    let empresa = {idEmpresa};

    let datos = {
        nombre,
        apellido,
        ctroCosto,
        gerencia,
        cedula,
        empresa
    };

    await showSpinner(300);

    try {
        const request = await fetch('/api/empleado-cliente/' + idEmpleadoClienteModificar, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        if (request.ok) {
            showModalAlert('¡Modificacion exitosa!', 'El empleado cliente se modificó exitosamente.', 'success');
            cargarListaEmpleadosCliente ();
            document.getElementById('divModificarEmpleadoCliente').style.display = 'none';
            document.getElementById('divRegistroEmpleadoCliente').style.display = 'flex';
        }
    } catch (error) {
        console.error('Error al modificar el empleado:', error);
    } finally {
        hideSpinner();
    }
}