const express = require('express')
const morgan = require('morgan')
const dbConnect =  require('./db')
const cors = require('cors')
const createRoles = require('./libs/initialSetup')


const app = express()

dbConnect()
createRoles()

app.use(express.json());



app.use(express.urlencoded({extended: true}));

app.use(cors())

app.use(morgan('dev'))

app.use(require('./routes/products.routes'))
app.use(require('./routes/auth.routes'))
app.use(require('./routes/sales.routes'))


app.listen(3000)

console.log('server on port', 3000)