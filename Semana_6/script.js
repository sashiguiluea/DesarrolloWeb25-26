// ====== Referencias ======
const form = document.getElementById("registroForm");
// Inputs
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const edad = document.getElementById("edad");

const btnEnviar = document.getElementById("btnEnviar");
const mensajeExito = document.getElementById("mensajeExito");

// Errores
const nombreError = document.getElementById("nombreError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const edadError = document.getElementById("edadError");

// ====== Expresiones regulares ======
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Al menos 8 caracteres, mínimo 1 número y 1 carácter especial
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).{8,}$/;

// ====== Helpers ======
function setValid(input, errorEl) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  errorEl.textContent = "";
}
// Establece el estado inválido y muestra el mensaje de error
function setInvalid(input, errorEl, msg) {
  input.classList.remove("valid");
  input.classList.add("invalid");
  errorEl.textContent = msg;
}
// Limpia el estado (ni válido ni inválido) y el mensaje de error
function clearState(input, errorEl) {
  input.classList.remove("valid", "invalid");
  errorEl.textContent = "";
}

// ====== Validaciones por campo ======
function validarNombre() {
  const value = nombre.value.trim();
  if (value.length === 0) {
    setInvalid(nombre, nombreError, "El nombre es obligatorio.");
    return false;
  }
  if (value.length < 3) {
    setInvalid(nombre, nombreError, "Mínimo 3 caracteres.");
    return false;
  }
  setValid(nombre, nombreError);
  return true;
}

function validarEmail() {
  const value = email.value.trim();
  if (value.length === 0) {
    setInvalid(email, emailError, "El correo es obligatorio.");
    return false;
  }
  if (!emailRegex.test(value)) {
    setInvalid(email, emailError, "Formato de correo inválido. Ej: correo@dominio.com");
    return false;
  }
  setValid(email, emailError);
  return true;
}

function validarPassword() {
  const value = password.value;
  if (value.length === 0) {
    setInvalid(password, passwordError, "La contraseña es obligatoria.");
    return false;
  }
  if (!passwordRegex.test(value)) {
    setInvalid(
      password,
      passwordError,
      "Mín. 8 caracteres, al menos 1 número y 1 carácter especial."
    );
    return false;
  }
  setValid(password, passwordError);
  return true;
}

function validarConfirmPassword() {
  const value = confirmPassword.value;
  if (value.length === 0) {
    setInvalid(confirmPassword, confirmPasswordError, "Debes confirmar la contraseña.");
    return false;
  }
  if (value !== password.value) {
    setInvalid(confirmPassword, confirmPasswordError, "Las contraseñas no coinciden.");
    return false;
  }
  setValid(confirmPassword, confirmPasswordError);
  return true;
}

function validarEdad() {
  const value = edad.value.trim();
  if (value.length === 0) {
    setInvalid(edad, edadError, "La edad es obligatoria.");
    return false;
  }
  const n = Number(value);
  if (Number.isNaN(n)) {
    setInvalid(edad, edadError, "Ingresa un número válido.");
    return false;
  }
  if (n < 18) {
    setInvalid(edad, edadError, "Debes ser mayor o igual a 18 años.");
    return false;
  }
  setValid(edad, edadError);
  return true;
}

function actualizarEstadoBoton() {
  const ok =
    validarNombre() &&
    validarEmail() &&
    validarPassword() &&
    validarConfirmPassword() &&
    validarEdad();

  btnEnviar.disabled = !ok;
  return ok;
}

// ====== Eventos en tiempo real ======
nombre.addEventListener("input", () => {
  validarNombre();
  actualizarEstadoBoton();
});

email.addEventListener("input", () => {
  validarEmail();
  actualizarEstadoBoton();
  mensajeExito.textContent = "";
});

password.addEventListener("input", () => {
  validarPassword();
  // si cambia la contraseña, revalidar confirmación
  if (confirmPassword.value.length > 0) validarConfirmPassword();
  actualizarEstadoBoton();
});

confirmPassword.addEventListener("input", () => {
  validarConfirmPassword();
  actualizarEstadoBoton();
});

edad.addEventListener("input", () => {
  validarEdad();
  actualizarEstadoBoton();
});

// ====== Envío del formulario ======
form.addEventListener("submit", (e) => {
  e.preventDefault();

  mensajeExito.textContent = "";
  const ok = actualizarEstadoBoton();

  if (ok) {
    alert("✅ Formulario validado correctamente. ¡Registro exitoso!");
    mensajeExito.textContent = "✅ Validación exitosa. Puedes enviar tus datos con seguridad.";
    form.reset();
    btnEnviar.disabled = true;

    // limpiar estilos/errores tras reset manual
    [nombre, email, password, confirmPassword, edad].forEach((inp) => inp.classList.remove("valid", "invalid"));
    [nombreError, emailError, passwordError, confirmPasswordError, edadError].forEach((el) => (el.textContent = ""));
  }
});

// ====== Reset ======
form.addEventListener("reset", () => {
  mensajeExito.textContent = "";
  btnEnviar.disabled = true;

  setTimeout(() => {
    [nombre, email, password, confirmPassword, edad].forEach((inp) => inp.classList.remove("valid", "invalid"));
    [nombreError, emailError, passwordError, confirmPasswordError, edadError].forEach((el) => (el.textContent = ""));
  }, 0);
});