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
const empresaSelect = document.querySelector('#empresa');
const empresaModificarSelect = document.querySelector('#empresaModificarSelect');
const pasajero1Select = document.querySelector('#pasajero1');
const pasajero2Select = document.querySelector('#pasajero2');
const pasajero3Select = document.querySelector('#pasajero3');
const pasajero4Select = document.querySelector('#pasajero4');
const pasajero1ModificarSelect = document.querySelector('#pasajero1ModificarSelect');
const pasajero2ModificarSelect = document.querySelector('#pasajero2ModificarSelect');
const pasajero3ModificarSelect = document.querySelector('#pasajero3ModificarSelect');
const pasajero4ModificarSelect = document.querySelector('#pasajero4ModificarSelect');
const formAgregarSolicitudVale = document.querySelector('#form-agregar-solicitud-vale');
const formModificarSolicitudVale = document.querySelector('#form-modificar-solicitud-vale');


formAgregarSolicitudVale.addEventListener('submit', async (event) => {
    event.preventDefault();
    await registrarSolicitudVale();
});

formModificarSolicitudVale.addEventListener('submit', async (event) => {
    event.preventDefault();
    await registrarModificarSolicitudVale();
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
		empresaModificarSelect.innerHTML = '<option value="" Active>Seleccionar</option>';
		
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
        console.log('Datos de pasajeros obtenidos:', data);

        // Obtener los elementos select
        const selectElements = [
            document.getElementById('pasajero1Select'),
            document.getElementById('pasajero2Select'),
            document.getElementById('pasajero3Select'),
            document.getElementById('pasajero4Select'),
            document.getElementById('pasajero1ModificarSelect'),
            document.getElementById('pasajero2ModificarSelect'),
            document.getElementById('pasajero3ModificarSelect'),
            document.getElementById('pasajero4ModificarSelect')
        ];

        // Verificar que los selects existen
        selectElements.forEach(select => {
            if (!select) {
                console.error('No se encontró el elemento select:', select);
                return;
            }
            select.innerHTML = '<option value="" active>Seleccionar</option>';
        });

        // Llenar los selects con las opciones
        data.forEach(pasajero => {
            selectElements.forEach(select => {
                const option = document.createElement('option');
                option.value = pasajero.idEmpleadoCliente;
                option.textContent = `${pasajero.cedula} - ${pasajero.nombre} ${pasajero.apellido}`;
                select.appendChild(option.cloneNode(true));
            });
        });

        console.log('Selects llenados correctamente');
    } catch (error) {
        console.error('Error al obtener la lista de pasajeros:', error);
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

async function modificarSolicitudVale(idSolicitudVale) {
    document.getElementById('divRegistrosolicitudvale').style.display = 'none';

    // await showSpinner(300);

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

        // Seleccionar la empresa
        const empresaModificarSelect = document.getElementById('empresaModificarSelect');
        for (let i = 0; i < empresaModificarSelect.options.length; i++) {
            let option = empresaModificarSelect.options[i];
            if (option.value == solicitudVale.empresa.idEmpresa) {
                empresaModificarSelect.selectedIndex = i;
                break;
            }
        }

     // Seleccionar los pasajeros correctos
        const pasajero1ModificarSelect = document.getElementById('pasajero1ModificarSelect');
        const pasajero2ModificarSelect = document.getElementById('pasajero2ModificarSelect');
        const pasajero3ModificarSelect = document.getElementById('pasajero3ModificarSelect');
        const pasajero4ModificarSelect = document.getElementById('pasajero4ModificarSelect');

        pasajero1ModificarSelect.value = solicitudVale.pasajero1 ? solicitudVale.pasajero1.idEmpleadoCliente : '';
        pasajero2ModificarSelect.value = solicitudVale.pasajero2 ? solicitudVale.pasajero2.idEmpleadoCliente : '';
        pasajero3ModificarSelect.value = solicitudVale.pasajero3 ? solicitudVale.pasajero3.idEmpleadoCliente : '';
        pasajero4ModificarSelect.value = solicitudVale.pasajero4 ? solicitudVale.pasajero4.idEmpleadoCliente : '';
        
        document.getElementById('divModificarSolicitudVale').style.display = 'flex';
        
    } catch (error) {
        console.error('Error al obtener los datos del empleado cliente:', error);
    } finally {
        // hideSpinner();
    }
}

async function registrarModificarSolicitudVale() {
    const nvale = document.querySelector('#nvaleModificar').value.trim();
    if (!nvale) {
        showModalAlert('Faltan campos', 'El campo N° Vale es obligatorio', 'danger');
        return;
    }

    const origen = document.querySelector('#origenModificar').value.trim();
    if (!origen) {
        showModalAlert('Faltan campos', 'El campo origen es obligatorio', 'danger');
        return;
    }

    const destino = document.querySelector('#destinoModificar').value.trim();
    if (!destino) {
        showModalAlert('Faltan campos', 'El campo destino es obligatorio', 'danger');
        return;
    }

    const motivo = document.querySelector('#motivoModificar').value.trim();
    if (!motivo) {
        showModalAlert('Faltan campos', 'El campo motivo es obligatorio', 'danger');
        return;
    }

    const fechaCreacion = document.querySelector('#fecha_creacionModificar').value;
    if (!fechaCreacion) {
        showModalAlert('Faltan campos', 'El campo fecha de creación es obligatorio', 'danger');
        return;
    }

    const fechaAprobacion = document.querySelector('#fecha_aprobacionModificar').value;
    if (!fechaAprobacion) {
        showModalAlert('Faltan campos', 'El campo fecha de aprobación es obligatorio', 'danger');
        return;
    }

    const fechaServicio = document.querySelector('#fecha_servicioModificar').value;
    if (!fechaServicio) {
        showModalAlert('Faltan campos', 'El campo fecha de servicio es obligatorio', 'danger');
        return;
    }

    const idEmpresa = parseInt(document.querySelector('#empresaModificarSelect').value, 10);
    if (!idEmpresa) {
        showModalAlert('Faltan campos', 'Debe seleccionar una empresa', 'danger');
        return;
    }

    // Obtener los IDs de los pasajeros seleccionados
    const pasajero1 = parseInt(document.querySelector('#pasajero1ModificarSelect').value, 10);
    const pasajero2 = parseInt(document.querySelector('#pasajero2ModificarSelect').value, 10);
    const pasajero3 = parseInt(document.querySelector('#pasajero3ModificarSelect').value, 10);
    const pasajero4 = parseInt(document.querySelector('#pasajero4ModificarSelect').value, 10);

    let datos = {
        nVale: nvale,
        origen,
        destino,
        motivo,
        fechaCreacion,
        fechaAprobacion,
        fechaServicio,
        empresa: { idEmpresa },
        pasajero1,
        pasajero2,
        pasajero3,
        pasajero4
    };

    // await showSpinner(300);

    try {
        const request = await fetch('/api/solicitudes-vale/actualizar/' + idSolicitudValeModificar, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(datos)
        });
        if (request.ok) {
            showModalAlert('¡Modificación exitosa!', 'La solicitud de vale se modificó exitosamente.', 'success');
            // Realizar cualquier otra acción necesaria después de la modificación
        }
    } catch (error) {
        console.error('Error al modificar la solicitud de vale:', error);
    } finally {
        // hideSpinner();
    }
}
