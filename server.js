require('dotenv').config();

const express = require('express')
const morgan = require('morgan')
const session = require('express-session')

const apiRouter = require('./custom_modules/api/routes/apiRoutes')
const authRouter = require('./custom_modules/auth/routes/authRoutes')
const appRouter = require('./custom_modules/app/routes/appRoutes');
const secRouters = require('./custom_modules/app/routes/secRouters');

const msg = require('./custom_modules/messages/msg').msg

const app = express()
const PORT = process.env.PORT || 3000 // required to heroku deploy


app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('static'))
app.use(morgan('common')) /*logs*/
app.use(express.json()) //required to load JSON on attribute req.body
app.use(express.urlencoded({ extended: true }))


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: "ktr57-gT599rn-39ei00",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));


// :: API ::
app.use('/authenticate', secRouters)
app.use('/auth', authRouter)
app.use('/api', apiRouter)

app.use('/', (req, res, next) => {
    if (req.session && !req.session.userId) {
        res.redirect('/authenticate/common/login')
    }
    else {
        next()
    }
})


app.use('/', appRouter)
app.use((req, res, next) => { res.status(404).send(msg('resp.http.404.html')) });

app.listen(PORT, () => {
    console.log(msg('server.running'), PORT)
})
