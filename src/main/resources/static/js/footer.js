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