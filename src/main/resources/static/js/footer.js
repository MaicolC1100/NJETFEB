$(document).ready(function(){
    $("#header-container").load("header.html");
    $("#footer-container").load("footer.html");
    $("#header-container").load("header.html", function () {
        let lastScrollTop = 0;
        const header = document.querySelector('.header-container');

        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                // Scroll hacia abajo, ocultar el header
                header.style.top = '-120px'; // Ajusta este valor si tu header es más alto
            } else {
                // Scroll hacia arriba, mostrar el header
                header.style.top = '0'; // Asegúrate de que el header se muestre correctamente
            }

            lastScrollTop = scrollTop;
        });
    });

    $("#footer-container").load("footer.html");
});

function showModalAlert(label, message, type) {
    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
    const alertModalMessage = document.getElementById('alertModalMessage');
    const alertLabelMessage = document.getElementById('alertModalLabel');

    // Configurar el mensaje y el tipo de alerta
    alertLabelMessage.textContent= label;
    alertModalMessage.textContent = message;
    if (type === 'danger') {
        alertModalMessage.style.color = 'red';
    } else if (type === 'success') {
        alertModalMessage.style.color = 'green';
    } else {
        alertModalMessage.style.color = 'black';
    }

    // Mostrar el modal
    alertModal.show();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showSpinner(time) {
    document.getElementById("spinner").style.display = "flex";
    await delay(time);
}

function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
}