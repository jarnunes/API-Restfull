const express = require('express')
const knex = require('../../database')
const utils = require('../../utils')

const Json = utils.Json
const Response = utils.Response
let apiRouter = express.Router()

const endpointProduct = '/products'
apiRouter.get(endpointProduct, function (req, res) {
    knex.select('*').from('produto').then(products => {
        res.status(200).json(new Response(null, 200, null, products))
    })
})

apiRouter.get(endpointProduct + '/:id', function (req, res) {
    let id = parseInt(req.params.id)
    knex('produto')
        .where('id', '=', id)
        .first()
        .then(product => {
            if (!Json.isEmpty(product)) {
                res.status(200).json(new Response(null, 200, null, product))
            } else {
                res.status(404).json(new Response('resp.http.404', 404))
            }
        })
        .catch(err => {
            res.status(500).json(new Response('resp.http.500', 500, err))
        })
})

apiRouter.post(endpointProduct, function (req, res) {
    let product = req.body
    if (Json.validate(product)) {
        knex('produto')
            .insert({
                descricao: product.descricao,
                valor: product.valor,
                marca: product.marca
            }, ['id', 'descricao', 'valor', 'marca'])
            .then(result => {
                res.status(200).json(new Response(null, 200, null, result))
            })
            .catch(err => {
                res.status(500).json(new Response('resp.http.500', 500, err))
            })
    }
    else {
        res.status(404).json(new Response('json.invalid', 404))
    }

})

apiRouter.delete(endpointProduct + '/:id', function (req, res) {
    let id = parseInt(req.params.id)
    console.log(id)
    knex('produto')
        .where({ 'id': id })
        .delete('id', 'descricao')
        .then(resp => {
            if (resp.length > 0) {
                res.status(200).json(new Response('product.delete.success', 200, null, resp))
            }
            else {
                res.status(404).json(new Response('resp.http.404', 404, null, null))
            }

        })
        .catch(err => {
            res.status(500).json(new Response('resp.http.500', 500, err.message))
        })
})

apiRouter.put(endpointProduct + '/:id', function (req, res) {
    let id = parseInt(req.params.id)
    let product = req.body
    if (Json.validate(product)) {
        knex('produto')
            .where({ 'id': id })
            .update({
                descricao: product.descricao,
                valor: product.valor,
                marca: product.marca
            }, ['id', 'descricao', 'valor', 'marca'])
            .then(response => {
                if (response.length > 0) {
                    res.status(200).json(new Response(null, 200, null, response))
                }
                else {
                    res.status(404).json(new Response('resp.http.404', 404, null, null))
                }
            }).catch(err => {
                res.status(500).json(new Response('resp.http.500', 500, err.message))
            })
    }
})

module.exports = apiRouter;