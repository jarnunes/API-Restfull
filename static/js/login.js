
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    let form = Object.fromEntries(new FormData(document.getElementById('login')).entries())
    fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(res => res.json())
        .then(json => {
            sessionStorage.setItem('token', json.data.token)
            window.location.href = '/'
        })
})

