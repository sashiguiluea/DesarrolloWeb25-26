// ===============================
// REFERENCIAS DEL DOM
// ===============================
const inputURL = document.getElementById("imagenURL");
const agregarBtn = document.getElementById("agregarBtn");
const eliminarBtn = document.getElementById("eliminarBtn");
const galeria = document.getElementById("galeria");

// Variable para rastrear la imagen seleccionada
let imagenSeleccionada = null;

// ===============================
// IMÁGENES POR DEFECTO
// ===============================
const defaultImages = [
  "assets/img/imagen1.jpg",
  "assets/img/imagen2.png"
];

// ===============================
// FUNCIÓN: VALIDAR URL DE IMAGEN
// ===============================
function esURLValida(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

// ===============================
// FUNCIÓN: AGREGAR IMAGEN A LA GALERÍA
// ===============================
function agregarImagen(url) {
  // Crear elemento img
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Producto TechnoMarket";
  img.loading = "lazy"; // Carga diferida para mejor rendimiento
  img.tabIndex = 0; // Hacer la imagen accesible por teclado

  // Event listener para clic
  img.addEventListener("click", () => seleccionarImagen(img));

  // Event listener para teclado (accesibilidad)
  img.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      seleccionarImagen(img);
    }
  });

  // Manejar error de carga de imagen
  img.addEventListener("error", () => {
    img.alt = "Error al cargar la imagen";
    img.style.border = "2px dashed #c0392b";
    console.error(`Error al cargar la imagen: ${url}`);
  });

  // Agregar imagen a la galería
  galeria.appendChild(img);
}

// ===============================
// FUNCIÓN: SELECCIONAR IMAGEN
// ===============================
function seleccionarImagen(img) {
  // Deseleccionar todas las imágenes
  document.querySelectorAll(".galeria img").forEach(imagen => {
    imagen.classList.remove("seleccionada");
  });

  // Seleccionar la imagen clickeada
  img.classList.add("seleccionada");
  imagenSeleccionada = img;
}

// ===============================
// FUNCIÓN: VERIFICAR SI LA IMAGEN YA EXISTE
// ===============================
function imagenYaExiste(url) {
  const imagenes = Array.from(galeria.querySelectorAll("img"));
  return imagenes.some(img => img.src === url);
}

// ===============================
// CARGAR IMÁGENES POR DEFECTO AL INICIAR
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  defaultImages.forEach(url => agregarImagen(url));
});

// ===============================
// EVENT LISTENER: BOTÓN AGREGAR
// ===============================
agregarBtn.addEventListener("click", () => {
  const url = inputURL.value.trim();

  // Validar que el campo no esté vacío
  if (!url) {
    alert("⚠️ Por favor ingresa una URL de imagen.");
    inputURL.focus();
    return;
  }

  // Validar formato de URL
  if (!esURLValida(url)) {
    alert("⚠️ La URL ingresada no es válida. Debe comenzar con http:// o https://");
    inputURL.focus();
    return;
  }

  // Verificar si la imagen ya existe
  if (imagenYaExiste(url)) {
    alert("ℹ️ Esta imagen ya fue agregada a la galería.");
    inputURL.value = "";
    inputURL.focus();
    return;
  }

  // Agregar la imagen
  agregarImagen(url);
  
  // Limpiar el campo de entrada
  inputURL.value = "";
  inputURL.focus();

  // Mensaje de confirmación en consola
  console.log("✅ Imagen agregada exitosamente");
});

// ===============================
// EVENT LISTENER: BOTÓN ELIMINAR
// ===============================
eliminarBtn.addEventListener("click", () => {
  if (!imagenSeleccionada) {
    alert("⚠️ Por favor selecciona una imagen para eliminar.");
    return;
  }

  // Confirmación antes de eliminar
  const confirmar = confirm("¿Estás seguro de que deseas eliminar esta imagen?");
  
  if (confirmar) {
    // Eliminar la imagen del DOM
    galeria.removeChild(imagenSeleccionada);
    
    // Resetear la variable
    imagenSeleccionada = null;
    
    console.log("✅ Imagen eliminada exitosamente");
  }
});

// ===============================
// EVENT LISTENER: AGREGAR CON TECLA ENTER
// ===============================
inputURL.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevenir comportamiento por defecto
    agregarBtn.click();
  }
});

// ===============================
// EVENT LISTENER: ELIMINAR CON TECLA DELETE/SUPRIMIR
// ===============================
document.addEventListener("keydown", (e) => {
  if ((e.key === "Delete" || e.key === "Backspace") && imagenSeleccionada) {
    // Solo si hay una imagen seleccionada y el foco no está en el input
    if (document.activeElement !== inputURL) {
      e.preventDefault();
      eliminarBtn.click();
    }
  }
});