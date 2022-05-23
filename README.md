# API-Restfull

Restfull API with Node.js

## Quick Start

> Install dependencies

```bash
npm install
```

> Start the app

````bash
node server.js
````

Visit `http://localhost:3000` in your browser. The app should be up & running.

## Test API CRUD
This CRUD was created to validate API and training AJAX.
Open your browser and visit `https://twrestfull-api.herokuapp.com/`.

# API Endpoints
The REST API to the example app is described below.

## Get list of Products

### Request
`GET /api/products`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/products/

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 376
    ETag: W/"178-nDRqepljM5gzpp4dBhJmpq2qm70"
    Date: Mon, 23 May 2022 00:09:06 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    []

    
