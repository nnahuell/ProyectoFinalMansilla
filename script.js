// Array de productos disponibles para mostrar en el ecommerce
// Cada producto tiene un id, nombre, precio e imagen
const productos = [
  {
    id: 1,
    nombre: "Remera",
    precio: 5000,
    imagen: "https://images.unsplash.com/photo-1633966887768-64f9a867bdba?q=80&w=1403&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    nombre: "Pantalón",
    precio: 8000,
    imagen: "https://images.unsplash.com/photo-1718252540617-6ecda2b56b57?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    nombre: "Zapatillas",
    precio: 15000,
    imagen: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    nombre: "Campera",
    precio: 12000,
    imagen: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

// Creamos un array vacío para ir guardando los productos agregados al carrito
let carrito = [];

// Guardamos referencias a los elementos del HTML que vamos a usar
const productosContainer = document.getElementById("productosContainer");
const carritoLista = document.getElementById("carritoLista");
const total = document.getElementById("total");
const contador = document.getElementById("contador");
const carritoModal = document.getElementById("carritoModal");
const verCarritoBtn = document.getElementById("verCarritoBtn");
const vaciarBtn = document.getElementById("vaciarBtn");
const comprarBtn = document.getElementById("comprarBtn");
const cerrarBtn = document.getElementById("cerrarBtn");

// Esta función muestra todos los productos en pantalla
function mostrarProductos() {
  productos.forEach(prod => {
    // Creamos un div para cada producto
    const div = document.createElement("div");
    div.className = "producto"; // Le damos clase para poder estilizarlo con CSS

    // Insertamos el HTML del producto (imagen, nombre, precio y botón)
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 100%; height: auto; border-radius: 5px;">
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar</button>
    `;

    // Agregamos el producto al contenedor principal
    productosContainer.appendChild(div);
  });
}

// Llamamos a la función para que se rendericen los productos apenas carga la página
mostrarProductos();

// Esta función agrega un producto al carrito por su ID
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id); // Buscamos el producto por ID
  carrito.push(producto); // Lo agregamos al array del carrito
  actualizarContador(); // Actualizamos el número que muestra cuántos productos hay
}

// Esta función actualiza el contador de productos en el carrito
function actualizarContador() {
  contador.textContent = carrito.length; // Mostramos el largo del array (cantidad de productos)
}

// Esta función muestra el contenido del carrito dentro del modal
function mostrarCarrito() {
  carritoLista.innerHTML = ""; // Limpiamos la lista del carrito por si tenía cosas

  // Si el carrito está vacío, mostramos un mensaje y salimos de la función
  if (carrito.length === 0) {
    carritoLista.innerHTML = "<li>Carrito vacío</li>";
    total.textContent = "";
    return;
  }

  // Recorremos los productos del carrito y los mostramos uno por uno
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    carritoLista.appendChild(li);
  });

  // Calculamos el total sumando los precios de todos los productos
  const totalCompra = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  total.textContent = `Total: $${totalCompra}`; // Mostramos el total
}

// Cuando el usuario hace clic en "Ver carrito"
verCarritoBtn.onclick = () => {
  mostrarCarrito(); // Mostramos los productos
  carritoModal.classList.remove("hidden"); // Mostramos el modal (sacamos la clase "hidden")
};

// Cierra el modal del carrito
cerrarBtn.onclick = () => {
  carritoModal.classList.add("hidden");
};

// Vacia el carrito completamente
vaciarBtn.onclick = () => {
  carrito = []; // Vaciamos el array
  actualizarContador(); // Actualizamos el número
  mostrarCarrito(); // Volvemos a renderizar el carrito vacío
  alert("Carrito vaciado."); // Mostramos alerta
};

// Simula la compra: muestra alerta y vacía el carrito
comprarBtn.onclick = () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
  } else {
    alert("¡Compra realizada con éxito!");
    carrito = [];
    actualizarContador();
    mostrarCarrito();
    carritoModal.classList.add("hidden");
  }
};
