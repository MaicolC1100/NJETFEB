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
    cargarEmpleado();
    cargarListaAsignacionesVale();
});

const asignacionesValeTableBody = document.querySelector('#asignaciones-vale-table tbody');
const empresaSelect = document.querySelector('#empresa');
const empleadoSelect = document.querySelector('#empleado');
const pasajero1Select = document.querySelector('#pasajero1');
const pasajero2Select = document.querySelector('#pasajero2');
const pasajero3Select = document.querySelector('#pasajero3');
const pasajero4Select = document.querySelector('#pasajero4');
const formAgregarAsignacionVale = document.querySelector('#form-agregar-asginacion-vale');



formAgregarAsignacionVale.addEventListener('submit', async (event) => {
    event.preventDefault();
    await registrarAsignacionVale();
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
        pasajero1Select.innerHTML = '<option value="" active>Seleccionar</option>';
        pasajero2Select.innerHTML = '<option value="" active>Seleccionar</option>';
        pasajero3Select.innerHTML = '<option value="" active>Seleccionar</option>';
        pasajero4Select.innerHTML = '<option value="" active>Seleccionar</option>';

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
                <td>${asignacion.nVale}</td>
                <td>${asignacion.usuario.nombre}</td>
                <td>${asignacion.empresa.nombre}</td>
                <td>${asignacion.empleado.nombre}</td>
                <td>${asignacion.placa}</td>
                <td>${asignacion.cedula}</td>
                <td>${asignacion.origen}</td>
                <td>${asignacion.destino}</td>
                <td>${asignacion.motivo}</td>
                <td>${asignacion.valorVale.toFixed(2)}</td>
                <td>${formatFecha(asignacion.fechaCreacion)}</td>
                <td>${formatFecha(asignacion.fechaAprobacion)}</td>
                <td>${formatFecha(asignacion.fechaServicio)}</td>
                <td>${asignacion.pasajero1 ? asignacion.pasajero1.nombre : ''}</td>
                <td>${asignacion.pasajero2 ? asignacion.pasajero2.nombre : ''}</td>
                <td>${asignacion.pasajero3 ? asignacion.pasajero3.nombre : ''}</td>
                <td>${asignacion.pasajero4 ? asignacion.pasajero4.nombre : ''}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editarAsignacion(${asignacion.idAsigVale})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarAsignacion(${asignacion.idAsigVale})">Eliminar</button>
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

    // Reemplaza esto con la obtención del ID del usuario correcto
    let usuario = { idUsuario: 1 };

    // Asignar valores al objeto asignacionvale
    asignacionvale.usuario = usuario;
    asignacionvale.nVale = document.querySelector('#nvale').value;
    asignacionvale.empresa = empresa;
    asignacionvale.empleado = empleado; // Asignar el empleado al objeto asignacionvale
    asignacionvale.placa = document.querySelector('#placa').value;
    asignacionvale.cedula= document.querySelector('#idcdt').value;
    asignacionvale.origen = document.querySelector('#origen').value;
    asignacionvale.destino = document.querySelector('#destino').value;
    asignacionvale.motivo = document.querySelector('#motivo').value;
    asignacionvale.valorvale = document.querySelector('#valorvale').value;
    asignacionvale.fechaCreacion = document.querySelector('#fecha_creacion').value;
    asignacionvale.fechaAprobacion = document.querySelector('#fecha_aprobacion').value;
    asignacionvale.fechaServicio = document.querySelector('#fecha_servicio').value;
    asignacionvale.pasajero1 = pasajero1;
    asignacionvale.pasajero2 = pasajero2;
    asignacionvale.pasajero3 = pasajero3;
    asignacionvale.pasajero4 = pasajero4;

    try {
        // Enviar solicitud POST al servidor
        const request = await fetch('/api/asignacion-vale/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getHeaders() // Agrega tus headers personalizados si es necesario
            },
            body: JSON.stringify(asignacionvale)
        });

        // Manejar la respuesta del servidor
        if (request.ok) {
            showModalAlert('¡Registro exitoso!', 'La solicitud de vale se registró exitosamente.', 'success');
            cargarListaAsignacionesVale(); // Actualizar la lista de solicitudes
            formAgregarAsignacionVale.reset(); // Limpiar el formulario
        } else {
            console.error('Error en la solicitud:', request.statusText);
        }
    } catch (error) {
        console.error('Error al registrar la solicitud de vale:', error);
    } finally {
        // hideSpinner(); // Si tienes un spinner para ocultar después de la solicitud
    }
}
