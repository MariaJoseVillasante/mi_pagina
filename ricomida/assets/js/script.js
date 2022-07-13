 // alerta del mail
 $( "#enviarCorreo" ).click(function() {
    alert( "El correo fue enviado correctamente..." );
 });

//  "INGREDIENTES" y "PREPARACIÓN" a color rojo
 var ingredientesdbl = $("#ingredientes").first();
 ingredientesdbl.dblclick(function(){
    ingredientesdbl.toggleClass("dbl")
 })
 
 var preparaciondbl = $("#preparacion").first();
 preparaciondbl.dblclick(function(){
     preparaciondbl.toggleClass("dbl")
 })

//  desaparecer y aparecer el contenido en todas las tarjetas "card" de la sección de Recetas Relacionadas
$( ".card-title" ).click(function(){
    $(".card-text").toggle(function() {
       
    });
})
  