// alert("hola")

$(document).ready(function () {

    $("a").click(function () {
        var gato = this.hash

        $("html, body").animate(
            {
                scrollTop: $(gato).offset().top - 70
            },
            800
        )
    })

    

    $("#cierre").click(function () {
        window.close();
    });
})

// Enable tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))