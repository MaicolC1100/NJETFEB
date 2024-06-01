// Call the dataTables jQuery plugin
$(document).ready(function() {
    // on ready
    $("#header-container").load("header.html");
});

async function iniciarSesion(){

    let datos = {};
    datos.email = document.getElementById('email').value;
    datos.password = document.getElementById('password').value;

    const request = await fetch('api/sesion/login', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(datos)
    });

    const respuesta = await request.text();

    if(respuesta != null){
        localStorage.token = respuesta;
        window.location.href = 'index.html'
    } else {
        alert('Error al ingresar el usuario y contraseña');
        window.location.href = 'login.html'
    }
}

function getHeaders() {
    return {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
    //  'Authorization': localStorage.token
   };
}