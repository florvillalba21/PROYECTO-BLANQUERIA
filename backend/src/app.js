const express = require('express')
const morgan = require('morgan')
const dbConnect =  require('./db')
const cors = require('cors')
const createRoles = require('./libs/initialSetup')


//Llamando a la dependencia multer
const multer = require('multer')
const path = require('path')

//Configuracion del multer, diciendole donde se guardara 
const storage = multer.diskStorage({
  destination: path.join(__dirname, '/uploads')
  ,
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })



const app = express()
app.use(upload.single('image'))



dbConnect()
createRoles()

app.use(express.json());


app.use(express.urlencoded({extended: true}));

app.use(cors())

app.use(morgan('dev'))

app.use(require('./routes/products.routes'))
app.use(require('./routes/auth.routes'))
app.use(require('./routes/sales.routes'))
app.use(require('./routes/categories.routes'))


app.listen(3000)

console.log('server on port', 3000)