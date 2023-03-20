const express = require('express')
const morgan = require('morgan')
const dbConnect =  require('./db')
const cors = require('cors')


const app = express()

dbConnect()

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors())

app.use(morgan('dev'))

app.use(require('./routes/products.routes'))


app.get('/', (req, res)=>{
    res.json('welcome')
})



app.listen(3000)

console.log('server on port', 3000)