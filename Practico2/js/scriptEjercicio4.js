const inputTexto = document.getElementById("input_text");
const btn_enviar = document.getElementById("btn_enviar");
const lista = document.querySelector("ul");
const listaItem = document.querySelectorAll("li");

btn_enviar.addEventListener("click", () => {
    const texto = inputTexto.value.trim();
    if(texto === "") return;

    const nuevo_li = document.createElement("li");
    nuevo_li.textContent = texto;

    lista.appendChild(nuevo_li);
    inputTexto.value = "";
});

listaItem.addEventListener("click", () => {
    for(let lista of listaItem){
        listaItem.classList.add("completado");
    }
});



