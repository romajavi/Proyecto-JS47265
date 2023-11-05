const usuarioForm = document.querySelector('#usuarioForm'); 

usuarioForm.addEventListener('submit', (e) => {
    e.preventDefault(); e

    const nombreApellido = document.querySelector('#nombreApellido').value; 
    const usuario = document.querySelector('#usuario').value; 
    const password = document.querySelector('#password').value; 

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usuarioRegistrado = users.find(user => user.usuario === usuario);

    if (usuarioRegistrado) {
        return alert('El usuario indicado ya se encuentra en nuestra base de datos');
    }

    users.push({ nombreApellido: nombreApellido, usuario: usuario, password: password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('¡Registro exitoso!');
    window.location.href = 'index.html';
});
