const PropertiesReader = require('properties-reader')
const properties = PropertiesReader('custom_modules/messages/messages.properties')

function msg(prop) {
    let message = properties.get(prop)
    return message === null ? prop : message
}

module.exports = { msg }