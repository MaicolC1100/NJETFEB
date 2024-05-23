// Call the dataTables jQuery plugin
$(document).ready(function() {
	// on ready
});


const empleadosTableBody = document.querySelector('#empleados-table tbody');
const formAgregarEmpleado = document.querySelector('#form-agregar-empleado');

// Función para cargar la lista de empleados
function cargarListaEmpleados() {
	fetch('/api/empleado')
		.then(response => response.json())
		.then(data => {
			// Limpiar la tabla antes de volver a llenarla
			empleadosTableBody.innerHTML = '';

			// Llenar la tabla con los datos de los empleados
			data.forEach(empleado => {
				const row = document.createElement('tr');
				row.innerHTML = `
                            <td>${empleado.nombre}</td>
							<td>${empleado.apellido}</td>
                            <td>${empleado.cedula}</td>
                            <td>${empleado.cargo}</td>
                            <td>${empleado.celular}</td>
                            <td>${empleado.correo}</td>
                            <td>${empleado.placa}</td>
                            <td>${empleado.estado ? 'Activo' : 'Inactivo'}</td>
                        `;
				empleadosTableBody.appendChild(row);
			});
		})
		.catch(error => {
			console.error('Error al obtener los datos de los empleados:', error);
		});
}

// Llamar a la función para cargar la lista de empleados cuando se cargue la página
cargarListaEmpleados();

// Agregar evento de submit al formulario para agregar un nuevo empleado
formAgregarEmpleado.addEventListener('submit', event => {
	event.preventDefault(); // Evitar que se recargue la página

	// Obtener los valores del formulario
	const nombre = document.querySelector('#nombre').value;
	const apellido = document.querySelector('#apellido').value;
	const cedula = document.querySelector('#cedula').value;
	const cargo = document.querySelector('#cargo').value;
	const celular = document.querySelector('#celular').value;
	const correo = document.querySelector('#correo').value;
	const placa = document.querySelector('#placa').value;
	const estado = document.querySelector('#estado').checked;

	// Crear un objeto con los datos del nuevo empleado
	const nuevoEmpleado = {
		nombre: nombre,
		apellido: apellido,
		cedula: cedula,
		cargo: cargo,
		celular: celular,
		correo: correo,
		placa: placa,
		estado: estado
	};

	// Enviar la solicitud POST para guardar el nuevo empleado
	fetch('/api/empleado', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(nuevoEmpleado)
	})
		.then(response => {
			if (response.ok) {
				// Recargar la lista de empleados después de agregar uno nuevo
				cargarListaEmpleados();
				// Limpiar el formulario después de agregar un empleado
				formAgregarEmpleado.reset();
			} else {
				throw new Error('Error al agregar empleado');
			}
		})
		.catch(error => {
			console.error('Error al agregar empleado:', error);
		});
});