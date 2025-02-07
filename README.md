# API-Restfull

Restfull API with Node.js

## Quick Start

> Install dependencies

```bash
npm install
```

> Create database. DDL files in database folder

> Configure a .env file with variables:
```
DATABASE_URL=URL_PASSWORD
SECRET_KEY=YOU_SECRET_KEY_VALUE
```

> Start the app

````bash
node server.js
````

Visit `http://localhost:3000` in your browser. The app should be up & running.

## API CRUD
This CRUD was created to validate API and training AJAX.
Open your browser and visit [https://twrestfull-api.herokuapp.com/](https://twrestfull-api.herokuapp.com/).

# API Endpoints
The REST API to the example app is described below.

## Get list of Products

> Request : `GET /api/products`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/products/

> Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    []


## Get Product by ID
> Request : `GET /api/products/ID`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/products/1

> Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 76
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":1,"descricao":"String","valor":0.0, "marca":"String"}

## Post
> Request : `POST /api/products/`
    
    curl -i -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"descricao":"String","valor":0.0,"marca":"String"}' http://localhost:3000/api/products/

> Response : 

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 109
    ETag: W/"6d-aLQ3q0gJo80PI7U4aUbRzxEQs3w"
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"message":"Produto cadastrado com sucesso!","data":{"descricao":"String","valor":0,"marca":"String","id":7}}

#### Invalid JSON
> Request : `POST /api/products/`

    curl -i -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"desc":"String","val":0.0,"mar":"String"}' http://localhost:3000/api/products/

> Response :

    HTTP/1.1 400 Bad Request
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 77
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"message":"JSON inválido.","data":{"desc":"String","val":0,"mar":"String"}}

All POST requests are validate before save. For more details see the JsonSchema in `/custom_modules/json-schema.json`

## Put
> Request : PUT `/api/products/ID`

    curl -i -H "Accept: application/json" -H "Content-type: application/json" -X PUT -d '{"descricao":"String","valor":0.0,"marca":"String"}' http://localhost:3000/api/products/2

> Response : 

    HTTP/1.1 202 Accepted
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 45
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"message":"Produto atualizado com sucesso!"}

## Delete
> Request : DELETE `/api/products/ID`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:3000/api/products/9999

> Response : 

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 43
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"message":"Produto excluido com sucesso!"}

### Delete non-existing ID
> Request : DELETE `/api/products/ID`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:3000/api/products/9999

> Response: 

    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 38
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"message":"Produto não encontrado!"}