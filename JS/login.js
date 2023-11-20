const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.querySelector('#usuario').value;
    const password = document.querySelector('#password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validarUser = users.find(user => user.usuario === usuario && user.password === password);

    if (!validarUser) {
        return Swal.fire({
            icon: 'error',
            title: 'Usuario y/o contraseña incorrecta',
            text: 'Revisar datos o ir a registro',
            confirmButtonColor: '#4ca0af',
        });
    }

    await Swal.fire({
        icon: 'success',
        title: `Bienvenido ${validarUser.nombreApellido}`,
        confirmButtonColor: '#4caf50', 
    });

    localStorage.setItem('login_success', JSON.stringify(validarUser));
    window.location.href = 'productos.html';
});
