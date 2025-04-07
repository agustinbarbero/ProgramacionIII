//NavBar se acomoda el tamanio dependiendo si hace scroll
document.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    if(window.scrollY > 50){
        header.classList.add("scrolled"); //Agrega la clase cuando se hace scroll
    }else{
        header.classList.remove("scrolled"); //Quita la clase cuando vuelve al inicio
    }
})



//Permite el desplazamiento de los testimonios
document.addEventListener("DOMContentLoaded", function(){
    let testimonios = document.querySelectorAll(".testimonio");
    let index = 0;

    function mostrarTestimonio(i){
        testimonios.forEach((t, idx) => {
            t.classList.toggle("active", idx === i);
        });
    }

    document.getElementById("prev").addEventListener("click", function(){
        index = (index - 1 + testimonios.length) % testimonios.length;
        mostrarTestimonio(index);
    });

    document.getElementById("next").addEventListener("click", function(){
        index = (index + 1) % testimonios.length;
        mostrarTestimonio(index);
    });

    //Muestra el primer testimonio al inicio
    mostrarTestimonio(index);
})


// Función para verificar si un elemento está en el viewport
// Función para verificar si un elemento está en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Selecciona las fotos
const fotos = document.querySelectorAll("#foto_1, #foto_2");

// Función para manejar el scroll
function handleScroll() {
    fotos.forEach((foto) => {
        if (isInViewport(foto)) {
            foto.classList.add("block"); // Agrega la clase para activar la animación
        }
    });
}

// Escucha el evento de scroll
window.addEventListener("scroll", handleScroll);