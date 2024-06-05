// Función para obtener los encabezados de las solicitudes fetch
function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN_HERE' // Cambia 'YOUR_TOKEN_HERE' por el token de autorización si es necesario
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
const empresaModificarSelect = document.querySelector('#empresaModificar');
const pasajero1Select = document.querySelector('#pasajero1');
const pasajero1ModificarSelect = document.querySelector('#pasajero1Modificar');

// Función para cargar la lista de empresas
async function cargarEmpresas() {
    // await showSpinner(800);

    try {
        const request = await fetch('api/empresa/consultar', {
            method: 'GET',
            headers: getHeaders()
        });

        const data = await request.json();

        // Limpiar los selects antes de volver a llenarlos
        empresaSelect.innerHTML = '<option value="" Active>Seleccionar</option>';
      // empresaModificarSelect.innerHTML = '<option value="">Seleccionar</option>';

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
        // hideSpinner();
    }
}

// Función para cargar la lista de pasajeros
async function cargarPasajeros() {
    // await showSpinner(800);

    try {
        const request = await fetch('api/empleado-cliente/consultar', {
            method: 'GET',
            headers: getHeaders()
        });

        const data = await request.json();

        // Limpiar los selects antes de volver a llenarlos
        pasajero1Select.innerHTML = '<option value="" active>Seleccionar</option>';
//        pasajero1ModificarSelect.innerHTML = '<option value="">Seleccionar</option>';

        // Llenar los selects con los datos obtenidos
        data.forEach(pasajero => {
            const option = document.createElement('option');
            option.value = pasajero.idPasajero;
            option.textContent = pasajero.nombre;
            pasajero1Select.appendChild(option);

            const option2 = document.createElement('option');
            option2.value = pasajero.idPasajero;
            option2.textContent = pasajero.nombre;
            pasajero1ModificarSelect.appendChild(option2);
        });

    } catch (error) {
        console.error('Error al obtener la lista de pasajeros:', error);
    } finally {
        // hideSpinner();
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
