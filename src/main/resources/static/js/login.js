// Call the dataTables jQuery plugin
$(document).ready(function() {
    // on ready
});

async function iniciarSesion(){

    let datos = {};
    datos.email = document.getElementById('email').value;
    datos.password = document.getElementById('password').value;

    const request = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    const respuesta = await request.text();

    if(respuesta){
        //localStorage.token = respuesta;
        localStorage.userName = datos.email;
        window.location.href = 'index.html'
    } else {
        alert('Error al ingresar el usuario y contraseña');
        window.location.href = 'login.html'
    }
}