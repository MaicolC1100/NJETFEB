

$(document).ready(function() {
    // on ready
    cargarEmpresas();
    cargarPasajeros();
    cargarEmpleado();
    cargarListaAsignacionesVale();
});

const asignacionesValeTableBody = document.querySelector('#asignaciones-vale-table tbody');
const formAgregarAsignacionVale = document.querySelector('#form-agregar-asginacion-vale');
const formModificarAsignacionVale = document.querySelector('#form-modificar-asignacion-vale');

const empresaSelect = document.querySelector('#empresa');
const empresaModificarSelect = document.querySelector('#modificar_empresa');
const empleadoSelect = document.querySelector('#empleado');
const empleadoModificarSelect = document.querySelector('#modificar_empleado');
const pasajero1Select = document.querySelector('#pasajero1');
const pasajero2Select = document.querySelector('#pasajero2');
const pasajero3Select = document.querySelector('#pasajero3');
const pasajero4Select = document.querySelector('#pasajero4');
const pasajero1ModificarSelect = document.querySelector('#modificar_pasajero1');
const pasajero2ModificarSelect = document.querySelector('#modificar_pasajero2');
const pasajero3ModificarSelect = document.querySelector('#modificar_pasajero3');
const pasajero4ModificarSelect = document.querySelector('#modificar_pasajero4');


formAgregarAsignacionVale.addEventListener('submit', async (event) => {
    event.preventDefault();
    await registrarAsignacionVale();
});


formModificarAsignacionVale.addEventListener('submit', async (event) => {
    event.preventDefault();
    await registrarModificarAsignacionVale();
});

document.addEventListener('DOMContentLoaded', function () {
    // Cargar empleados y agregar evento de cambio al seleccionar un conductor
    cargarEmpleado().then(() => {
        empleadoSelect.addEventListener('change', async (event) => {
            const empleadoId = event.target.value;
            if (empleadoId) {
                const empleado = await obtenerEmpleado(empleadoId);
                if (empleado) {
                    console.log(empleado); // Verifica la estructura de la respuesta
                    document.querySelector('#idcdt').value = empleado.cedula || ''; // Ajusta aquí si es necesario
                    document.querySelector('#placa').value = empleado.placa || '';
                }
            } else {
                // Limpiar los campos si no se selecciona ningún conductor
                document.querySelector('#idcdt').value = '';
                document.querySelector('#placa').value = '';
            }
        });
    });
    cargarListaAsignacionesVale();
});

// Función para obtener un empleado por ID
async function obtenerEmpleado(id) {
    try {
        const response = await fetch(`/api/asignacion-vale/empleados/${id}`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (response.ok) {
            const empleado = await response.json();
            console.log(empleado); // Verifica la estructura de la respuesta
            return empleado;
        } else {
            console.error('Error al obtener el empleado:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el empleado:', error);
        return null;
    }
}

// Función para cargar la lista de empresas
async function cargarEmpresas() {
    try {
        const request = await fetch('api/empresa/consultar', {
            method: 'GET',
            headers: getHeaders()
        });

        const data = await request.json();

        // Limpiar los selects antes de volver a llenarlos
        empresaSelect.innerHTML = '<option value="" Active>Seleccionar</option>';

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
    }
}

// Función para cargar el empleado
async function cargarEmpleado() {
    try {
        const request = await fetch('api/empleado/consultar', {
            method: 'GET',
            headers: getHeaders()
        });

        const data = await request.json();

        // Limpiar los selects antes de volver a llenarlos
        empleadoSelect.innerHTML = '<option value="" Active>Seleccionar</option>';

        data.forEach(empleado => {
            if (empleado.estado) {
                const option = document.createElement('option');
                option.value = empleado.idEmpleado;
                option.textContent = empleado.nombre + ' ' + empleado.apellido;
                empleadoSelect.appendChild(option);
                
                
                const option2 = document.createElement('option');
                option2.value = empleado.idEmpleado;
                option2.textContent = empleado.nombre + ' ' + empleado.apellido;
                empleadoModificarSelect.appendChild(option2);
            }
        });
    } catch (error) {
        console.error('Error al obtener la lista de empleado:', error);
    }
}

// Función para cargar la lista de pasajeros
async function cargarPasajeros() {
    try {
        const request = await fetch('api/empleado-cliente/consultar', {
            method: 'GET',
            headers: getHeaders()
        });

        const data = await request.json();

        // Limpiar los selects antes de volver a llenarlos
        const selectLists = [pasajero1Select, pasajero2Select, pasajero3Select, pasajero4Select, 
                             pasajero1ModificarSelect, pasajero2ModificarSelect, pasajero3ModificarSelect, pasajero4ModificarSelect];
        selectLists.forEach(select => {
            select.innerHTML = '<option value="" active>Seleccionar</option>';
        });

        // Llenar los selects con los datos obtenidos
        data.forEach(pasajero => {
            const option = document.createElement('option');
            option.value = pasajero.idEmpleadoCliente;
            option.textContent = `${pasajero.cedula} - ${pasajero.nombre} ${pasajero.apellido}`;

            pasajero1Select.appendChild(option.cloneNode(true));
            pasajero2Select.appendChild(option.cloneNode(true));
            pasajero3Select.appendChild(option.cloneNode(true));
            pasajero4Select.appendChild(option.cloneNode(true));

            pasajero1ModificarSelect.appendChild(option.cloneNode(true));
            pasajero2ModificarSelect.appendChild(option.cloneNode(true));
            pasajero3ModificarSelect.appendChild(option.cloneNode(true));
            pasajero4ModificarSelect.appendChild(option.cloneNode(true));
        });

    } catch (error) {
        console.error('Error al obtener la lista de pasajeros:', error);
    } finally {
    }
}
// Función para cargar la lista de asignaciones de vale
async function cargarListaAsignacionesVale() {
    try {
        const response = await fetch('api/asignacion-vale/consultar', {
            method: 'GET',
            headers: getHeaders()
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        // Limpiar la tabla antes de volver a llenarla
        asignacionesValeTableBody.innerHTML = '';

        // Llenar la tabla con los datos de las asignaciones de vale
        data.forEach(asignacion => {
            const row = document.createElement('tr');

            // Formatear fechas
            const formatFecha = fecha => new Date(fecha).toLocaleDateString();

            row.innerHTML = `
                <td>${asignacion.idAsigVale}</td>
                <td>${asignacion.n_vale}</td>
                <td>${asignacion.usuario.nombre}</td>
                <td>${asignacion.empresa.nombre}</td>
                <td>${asignacion.empleado.nombre}</td>
                <td>${asignacion.placa}</td>
                <td>${asignacion.cedula}</td>
                <td>${asignacion.origen}</td>
                <td>${asignacion.destino}</td>
                <td>${asignacion.motivo}</td>
                <td>${asignacion.valorVale}</td>
                <td>${formatFecha(asignacion.fechaCreacion)}</td>
                <td>${formatFecha(asignacion.fechaAprobacion)}</td>
                <td>${formatFecha(asignacion.fechaServicio)}</td>
                <td>${asignacion.pasajero1 ? asignacion.pasajero1.nombre : ''}</td>
                <td>${asignacion.pasajero2 ? asignacion.pasajero2.nombre : ''}</td>
                <td>${asignacion.pasajero3 ? asignacion.pasajero3.nombre : ''}</td>
                <td>${asignacion.pasajero4 ? asignacion.pasajero4.nombre : ''}</td>
              	<td class="td-icon">
              	<a href="#" onclick="modificarAsignacionVale(${asignacion.idAsigVale})" class="btn btn-warning btn-sm" title="Modificar"><i class="bi bi-eraser-fill"></i></a>
				</td>
					
				</td>
            `;
            asignacionesValeTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener la lista de asignaciones de vale:', error);
    }
}

/// Función para registrar una nueva solicitud de vale
async function registrarAsignacionVale() {
    let asignacionvale = {};
    let empresa = {};
    let empleado = {};
    let pasajero1 = {};
    let pasajero2 = {};
    let pasajero3 = {};
    let pasajero4 = {};

    // Obtener valores del formulario
    empresa.idEmpresa = empresaSelect.value;
    empleado.idEmpleado = empleadoSelect.value;
    pasajero1.idEmpleadoCliente = pasajero1Select.value;
    pasajero2.idEmpleadoCliente = pasajero2Select.value;
    pasajero3.idEmpleadoCliente = pasajero3Select.value;
    pasajero4.idEmpleadoCliente = pasajero4Select.value;

 	let usuario = { idUsuario: localStorage.idUsuario };

    asignacionvale.usuario = usuario;
    asignacionvale.n_vale = parseInt(document.querySelector('#nvale').value); // Asegúrate de que el valor no sea NaN


    asignacionvale.empresa = empresa;
    asignacionvale.empleado = empleado;
    asignacionvale.placa = document.querySelector('#placa').value;
    asignacionvale.cedula = document.querySelector('#idcdt').value;
    asignacionvale.origen = document.querySelector('#origen').value;
    asignacionvale.destino = document.querySelector('#destino').value;
    asignacionvale.motivo = document.querySelector('#motivo').value;
    asignacionvale.valorVale = parseFloat(document.querySelector('#valorvale').value) || 0;
    asignacionvale.fechaCreacion = document.querySelector('#fecha_creacion').value;
    asignacionvale.fechaAprobacion = document.querySelector('#fecha_aprobacion').value;
    asignacionvale.fechaServicio = document.querySelector('#fecha_servicio').value;
    asignacionvale.pasajero1 = pasajero1;
    asignacionvale.pasajero2 = pasajero2;
    asignacionvale.pasajero3 = pasajero3;
    asignacionvale.pasajero4 = pasajero4;

    // Imprimir el objeto para verificación
    console.log('AsignacionVale:', JSON.stringify(asignacionvale, null, 2));

    try {
        // Enviar solicitud POST al servidor
        const request = await fetch('/api/asignacion-vale/guardar', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(asignacionvale)
        });

        // Manejar la respuesta del servidor
        if (request.ok) {
            showModalAlert('¡Registro exitoso!', 'La Asignacion de vale se registró exitosamente.', 'success');
            cargarListaAsignacionesVale(); // Actualizar la lista de solicitudes
         	  // Restablecer el formulario después de un registro exitoso
            document.querySelector('#form-agregar-asginacion-vale').reset();
        } else {
            console.error('Error en la asignacion:', request.statusText);
        }
    } catch (error) {
        console.error('Error al registrar la asignacion de vale:', error);
    }
}

async function modificarAsignacionVale(idAsigVale) {
	
    document.getElementById('divRegistroAsignacionvale').style.display = 'none';
    document.getElementById('divModificarAsignacionVale').style.display = 'flex';

    try {
        const request = await fetch(`/api/asignacion-vale/consultar/${idAsigVale}`,{
            method: 'GET',
            headers: getHeaders()
        });
        const asignacionvale = await request.json();
        
        idAsignacionValeModificar = asignacionvale.idAsigVale;
        document.getElementById('modificar_placa').value = asignacionvale.placa;
        document.getElementById('modificar_idcdt').value = asignacionvale.cedula;
        document.getElementById('modificar_nvale').value = asignacionvale.n_vale;
        document.getElementById('modificar_origen').value = asignacionvale.origen;
        document.getElementById('modificar_destino').value = asignacionvale.destino;
        document.getElementById('modificar_motivo').value = asignacionvale.motivo;
        document.getElementById('modificar_valorvale').value = asignacionvale.valorVale;
        document.getElementById('modificar_fecha_creacion').value = asignacionvale.fechaCreacion.split('T')[0];
        document.getElementById('modificar_fecha_aprobacion').value = asignacionvale.fechaAprobacion.split('T')[0];
        document.getElementById('modificar_fecha_servicio').value = asignacionvale.fechaServicio.split('T')[0];       

        // Seleccionar la empresa a modificar
        seleccionarOpcion(empresaModificarSelect, asignacionvale.empresa.idEmpresa);
        
        // Seleccionar los pasajeros a modificar
        seleccionarOpcion(pasajero1ModificarSelect, asignacionvale.pasajero1.idEmpleadoCliente);
        seleccionarOpcion(pasajero2ModificarSelect, asignacionvale.pasajero2.idEmpleadoCliente);
        seleccionarOpcion(pasajero3ModificarSelect, asignacionvale.pasajero3.idEmpleadoCliente);
        seleccionarOpcion(pasajero4ModificarSelect, asignacionvale.pasajero4.idEmpleadoCliente);

        // Seleccionar el empleado
        seleccionarOpcion(empleadoModificarSelect, asignacionvale.empleado.idEmpleado);
        
    } catch (error) {
        console.error('Error al obtener los datos de la solicitud de vale:', error);
    }
}


function seleccionarOpcion(selectElement, value) {
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value == value) {
            selectElement.selectedIndex = i;
            break;
        }
    }
}

async function registrarModificarAsignacionVale() {
    try {
        const n_vale = document.querySelector('#modificar_nvale').value.trim();
        if (!n_vale) {
            showModalAlert('Faltan campos', 'El campo número de vale es obligatorio', 'danger');
            return;
        }
		
		const cedula = document.querySelector('#modificar_idcdt').value.trim();
        if (!cedula) {
            showModalAlert('Faltan campos', 'El campo cedula es obligatorio', 'danger');
            return;
        }
        
        const placa = document.querySelector('#modificar_placa').value.trim();
        if (!placa) {
            showModalAlert('Faltan campos', 'El campo placa es obligatorio', 'danger');
            return;
        }
        
        const origen = document.querySelector('#modificar_origen').value.trim();
        if (!origen) {
            showModalAlert('Faltan campos', 'El campo origen es obligatorio', 'danger');
            return;
        }

        const destino = document.querySelector('#modificar_destino').value.trim();
        if (!destino) {
            showModalAlert('Faltan campos', 'El campo destino es obligatorio', 'danger');
            return;
        }

        const motivo = document.querySelector('#modificar_motivo').value.trim();
        if (!motivo) {
            showModalAlert('Faltan campos', 'El campo motivo es obligatorio', 'danger');
            return;
        }

		const valorvale = document.querySelector('#modificar_valorvale').value.trim();
        if (!valorvale) {
            showModalAlert('Faltan campos', 'El campo valor del vale es obligatorio', 'danger');
            return;
        }
        
        const fechaCreacion = document.querySelector('#modificar_fecha_creacion').value.trim();
        if (!fechaCreacion) {
            showModalAlert('Faltan campos', 'El campo fecha de creación es obligatorio', 'danger');
            return;
        }

        const fechaAprobacion = document.querySelector('#modificar_fecha_aprobacion').value.trim();
        if (!fechaAprobacion) {
            showModalAlert('Faltan campos', 'El campo fecha de aprobación es obligatorio', 'danger');
            return;
        }

        const fechaServicio = document.querySelector('#modificar_fecha_servicio').value.trim();
        if (!fechaServicio) {
            showModalAlert('Faltan campos', 'El campo fecha de servicio es obligatorio', 'danger');
            return;
        }

        const idEmpresa = parseInt(document.querySelector('#modificar_empresa').value, 10);
        if (!idEmpresa) {
            showModalAlert('Faltan campos', 'El campo empresa es obligatorio', 'danger');
            return;
        }
        
        const idEmpleado = parseInt(document.querySelector('#modificar_empleado').value, 10);
        if (!idEmpleado) {
            showModalAlert('Faltan campos', 'El campo empleado es obligatorio', 'danger');
            return;
        }

        const idPasajero1 = parseInt(document.querySelector('#modificar_pasajero1').value, 10);
        const idPasajero2 = parseInt(document.querySelector('#modificar_pasajero2').value, 10);
        const idPasajero3 = parseInt(document.querySelector('#modificar_pasajero3').value, 10);
        const idPasajero4 = parseInt(document.querySelector('#modificar_pasajero4').value, 10);

        let empresa = { idEmpresa };
        let empleado = { idEmpleado };
        let pasajero1 = { idEmpleadoCliente: idPasajero1 };
        let pasajero2 = { idEmpleadoCliente: idPasajero2 };
        let pasajero3 = { idEmpleadoCliente: idPasajero3 };
        let pasajero4 = { idEmpleadoCliente: idPasajero4 };
		let usuario = { idUsuario: localStorage.idUsuario };
		
        let datos = {
			usuario,
            n_vale,
            cedula,
            placa,
            origen,
            destino,
            motivo,
            valorvale,
            fechaCreacion,
            fechaAprobacion,
            fechaServicio,
            empresa,
            empleado,
            pasajero1,
            pasajero2,
            pasajero3,
            pasajero4
        };

        const request = await fetch(`/api/asignacion-vale/actualizar/${idAsignacionValeModificar}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(datos)
        });

        if (request.ok) {
            showModalAlert('¡Modificación exitosa!', 'La solicitud de vale se modificó exitosamente.', 'success');
            cargarListaAsignacionesVale();
            document.getElementById('divModificarAsignacionVale').style.display = 'none';
            document.getElementById('divRegistroAsignacionvale').style.display = 'flex';
        } else {
            const errorData = await request.json();
            showModalAlert('Error al modificar', errorData.message || 'Ocurrió un error al modificar la solicitud de vale.', 'danger');
        }
    } catch (error) {
        console.error('Error al modificar la solicitud de vale:', error);
        showModalAlert('Error al modificar', 'Ocurrió un error al modificar la solicitud de vale.', 'danger');
    }
}


// Función para obtener los encabezados de las solicitudes fetch
function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}