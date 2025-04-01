import express = require('express') 
require('dotenv').config()

const app = express()
const NpssoKey = process.env.MyNpsso

app.use(express.json())

export default app