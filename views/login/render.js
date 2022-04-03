document.getElementById('btn').addEventListener('click', (e) => {
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const obj = { email, password }

    window.electronApi.form(obj);
});