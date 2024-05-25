$(document).ready(function() {
    // on ready
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

// Función para cargar la lista de solicitudes de vale
async function cargarListaSolicitudesVale() {
    try {
        const response = await fetch('/solicitudes_vale');
        const data = await response.json();

        // Limpiar la tabla antes de volver a llenarla
        solicitudesValeTableBody.innerHTML = '';

        // Llenar la tabla con los datos de las solicitudes de vale
        data.forEach(solicitudVale => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${solicitudVale.id}</td>
                <td>${solicitudVale.nVale}</td>
                <td>${solicitudVale.idUsuario}</td>
                <td>${solicitudVale.idEmpresa}</td>
                <td>${solicitudVale.origen}</td>
                <td>${solicitudVale.destino}</td>
                <td>${solicitudVale.motivo}</td>
                <td>${new Date(solicitudVale.fechaCreacion).toLocaleDateString()}</td>
                <td>${new Date(solicitudVale.fechaAprobacion).toLocaleDateString()}</td>
                <td>${new Date(solicitudVale.fechaServicio).toLocaleDateString()}</td>
                <td>${solicitudVale.pasajero1}</td>
                <td>${solicitudVale.pasajero2}</td>
                <td>${solicitudVale.pasajero3}</td>
                <td>${solicitudVale.pasajero4}</td>
                <td class="td-icon">
                    <a href="#" onclick="modificarSolicitudVale(${solicitudVale.id})" class="btn btn-warning btn-sm" title="Modificar"><i class="bi bi-eraser-fill"></i></a>
                </td>
            `;
            solicitudesValeTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener las solicitudes de vale:', error);
    }
}

// Función para cargar la lista de empleados clientes en los comboboxes
async function cargarListaEmpleadosCliente() {
    try {
        const response = await fetch('/api/empleado-cliente');
        const data = await response.json();

        // Limpiar los comboboxes antes de volver a llenarlos
        pasajero1Dropdown.innerHTML = '<option value="">Seleccione un pasajero</option>';
        pasajero2Dropdown.innerHTML = '<option value="">Seleccione un pasajero</option>';
        pasajero3Dropdown.innerHTML = '<option value="">Seleccione un pasajero</option>';
        pasajero4Dropdown.innerHTML = '<option value="">Seleccione un pasajero</option>';

        // Llenar los comboboxes con los datos de los empleados clientes
        data.forEach(empleadoCliente => {
            const option = document.createElement('option');
            option.value = empleadoCliente.idEmpleadoCliente;
            option.textContent = `${empleadoCliente.nombre} ${empleadoCliente.apellido}`;
            pasajero1Dropdown.appendChild(option);
            pasajero2Dropdown.appendChild(option.cloneNode(true));
            pasajero3Dropdown.appendChild(option.cloneNode(true));
            pasajero4Dropdown.appendChild(option.cloneNode(true));
        });
    } catch (error) {
        console.error('Error al obtener la lista de empleados clientes:', error);
    }
}

// Función para registrar una nueva solicitud de vale
async function registrarSolicitudVale(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const solicitudVale = {
        nVale: document.querySelector('#nvale').value,
        idUsuario: document.querySelector('#id_usuario').value,
        idEmpresa: document.querySelector('#id_empresa').value,
        origen: document.querySelector('#origen').value,
        destino: document.querySelector('#destino').value,
        motivo: document.querySelector('#motivo').value,
        fechaCreacion: document.querySelector('#fecha_creacion').value,
        fechaAprobacion: document.querySelector('#fecha_aprobacion').value,
        fechaServicio: document.querySelector('#fecha_servicio').value,
        pasajero1: document.querySelector('#pasajero1').value,
        pasajero2: document.querySelector('#pasajero2').value,
        pasajero3: document.querySelector('#pasajero3').value,
        pasajero4: document.querySelector('#pasajero4').value
    };

    try {
        const response = await fetch('/solicitudes_vale', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(solicitudVale)
        });
        if (response.ok) {
            alert('Solicitud de vale registrada exitosamente.');
            cargarListaSolicitudesVale(); // Actualizar la lista de solicitudes
        }
    } catch (error) {
        console.error('Error al registrar la solicitud de vale:', error);
    }
}

// Asignar el evento de envío al formulario
formSolicitudVale.addEventListener('submit', registrarSolicitudVale);

// Función para modificar una solicitud de vale existente
async function modificarSolicitudVale(idSolicitudVale) {
    try {
        const response = await fetch(`/solicitudes_vale/${idSolicitudVale}`);
        const solicitudVale = await response.json();

        idSolicitudValeModificar = solicitudVale.id;
        document.querySelector('#nvale').value = solicitudVale.nVale;
        document.querySelector('#id_usuario').value = solicitudVale.idUsuario;
        document.querySelector('#id_empresa').value = solicitudVale.idEmpresa;
        document.querySelector('#origen').value = solicitudVale.origen;
        document.querySelector('#destino').value = solicitudVale.destino;
        document.querySelector('#motivo').value = solicitudVale.motivo;
        document.querySelector('#fecha_creacion').value = solicitudVale.fechaCreacion;
        document.querySelector('#fecha_aprobacion').value = solicitudVale.fechaAprobacion;
        document.querySelector('#fecha_servicio').value = solicitudVale.fechaServicio;
        document.querySelector('#pasajero1').value = solicitudVale.pasajero1;
        document.querySelector('#pasajero2').value = solicitudVale.pasajero2;
        document.querySelector('#pasajero3').value = solicitudVale.pasajero3;
        document.querySelector('#pasajero4').value = solicitudVale.pasajero4;

        // Cambiar el botón de enviar a actualizar
        const submitButton = formSolicitudVale.querySelector('button[type="submit"]');
        submitButton.textContent = 'Actualizar';
        submitButton.classList.remove('btn-warning');
        submitButton.classList.add('btn-primary');
        submitButton.onclick = actualizarSolicitudVale;

    } catch (error) {
        console.error('Error al obtener la solicitud de vale:', error);
    }
}

// Función para actualizar una solicitud de vale existente
async function actualizarSolicitudVale(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const solicitudVale = {
        nVale: document.querySelector('#nvale').value,
        idUsuario: document.querySelector('#id_usuario').value,
        idEmpresa: document.querySelector('#id_empresa').value,
        origen: document.querySelector('#origen').value,
        destino: document.querySelector('#destino').value,
        motivo: document.querySelector('#motivo').value,
        fechaCreacion: document.querySelector('#fecha_creacion').value,
        fechaAprobacion: document.querySelector('#fecha_aprobacion').value,
        fechaServicio: document.querySelector('#fecha_servicio').value,
        pasajero1: document.querySelector('#pasajero1').value,
        pasajero2: document.querySelector('#pasajero2').value,
        pasajero3: document.querySelector('#pasajero3').value,
        pasajero4: document.querySelector('#pasajero4').value
    };

    try {
        const response = await fetch(`/solicitudes_vale/${idSolicitudValeModificar}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(solicitudVale)
        });
        if (response.ok) {
            alert('Solicitud de vale actualizada exitosamente.');
            cargarListaSolicitudesVale(); // Actualizar la lista de solicitudes

            // Resetear el formulario y el botón de enviar
            formSolicitudVale.reset();
            const submitButton = formSolicitudVale.querySelector('button[type="submit"]');
            submitButton.textContent = 'Guardar';
            submitButton.classList.remove('btn-primary');
            submitButton.classList.add('btn-warning');
            submitButton.onclick = registrarSolicitudVale;

            idSolicitudValeModificar = null;
        }
    } catch (error) {
        console.error('Error al actualizar la solicitud de vale:', error);
        // Restablecer el botón de enviar a su estado original

   
}

// Función para restablecer el formulario y el botón de enviar
function resetFormulario() {
    formSolicitudVale.reset();
    const submitButton = formSolicitudVale.querySelector('button[type="submit"]');
    submitButton.textContent = 'Guardar';
    submitButton.classList.remove('btn-primary');
    submitButton.classList.add('btn-warning');
    submitButton.onclick = registrarSolicitudVale;
}

// Asignar el evento de clic al botón "Cancelar"
document.querySelector('#cancelar').addEventListener('click', resetFormulario);
}