// Función para cambiar el formato de la fecha
function cambiarFormatoFecha(fecha) {
    const fechaSplit = fecha.split('-');
    const fechaReordenada = fechaSplit.reverse().join('/');
    return fechaReordenada;
}

$(document).ready(function() {
    cargarListaSolicitudesVale();
    cargarListaEmpleadosCliente();
});

const solicitudesValeTableBody = document.querySelector('#solicitudes-vale-table tbody');
const formSolicitudVale = document.querySelector('#form-solicitud-vale');
const pasajero1Dropdown = document.querySelector('#pasajero1');
const pasajero2Dropdown = document.querySelector('#pasajero2');
const pasajero3Dropdown = document.querySelector('#pasajero3');
const pasajero4Dropdown = document.querySelector('#pasajero4');
let idSolicitudValeModificar = null;

async function cargarListaSolicitudesVale() {
    try {
        const response = await fetch('/solicitudes_vale');
        const data = await response.json();

        solicitudesValeTableBody.innerHTML = '';

        data.forEach(solicitudVale => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${solicitudVale.idSolicitudVale}</td>
                <td>${solicitudVale.nVale}</td>
                <td>${solicitudVale.usuario.idUsuario}</td>
                <td>${solicitudVale.empresa.idEmpresa}</td>
                <td>${solicitudVale.origen}</td>
                <td>${solicitudVale.destino}</td>
                <td>${solicitudVale.motivo}</td>
                <td>${cambiarFormatoFecha(solicitudVale.fechaCreacion)}</td>
                <td>${cambiarFormatoFecha(solicitudVale.fechaAprobacion)}</td>
                <td>${cambiarFormatoFecha(solicitudVale.fechaServicio)}</td>
                <td>${solicitudVale.pasajero1 ? solicitudVale.pasajero1.idEmpleadoCliente : ''}</td>
                <td>${solicitudVale.pasajero2 ? solicitudVale.pasajero2.idEmpleadoCliente : ''}</td>
                <td>${solicitudVale.pasajero3 ? solicitudVale.pasajero3.idEmpleadoCliente : ''}</td>
                <td>${solicitudVale.pasajero4 ? solicitudVale.pasajero4.idEmpleadoCliente : ''}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarSolicitudVale(${solicitudVale.idSolicitudVale})">Editar</button>
                </td>
            `;
            solicitudesValeTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar la lista de solicitudes de vale:', error);
    }
}

formSolicitudVale.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formSolicitudVale);
    const solicitudValeData = Object.fromEntries(formData.entries());

    const solicitudVale = {
        nVale: solicitudValeData.nvale,
        idUsuario: solicitudValeData.id_usuario,
        idEmpresa: solicitudValeData.id_empresa,
        origen: solicitudValeData.origen,
        destino: solicitudValeData.destino,
        motivo: solicitudValeData.motivo,
        fechaCreacion: solicitudValeData.fecha_creacion,
        fechaAprobacion: solicitudValeData.fecha_aprobacion,
        fechaServicio: solicitudValeData.fecha_servicio,
        idPasajero1: solicitudValeData.pasajero1,
        idPasajero2: solicitudValeData.pasajero2,
        idPasajero3: solicitudValeData.pasajero3,
        idPasajero4: solicitudValeData.pasajero4,
    };

    try {
        let response;
        if (idSolicitudValeModificar) {
            response = await fetch(`/solicitudes_vale/${idSolicitudValeModificar}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(solicitudVale),
            });
        } else {
            response = await fetch('/solicitudes_vale', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(solicitudVale),
            });
        }

        if (response.ok) {
            $('#alertModal').modal('show');
            $('#alertModalMessage').text('Solicitud de vale guardada correctamente.');
            cargarListaSolicitudesVale();
            formSolicitudVale.reset();
            idSolicitudValeModificar = null;
        } else {
            console.error('Error al guardar la solicitud de vale:', response.statusText);
        }
    } catch (error) {
        console.error('Error al guardar la solicitud de vale:', error);
    }
});

function editarSolicitudVale(idSolicitudVale) {
    const solicitudVale = Array.from(solicitudesValeTableBody.children).find(row => 
        parseInt(row.children[0].innerText) === idSolicitudVale
    );

    if (solicitudVale) {
        formSolicitudVale.nvale.value = solicitudVale.children[1].innerText;
        formSolicitudVale.id_usuario.value = solicitudVale.children[2].innerText;
        formSolicitudVale.id_empresa.value = solicitudVale.children[3].innerText;
        formSolicitudVale.origen.value = solicitudVale.children[4].innerText;
        formSolicitudVale.destino.value = solicitudVale.children[5].innerText;
        formSolicitudVale.motivo.value = solicitudVale.children[6].innerText;
        formSolicitudVale.fecha_creacion.value = solicitudVale.children[7].innerText;
        formSolicitudVale.fecha_aprobacion.value = solicitudVale.children[8].innerText;
        formSolicitudVale.fecha_servicio.value = solicitudVale.children[9].innerText;

        // Verificamos si los valores de pasajeros existen antes de asignarlos
        formSolicitudVale.pasajero1.value = solicitudVale.children[10] && solicitudVale.children[10].innerText !== '' ? solicitudVale.children[10].innerText : '';
        formSolicitudVale.pasajero2.value = solicitudVale.children[11] && solicitudVale.children[11].innerText !== '' ? solicitudVale.children[11].innerText : '';
        formSolicitudVale.pasajero3.value = solicitudVale.children[12] && solicitudVale.children[12].innerText !== '' ? solicitudVale.children[12].innerText : '';
        formSolicitudVale.pasajero4.value = solicitudVale.children[13] && solicitudVale.children[13].innerText !== '' ? solicitudVale.children[13].innerText : '';

        idSolicitudValeModificar = idSolicitudVale;
    }
}

$('#cancelar').on('click', function() {
    formSolicitudVale.reset();
    idSolicitudValeModificar = null;
});

async function cargarListaEmpleadosCliente() {
    try {
        const response = await fetch('/empleados_cliente');
        const data = await response.json();

        const options = data.map(empleado => `<option value="${empleado.idEmpleadoCliente}">${empleado.nombreEmpleado}</option>`);
        
        pasajero1Dropdown.innerHTML += options.join('');
        pasajero2Dropdown.innerHTML += options.join('');
      	Dropdown.innerHTML += options.join('');
        pasajero3Dropdown.innerHTML += options.join('');
        pasajero4Dropdown.innerHTML += options.join('');
    } catch (error) {
        console.error('Error al cargar la lista de empleados cliente:', error);
    }
}