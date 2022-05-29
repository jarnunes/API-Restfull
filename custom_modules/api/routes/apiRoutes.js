const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const knex = require('../../database')
const utils = require('../../utils')

const Json = utils.Json
const Response = utils.Response
let apiRouter = express.Router()

const endpointAuthenticate = '/authenticate'
const endpointProduct = '/products'
const SECRET_KEY = 'rektsodikdkd2940452'


// :: PRODUCTS ::
apiRouter.get(endpointProduct, (req, res) => {
    knex.select('*').from('produto').then(products => {
        res.status(200).json(new Response(null, 200, null, products))
    })
})

apiRouter.get(endpointProduct + '/:id', (req, res) => {
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
        }).catch(err => res.status(500).json(new Response('resp.http.500', 500, err)))
})

apiRouter.post(endpointProduct, (req, res) => {
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
            }).catch(err => res.status(500).json(new Response('resp.http.500', 500, err)))
    }
    else {
        res.status(404).json(new Response('json.invalid', 404))
    }

})

apiRouter.delete(endpointProduct + '/:id', (req, res) => {
    let id = parseInt(req.params.id)
    console.log(id)
    knex('produto')
        .where({ 'id': id })
        .delete('id', 'descricao')
        .then(resp => {
            if (resp.length > 0) {
                res.status(200).json(new Response('product.delete.success', 200, null, resp))
                return
            }
            res.status(404).json(new Response('resp.http.404', 404, null, null))
        }).catch(err => res.status(500).json(new Response('resp.http.500', 500, err.message)))
})

apiRouter.put(endpointProduct + '/:id', (req, res) => {
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


// :: AUTHENTICATE ::
apiRouter.post('/register', (req, res) => {
    knex('usuario')
        .insert({
            nome: req.body.nome,
            login: req.body.login,
            senha: bcrypt.hashSync(req.body.senha),
            email: req.body.email
        }, ['id'])
        .then(resp => {
            res.status(200).json(new Response(null, 200, null, resp[0]))
        }).catch(err => res.status(500).json(new Response('resp.http.500', 500, err)))
})


apiRouter.post('/login', (req, res) => {
    knex('usuario')
        .where({ login: req.body.login })
        .first()
        .then(user => {
            if (!Json.isEmpty(user) && bcrypt.compareSync(req.body.senha, user.senha)) {
                let tokenJWT = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 3600 })
                let data = {
                    id: user.id,
                    login: user.login,
                    nome: user.nome,
                    roles: user.roles,
                    token: tokenJWT
                }
                res.status(200).json(new Response(null, 200, null, data))
            } else {
                res.status(404).json(new Response('authenticate.invalid.user.password', 404, null))
            }

        }).catch(err => res.status(500).json(new Response('resp.http.500', 500, err)))
})












module.exports = apiRouter;