document.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    if(window.scrollY > 50){
        header.classList.add("scrolled"); //Agrega la clase cuando se hace scroll
    }else{
        header.classList.remove("scrolled"); //Quita la clase cuando vuelve al inicio
    }
})