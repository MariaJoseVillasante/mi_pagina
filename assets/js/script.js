// alert("hola")
// inicio barra de navegación retractil
document.addEventListener("DOMContentLoaded", function () {
    el_autohide = document.querySelector('.autohide');
    // add padding-top to bady (if necessary)
    navbar_height = document.querySelector('.navbar').offsetHeight;
    document.body.style.paddingTop = navbar_height + 'px';
    if (el_autohide) {
        var last_scroll_top = 0;
        window.addEventListener('scroll', function () {
            let scroll_top = window.scrollY;
            if (scroll_top < last_scroll_top) {
                el_autohide.classList.remove('scrolled-down');
                el_autohide.classList.add('scrolled-up');
            }
            else {
                el_autohide.classList.remove('scrolled-up');
                el_autohide.classList.add('scrolled-down');
            }
            last_scroll_top = scroll_top;
        });
        // window.addEventListener
    }
    // if
});
// fin barra de navegación retractil

$(document).ready(function(){

    $("a").click(function(){
        var gato = this.hash
        
        $("html, body").animate(
            {
                scrollTop: $(gato).offset().top -70
            },
            800
        )
    })
    // cierra ventana
    $("#cierre").click(function () {
        window.close();
    });

})

// Enable tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// inicio calculadora de proteinas 
function filtrarAlimentos() {
    let filtro = document.getElementById('buscador').value.toLowerCase();
    let filas = document.querySelectorAll('#tabla-proteinas tr');
    let primeraCelda = document.querySelector("thead th:first-child");

    let hayResultados = false;

    filas.forEach(row => {
        let texto = row.innerText.toLowerCase();
        if (texto.includes(filtro)) {
            row.style.display = "";
            hayResultados = true;
        } else {
            row.style.display = "none";
        }
    });

    // Ocultar la primera celda si hay resultados de búsqueda
    primeraCelda.style.display = hayResultados ? "none" : "";
}
// fin calculadora de proteinas 
