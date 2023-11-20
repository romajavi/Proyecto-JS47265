const productos = [];
let carrito = [];
// Función para crear las tarjetas de producto y añadirlas al HTML
function crearTarjetaProducto(producto) {
    const productoCard = document.createElement('div');
    productoCard.className = 'producto-card';

    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.className = 'producto-imagen'; 

    const contenido = document.createElement('div'); 
    contenido.style.marginTop = '10px'; 

    const nombre = document.createElement('h3');
    nombre.textContent = producto.nombre;

    const precio = document.createElement('p');
    precio.textContent = `Precio: $${producto.precio}`;

    const stock = document.createElement('p');
    stock.textContent = `Stock: ${producto.unidades}`;

    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = 'Agregar al carrito';
    botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));


    productoCard.style.border = '1px solid #ccc';
    productoCard.style.padding = '10px';
    productoCard.style.width = '250px';
    productoCard.style.textAlign = 'center';
    productoCard.style.background = '#f7f7f7';

    // Estilos para las imágenes
    imagen.style.maxWidth = '100%'; 
    imagen.style.maxHeight = '100px'; 

    // Agregar elementos al contenido
    contenido.appendChild(nombre);
    contenido.appendChild(precio);
    contenido.appendChild(stock);
    contenido.appendChild(botonAgregar);

    productoCard.appendChild(imagen);
    productoCard.appendChild(contenido);

    return productoCard;
}



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
                swal.fire('Sin stock disponible para este producto.');
            }
        } else {
            carrito.push({ ...producto, unidades: 1 });
            producto.unidades--;
        }
        actualizarCarrito();
        actualizarProductos();
    } else {
        swal.fire('Sin stock disponible para este producto.');
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

// Función para vaciar el carrito con confirmación
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    Swal.fire({
        title: '¿Está seguro de vaciar el carrito?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#4ca0af',
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            actualizarCarrito();
            actualizarProductos();
            Swal.fire('Carrito vaciado', 'El carrito ha sido vaciado exitosamente.', 'success');
        }
    });
});




// Función para finalizar la compra actualizado con el Prompt de la librería
document.getElementById('comprar').addEventListener('click', async () => {
    const { value: email, dismiss } = await Swal.fire({
        title: 'Ingrese su correo electrónico',
        input: 'email',
        inputLabel: 'Correo electrónico',
        inputPlaceholder: 'Ingrese su correo electrónico',
        showCancelButton: true,
        confirmButtonColor: '#4ca0af',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Enviar',
        inputValidator: (value) => {
            if (!value) {
                return 'Debe proporcionar su correo electrónico para continuar.';
            }
        }
    });

    if (email) {
        const mensaje = `Por favor revisa tu casilla de ${email} para conocer el detalle del presupuesto. Muchas gracias`;
        Swal.fire({
            icon: 'success',
            title: 'Correo Enviado Exitosamente',
            text: mensaje,
            confirmButtonColor: '#4ca0af',
        });
    } else if (dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Compra cancelada', 'No se proporcionó un correo electrónico.', 'info');
    } else {
        Swal.fire('Debe proporcionar su nombre y correo electrónico para continuar.');
    }
    window.location.href = 'index.html';
});





// Función para obtener datos mediante Fetch
function obtenerDatos() {
    fetch('productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.statusText}`);
            }
            return response.json();
        })
        .then(datos => {
            productos.push(...datos);
            actualizarProductos();
        })
        .catch(error => console.error('Error al obtener datos:', error));
}

obtenerDatos();
