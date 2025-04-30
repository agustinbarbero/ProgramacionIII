const nombre = document.getElementById("nombre_input");
const email = document.getElementById("email_input");
const edad = document.getElementById("edad_input");
const btn_enviar = document.getElementById("btn_enviar");

const msgError = document.getElementsByClassName("oculto");

function NotEmpty(input){
    let input_texto = input.value.trim();
    const errorElement = document.getElementById(`${input.id}_error`);
    if(input_texto === ""){
        errorElement.textContent ="Esta campo es obligatorio";
        errorElement.style.color = "red";
        errorElement.classList.remove("oculto");
        errorElement.style.display = "block";
        return false;
    }
    errorElement.textContent = "";
    errorElement.classList.add("oculto");
    errorElement.style.display = "none";
    return true;
};

function checkEmail(input_email){
    let email = input_email.value.trim();
    const errorElement = document.getElementById(`${input_email.id}_error`);
    if(!email.includes('@') || !email.includes('.com')){
        errorElement.textContent = "El email no es valido";
        errorElement.style.color = "red";
        errorElement.classList.remove("oculto");
        errorElement.style.display = "block";
        return false;
    }
    errorElement.textContent = "";
    errorElement.classList.add("oculto");
    errorElement.style.display = "none";
    return true;
};

function checkAge(input_edad){
    const edadString = input_edad.value.trim();
    const edad = parseInt(edadString);
    const errorElement = document.getElementById(`${input_edad.id}_error`);
    if(isNaN(edad) || edad <= 0){
        errorElement.textContent = "La edad debe ser un numero entero";
        errorElement.classList.remove("oculto");
        errorElement.style.display = "block";
        return false;
    }
    errorElement.textContent = "";
    errorElement.classList.add("oculto");
    errorElement.style.display = "none";
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

    if(isValid){
        alert("Formulario enviado");
    }
});

