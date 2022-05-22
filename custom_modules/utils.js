const Ajv = require("ajv")
const ajv = new Ajv()
const json_schema = require('./json-schema.json')

function json_validate(json) {
    return ajv.validate(json_schema, json);
}

function generate_id(produtos) {
    return isJSONEmpty(produtos) ? 0 : Math.max.apply(Math, produtos.map(o => o.id)) + 1;
}

function isJSONEmpty(json) {
    return json == null || Object.keys(json).length === 0;
}

module.exports = {
    json_validate, generate_id, isJSONEmpty
}
