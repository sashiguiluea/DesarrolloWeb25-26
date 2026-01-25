// Lista principal de productos ya mostrados
let productos = [
  { nombre: "Laptop HP 15.6\"", precio: 599.99, descripcion: "Laptop con procesador Intel Core i5, 8GB RAM, 256GB SSD." },
  { nombre: "Mouse Inalámbrico", precio: 25.50, descripcion: "Mouse ergonómico inalámbrico con sensor óptico de alta precisión." },
  { nombre: "Teclado Mecánico RGB", precio: 79.99, descripcion: "Teclado mecánico gaming con retroiluminación RGB personalizable." }
];

// Productos adicionales para agregar de forma aleatoria
const nuevosProductos = [
  { nombre: "Audífonos Bluetooth", precio: 45.99, descripcion: "Audífonos inalámbricos con cancelación de ruido y 20h de batería." },
  { nombre: "Webcam Full HD", precio: 65.00, descripcion: "Cámara web 1080p con micrófono integrado y enfoque automático." },
  { nombre: "Monitor 24\" LED", precio: 189.99, descripcion: "Monitor Full HD con panel IPS y frecuencia de 75Hz." },
  { nombre: "Disco Duro Externo 1TB", precio: 55.75, descripcion: "Disco duro portátil USB 3.0 con alta velocidad de transferencia." },
  { nombre: "Hub USB-C 7 en 1", precio: 35.90, descripcion: "Adaptador multipuerto con HDMI, USB 3.0 y lector de tarjetas SD." }
];

// Función para renderizar los productos en la página
function mostrarProductos() {
  const lista = document.getElementById("lista-productos");
  lista.innerHTML = "";
  
  productos.forEach((producto) => {
    const item = document.createElement("li");
    item.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)} - ${producto.descripcion}`;
    lista.appendChild(item);
  });
}

// Evento para el botón "Agregar Producto"
document.getElementById("btn-agregar").addEventListener("click", () => {
  if (nuevosProductos.length === 0) {
    alert("Ya no hay más productos disponibles para agregar.");
    return;
  }

  // Seleccionar un producto aleatorio
  const indice = Math.floor(Math.random() * nuevosProductos.length);
  const productoSeleccionado = nuevosProductos.splice(indice, 1)[0]; // Eliminar para no repetir

  // Agregar el producto a la lista principal
  productos.push(productoSeleccionado);
  
  // Actualizar la vista
  mostrarProductos();
});

// Mostrar los productos al cargar la página
mostrarProductos();