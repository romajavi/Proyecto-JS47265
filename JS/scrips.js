const productos = [
    { id: 1, nombre: "Dominio para tu web", precio: 10, unidades: 5 },
    { id: 2, nombre: "Hosting para tu web", precio: 20, unidades: 10 },
    { id: 3, nombre: "Diseño web", precio: 30, unidades: 15 },
    { id: 4, nombre: "Certificado de SSL web", precio: 40, unidades: 20 },
];

let carrito = [];

//Crear las tarjetas de producto para mandarlas al htlm
function crearTarjetaProducto(producto) {
    const productoCard = document.createElement('div');
    productoCard.className = 'producto-card';
    const nombre = document.createElement('h3');
    nombre.textContent = producto.nombre;
    const precio = document.createElement('p');
    precio.textContent = `Precio: $${producto.precio}`;
    const stock = document.createElement('p');
    stock.textContent = `Stock : ${producto.unidades}`;
    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = 'Agregar al carrito';
    botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));
    productoCard.appendChild(nombre);
    productoCard.appendChild(precio);
    productoCard.appendChild(stock);
    productoCard.appendChild(botonAgregar);
    return productoCard;
}


//Actualizar carrito al agragar en importe y cantidad
function actualizarCarrito() {
    const contadorCarrito = document.getElementById('carrito-cantidad');
    contadorCarrito.textContent = carrito.reduce((total, producto) => total + producto.unidades, 0);
    const totalCarrito = document.getElementById('total-carrito');
    const sumaTotal = calcularTotalCarrito();
    totalCarrito.textContent = `Total: U$D ${sumaTotal}`;
}

//Para agragar productos al carrito en base al stock disponible
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

//Actualizar productos al seleccionar o eliminar productos del carrito
function actualizarProductos() {
    const contenedorProductos = document.getElementById('app');
    contenedorProductos.innerHTML = '';
    productos.forEach(producto => {
        const tarjetaProducto = crearTarjetaProducto(producto);
        contenedorProductos.appendChild(tarjetaProducto);
    });
}

//Calcular el total del importe del carrito miltiplicando precio x cantidad seleccionada
function calcularTotalCarrito() {
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio * producto.unidades;
    });
    return total;
}

//Vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
    actualizarProductos();
});

//Fase final al comprar donde se pide mail al usuario para enviar la oferta y luego ir al inicio
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

actualizarProductos();

