const express = require('express')
let secRouters = express.Router()

secRouters.get('/common/login', (req, res) => {
    res.render('login')
})

secRouters.get('/common/register', (req, res, next) => {
    res.render('register')
})
secRouters.get('/logout', (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/authenticate/common/login');
    });
})


module.exports = secRouters;