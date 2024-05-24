// Call the dataTables jQuery plugin
$(document).ready(function() {
	// on ready
	cargarListaEmpleados();
});


const empleadosTableBody = document.querySelector('#empleados-table tbody');
const formAgregarEmpleado = document.querySelector('#form-agregar-empleado');
const idEmpleadoModificar = null;

// Función para cargar la lista de empleados
async function cargarListaEmpleados() {
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
                            	${empleado.estado ? 
								'<td class="td-icon">'+
									'<a href="#" onclick="cambioEstadoEmpleado(0, '+ empleado.idEmpleado + ')" title="Modificar">'+
										'<i class="bi bi-toggle-on" style="font-size: 1rem; color: darkgreen;" title="Activo">'+
										'</i>'+
									'</a>'+
								'</td>' :
								'<td class="td-icon" style="transform: rotate(180deg);">'+
								'<a href="#" onclick="cambioEstadoEmpleado(1,'+ empleado.idEmpleado + ')" title="Modificar">'+
									'<i class="bi bi-toggle-on" style="font-size: 1rem; color: darkred;" title="Inactivo">'+
									'</i>'+
								'</a>'+
								'</td>'}
							
							<td class="td-icon">
								<a href="#" onclick="modificarEmpleado(${empleado.idEmpleado})" class="btn btn-warning btn-sm" title="Modificar"><i class="bi bi-eraser-fill"></i></a>
								<!--<a href="#" onclick="eliminarEmpleado(${empleado.idEmpleado})" class="btn btn-danger btn-sm" title="Eliminar"><i class="bi bi-trash"></i></a>-->
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

async function modificarEmpleado(idEmpleado) {
	// Ocultar el formulario de registro después de registrar al empleado
	document.getElementById('divRegistroEmpleado').style.display = 'none';

	const request = await fetch('api/empleado/' + idEmpleado, {
        	method: 'GET',
            headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
          });
	const empleado = await request.json();

	this.idEmpleadoModificar = empleado.idEmpleado;
	document.getElementById('nombreModificar').value = empleado.nombre;
	document.getElementById('apellidoModificar').value = empleado.apellido;
	document.getElementById('correoModificar').value = empleado.correo;
	document.getElementById('cargoModificar').value = empleado.cargo;
	document.getElementById('celularModificar').value = empleado.celular;
	document.getElementById('cedulaModificar').value = empleado.cedula;
	document.getElementById('placaModificar').value = empleado.placa;

	document.getElementById('divModificarEmpleado').style.display = 'flex';
}

async function registrarModificarEmpleado(){

	let datos = {};

	datos.nombre = document.querySelector('#nombreModificar').value;
	datos.apellido = document.querySelector('#apellidoModificar').value;
	datos.cedula = document.querySelector('#cedulaModificar').value;
	datos.cargo = document.querySelector('#cargoModificar').value;
	datos.celular = document.querySelector('#celularModificar').value;
	datos.correo = document.querySelector('#correoModificar').value;
	datos.placa = document.querySelector('#placaModificar').value;
	
	const request = await fetch('api/empleado/' + this.idEmpleadoModificar, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    alert("El empleado se modifico exitosamente!");
    window.location.href = 'empleado.html';
}

async function cambioEstadoEmpleado(estado, idEmpleadoModificar){

	let datos = {};

	datos.estado = estado;
	
	const request = await fetch('api/empleado/' + idEmpleadoModificar, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    alert("El empleado se modifico exitosamente!");
    window.location.href = 'empleado.html';
}