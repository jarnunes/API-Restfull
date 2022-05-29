const constants = require('../constants/constants')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const knex = require('../database')
const Response = utils.Response
const SECRET_KEY = process.env.SECRET_KEY


// :: CHECK LOGIN ::
let checkLogin = (req, res, next) => {
    console.log(req.session)
    console.log(req.storageSession)
}

// :: SECURITY JWT ::
let checkToken = (req, res, next) => {
    let authToken = req.headers['authorization']

    if (!authToken) {
        res.status(401).json(new Response('auth.required.access.token', 401))
    } else {
        req.token = authToken.split(' ')[1]
        jwt.verify(req.token, SECRET_KEY, (err, decodeToken) => {
            if (err) {
                res.status(401).json(new Response('auth.access.denied', 401, err))
                return;
            }
            req.usuarioId = decodeToken.id
            next()
        })
    }
}

// :: CHECK ROLES ::
let isAdmin = (req, res, next) => {
    knex('usuario')
        .where({ 'id': req.usuarioId })
        .first()
        .then(usuario => {
            console.log(usuario)
            let roles = usuario.roles.split(',')
            let roleAdmin = roles.find(i => i === constants.ROLE_ADMIN)
            if (roleAdmin === constants.ROLE_ADMIN) {
                next();
                return;
            }
            else {
                res.status(403).json(new Response('auth.role.admin.required', 403))
            }
        }).catch(err => {
            res.status(500).json(new Response('auth.error.check.roles', 500, err.message))
        })
}

module.exports = { checkToken, checkLogin, isAdmin }