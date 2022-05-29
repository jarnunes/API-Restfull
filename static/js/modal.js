const ID_CONTAINER_MODAL_PRODUCT = 'containerModalNewProduct'
const ID_MODAL_PRODUCT = 'modalNewProduct'
const ID_FORM_PRODUCT = 'formNewProduct'

function openModal(idModal) {
    $(`#${idModal}`).modal('show');
}

//close and remove modal
function closeModal(idModal, idContainerModal) {
    $(`#${idModal}`).modal('hide');
    document.getElementById(idContainerModal).remove()
}

function closeModalProduto() {
    closeModal(ID_MODAL_PRODUCT, ID_CONTAINER_MODAL_PRODUCT)
}
function isJSONEmpty(json) {
    return json == null || Object.keys(json).length === 0;
}

function appendChildModalPostProduct() {
    appendChildModal(ID_CONTAINER_MODAL_PRODUCT, ID_MODAL_PRODUCT, ID_FORM_PRODUCT, null, 'postProduct()')
    openModal(ID_MODAL_PRODUCT)
}

function appendChildModal(idContainerModal, idModal, idForm, jsonFieldsValues, onclickSaveFunc) {
    let divContainerModal = document.createElement('div')
    divContainerModal.id = idContainerModal
    divContainerModal.innerHTML = getHtmlModalProduct(idModal, idForm, jsonFieldsValues, onclickSaveFunc, 'closeModalProduto()')
    document.body.appendChild(divContainerModal)
}

function getHtmlModalProduct(idModal, idForm, jsonFieldsValues, onclickSaveFunc, onclickCancelFunc) {
    console.log(jsonFieldsValues)
    let isEmpty = isJSONEmpty(jsonFieldsValues);
    let modal =
        `
    <!-- Modal: novo produto -->
    <div class="modal fade" id="${idModal}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        data-focus-on="input:first">
        <form id="${idForm}" name="formProduto">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Produto</h5>
                    </div>
                    <div class="modal-body">
                            <div class="col-12">
                                ${isEmpty ? '' : jsonFieldsValues.idTag}
                                <label for="inputDesc" class="form-label">Descrição: </label>
                                <input type="text" class="form-control" name="descricao" id="inputDesc" ${isEmpty ? '' : 'value="' + jsonFieldsValues.descricao + '"'} required>
                            </div>
                            <div class="col-12">
                                <label for="inputMarca" class="form-label">Marca: </label>
                                <input type="text" name="marca" class="form-control" id="inputMarca" ${isEmpty ? '' : 'value="' + jsonFieldsValues.marca + '"'}>
                            </div>

                            <div class="col-md-6">
                                <label for="inputValor" class="form-label">Valor:</label>
                                <input type="number" name="valor" class="form-control" id="inputValor" step="0.01" ${isEmpty ? '' : 'value="' + jsonFieldsValues.valor + '"'} required>
                            </div>
                    
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-primary" onclick="${onclickCancelFunc}">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="${onclickSaveFunc}">Salvar</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    `
    return modal;
}

