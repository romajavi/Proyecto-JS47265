const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.querySelector('#usuario').value;
    const password = document.querySelector('#password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validarUser = users.find(user => user.usuario === usuario && user.password === password);

    if (!validarUser) {
        return alert('Usuario y/o contraseña incorrecta. Revisar datos o ir a registro');
    }
    
    alert(`Bienvenido ${validarUser.nombreApellido}`); // Corrección en la interpolación de la cadena
    localStorage.setItem('login_success', JSON.stringify(validarUser));
    window.location.href = 'productos.html';
});
