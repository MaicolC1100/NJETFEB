// Función para obtener los encabezados de las solicitudes fetch
function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}

$(document).ready(function() {
    // on ready
    cargarEmpresas();
    cargarPasajeros();
    cargarListaSolicitudes();
});

const solicitudesValeTableBody = document.querySelector('#solicitudes-vale-table tbody');
const formAgregarSolicitudVale = document.querySelector('#form-agregar-solicitud-vale');
const empresaSelect = document.querySelector('#empresa');
const empresaModificarSelect = document.querySelector('#empresaModificar');
const pasajero1Select = document.querySelector('#pasajero1');
const pasajero2Select = document.querySelector('#pasajero2');
const pasajero3Select = document.querySelector('#pasajero3');
const pasajero4Select = document.querySelector('#pasajero4');
const pasajero1ModificarSelect = document.querySelector('#pasajero1Modificar');


formAgregarSolicitudVale.addEventListener('submit', async (event) => {
    event.preventDefault();
    await registrarSolicitudVale();
});

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

                // const option2 = document.createElement('option');
                // option2.value = empresa.idEmpresa;
                // option2.textContent = empresa.nombre;
                // empresaModificarSelect.appendChild(option2);
            }
        });
    } catch (error) {
        console.error('Error al obtener la lista de empresas:', error);
    } finally {
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
        pasajero1Select.innerHTML = '<option value="" active>Seleccionar</option>';
        pasajero2Select.innerHTML = '<option value="" active>Seleccionar</option>';
        pasajero3Select.innerHTML = '<option value="" active>Seleccionar</option>';
        pasajero4Select.innerHTML = '<option value="" active>Seleccionar</option>';
        // pasajero1ModificarSelect.innerHTML = '<option value="">Seleccionar</option>';

        // Llenar los selects con los datos obtenidos
        data.forEach(pasajero => {
            const option1 = document.createElement('option');
            option1.value = pasajero.idEmpleadoCliente;
            option1.textContent = pasajero.cedula + ' - ' + pasajero.nombre + ' ' + pasajero.apellido;
            pasajero1Select.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = pasajero.idEmpleadoCliente;
            option2.textContent = pasajero.cedula + ' - ' + pasajero.nombre + ' ' + pasajero.apellido;
            pasajero2Select.appendChild(option2);

            const option3 = document.createElement('option');
            option3.value = pasajero.idEmpleadoCliente;
            option3.textContent = pasajero.cedula + ' - ' + pasajero.nombre + ' ' + pasajero.apellido;
            pasajero3Select.appendChild(option3);

            const option4 = document.createElement('option');
            option4.value = pasajero.idEmpleadoCliente;
            option4.textContent = pasajero.cedula + ' - ' + pasajero.nombre + ' ' + pasajero.apellido;
            pasajero4Select.appendChild(option4);

        });

    } catch (error) {
        console.error('Error al obtener la lista de pasajeros:', error);
    } finally {
    }
}

// Función para cargar la lista de solicitudes de vale
async function cargarListaSolicitudes() {
    try {
        const request = await fetch('/api/solicitudes-vale/consultar', {
            method: 'GET',
            headers: getHeaders()
        });

        const data = await request.json();

        // Limpiar la tabla antes de volver a llenarla
        solicitudesValeTableBody.innerHTML = '';

        // Llenar la tabla con los datos de las solicitudes de vale
        data.forEach(solicitud => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${solicitud.id}</td>
                <td>${solicitud.nVale}</td>
                <td>${solicitud.usuario.nombre}</td>
                <td>${solicitud.empresa.nombre}</td>
                <td>${solicitud.origen}</td>
                <td>${solicitud.destino}</td>
                <td>${solicitud.motivo}</td>
                <td>${solicitud.fechaCreacion}</td>
                <td>${solicitud.fechaAprobacion}</td>
                <td>${solicitud.fechaServicio}</td>
                <td>${solicitud.pasajero1.nombre}</td>
                <td>${solicitud.pasajero2.nombre}</td>
                <td>${solicitud.pasajero3.nombre}</td>
                <td>${solicitud.pasajero4.nombre}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editarSolicitud(${solicitud.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarSolicitud(${solicitud.id})">Eliminar</button>
                </td>
            `;
            solicitudesValeTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener las solicitudes del vale:', error);
    }
}
async function registrarSolicitudVale() {
	let solicitudvale = {};
	let empresa = {};
	let pasajero1 = {};
	let pasajero2 = {};
	let pasajero3 = {};
	let pasajero4 = {};

	empresa.idEmpresa = document.querySelector('#empresa').value;
	pasajero1.idEmpleadoCliente = document.querySelector('#pasajero1').value;
	pasajero2.idEmpleadoCliente = document.querySelector('#pasajero2').value;
	pasajero3.idEmpleadoCliente = document.querySelector('#pasajero3').value;
	pasajero4.idEmpleadoCliente = document.querySelector('#pasajero4').value;

	// Reemplaza esto con la obtención del ID del usuario correcto
	let usuario = { idUsuario: 1 }; 

	solicitudvale.usuario = usuario;
	solicitudvale.nVale = document.querySelector('#nvale').value;
	solicitudvale.empresa = empresa;
	solicitudvale.origen = document.querySelector('#origen').value;
	solicitudvale.destino = document.querySelector('#destino').value;
	solicitudvale.motivo = document.querySelector('#motivo').value;
	solicitudvale.fechaCreacion = document.querySelector('#fecha_creacion').value;
	solicitudvale.fechaAprobacion = document.querySelector('#fecha_aprobacion').value;
	solicitudvale.fechaServicio = document.querySelector('#fecha_servicio').value;
	solicitudvale.pasajero1 = pasajero1;
	solicitudvale.pasajero2 = pasajero2;
	solicitudvale.pasajero3 = pasajero3;
	solicitudvale.pasajero4 = pasajero4;

	try {
        const request = await fetch('/api/solicitudes-vale/guardar', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(solicitudvale)
        });
        

		if (request.ok) {
			showModalAlert('¡Registro exitoso!', 'La solicitud de vale se registró exitosamente.', 'success');
			cargarListaSolicitudes();  // Actualizar la lista de empleados
		} else {
			console.error('Error en la solicitud:', request.statusText);
		}
	} catch (error) {
		console.error('Error al registrar la solicitud de vale:', error);
	} finally {
		// hideSpinner();
	}
}
