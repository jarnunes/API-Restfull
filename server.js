const express = require('express')
const morgan = require('morgan')
const utils = require('./custom_modules/utils')

const app = express()
const PORT = process.env.PORT || 3000 // required to heroku deploy

const db_produtos = require('./produtos.json')


app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('static'))


app.use(morgan('common')) /*logs*/
app.use(express.json()) //required to load JSON on attribute req.body
app.use(express.urlencoded({ extended: true }))

/** :: COMMON :: **/
app.get('/', (req, res, next) => { res.render('index', { produtos: db_produtos.produtos }) });


/** :: API :: **/
app.get('/api/products', (req, res) => {
    res.status(200).send(db_produtos)
});

app.get('/api/products/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let indx = db_produtos.produtos.findIndex((produto) => produto.id === id)
    if (indx > -1) {
        res.status(200).json(db_produtos.produtos[indx])
    }
    else {
        res.status(404).json({ message: "Produto não encontrado." });
    }
});


app.post('/api/products', express.json(), (req, res) => {
    let produto = req.body
    if (utils.json_validate(produto)) {
        let id = utils.generate_id(db_produtos.produtos)
        produto.id = id;
        db_produtos.produtos.push(produto)
        res.status(201).json({
            message: "Produto cadastrado com sucesso!",
            data: produto
        })
    } else {
        res.status(400).json({
            message: "JSON inválido.",
            data: produto
        });
    }
});

app.delete('/api/products/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let index = db_produtos.produtos.findIndex(o => o.id === id)
    if (index > -1) {
        db_produtos.produtos.splice(index, 1)
        res.status(200).json({
            message: "Produto excluido com sucesso!"
        })
    } else {
        res.status(404).json({
            message: "Produto não encontrado!"
        })
    }
})

app.put('/api/products/:id', express.json(), (req, res) => {
    let id = parseInt(req.params.id)
    let produto = req.body
    if (utils.json_validate(produto)) {
        let index = db_produtos.produtos.findIndex(o => o.id === id)
        if (index > -1) {
            db_produtos.produtos[index].descricao = req.body.descricao
            db_produtos.produtos[index].valor = req.body.valor
            db_produtos.produtos[index].marca = req.body.marca

            res.status(202).json({ message: "Produto atualizado com sucesso!" })
        } else {
            res.status(404).json({ message: "Produto não encontrado!" })
        }
    } else {
        res.status(400).json({
            message: "JSON inválido.",
            data: produto
        });
    }

})

app.use((req, res, next) => { res.status(404).send("<h1>Page not found</h1>") });

app.listen(PORT, () => {
    console.log('Listening on port ', PORT)
})
