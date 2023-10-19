alert("Bienvenidos a Marduk Web Services")

const productos = [
    { id: 1, nombre: "Dominio para tu web", precio: 10, unidades: 5 },
    { id: 2, nombre: "Hosting para tu web", precio: 20, unidades: 10 },
    { id: 3, nombre: "Diseño web", precio: 30, unidades: 15 },
    { id: 4, nombre: "Certificado de SSL web", precio: 40, unidades: 20 },
];

/* Carrito en 0*/
let carrito = [];

/* Tarjeta de productos*/
function crearTarjetaProducto(producto) {
    const productoCard = document.createElement('div');
    productoCard.className = 'producto-card';
    const nombre = document.createElement('h3');
    nombre.textContent = producto.nombre;
    const precio = document.createElement('p');
    precio.textContent = `Precio: $${producto.precio}`;
    const stock = document.createElement('p');
    stock.textContent = `Stock disponible: ${producto.unidades}`;
    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = 'Agregar al carrito';
    botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));
    productoCard.appendChild(nombre);
    productoCard.appendChild(precio);
    productoCard.appendChild(stock);
    productoCard.appendChild(botonAgregar);
    return productoCard;
}

/* Con esto agrego productos al carrito*/
function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
}


function actualizarCarrito() {
    const contadorCarrito = document.getElementById('carrito-cantidad');
    contadorCarrito.textContent = carrito.length;
}

/* Comprar */
document.getElementById('comprar').addEventListener('click', () => {
});

/* Agregar tarjetas al contenedor 0*/
const contenedorProductos = document.getElementById('app');
productos.forEach(producto => {
    const tarjetaProducto = crearTarjetaProducto(producto);
    contenedorProductos.appendChild(tarjetaProducto);
});


/* Suma de importes del carrito*/
function calcularTotalCarrito() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio;
    });
    return total;
}

/* Actualizar contador del carrto 0*/
function actualizarCarrito() {
    const contadorCarrito = document.getElementById('carrito-cantidad');
    contadorCarrito.textContent = carrito.length;
    const totalCarrito = document.getElementById('total-carrito');
    const sumaTotal = calcularTotalCarrito();
    totalCarrito.textContent = `Total: U$D ${sumaTotal}`;
}


/* para vaciar Carrito */
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});


function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}


/* para solicitar datos para enviar oferta */
document.getElementById('comprar').addEventListener('click', () => {
    const nombre = prompt('Por favor, ingrese su nombre:');
    const email = prompt('Por favor, ingrese su correo electrónico:');
    if (nombre && email) {
        const mensaje = `Correo con la oferta de servicio enviado a ${email}. Muchas gracias`;
        alert(mensaje);
    } else {
        alert('Debe proporcionar su nombre y correo electrónico para continuar.');
    }
});
