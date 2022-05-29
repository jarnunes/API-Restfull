const utils = require('../utils')
const knex = require('../database')
const Response = utils.Response
const Json = utils.Json

// :: POST PRODUCT JSON ::
let validateProductJson = (req, res, next) => {
    let product = req.body
    knex('json_schema')
        .where({ 'identificador': 'schema_product' })
        .first()
        .then(schema => {
            if (Json.validateSchema(product, JSON.parse(schema.schema_value))) {
                next()
                return
            }
            else {
                res.status(404).json(new Response('json.invalid', 404))
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json(new Response('resp.http.500', 500, err))
        })
}

// :: POST AUTH JSON :: 
let validateRegisterJSon = (req, res, next) => {

}

module.exports = { validateProductJson, validateRegisterJSon }