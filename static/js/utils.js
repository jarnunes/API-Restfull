class Utils {
    static existsElement(idElement) {
        return document.contains(document.getElementById(idElement))
    }

    static setStyleDisplayById(idElement, styleDisplay) {
        if (this.existsElement(idElement)) {
            document.getElementById(idElement).style.display = styleDisplay
            return true;
        }
        return false;
    }

    /**
     * Remove element from DOM by ID
     * @param elementId
     * @returns {boolean}
     */
    static removeById(elementId) {
        if (this.existsElement(elementId)) {
            document.getElementById(elementId).remove()
            return true;
        }
        return false;
    }

    /**
     *
     * @param tagName HTML Element Tag
     * @param elementId Element ID
     * @param classList List of CSS Classes
     * @param html HTML Content
     * @param idContainer Container ID
     * @param appendToBody Append to body or to container
     */
    static appendChild(tagName, elementId, classList, html, idContainer, appendToBody = false) {
        try {
            let childElement = document.createElement(tagName);
            childElement.id = elementId
            if (classList != null) {
                childElement.classList.add(...classList)
            }
            childElement.innerHTML = html
            if (idContainer != null && this.existsElement(idContainer)) {
                document.getElementById(idContainer).appendChild(childElement)
            }
            if (appendToBody && idContainer === null) {
                document.body.appendChild(childElement)
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    static getIdOrNull(idElement) {
        return idElement != null ? `id="${idElement}"` : ''
    }

    static alert(idElement, alertType, msg) {
        $("input[type=password]").val('');
        $(".alert").alert('close')
        let html = HTMLComponents.getMessageAlert(idElement, alertType, msg)
        Utils.appendChild('div', idElement, null, html, 'messages')
    }
}


class HTMLComponents {
    static getMessageAlert(elementId, alertType, alertMessage) {
        return `
            <div ${Utils.getIdOrNull(elementId)} class="alert alert-${alertType} mt-3" role="alert">
                ${alertMessage}
            </div>
        `
    }
}