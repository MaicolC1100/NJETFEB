// Call the dataTables jQuery plugin
$(document).ready(function() {
	// on ready
	cargarEmpresas();
	cargarListaEmpleadosCliente();
});



const empleadosClienteTableBody = document.querySelector('#empleados-cliente-table tbody');
const formAgregarEmpleadoCliente = document.querySelector('#form-agregar-empleado-cliente');
const empresaSelect = document.querySelector('#empresa');
const empresaModificarSelect = document.querySelector('#empresaModificar');

// Función para cargar la lista de empresas
async function cargarEmpresas() {
	fetch('/api/empresa')
		.then(response => response.json())
		.then(data => {
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
					empresaModificarSelect.appendChild(option2);
				}	
			});
		})
		.catch(error => {
			console.error('Error al obtener la lista de empresas:', error);
		});
}

// Función para cargar la lista de empleados de clientes
async function cargarListaEmpleadosCliente() {
	fetch('/api/empleado-cliente')
		.then(response => response.json())
		.then(data => {
			// Limpiar la tabla antes de volver a llenarla
			empleadosClienteTableBody.innerHTML = '';

			// Llenar la tabla con los datos de los empleados de clientes
			data.forEach(empleadoCliente => {
				const row = document.createElement('tr');
				row.innerHTML = `
                            <td>${empleadoCliente.nombre}</td>
                            <td>${empleadoCliente.apellido}</td>
                            <td>${empleadoCliente.cedula}</td>
                            <td>${empleadoCliente.ctroCosto}</td>
                            <td>${empleadoCliente.gerencia}</td>
                            <td>${empleadoCliente.empresa.nombre}</td>
                            <td class="td-icon">${empleadoCliente.estado ? 
								'<i class="bi bi-person-fill-check" style="font-size: 1rem; color: darkgreen;" title="Activo"></i>' : 
								'<i class="bi bi-person-fill-x" style="font-size: 1rem; color: darkred;" title="Inactivo"></i>'}
							</td>
							<td class="td-icon">
								<a href="#" onclick="modificarEmpleadoCliente(${empleadoCliente.idEmpleadoCliente})" class="btn btn-warning btn-sm" title="Modificar"><i class="bi bi-eraser-fill"></i></a>
								<a href="#" onclick="eliminarEmpleadoCliente(${empleadoCliente.idEmpleadoCliente})" class="btn btn-danger btn-sm" title="Eliminar"><i class="bi bi-trash"></i></a>
							</td>
                        `;
				empleadosClienteTableBody.appendChild(row);
			});
		})
		.catch(error => {
			console.error('Error al obtener los datos de los empleados de clientes:', error);
		});
}


async function registrarEmpleadoCliente(){

	let datos = {};
	let empresa = {};

	empresa.idEmpresa = document.querySelector('#empresa').value;

	datos.nombre = document.querySelector('#nombre').value;
	datos.apellido = document.querySelector('#apellido').value;
	datos.cedula = document.querySelector('#cedula').value;
	datos.ctroCosto = document.querySelector('#ctroCosto').value;
	datos.gerencia = document.querySelector('#gerencia').value;
	datos.empresa = empresa;
	datos.estado = true;
	
	const request = await fetch('api/empleado-cliente', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    alert("El empleado cliente fue creado exitosamente!");
    window.location.href = 'empleadocliente.html'
}

async function modificarEmpleadoCliente(idEmpleadoCliente) {
	// Ocultar el formulario de registro después de registrar al empleado
	document.getElementById('divRegistroEmpleadoCliente').style.display = 'none';

	const request = await fetch('api/empleado-cliente/' + idEmpleadoCliente, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	  });
	const empleadoCliente = await request.json();

	document.getElementById('nombreModificar').value = empleadoCliente.nombre;
	document.getElementById('apellidoModificar').value = empleadoCliente.apellido;
	document.getElementById('ctroCostoModificar').value = empleadoCliente.ctroCosto;
	document.getElementById('gerenciaModificar').value = empleadoCliente.gerencia;
	document.getElementById('cedulaModificar').value = empleadoCliente.cedula;

	for (let i = 0; i < empresaModificarSelect.options.length; i++) {
		let option = empresaModificarSelect.options[i];
		
		// Verificar si el valor de la opción coincide con el valor deseado
		if (option.value == empleadoCliente.empresa.idEmpresa) {
		  // Establecer la opción como seleccionada
		  empresaModificarSelect.selectedIndex = i;
		  break; // Salir del bucle una vez encontrada la coincidencia
		}
	  }
	// empresaModificarSelect;
	// empleadoCliente.empresa;

	document.getElementById('divModificarEmpleadoCliente').style.display = 'flex';
}