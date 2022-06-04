
document.getElementById('register').addEventListener('submit', (event) => {
    event.preventDefault();
    let form = Object.fromEntries(new FormData(document.getElementById('register')).entries())
    fetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(res => res.json())
        .then(json => {
            if (json.code === 409) {
                Utils.alert('alertMessage', 'danger', json.msg)
            }
            if (json.code === 200) {
                sessionStorage.setItem('token', json.data.token)
                window.location.href = '/authenticate/common/login'
            }
        })
})


