const usuarioForm = document.querySelector('#usuarioForm');

usuarioForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombreApellido = document.querySelector('#nombreApellido').value;
    const usuario = document.querySelector('#usuario').value;
    const password = document.querySelector('#password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usuarioRegistrado = users.find(user => user.usuario === usuario);

    if (usuarioRegistrado) {
        return Swal.fire({
            icon: 'error',
            title: 'Usuario ya registrado',
            text: 'El usuario indicado ya se encuentra en nuestra base de datos',
            confirmButtonColor: '#4ca0af', 
        });
    }

    users.push({ nombreApellido: nombreApellido, usuario: usuario, password: password });
    localStorage.setItem('users', JSON.stringify(users));

    await Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        confirmButtonColor: '#4ca0af', 
    });

    window.location.href = 'index.html';
});
