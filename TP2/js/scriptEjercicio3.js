btn_resaltar = document.getElementById("btn_resaltar");
btn_ocultar = document.getElementById("btn_ocultar");
parrafos = document.getElementsByClassName("parrafo");

btn_resaltar.addEventListener("click", () => {
    for(let parrafo of parrafos){
        parrafo.classList.add("resaltado");
    }
});

btn_ocultar.addEventListener("click", () => {
    for(let parrafo of parrafos){
        parrafo.classList.toggle("oculto");
    }
});