const API_URL = '/api/products'
const CLASS_LIST_SUCCESS = ['show', 'bg-success']
function refreshContainer() {
    $("#containner").load(window.location.href + " #containner");
}

function getUrl(idProd) {
    return API_URL + '/' + idProd
}

function postProduct() {
    const formProduto = new FormData(document.getElementById(ID_FORM_PRODUCT))
    let form = Object.fromEntries(formProduto.entries())
    form['valor'] = parseFloat(form.valor)

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + sessionStorage.getItem('token') }

    })
        .then(res => res.json())
        .then(json => {
            $('#liveToast').toast('show')
            refreshContainer()
            closeModalProduto()
            showAlert('Produto cadastrado com sucesso!', CLASS_LIST_SUCCESS)
        })
}

function deleteProd(idProd) {
    fetch(getUrl(idProd), {
        method: 'DELETE',
        headers: { "Authorization": "Bearer " + sessionStorage.getItem('token') }
    })
        .then(res => res.json())
        .then(json => { refreshContainer() })
}

function updateProduct(idProd) {
    fetch(getUrl(idProd), {
        method: 'GET',
        headers: { "Authorization": "Bearer " + sessionStorage.getItem('token') }
    })
        .then(res => res.json())
        .then(json => {
            json.data['idTag'] = `<input type="hidden" id="custId" name="id" value="${json.data.id}">`
            appendChildModal(ID_CONTAINER_MODAL_PRODUCT, ID_MODAL_PRODUCT, ID_FORM_PRODUCT, json.data, 'putProduct()')
            openModal(ID_MODAL_PRODUCT)
        })
}

function putProduct() {
    const formProduto = new FormData(document.getElementById(ID_FORM_PRODUCT))
    let form = Object.fromEntries(formProduto.entries())
    const put_url = getUrl(form.id)

    delete form['id'];
    form['valor'] = parseFloat(form.valor)

    fetch(put_url, {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: { "Content-type": "application/json; charset=UTF-8", "Authorization": "Bearer " + sessionStorage.getItem('token') }

    })
        .then(res => res.json())
        .then(json => {
            refreshContainer()
            closeModalProduto()
            showAlert('Produto atualizado com sucesso!', CLASS_LIST_SUCCESS)
        })
}

function showAlert(message, classesList) {
    setTimeout(() => {
        document.getElementById('textAlert').textContent = message
        document.getElementById('alertContent').classList.add(...classesList)
    }, 20)

    setTimeout(() => {
        document.getElementById('alertContent').classList.remove(...classesList)
    }, 10000)
}


document.getElementById('logout').addEventListener('click', (event) => {
    event.preventDefault();
    fetch('/auth/logout')
        .then(() => document.location.reload())
})