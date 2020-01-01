const express = require('express')
require('./db/mongoose')
const router = require('./routers/router')
const cors = require('cors')

const app = express()
app.use(cors())
port = process.env.PORT || 3000

app.use(express.json())
app.use(router)

app.listen(port)