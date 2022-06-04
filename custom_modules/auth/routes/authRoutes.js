const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const knex = require('../../database')
const utils = require('../../utils')

const Json = utils.Json
const Response = utils.Response
let authRouter = express.Router()

const SECRET_KEY = process.env.SECRET_KEY


// :: AUTHENTICATE ::
authRouter.post('/register', (req, res) => {
    knex('usuario')
        .where({ 'login': req.body.login })
        .orWhere({ 'email': req.body.email })
        .then(result => {
            if (result.length > 0) {
                res.status(409).json(new Response('auth.login.email.already.exists', 409))
                return
            }
            knex('usuario')
                .insert({
                    nome: req.body.nome,
                    login: req.body.login,
                    senha: bcrypt.hashSync(req.body.senha),
                    email: req.body.email
                }, ['id'])
                .then(resp => {
                    res.status(200).json(new Response(null, 200, null, resp[0]))
                })
        }).catch(err => res.status(500).json(new Response('resp.http.500', 500, err.message)))

})

authRouter.post('/login', (req, res) => {
    knex('usuario')
        .where({ login: req.body.login })
        .first()
        .then(user => {
            if (!Json.isEmpty(user) && bcrypt.compareSync(req.body.senha, user.senha)) {
                let tokenJWT = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 36000 })
                let data = {
                    id: user.id,
                    login: user.login,
                    nome: user.nome,
                    roles: user.roles,
                    token: tokenJWT
                }

                //app login
                req.session.userId = user.id
                res.status(200).json(new Response(null, 200, null, data))
            } else {
                res.status(404).json(new Response('auth.invalid.user.password', 404))
            }

        }).catch(err => res.status(500).json(new Response('resp.http.500', 500, err)))
})

module.exports = authRouter;