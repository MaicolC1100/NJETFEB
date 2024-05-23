// Call the dataTables jQuery plugin
$(document).ready(function() {
	// on ready
	cargarListaEmpleados();
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
                            <td class="td-icon">${empleado.estado ? 
								'<i class="bi bi-person-fill-check" style="font-size: 1rem; color: darkgreen;" title="Activo"></i>' : 
								'<i class="bi bi-person-fill-x" style="font-size: 1rem; color: darkred;" title="Inactivo"></i>'}</td>
							<td class="td-icon">
								<a href="#" class="btn btn-warning btn-sm" title="Modificar"><i class="bi bi-eraser-fill"></i></a>
								<a href="#" class="btn btn-danger btn-sm" title="Eliminar"><i class="bi bi-trash"></i></a>
							</td>
                        `;
				empleadosTableBody.appendChild(row);
			});
		})
		.catch(error => {
			console.error('Error al obtener los datos de los empleados:', error);
		});
}

async function registrarEmpleado(){

	let datos = {};
	
	datos.nombre = document.querySelector('#nombre').value;
	datos.apellido = document.querySelector('#apellido').value;
	datos.cedula = document.querySelector('#cedula').value;
	datos.cargo = document.querySelector('#cargo').value;
	datos.celular = document.querySelector('#celular').value;
	datos.correo = document.querySelector('#correo').value;
	datos.placa = document.querySelector('#placa').value;
	datos.estado = true;
	
	const request = await fetch('api/empleado', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    alert("El empleado fue creado exitosamente!");
    window.location.href = 'empleado.html'
}