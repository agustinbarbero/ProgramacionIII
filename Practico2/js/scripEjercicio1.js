const tituloModificado = document.getElementById("tituloPrincipal");
tituloModificado.textContent = "Titulo modificado";

const parrafosColor = document.getElementsByClassName("parrafo");
for(let i = 0; i < parrafosColor.length; i++){
    parrafosColor[i].style.color = "red";
}

const textoFinalLista = document.querySelectorAll("li");
for(let i = 0; i < textoFinalLista.length; i++){
    textoFinalLista[i].innerHTML += " Nuevo texto al final";
}