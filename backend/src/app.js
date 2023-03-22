const express = require('express')
const morgan = require('morgan')
const dbConnect =  require('./db')
const cors = require('cors')


const app = express()

dbConnect()

app.use(express.json());

<<<<<<< HEAD
=======

>>>>>>> c1232e326dba399603a8c73b141aad45e60a5414
app.use(express.urlencoded({extended: true}));

app.use(cors())

app.use(morgan('dev'))

app.use(require('./routes/products.routes'))
app.use(require('./routes/sales.routes'))


app.listen(3000)

console.log('server on port', 3000)