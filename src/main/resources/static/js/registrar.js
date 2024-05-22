// Call the dataTables jQuery plugin
$(document).ready(function() {
 // on ready
});

function actualizarEmailDelUsuario() {
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}


async function registrarUsuarios() {
  let datos = {}
	datos.nombre = document.getElementById('Nombre').value;
	datos.apellido = document.getElementById('Apellido').value;
	datos.telefono = document.getElementById('Telefono').value;
	datos.email = document.getElementById('Email').value;
	datos.password = document.getElementById('Password').value;

let repetirPassword = datos.password = document.getElementById('RepetirPassword').value;

if(repetirPassword != datos.password)
	alert('La contraseña que escribiste es diferente')
}

	
  const request = await fetch('api/usuarios', {
    method: 'POST  ',
    headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	
	body: JSON.stringify()
  });
  const usuarios = await request.json(datos);




