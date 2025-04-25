const addButton = document.getElementById("addButton");
const lista = document.querySelector("ul");
const inputTexto = document.getElementById("inputTexto");

addButton.addEventListener("click", function(){
    //captura el valor del input
    const texto = inputTexto.value.trim();
    if(texto === "") return;

    //crea un nuevo <li>
    const nuevoLi = document.createElement("li");
    nuevoLi.textContent = texto;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "eliminar";
    deleteButton.style.marginLeft = "10px";

    deleteButton.addEventListener("click", () =>{
        lista.removeChild(nuevoLi);
    });

    nuevoLi.appendChild(deleteButton);
    lista.appendChild(nuevoLi);

    inputTexto.value = "";
});