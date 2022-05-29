require('dotenv').config();

const express = require('express')
const morgan = require('morgan')
const apiRouter = require('./custom_modules/api/routes/apiRoutes')
const msg = require('./custom_modules/messages/msg').msg
const app = express()
const PORT = process.env.PORT || 3000 // required to heroku deploy


app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('static'))


app.use(morgan('common')) /*logs*/
app.use(express.json()) //required to load JSON on attribute req.body
app.use(express.urlencoded({ extended: true }))

/** :: API :: **/
app.use('/api', apiRouter)

app.use((req, res, next) => { res.status(404).send(msg('resp.http.404.html')) });

app.listen(PORT, () => {
    console.log(msg('server.running'), PORT)
})
