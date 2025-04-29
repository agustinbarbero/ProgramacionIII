const nombre = document.getElementById("nombre_input");
const email = document.getElementById("email_input");
const edad = document.getElementById("edad_input");
const btn_enviar = document.getElementById("btn_enviar");

function NotEmpty(input){
    let input_texto = input.value.trim();
    const errorId = `${input.id}_error`;
    if(input_texto === ""){
        alert(`Debe rellenar el campo: ${input.id}`);
        let parrafoError = document.createElement("p");
        parrafoError.textContent = `Debe rellenar el campo: ${input.id}`;
        parrafoError.style.color = "red";
        input.parentNode.appendChild(parrafoError);
        return false;
    }
    return true;
};

function checkEmail(input_email){
    let email_string = input_email.value;
    console.log("entrando");
    if(!email_string.includes('@') || !email_string.includes('.com')){
        alert("Ingrese un email valido");
        let parrafoError = document.createElement("p");
        parrafoError.textContent = `Debe ingresar un email valido`;
        parrafoError.style.color = "red";
        input_email.parentNode.appendChild(parrafoError);
        return false;
    }
    return true;
};

function checkAge(input_edad){
    const edad = parseInt(input_edad);
    if(isNaN(edad)){
        alert("Ingrese una edad validad");
        let parrafoError = document.createElement("p");
        parrafoError.textContent = "Debe ingresar una edad valida";
        parrafoError.style.color = "red";
        input_edad.parentNode.appendChild(parrafoError);
        return false;
    }
    return true;
};


btn_enviar.addEventListener("click", (event) => {
    event.preventDefault();
    let isValid = true
    if(!NotEmpty(nombre)) isValid = false;
    if(!NotEmpty(email)) isValid = false;
    if(!NotEmpty(edad)) isValid = false;
    if(!checkEmail(email)) isValid = false;
    if(!checkAge(edad)) isValid = false;

    if (!isValid){
        event.preventDefault();
    }
});

