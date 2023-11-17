const productos = [];
let carrito = [];

// Función para crear las tarjetas de producto y añadirlas al HTML
function crearTarjetaProducto(producto) {
    const productoCard = document.createElement('div');
    productoCard.className = 'producto-card';
    const nombre = document.createElement('h3');
    nombre.textContent = producto.nombre;
    const precio = document.createElement('p');
    precio.textContent = `Precio: $${producto.precio}`;
    const stock = document.createElement('p');
    stock.textContent = `Stock: ${producto.unidades}`;
    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = 'Agregar al carrito';
    botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));
    productoCard.appendChild(nombre);
    productoCard.appendChild(precio);
    productoCard.appendChild(stock);
    productoCard.appendChild(botonAgregar);
    return productoCard;
}

// Llamada a la función para obtener datos al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    obtenerDatos();
    // Otras funciones y lógica de tu aplicación...
    // ...
    // Llamada a la función para actualizar productos
    actualizarProductos();
});

// Función para actualizar el carrito
function actualizarCarrito() {
    const contadorCarrito = document.getElementById('carrito-cantidad');
    contadorCarrito.textContent = carrito.reduce((total, producto) => total + producto.unidades, 0);
    const totalCarrito = document.getElementById('total-carrito');
    const sumaTotal = calcularTotalCarrito();
    totalCarrito.textContent = `Total: U$D ${sumaTotal}`;
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    if (producto.unidades > 0) {
        const productoEnCarrito = carrito.find((item) => item.id === producto.id);
        if (productoEnCarrito) {
            if (producto.unidades > 0) {
                productoEnCarrito.unidades++;
                producto.unidades--;
            } else {
                alert('Sin stock disponible para este producto.');
            }
        } else {
            carrito.push({ ...producto, unidades: 1 });
            producto.unidades--;
        }
        actualizarCarrito();
        actualizarProductos();
    } else {
        alert('Sin stock disponible para este producto.');
    }
}

// Función para actualizar productos al seleccionar o eliminar productos del carrito
function actualizarProductos() {
    const contenedorProductos = document.getElementById('app');
    contenedorProductos.innerHTML = '';
    productos.forEach(producto => {
        const tarjetaProducto = crearTarjetaProducto(producto);
        contenedorProductos.appendChild(tarjetaProducto);
    });
}

// Función para calcular el total del importe del carrito multiplicando precio x cantidad seleccionada
function calcularTotalCarrito() {
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio * producto.unidades;
    });
    return total;
}

// Función para vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
    actualizarProductos();
});

// Función para finalizar la compra
document.getElementById('comprar').addEventListener('click', () => {
    const email = prompt('Por favor, ingrese su correo electrónico:');
    if (email && email) {
        const mensaje = `Correo con la oferta de servicio enviado a ${email}. Muchas gracias`;
        alert(mensaje);
    } else {
        alert('Debe proporcionar su nombre y correo electrónico para continuar.');
    }
    window.location.href = 'index.html';
});

// Función para obtener datos mediante AJAX
function obtenerDatos() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'productos.json', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const datos = JSON.parse(xhr.responseText);
            productos.push(...datos);
            actualizarProductos();
        }
    };
    xhr.send();
}
