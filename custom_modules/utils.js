const Ajv = require("ajv")
const ajv = new Ajv()
const prop = require('./messages/msg').msg
const json_schema = require('./json-schema.json')


class Json {
    /**
     * 
     * @param {*} json 
     * @returns 
     */
    static validate(json) {
        return ajv.validate(json_schema, json);
    }

    /**
     * Validate json 
     * @param {*} json 
     * @param {*} jsonSchema 
     * @returns boolean
     */
    static validate(json, jsonSchema) {
        return ajv.validate(jsonSchema, json)
    }

    static isEmpty(json) {
        return json == null || Object.keys(json).length === 0;
    }
}

class Response {

    /**
     * 
     * @param {Str} msg : Message propertie
     * @param {Int} code :  HTTP Code
     * @param {Str} error : Message error or exceptions
     * @param {Object} data : data object or Json
     */
    constructor(msg, code = null, error = null, data = null) {
        if (msg !== null) {
            this.msg = prop(msg)
        }
        if (code !== null) {
            this.code = code
        }
        if (error !== null) {
            this.error = error
        }
        if (data !== null) {
            this.data = data
        }
    }
}



module.exports = {
    Json, Response
}
