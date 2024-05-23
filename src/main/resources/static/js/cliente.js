// Call the dataTables jQuery plugin
$(document).ready(function() {
	// on ready
	cargarListaEmpleados();
});



const empleadosClienteTableBody = document.querySelector('#empleados-cliente-table tbody');
const formAgregarEmpleadoCliente = document.querySelector('#form-agregar-empleado-cliente');
const empresaSelect = document.querySelector('#empresa');

// Función para cargar la lista de empresas
function cargarEmpresas() {
	fetch('/api/empresa')
		.then(response => response.json())
		.then(data => {
			data.forEach(empresa => {
				const option = document.createElement('option');
				option.value = empresa.idEmpresa;
				option.textContent = empresa.nombre;
				empresaSelect.appendChild(option);
			});
		})
		.catch(error => {
			console.error('Error al obtener la lista de empresas:', error);
		});
}

// Función para cargar la lista de empleados de clientes
function cargarListaEmpleadosCliente() {
	fetch('/api/empleado-cliente')
		.then(response => response.json())
		.then(data => {
			// Limpiar la tabla antes de volver a llenarla
			empleadosClienteTableBody.innerHTML = '';

			// Llenar la tabla con los datos de los empleados de clientes
			data.forEach(empleado => {
				const row = document.createElement('tr');
				row.innerHTML = `
                            <td>${empleado.nombre}</td>
                            <td>${empleado.apellido}</td>
                            <td>${empleado.cedula}</td>
                            <td>${empleado.ctroCosto}</td>
                            <td>${empleado.gerencia}</td>
                            <td>${empleado.empresa.nombre}</td>
                            <td>${empleado.estado ? 'Activo' : 'Inactivo'}</td>
                        `;
				empleadosClienteTableBody.appendChild(row);
			});
		})
		.catch(error => {
			console.error('Error al obtener los datos de los empleados de clientes:', error);
		});
}

// Llamar a las funciones para cargar la lista de empresas y la lista de empleados de clientes cuando se cargue la página
cargarEmpresas();
cargarListaEmpleadosCliente();

// Agregar evento de submit al formulario para agregar un nuevo empleado de cliente
formAgregarEmpleadoCliente.addEventListener('submit', event => {
	event.preventDefault(); // Evitar que se recargue la página

	// Obtener los valores del formulario
	const nombre = document.querySelector('#nombre').value;
	const apellido = document.querySelector('#apellido').value;
	const cedula = document.querySelector('#cedula').value;
	const ctroCosto = document.querySelector('#ctroCosto').value;
	const gerencia = document.querySelector('#gerencia').value;
	const empresaId = document.querySelector('#empresa').value;
	const estado = document.querySelector('#estado').checked;

	// Crear un objeto con los datos del nuevo empleado de cliente
	const nuevoEmpleadoCliente = {
		nombre: nombre,
		apellido: apellido,
		cedula: cedula,
		ctroCosto: ctroCosto,
		gerencia: gerencia,
		empresa: {
			idEmpresa: empresaId // Asignar el ID de la empresa seleccionada
		},
		estado: estado
	};

	// Enviar la solicitud POST para guardar el nuevo empleado de cliente
	fetch('/api/empleado-cliente', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(nuevoEmpleadoCliente)
	})
		.then(response => {
			if (response.ok) {
				// Recargar la lista de empleados de clientes después de agregar uno nuevo
				cargarListaEmpleadosCliente();
				formAgregarEmpleadoCliente.reset(); // Limpiar el formulario
			} else {
				console.error('Error al agregar el empleado de cliente');
			}
		})
		.catch(error => {
			console.error('Error al agregar el empleado de cliente:', error);
		});
});