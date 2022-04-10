document.getElementById('btn').addEventListener('click', async (e) => {

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const obj = { email, password }

    const result = await window.electronApi.form(obj);
    
    if (result.length <= 0) {
        e.preventDefault();
        document.getElementById('error').style.visibility = "visible";

        setTimeout(() => {
            document.getElementById('error').style.visibility = "hidden";
        },5000);
    } else {
        document.location.href = '../home/index.html';
    }

 

});