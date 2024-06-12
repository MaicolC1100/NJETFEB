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
const empresaModificarSelect = document.querySelector('#empresaModificarSelect');
const pasajero1Select = document.querySelector('#pasajero1select');
const pasajero2Select = document.querySelector('#pasajero2select');
const pasajero3Select = document.querySelector('#pasajero3select');
const pasajero4Select = document.querySelector('#pasajero4select');
const pasajero1ModificarSelect = document.querySelector('#pasajero1ModificarSelect');
const pasajero2ModificarSelect = document.querySelector('#pasajero2ModificarSelect');
const pasajero3ModificarSelect = document.querySelector('#pasajero3ModificarSelect');
const pasajero4ModificarSelect = document.querySelector('#pasajero4ModificarSelect');


formAgregarSolicitudVale.addEventListener('submit', async (event) => {
    event.preventDefault();
    await registrarSolicitudVale();
});

//formModificarSolicitudVale.addEventListener('submit', async (event) => {
//    event.preventDefault();
//    await registrarModificarSolicitudVale();
//});

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
		empresaModificarSelect.innerHTML = '<option value="">Seleccionar</option>';

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
                <td class="td-icon">
					<a href="#" onclick="modificarSolicitudVale(${solicitud.idSolicitudVale})" class="btn btn-warning btn-sm" title="Modificar"><i class="bi bi-eraser-fill"></i></a>
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
	pasajero1.idEmpleadoCliente = document.querySelector('#pasajero1select').value;
	pasajero2.idEmpleadoCliente = document.querySelector('#pasajero2select').value;
	pasajero3.idEmpleadoCliente = document.querySelector('#pasajero3select').value;
	pasajero4.idEmpleadoCliente = document.querySelector('#pasajero4select').value;

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


async function modificarSolicitudVale(idSolicitudVale) {
    document.getElementById('divRegistrosolicitudvale').style.display = 'none';
  	document.getElementById('divModificarSolicitudVale').style.display = 'flex';

    try {
        const request = await fetch('/api/solicitudes-vale/consultar/' + idSolicitudVale, {
            method: 'GET',
            headers: getHeaders()
        });
        const solicitudVale = await request.json();

        idSolicitudValeModificar = solicitudVale.idSolicitudVale;
        document.getElementById('nvaleModificar').value = solicitudVale.nVale;
        document.getElementById('origenModificar').value = solicitudVale.origen;
        document.getElementById('destinoModificar').value = solicitudVale.destino;
        document.getElementById('motivoModificar').value = solicitudVale.motivo;
        document.getElementById('fecha_creacionModificar').value = solicitudVale.fechaCreacion.split('T')[0];
        document.getElementById('fecha_aprobacionModificar').value = solicitudVale.fechaAprobacion.split('T')[0];
        document.getElementById('fecha_servicioModificar').value = solicitudVale.fechaServicio.split('T')[0];       

        // Seleccionar la empresa a modificar
        for (let i = 0; i < empresaModificarSelect.options.length; i++) {
            let option = empresaModificarSelect.options[i];

            // Verificar si el valor de la opción coincide con el valor deseado
            if (option.value == solicitudVale.empresa.idEmpresa) {
                empresaModificarSelect.selectedIndex = i;
                break; // Salir del bucle una vez encontrada la coincidencia
            }
        }
        
        // Seleccionar el pasajero a modificar
        for (let i = 0; i < pasajero1ModificarSelect.options.length; i++) {
            let option = pasajero1ModificarSelect.options[i];

            // Verificar si el valor de la opción coincide con el valor deseado
            if (option.value == solicitudVale.pasajero1.id_pasajero_1) {
                pasajero1ModificarSelect.selectedIndex = i;
                break; // Salir del bucle una vez encontrada la coincidencia
            }
        }
        
        
    // await showSpinner(300);
    } catch (error) {
        console.error('Error al obtener los datos del empleado cliente:', error);
    } finally {
        // hideSpinner();
    }
}
