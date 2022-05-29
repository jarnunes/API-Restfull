const express = require('express')
const knex = require('../../database')
let appRouter = express.Router()

appRouter.get('', (req, res, next) => {
    knex('produto')
        .orderBy('id', 'asc')
        .then(produtos => {
            res.render('index', { produtos: produtos })
        })
});


module.exports = appRouter;