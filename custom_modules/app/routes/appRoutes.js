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



appRouter.get('/common/login', (req, res) => {
    res.render('login')
})


appRouter.get('/common/register', (req, res, next) => {
    res.render('register')
})
appRouter.get('/logout', (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/auth/common/login');
    });
})


module.exports = appRouter;